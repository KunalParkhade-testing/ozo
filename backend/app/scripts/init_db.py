"""Initialize the database schema and create a sample admin user.

Run this after the database is available (for example after `docker-compose up -d db`).

Usage (from backend directory):
  python -m app.scripts.init_db
"""
from sqlalchemy.orm import Session
from app.db.session import engine, SessionLocal
from app.db.base import Base
from app.crud.user import get_user_by_email, create_user
from app.schemas.user import UserCreate
import logging


logger = logging.getLogger("init_db")
logging.basicConfig(level=logging.INFO)


def init_db() -> None:
    # Create all tables
    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)

    # Optionally seed an admin user
    db: Session = SessionLocal()
    try:
        admin_email = "admin@example.com"
        existing = get_user_by_email(db, email=admin_email)
        if existing:
            logger.info("Admin user already exists: %s", admin_email)
        else:
            admin = UserCreate(username="admin", email=admin_email, password="adminpass", full_name="Admin User")
            create_user(db=db, user=admin)
            logger.info("Created admin user: %s", admin_email)
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
