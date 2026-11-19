import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.idea import router as idea_router

load_dotenv()

app = FastAPI(
    title="Team Draco – AI-Powered Startup Validation API",
    description="Backend service for structured startup idea extraction and validation.",
    version="1.0.0",
)

raw_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(idea_router)


@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "Team Draco – AI-Powered Startup Validation System",
        "version": "1.0.0",
    }