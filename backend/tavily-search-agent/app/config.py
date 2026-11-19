"""Read configuration values from the environment."""

import os
from dotenv import load_dotenv

# Load variables from a local .env file, if one exists.
load_dotenv()

# Read the Tavily API key without hardcoding the secret in this project.
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

# Number of web results to request for each research category.
MAX_RESULTS_PER_QUERY = int(os.getenv("MAX_RESULTS_PER_QUERY", "5"))

# Tavily search depth: "basic" is faster; "advanced" is more thorough.
SEARCH_DEPTH = os.getenv("SEARCH_DEPTH", "advanced")
