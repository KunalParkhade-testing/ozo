"""Tests for user endpoints."""
import pytest


def test_get_user_profile(client, db_session):
    """Test getting user profile."""
    # First create a user
    payload = {"username": "testuser2", "email": "test2@example.com", "password": "testpass"}
    resp = client.post("/api/v1/auth/signup", json=payload)
    assert resp.status_code == 201
    user_id = resp.json()["id"]
    
    # Get user profile
    resp = client.get(f"/api/v1/users/{user_id}")
    assert resp.status_code == 200
    body = resp.json()
    assert body["username"] == "testuser2"
    assert body["email"] == "test2@example.com"


def test_get_nonexistent_user(client):
    """Test getting a user that doesn't exist."""
    resp = client.get("/api/v1/users/9999")
    assert resp.status_code == 404


def test_duplicate_email_signup(client):
    """Test that duplicate email registration fails."""
    payload = {"username": "user1", "email": "duplicate@example.com", "password": "pass123"}
    resp1 = client.post("/api/v1/auth/signup", json=payload)
    assert resp1.status_code == 201
    
    # Try to register again with same email but different username
    payload2 = {"username": "user2", "email": "duplicate@example.com", "password": "pass456"}
    resp2 = client.post("/api/v1/auth/signup", json=payload2)
    assert resp2.status_code == 400
    assert "already registered" in resp2.json()["detail"].lower()


def test_invalid_login_credentials(client):
    """Test login with invalid credentials."""
    # Create a user
    payload = {"username": "validuser", "email": "valid@example.com", "password": "correctpass"}
    client.post("/api/v1/auth/signup", json=payload)
    
    # Try to login with wrong password (now using LoginRequest schema)
    login_payload = {"email": "valid@example.com", "password": "wrongpass"}
    resp = client.post("/api/v1/auth/login", json=login_payload)
    assert resp.status_code == 401
    assert "invalid" in resp.json()["detail"].lower()
