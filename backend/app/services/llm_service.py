import json
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError
from pydantic import ValidationError

from app.schemas.idea_schema import IdeaExtractRequest, IdeaExtractResponse

load_dotenv()


class LLMServiceError(Exception):
    """Custom exception for LLM extraction failures."""

    def __init__(self, message: str, status_code: int = 502):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class GeminiIdeaExtractor:
    def __init__(self) -> None:
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        # Configurable via GEMINI_MODEL in .env; defaults to gemini-2.5-flash
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()

    def _get_client(self) -> genai.Client:
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            raise LLMServiceError(
                message="GEMINI_API_KEY is missing or not configured on the server.",
                status_code=500,
            )
        return genai.Client(api_key=self.api_key)

    def _build_prompt(self, payload: IdeaExtractRequest) -> str:
        target_aud = payload.target_audience if payload.target_audience else "Not provided by user"
        industry = payload.industry if payload.industry else "Not provided by user"

        return f"""
You are a Senior Startup Idea Analyst for Team Draco, an AI-powered startup validation platform.
Your task is to analyze the user's startup submission and extract structured, factual insights strictly grounded in the provided text.

CRITICAL RULES:
1. Do NOT invent, assume, or fabricate details that are not stated or clearly implied in the input.
2. If specific information (such as business model, target audience, or industry) is missing and cannot be directly inferred from the text, output the exact string: "Not specified".
3. Keep each extracted field concise, clear, and professional (1–3 sentences max per field).
4. Extract 3 to 7 relevant keywords based solely on the submission.

STARTUP SUBMISSION:
- Title: {payload.title}
- Description: {payload.description}
- User-Provided Target Audience: {target_aud}
- User-Provided Industry: {industry}
""".strip()

    def extract_idea(self, payload: IdeaExtractRequest) -> IdeaExtractResponse:
        client = self._get_client()
        prompt = self._build_prompt(payload)

        try:
            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=IdeaExtractResponse,
                    temperature=0.2,
                ),
            )
        except APIError as exc:
            status = getattr(exc, "code", None) or 502
            if status in (400, 401, 403):
                raise LLMServiceError(
                    message="Authentication failed with Gemini API. Verify GEMINI_API_KEY.",
                    status_code=401,
                ) from exc
            if status == 429:
                raise LLMServiceError(
                    message="Gemini API rate limit exceeded. Please try again shortly.",
                    status_code=429,
                ) from exc
            raise LLMServiceError(
                message=f"Gemini API error: {exc.message}",
                status_code=502,
            ) from exc
        except Exception as exc:
            raise LLMServiceError(
                message=f"Unexpected error communicating with Gemini API: {str(exc)}",
                status_code=502,
            ) from exc

        if not response.text:
            raise LLMServiceError(
                message="Gemini returned an empty response.",
                status_code=502,
            )

        try:
            raw_data = json.loads(response.text)
            validated = IdeaExtractResponse.model_validate(raw_data)
            return validated
        except (json.JSONDecodeError, ValidationError) as exc:
            raise LLMServiceError(
                message=f"Failed to parse structured JSON from LLM response: {str(exc)}",
                status_code=502,
            ) from exc


gemini_extractor = GeminiIdeaExtractor()