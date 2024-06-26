from typing import Any

from sqlalchemy import Mapped
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import as_declarative


@as_declarative()
class Base:
    id: Any
    __name__: str

    # to generate tablename from classname
    @declared_attr
    def __tablename__(self, cls) -> Mapped[str]:
        return cls.__name__.lower()
