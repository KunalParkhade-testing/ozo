from fastapi import APIRouter

from app.api.v1.endpoints import auth, users

api_router = APIRouter()

# Include auth and users endpoints for v1
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])

# This file initializes the API versioning module.