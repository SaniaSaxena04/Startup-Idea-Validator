from typing import Optional
from pydantic import BaseModel, Field


# Defines the structure of the startup idea
class StartupIdea(BaseModel):

    # Name of the startup idea
    idea_name: str = Field(
        ...,
        min_length=2
    )

    # Problem the startup aims to solve
    problem: str = Field(
        ...,
        min_length=5
    )

    # Proposed solution
    solution: str = Field(
        ...,
        min_length=5
    )

    # People who will use the product
    target_audience: str = Field(
        ...,
        min_length=2
    )

    # Industry to which the startup belongs
    industry: str = Field(
        ...,
        min_length=2
    )

    # Country or region where the startup will operate
    # Optional because the extracted idea may not always contain it
    target_market: Optional[str] = Field(
        default="global"
    )