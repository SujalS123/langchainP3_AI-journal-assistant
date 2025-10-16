from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..services.memory_service import process_journal_entry, load_user_memory, get_weekly_insights
from ..core.auth import verify_token

router = APIRouter()

class JournalEntry(BaseModel):
    entry_text: str

class ReflectionResponse(BaseModel):
    reflection: str
    entries_stored: int

@router.post("/reflect", response_model=ReflectionResponse)
def reflect_on_entry(entry: JournalEntry, user_id: str = Depends(verify_token)):
    result = process_journal_entry(entry.entry_text, user_id)
    return ReflectionResponse(**result)

@router.get("/history")
def get_memory_history(user_id: str = Depends(verify_token)):
    history = load_user_memory(user_id)
    return {"user_id": user_id, "history": history}

@router.get("/weekly-insights")
def get_weekly_summary(user_id: str = Depends(verify_token)):
    insights = get_weekly_insights(user_id)
    return {"insights": insights}