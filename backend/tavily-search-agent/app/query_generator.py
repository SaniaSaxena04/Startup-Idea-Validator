
from app.schemas import StartupIdea


def generate_search_queries(idea: StartupIdea):

    # Convert the extracted keywords into a searchable string.
    # This allows Tavily to search using multiple relevant terms.
    keyword_text = ", ".join(idea.keywords) if idea.keywords else idea.industry

    # Generate a separate query for each market research category.
    queries = {

        # Find existing companies that offer similar solutions.
        "competitors": (
            f"Companies and startups offering solutions similar to "
            f"{idea.solution} in the {idea.industry} industry. "
            f"Include {keyword_text}."
        ),

        # Find existing products that solve the same problem.
        "similar_products": (
            f"Existing products, platforms and alternatives that address "
            f"{idea.problem}. "
            f"Related solution: {idea.solution}."
        ),

        # Understand current trends and developments in the industry.
        "market_trends": (
            f"Latest market trends, growth, innovations and developments "
            f"in the {idea.industry} industry. "
            f"Related keywords: {keyword_text}."
        ),

        # Identify the needs and challenges of potential customers.
        "customer_demand": (
            f"Problems, challenges and unmet needs of "
            f"{idea.target_audience} related to {idea.problem}. "
            f"Look for evidence of customer demand."
        ),

        # Identify opportunities that existing products may not address.
        "market_gaps": (
            f"Unmet customer needs and market opportunities in the "
            f"{idea.industry} industry. "
            f"Focus on the problem: {idea.problem}. "
            f"Consider the proposed solution: {idea.solution}."
        )
    }

    # Return all five generated search queries.
    return queries
