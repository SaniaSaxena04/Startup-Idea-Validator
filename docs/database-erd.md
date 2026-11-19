# Database Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ STARTUP_IDEA : owns
    STARTUP_IDEA ||--o{ VALIDATION_RUN : has
    VALIDATION_RUN ||--o{ AGENT_EXECUTION : runs
    VALIDATION_RUN ||--o{ RESEARCH_SOURCE : retrieves
    VALIDATION_RUN ||--o{ RESEARCH_CLAIM : records
    RESEARCH_SOURCE o|--o{ RESEARCH_CLAIM : supports
    AGENT_EXECUTION ||--o{ RESEARCH_CLAIM : produces
    VALIDATION_RUN ||--o{ MARKET_ANALYSIS : evaluates
    VALIDATION_RUN ||--o{ COMPETITOR : identifies
    VALIDATION_RUN ||--o{ CUSTOMER_SEGMENT : describes
    VALIDATION_RUN ||--o{ FINANCIAL_PROJECTION : models
    VALIDATION_RUN ||--o{ RISK_ASSESSMENT : assesses
    VALIDATION_RUN ||--o| VALIDATION_REPORT : generates

    USER {
        uuid id PK
        string email UK
        string name
    }
    STARTUP_IDEA {
        uuid id PK
        uuid user_id FK
        string title
        text description
    }
    VALIDATION_RUN {
        uuid id PK
        uuid idea_id FK
        string status
    }
    AGENT_EXECUTION {
        uuid id PK
        uuid run_id FK
        string agent_name
        string status
    }
    RESEARCH_SOURCE {
        uuid id PK
        uuid run_id FK
        string url
    }
    RESEARCH_CLAIM {
        uuid id PK
        uuid run_id FK
        uuid source_id FK
        uuid agent_execution_id FK
    }
    MARKET_ANALYSIS {
        uuid id PK
        uuid run_id FK
        float tam
    }
    COMPETITOR {
        uuid id PK
        uuid run_id FK
        string name
    }
    CUSTOMER_SEGMENT {
        uuid id PK
        uuid run_id FK
        string name
    }
    FINANCIAL_PROJECTION {
        uuid id PK
        uuid run_id FK
        string scenario
    }
    RISK_ASSESSMENT {
        uuid id PK
        uuid run_id FK
        string category
    }
    VALIDATION_REPORT {
        uuid id PK
        uuid run_id FK
        float overall_score
    }
```

**Note:** The ERD uses simplified Mermaid types for readability. Implement money and scores with PostgreSQL `NUMERIC`, not floating-point columns. Refer to `data-models.md` for detailed types and nullability.

## Visual Diagrams

![Database Erd](images/database-erd.png)

