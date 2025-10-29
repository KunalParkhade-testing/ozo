from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import api_router
from app.core.config import settings

app = FastAPI(title="OZO - Our Zero-waste Option")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    # Keep root message stable for tests and healthchecks
    return {"message": "Welcome to OZO - Our Zero-waste Option!"}