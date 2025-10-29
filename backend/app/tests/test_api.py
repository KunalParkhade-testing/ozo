import json


def test_read_main(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to OZO - Our Zero-waste Option!"}


def test_auth_signup_and_login(client):
    # Signup
    payload = {"username": "testuser", "email": "test@example.com", "password": "testpass"}
    resp = client.post("/api/v1/auth/signup", json=payload)
    assert resp.status_code == 201
    body = resp.json()
    assert body["username"] == "testuser"

    # Login
    login_payload = {"email": "test@example.com", "password": "testpass"}
    resp2 = client.post("/api/v1/auth/login", json=login_payload)
    assert resp2.status_code == 200
    assert "access_token" in resp2.json()