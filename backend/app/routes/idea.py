from fastapi import APIRouter, HTTPException
from app.schemas.idea_schema import IdeaExtractRequest, IdeaExtractResponse
from app.services.llm_service import LLMServiceError, gemini_extractor

router = APIRouter(prefix="/api/ideas", tags=["Idea Extraction"])


@router.post(
    "/extract",
    response_model=IdeaExtractResponse,
    summary="Extract structured startup components using Gemini",
)
async def extract_startup_idea(payload: IdeaExtractRequest) -> IdeaExtractResponse:
    try:
        return gemini_extractor.extract_idea(payload)
    except LLMServiceError as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.message) from exc