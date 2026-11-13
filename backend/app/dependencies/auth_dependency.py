from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.auth import verify_token
from app.database.mongodb import users_collection

security = HTTPBearer(auto_error=False)

DEFAULT_USER = {
    "email": "imsushanth2005@gmail.com",
    "name": "Sushanth",
    "target_role": "Software Engineer"
}

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    if credentials and credentials.credentials:
        payload = verify_token(credentials.credentials)
        if payload and isinstance(payload, dict) and "email" in payload:
            return payload

    first_user = users_collection.find_one({}, sort=[("_id", 1)])
    if first_user:
        return {
            "email": first_user.get("email", DEFAULT_USER["email"]),
            "name": first_user.get("name", DEFAULT_USER["name"]),
            "target_role": first_user.get("target_role", DEFAULT_USER["target_role"])
        }

    return DEFAULT_USER