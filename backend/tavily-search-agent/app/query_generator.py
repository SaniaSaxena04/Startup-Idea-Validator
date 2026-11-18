from app.schemas import StartupIdea


def generate_search_queries(idea: StartupIdea):

    # Get the target market
    market = idea.target_market or "global"

    # Generate different queries for different research categories
    queries = {

        # Find companies offering similar solutions
        "competitors": (
            f"{idea.solution} competitors "
            f"and competing companies in {market}"
        ),

        # Find existing products that solve the same problem
        "similar_products": (
            f"Existing products and alternatives for "
            f"{idea.problem} in {market}"
        ),

        # Understand the industry's current trends
        "market_trends": (
            f"{idea.industry} market trends "
            f"growth reports {market}"
        ),

        # Understand the problems and needs of potential customers
        "customer_demand": (
            f"{idea.target_audience} problems and needs "
            f"related to {idea.problem} in {market}"
        ),

        # Identify possible gaps in the existing market
        "market_gaps": (
            f"Unmet needs and opportunities in "
            f"{idea.industry} in {market}"
        )
    }

    # Return all generated queries
    return queries