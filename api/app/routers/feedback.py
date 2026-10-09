import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()

FEEDBACK_FILE = Path(__file__).resolve().parent.parent.parent / "feedback.json"


class FeedbackPayload(BaseModel):
    message: str = Field(..., min_length=1, max_length=5000)
    page: str = ""


@router.post("/feedback", status_code=201)
async def submit_feedback(payload: FeedbackPayload):
    entry = {
        "message": payload.message,
        "page": payload.page,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    try:
        entries = json.loads(FEEDBACK_FILE.read_text()) if FEEDBACK_FILE.exists() else []
    except (json.JSONDecodeError, OSError):
        entries = []
    entries.append(entry)
    FEEDBACK_FILE.write_text(json.dumps(entries, indent=2))
    return {"status": "ok"}
