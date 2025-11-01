import pytest

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.base import Base
from app.main import app
from app.db.session import get_db


SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Use StaticPool so the in-memory SQLite database is shared across
# connections during testing. This avoids "no such table" errors when
# different connections are used for create_all vs session usage.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def create_test_database():
    # Create the database schema for tests
    # Ensure all model modules are imported so they register on Base.metadata
    # (imports here prevent create_all running before models are declared)
    from app.models.user import User  # noqa: F401

    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture()
def client(db_session):
    """Return a TestClient that uses the provided db_session for dependency overrides."""

    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    # Override the get_db dependency used throughout the app
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as c:
        yield c

    # Clean up
    app.dependency_overrides.clear()
