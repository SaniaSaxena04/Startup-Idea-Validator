#idea.py
#Defines API endpoints.
#Receives requests from the frontend.
#Calls the necessary backend functions.
#Returns the response to the frontend.

from fastapi import APIRouter, HTTPException

from app.schemas.idea_schema import (
    IdeaExtractRequest,
    CombinedIdeaExtractResponse,
)

from app.services.llm_service import (
    LLMServiceError,
    gemini_extractor,
)

from app.services.market_research import (
    run_market_research,
)


router = APIRouter(
    prefix="/api/ideas",
    tags=["Idea Extraction"]
)


@router.post(
    "/extract",
    response_model=CombinedIdeaExtractResponse,
    summary="Extract startup idea and perform AI market research",
)
def extract_startup_idea(
    payload: IdeaExtractRequest
):

    # =============================================
    # STEP 1: Extract startup idea using Gemini
    # =============================================

    try:

        extracted_idea = gemini_extractor.extract_idea(payload)

    except LLMServiceError as exc:

        raise HTTPException(
            status_code=exc.status_code,
            detail=exc.message
        ) from exc


    # =============================================
    # STEP 2: Perform market research using Gemini
    # and Tavily
    # =============================================

    market_research = None

    research_error = None

    try:

        market_research = run_market_research(
            extracted_idea
        )

    except Exception as exc:

        # Idea extraction has already succeeded.
        # Research failure should not discard it.

        research_error = str(exc)


    # =============================================
    # STEP 3: Return both results
    # =============================================

    return CombinedIdeaExtractResponse(

        idea=extracted_idea,

        market_research=market_research,

        research_error=research_error
    )