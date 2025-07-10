from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class Target(BaseModel):
    id: str
    name: str
    heading: float 
    timestamp: datetime
    classification: Literal["hostile", "friendly"]

class TargetCreate(BaseModel):
    targets: list[Target] 