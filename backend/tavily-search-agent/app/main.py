from fastapi import FastAPI, HTTPException

from app.schemas import StartupIdea
from app.research_agent import run_market_research


# Create the FastAPI application
app = FastAPI(

    title="Startup Market Research Agent",

    description=(
        "An AI-powered web search agent "
        "for startup competitor and market research."
    ),

    version="1.0.0"
)


# Home route
@app.get("/")
def home():

    return {
        "message": "Startup Market Research Agent is running",

        "docs": "/docs"
    }


# Health check route
@app.get("/health")
def health():

    return {
        "status": "ok"
    }


# Main endpoint for market research
@app.post("/research")
def research_startup(idea: StartupIdea):

    try:

        # Pass the extracted idea to the research agent
        result = run_market_research(idea)

        # Return the market research results
        return result

    except ValueError as error:

        # Handle configuration errors such as missing API key
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    except Exception as error:

        # Handle unexpected errors
        raise HTTPException(
            status_code=502,
            detail=f"Market research failed: {error}"
        )