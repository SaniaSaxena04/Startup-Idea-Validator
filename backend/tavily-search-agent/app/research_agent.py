
from datetime import datetime, timezone

from app.query_generator import generate_search_queries
from app.tavily_search import (
    create_tavily_client,
    search_web
)


def run_market_research(idea):

    # Create the Tavily client to perform web searches.
    client = create_tavily_client()

    # Generate research queries from the extracted startup idea.
    queries = generate_search_queries(idea)

    # Store search results separately for each research category.
    research = {}

    # Store errors if any individual search fails.
    errors = []

    # Execute searches for all five research categories.
    for category, query in queries.items():

        try:

            # Perform the live web search using Tavily.
            results = search_web(query, client)

            # Save results under their corresponding category.
            research[category] = results

        except Exception as error:

            # If one search fails, continue with the remaining searches.
            research[category] = []

            errors.append({
                "category": category,
                "message": str(error)
            })

    # Collect unique source URLs from all search categories.
    sources_by_url = {}

    for category_results in research.values():

        for result in category_results:

            url = result.get("url")

            # Avoid including the same webpage multiple times.
            if url and url not in sources_by_url:

                sources_by_url[url] = {
                    "title": result.get("title", ""),
                    "url": url
                }

    # Prepare the final structured market research response.
    output = {

        # Basic startup information received from Task 3.
        "startup_name": idea.startup_name,
        "problem": idea.problem,
        "solution": idea.solution,
        "target_audience": idea.target_audience,
        "industry": idea.industry,
        "business_model": idea.business_model,
        "keywords": idea.keywords,

        # Record the date and time when research was performed.
        "searched_at": datetime.now(timezone.utc).isoformat(),

        # Include all generated search queries.
        "search_queries": queries,

        # Include categorized Tavily search results.
        "research": research,

        # Include unique source URLs for reference.
        "sources": list(sources_by_url.values()),

        # Include errors without stopping the entire research process.
        "errors": errors,

        # Explain the limitations of web research.
        "note": (
            "Search results provide research evidence and "
            "do not represent a verified market-size estimate "
            "or a final startup-success score."
        )
    }

    return output
