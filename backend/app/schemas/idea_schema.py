#idea_schema.py
#Defines how data should look.

#For example:
#- What fields the user sends.
#- What fields Gemini returns.
#- What format market research results follow.
#- What the final API response contains.

from typing import List, Optional, Dict

from pydantic import BaseModel, Field, field_validator


# -------------------------------------------------
# Request received from the frontend
# -------------------------------------------------

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
        examples=[
            "An AI-powered platform connecting farmers directly with customers."
        ],
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
            raise ValueError(
                "Field cannot be empty or whitespace only."
            )

        return cleaned


    @field_validator("target_audience", "industry")
    @classmethod
    def clean_optional_strings(
        cls,
        value: Optional[str]
    ) -> Optional[str]:

        if value is None:
            return None

        cleaned = value.strip()

        return cleaned if cleaned else None


# -------------------------------------------------
# Structured idea extracted by Gemini
# -------------------------------------------------

class IdeaExtractResponse(BaseModel):

    startup_name: str = Field(
        ...,
        description="Extracted or refined startup name"
    )

    problem: str = Field(
        ...,
        description="Core real-world problem identified"
    )

    solution: str = Field(
        ...,
        description="Proposed product or service solution"
    )

    target_audience: str = Field(
        ...,
        description="Target customer segment"
    )

    industry: str = Field(
        ...,
        description="Primary industry or sector"
    )

    business_model: str = Field(
        ...,
        description="Revenue generation mechanism"
    )

    keywords: List[str] = Field(
        default_factory=list,
        description="Relevant domain and technology keywords"
    )


# -------------------------------------------------
# Individual Tavily search result
# -------------------------------------------------

class ResearchResult(BaseModel):

    title: str

    url: str

    content: str

    score: Optional[float] = None


# -------------------------------------------------
# Deduplicated sources
# -------------------------------------------------

class ResearchSource(BaseModel):

    title: str

    url: str


# -------------------------------------------------
# Market research response
# -------------------------------------------------

class MarketResearchResponse(BaseModel):

    searched_at: str

    query_generation_method: str

    search_queries: Dict[str, str]

    research: Dict[str, List[ResearchResult]]

    sources: List[ResearchSource]

    errors: List[dict]

    note: str


# -------------------------------------------------
# Combined response from the main endpoint
# -------------------------------------------------

class CombinedIdeaExtractResponse(BaseModel):

    idea: IdeaExtractResponse

    market_research: Optional[MarketResearchResponse] = None

    research_error: Optional[str] = None