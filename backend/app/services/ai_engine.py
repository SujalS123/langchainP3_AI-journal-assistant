import os
import json
from datetime import datetime
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from dotenv import load_dotenv
from ..core.database import memories_collection
from bson import ObjectId

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

class JournalAI:
    def __init__(self, user_id: str = None):
        self.llm = ChatGoogleGenerativeAI(
            model="models/gemini-2.5-flash",
            temperature=0.2,
            google_api_key=GOOGLE_API_KEY
        )
        self.user_id = user_id
        self.chat_history = InMemoryChatMessageHistory()
        if user_id:
            self._load_memory()
        
        # Direct LLM usage with manual history management
    
    def _load_memory(self):
        try:
            if self.user_id:
                memory_doc = memories_collection.find_one({"user_id": self.user_id})
                if memory_doc:
                    for msg in memory_doc.get("messages", []):
                        if msg["type"] == "human":
                            self.chat_history.add_message(HumanMessage(content=msg["content"]))
                        elif msg["type"] == "ai":
                            self.chat_history.add_message(AIMessage(content=msg["content"]))
        except:
            pass
    
    def _save_memory(self):
        try:
            if self.user_id:
                messages = []
                for msg in self.chat_history.messages:
                    messages.append({
                        "type": "human" if isinstance(msg, HumanMessage) else "ai",
                        "content": msg.content
                    })
                
                memories_collection.update_one(
                    {"user_id": self.user_id},
                    {
                        "$set": {
                            "messages": messages,
                            "updated_at": datetime.now().isoformat()
                        }
                    },
                    upsert=True
                )
        except:
            pass
    
    def chat(self, message: str) -> str:
        try:
            # Add user message to history
            self.chat_history.add_message(HumanMessage(content=message))
            
            # Get response from LLM with history
            response = self.llm.invoke(self.chat_history.messages)
            
            # Add AI response to history
            self.chat_history.add_message(AIMessage(content=response.content))
            
            self._save_memory()
            return response.content
        except Exception as e:
            return f"Error: {str(e)}. Please check your GOOGLE_API_KEY in .env file."
    
    def get_weekly_summary(self) -> str:
        try:
            if not self.chat_history.messages:
                return "No conversations found for summary."
            
            summary_prompt = "Summarize our conversations this week. What patterns, moods, or insights do you notice?"
            messages = self.chat_history.messages + [HumanMessage(content=summary_prompt)]
            
            response = self.llm.invoke(messages)
            return response.content
        except Exception as e:
            return f"Error: {str(e)}. Please check your GOOGLE_API_KEY in .env file."

# JournalAI instances are created per user in routers