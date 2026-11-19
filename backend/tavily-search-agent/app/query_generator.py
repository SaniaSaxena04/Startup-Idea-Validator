
from app.schemas import StartupIdea


def clean_phrase(text: str) -> str:
    """
    Clean extracted text before inserting it into a search query.
    Removes unnecessary spaces and trailing punctuation.
    """
    text = text.strip()

    # Remove trailing punctuation
    text = text.rstrip(".,;:")

    # Remove unnecessary starting articles
    for article in ["A ", "An ", "The "]:
        if text.lower().startswith(article.lower()):
            text = text[len(article):]
            break

    return text.strip()


def generate_search_queries(idea: StartupIdea):

    # Clean extracted startup details
    solution = clean_phrase(idea.solution)
    problem = clean_phrase(idea.problem)
    industry = clean_phrase(idea.industry)
    audience = clean_phrase(idea.target_audience)

    # Use keywords if available, otherwise use the industry
    keyword_text = (
        ", ".join(idea.keywords)
        if idea.keywords
        else industry
    )

    queries = {

        # 1. Competitor research:
        # Find companies and startups offering similar solutions.
        "competitors": (
            f"Startups and companies in the {industry} industry "
            f"addressing the challenge: {problem}. "
            f"Focus on solutions similar to {solution}. "
            f"Related keywords: {keyword_text}."
        ),

        # 2. Similar product research:
        # Find actual products, platforms and alternatives.
        "similar_products": (
            f"Existing products, applications and platforms "
            f"addressing the challenge: {problem}. "
            f"Find alternatives and products with features similar "
            f"to {solution}."
        ),

        # 3. Market trends:
        # Understand industry growth and emerging developments.
        "market_trends": (
            f"Recent market trends, industry growth, innovations "
            f"and technological developments in {industry}. "
            f"Focus on {keyword_text}."
        ),

        # 4. Customer demand:
        # Find evidence of customer needs and demand.
        "customer_demand": (
            f"Customer needs, challenges and unmet demands of "
            f"{audience} related to {problem}. "
            f"Look for surveys, reports, studies and market research."
        ),

        # 5. Market gaps:
        # Identify problems existing solutions have not addressed.
        "market_gaps": (
            f"Unmet needs and underserved areas in the {industry} "
            f"industry related to {problem}. "
            f"Identify limitations in existing solutions and "
            f"opportunities for improvement."
        )
    }

    return queries
