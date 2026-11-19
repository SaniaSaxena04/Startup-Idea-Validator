
from typing import List
from pydantic import BaseModel, Field


# Defines the structure of the startup idea received from Task 3.
# These field names must match IdeaExtractResponse in idea_schema.py.

class StartupIdea(BaseModel):

    # Extracted or refined name of the startup
    startup_name: str = Field(
        ...,
        min_length=2
    )

    # Core problem the startup aims to solve
    problem: str = Field(
        ...,
        min_length=5
    )

    # Proposed product or service solution
    solution: str = Field(
        ...,
        min_length=5
    )

    # People who will use or benefit from the product
    target_audience: str = Field(
        ...,
        min_length=2
    )

    # Industry or sector in which the startup operates
    industry: str = Field(
        ...,
        min_length=2
    )

    # How the startup plans to generate revenue
    business_model: str = Field(
        ...
    )

    # Relevant domain and technology keywords extracted by the LLM
    keywords: List[str] = Field(
        default_factory=list
    )
