from tavily import TavilyClient

from app.config import (
    TAVILY_API_KEY,
    MAX_RESULTS_PER_QUERY,
    SEARCH_DEPTH
)


def create_tavily_client():

    # Check whether the API key is available
    if not TAVILY_API_KEY:
        raise ValueError(
            "TAVILY_API_KEY is missing. "
            "Please add it to your .env file."
        )

    # Create the Tavily client using the API key
    client = TavilyClient(
        api_key=TAVILY_API_KEY
    )

    return client


def search_web(query, client):

    # Send the search query to Tavily
    response = client.search(
        query=query,

        # Advanced search provides more detailed results
        search_depth=SEARCH_DEPTH,

        # Maximum number of results to retrieve
        max_results=MAX_RESULTS_PER_QUERY,

        # We only need search results, not a generated answer
        include_answer=False
    )

    # Extract the search results from the response
    raw_results = response.get("results", [])

    # Store the cleaned results
    cleaned_results = []

    # Process each search result
    for item in raw_results:

        result = {

            # Title of the webpage
            "title": item.get("title", ""),

            # Original webpage URL
            "url": item.get("url", ""),

            # Content extracted from the webpage
            "content": item.get("content", ""),

            # Relevance score provided by Tavily
            "score": item.get("score")
        }

        cleaned_results.append(result)

    # Return the organized search results
    return cleaned_results