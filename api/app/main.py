from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import feedback, health, sitemap, seo

app = FastAPI(title="DoAide Docs API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://docs.doaide.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(sitemap.router)
app.include_router(seo.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")
