from datetime import datetime

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