from fastapi import APIRouter, Depends
from pydantic import BaseModel
from ..services.ai_engine import JournalAI
from ..core.auth import verify_token

router = APIRouter()

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
def chat_with_ai(chat_message: ChatMessage, user_id: str = Depends(verify_token)):
    ai = JournalAI(user_id=user_id)
    response = ai.chat(chat_message.message)
    return ChatResponse(response=response)

@router.get("/summary", response_model=ChatResponse)
def get_weekly_summary(user_id: str = Depends(verify_token)):
    ai = JournalAI(user_id=user_id)
    summary = ai.get_weekly_summary()
    return ChatResponse(response=summary)

@router.get("/health")
def health_check():
    return {"status": "healthy"}