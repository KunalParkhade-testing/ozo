from typing import Optional
from sqlalchemy.orm import Session

from app.crud.user import get_user_by_email
from app.core.security import verify_password, create_access_token
from app.models.user import User


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Return the user if credentials are valid, else None."""
    user = get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_token_for_user(user: User) -> str:
    return create_access_token(data={"sub": user.email})
