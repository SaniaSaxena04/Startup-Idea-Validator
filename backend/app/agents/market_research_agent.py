#market_research.py	
# Runs the market research workflow, including Tavily searches and organizing results
import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from tavily import TavilyClient

from app.schemas.idea_schema import IdeaExtractResponse
from app.services.query_generator import (
    gemini_query_generator,
    generate_fallback_queries,
)


load_dotenv()


def create_tavily_client():

    api_key = os.getenv("TAVILY_API_KEY", "").strip()

    if not api_key:
        raise ValueError("TAVILY_API_KEY is missing.")

    return TavilyClient(api_key=api_key)


def search_web(query, client):

    response = client.search(
        query=query,
        search_depth=os.getenv(
            "SEARCH_DEPTH",
            "advanced"
        ),
        max_results=int(
            os.getenv("MAX_RESULTS_PER_QUERY", "5")
        ),
        include_answer=False
    )

    raw_results = response.get("results", [])

    cleaned_results = []

    for item in raw_results:

        cleaned_results.append({

            "title": item.get("title", ""),

            "url": item.get("url", ""),

            "content": item.get("content", ""),

            "score": item.get("score")
        })

    return cleaned_results


def run_market_research(idea: IdeaExtractResponse):

    # -------------------------------------------------
    # STEP 1: Generate search queries using Gemini
    # -------------------------------------------------

    query_generation_method = "Gemini"

    query_generation_error = None

    try:

        queries = gemini_query_generator.generate_queries(idea)

    except Exception as error:

        # If Gemini query generation fails,
        # use fallback queries so research can continue.

        query_generation_method = "Fallback"

        query_generation_error = str(error)

        queries = generate_fallback_queries(idea)


    # -------------------------------------------------
    # STEP 2: Create Tavily client
    # -------------------------------------------------

    client = create_tavily_client()


    # -------------------------------------------------
    # STEP 3: Perform searches for each category
    # -------------------------------------------------

    research = {}

    errors = []

    if query_generation_error:

        errors.append({
            "category": "query_generation",
            "message": query_generation_error
        })


    for category, query in queries.items():

        try:

            results = search_web(query, client)

            research[category] = results

        except Exception as error:

            # A failed category should not stop
            # the remaining research searches.

            research[category] = []

            errors.append({

                "category": category,

                "message": str(error)
            })


    # -------------------------------------------------
    # STEP 4: Deduplicate source URLs
    # -------------------------------------------------

    sources_by_url = {}

    for category_results in research.values():

        for result in category_results:

            url = result.get("url")

            if url and url not in sources_by_url:

                sources_by_url[url] = {

                    "title": result.get("title", ""),

                    "url": url
                }


    # -------------------------------------------------
    # STEP 5: Prepare research response
    # -------------------------------------------------

    output = {

        "searched_at": datetime.now(
            timezone.utc
        ).isoformat(),

        "query_generation_method": query_generation_method,

        "search_queries": queries,

        "research": research,

        "sources": list(sources_by_url.values()),

        "errors": errors,

        "note": (
            "Search results provide research evidence and "
            "do not represent a verified market-size estimate "
            "or a final startup-success score."
        )
    }

    return output

#Gemini extraction → Extract the startup idea into structured fields.


#Gemini query generation → Generate five dynamic queries for:
#- Competitors
#- Similar products
#- Market trends
#- Customer demand
#- Market gaps



#Tavily search → Search the web using those queries.



#Response → Return search results with titles, URLs, content and scores