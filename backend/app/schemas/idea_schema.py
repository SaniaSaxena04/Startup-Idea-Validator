from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


class IdeaExtractRequest(BaseModel):
    title: str = Field(
        ...,
        min_length=2,
        max_length=120,
        description="Name or working title of the startup idea",
        examples=["FarmConnect"],
    )
    description: str = Field(
        ...,
        min_length=15,
        max_length=4000,
        description="Detailed explanation of the startup idea",
        examples=["An AI-powered platform connecting farmers directly with customers."],
    )
    target_audience: Optional[str] = Field(
        default=None,
        max_length=300,
        description="Intended customer segment or user base",
        examples=["Farmers and consumers"],
    )
    industry: Optional[str] = Field(
        default=None,
        max_length=150,
        description="Industry vertical or domain",
        examples=["Agriculture"],
    )

    @field_validator("title", "description")
    @classmethod
    def must_not_be_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty or whitespace only.")
        return cleaned

    @field_validator("target_audience", "industry")
    @classmethod
    def clean_optional_strings(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned if cleaned else None


class IdeaExtractResponse(BaseModel):
    startup_name: str = Field(..., description="Extracted or refined startup name")
    problem: str = Field(..., description="Core real-world problem identified")
    solution: str = Field(..., description="Proposed product or service solution")
    target_audience: str = Field(..., description="Target customer segment")
    industry: str = Field(..., description="Primary industry or sector")
    business_model: str = Field(..., description="Revenue generation mechanism")
    keywords: List[str] = Field(
        default_factory=list,
        description="Relevant domain and technology keywords",
    )