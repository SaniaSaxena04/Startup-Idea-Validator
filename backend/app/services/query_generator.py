#query_generator.py	
# Uses Gemini to generate targeted research search queries dynamically

import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError
from pydantic import BaseModel, ValidationError

from app.schemas.idea_schema import IdeaExtractResponse
from app.services.research_prompt import RESEARCH_QUERY_PROMPT


load_dotenv()


class SearchQueries(BaseModel):
    competitors: str
    similar_products: str
    market_trends: str
    customer_demand: str
    market_gaps: str


class GeminiQueryGenerator:

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()

        self.model_name = os.getenv(
            "GEMINI_MODEL",
            "gemini-2.5-flash"
        ).strip()

    def _get_client(self):
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is missing.")

        return genai.Client(api_key=self.api_key)

    def _build_prompt(self, idea: IdeaExtractResponse):

        return f"""
{RESEARCH_QUERY_PROMPT}

STARTUP INFORMATION:

Startup name: {idea.startup_name}

Problem:
{idea.problem}

Solution:
{idea.solution}

Target audience:
{idea.target_audience}

Industry:
{idea.industry}

Business model:
{idea.business_model}

Keywords:
{", ".join(idea.keywords)}

Generate the five targeted search queries.
""".strip()

    def generate_queries(self, idea: IdeaExtractResponse):

        client = self._get_client()

        prompt = self._build_prompt(idea)

        try:
            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=SearchQueries,
                    temperature=0.3,
                ),
            )

        except APIError as exc:
            raise RuntimeError(
                f"Gemini query generation API error: {exc}"
            ) from exc

        except Exception as exc:
            raise RuntimeError(
                f"Unexpected Gemini query generation error: {exc}"
            ) from exc

        if not response.text:
            raise RuntimeError(
                "Gemini returned an empty query-generation response."
            )

        try:
            raw_data = json.loads(response.text)

            validated = SearchQueries.model_validate(raw_data)

            queries = validated.model_dump()

            # Ensure all generated queries contain text.
            for category, query in queries.items():

                if not query or not query.strip():
                    raise ValueError(
                        f"Gemini generated an empty query for {category}."
                    )

                queries[category] = query.strip()

            return queries

        except (json.JSONDecodeError, ValidationError, ValueError) as exc:
            raise RuntimeError(
                f"Invalid Gemini query-generation response: {exc}"
            ) from exc


def generate_fallback_queries(idea: IdeaExtractResponse):

    """
    Fallback query generation.

    Used only if Gemini fails to generate research queries.
    """

    industry = idea.industry
    problem = idea.problem
    solution = idea.solution
    audience = idea.target_audience

    keywords = ", ".join(idea.keywords) if idea.keywords else industry

    return {

        "competitors": (
            f"Companies and startups offering solutions similar to "
            f"{solution} for {problem} in {industry}"
        ),

        "similar_products": (
            f"Existing products platforms and alternatives for "
            f"{solution} addressing {problem}"
        ),

        "market_trends": (
            f"Market trends growth and innovation in {industry} "
            f"related to {keywords}"
        ),

        "customer_demand": (
            f"Customer demand pain points and needs of {audience} "
            f"related to {problem}"
        ),

        "market_gaps": (
            f"Unmet needs underserved customers and limitations "
            f"of existing solutions in {industry} related to {problem}"
        )
    }


gemini_query_generator = GeminiQueryGenerator()