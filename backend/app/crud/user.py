from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash


def create_user(db: Session, user: UserCreate) -> User:
    # Hash the password and store it in `hashed_password`
    hashed = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int) -> User:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str) -> User:
    return db.query(User).filter(User.email == email).first()

def update_user(db: Session, user_id: int, user: UserUpdate) -> User:
    db_user = get_user(db, user_id)
    if db_user:
        update_data = user.dict(exclude_unset=True)
        # If password is being updated, hash it
        if update_data.get("password"):
            db_user.hashed_password = get_password_hash(update_data.pop("password"))
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int) -> User:
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user