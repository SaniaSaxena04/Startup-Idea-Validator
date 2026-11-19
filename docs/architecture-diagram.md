# System Architecture Diagram

The diagram below is written in Mermaid, which GitHub renders directly in Markdown.

```mermaid
flowchart TB
    U[Entrepreneur] --> UI[React / Next.js UI]
    UI --> API[FastAPI Backend]
    API --> AUTH[Authentication / Authorization]
    API --> ORCH[LangGraph Orchestrator]
    ORCH --> IDEA[Idea Analysis Agent]
    IDEA --> MARKET[Market Research Agent]
    IDEA --> COMP[Competitor Analysis Agent]
    IDEA --> CUSTOMER[Customer Analysis Agent]
    MARKET --> SEARCH[Tavily Search Adapter]
    COMP --> SEARCH
    CUSTOMER --> FIN[Financial Feasibility Agent]
    MARKET --> FIN
    MARKET --> RISK[Risk and SWOT Agent]
    COMP --> RISK
    FIN --> VERIFY[Evidence Verification]
    RISK --> VERIFY
    VERIFY --> REPORT[Scoring and Report Agent]
    REPORT --> DB[(PostgreSQL)]
    API <--> DB
    API --> UI
```

## Integration boundaries
- **Idea submission / extraction:** owned by the idea-submission teammate; connect via a normalized idea profile.
- **Search adapter:** owned by the Tavily agent teammate; expose a structured search result with URLs and timestamps.
- **Architecture and data contracts:** documented here; coordinate migrations and naming before implementation.

## Nonfunctional requirements
Source attribution, traceable agent executions, API key security, per-user access controls, bounded retries, and transparent handling of missing evidence.

## Visual Diagrams

![System Architecture](images/system-architecture.png)

