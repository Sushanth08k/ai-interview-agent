from fastapi import APIRouter
from fastapi import Depends
from app.dependencies.auth_dependency import get_current_user
from app.models.user import UserRegister, UserLogin
from app.database.mongodb import users_collection
from app.utils.security import (
    hash_password,
    verify_password
)
from app.utils.auth import create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {
            "message":
            "User already exists"
        }

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(
            user.password
        ),
        "target_role":
        user.target_role
    }

    users_collection.insert_one(user_data)

    return {
        "message":
        "User Registered Successfully"
    }


@router.post("/login")
def login(user: UserLogin):

    db_user = users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        return {
            "message":
            "Invalid Credentials"
        }

    valid = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid:
        return {
            "message":
            "Invalid Credentials"
        }

    token = create_access_token(
        {
            "email":
            db_user["email"]
        }
    )

    return {
        "access_token":
        token
    }

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user