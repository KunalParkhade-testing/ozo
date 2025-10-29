import os
from typing import List


class Settings:
    """Minimal settings holder. Uses environment variables with sensible defaults.

    Replaced Pydantic BaseSettings to avoid pydantic v2 BaseSettings migration dependency in tests.
    """

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALLOW_ORIGINS: List[str] = ["*"]

    def __init__(self):
        self.DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
        self.SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
        self.ALGORITHM = os.getenv("ALGORITHM", "HS256")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
        origins = os.getenv("ALLOW_ORIGINS", "*")
        # Allow comma-separated origins in env
        self.ALLOW_ORIGINS = [o.strip() for o in origins.split(",")] if origins else ["*"]


settings = Settings()