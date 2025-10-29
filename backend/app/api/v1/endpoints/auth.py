from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.user import UserCreate, UserOut
from app.crud.user import create_user, get_user_by_email
from app.core.security import verify_password, create_access_token

router = APIRouter()


@router.post("/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = get_user_by_email(db, email=user.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    return create_user(db=db, user=user)


@router.post("/login")
def login(credentials: UserCreate, db: Session = Depends(get_db)):
    # Using email+password for authentication
    db_user = get_user_by_email(db, email=credentials.email)
    if not db_user or not verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}