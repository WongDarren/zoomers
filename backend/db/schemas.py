from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str
    Username: str
    PasswordHash: str
    DisplayName: str
    Bio: str
    ProfilePictureUrl: str
    IsPrivate: bool
    FirstName: str
    LastName: str

    class Config:
        orm_mode = True


class ReviewSchema(BaseModel):
    User: int
    stars: float
    ReviewText: str
    Date: str
    MediaId: int

    class Config:
        orm_mode = True


class ReviewCreate(BaseModel):
    User: int
    stars: float
    ReviewText: str
    MediaId: int


class ReviewResponse(BaseModel):
    id: int
    User: int
    stars: float
    ReviewText: str
    Date: datetime
    MediaId: int

    class Config:
        orm_mode = True


class ReviewByMediaResponse(BaseModel):
    id: int
    stars: float
    ReviewText: str
    Date: datetime
    MediaId: int
    DisplayName: str

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    Email: str
    Username: str
    Password: str
    DisplayName: str
    Bio: Optional[str] = None
    ProfilePictureUrl: Optional[str] = None
    IsPrivate: Optional[bool] = False
    FirstName: str
    LastName: Optional[str] = None
