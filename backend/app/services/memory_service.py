import json
import os
from datetime import datetime
from .ai_engine import JournalAI

DATA_PATH = "app/data/memory_store"

def get_user_memory_file(user_id: str = "demo_user"):
    return os.path.join(DATA_PATH, f"{user_id}.json")

def load_user_memory(user_id: str = "demo_user"):
    file_path = get_user_memory_file(user_id)
    if not os.path.exists(file_path):
        return []
    with open(file_path, "r") as f:
        return json.load(f)

def save_user_memory(user_id: str, memory_data):
    file_path = get_user_memory_file(user_id)
    os.makedirs(DATA_PATH, exist_ok=True)
    with open(file_path, "w") as f:
        json.dump(memory_data, f, indent=2)

def process_journal_entry(entry_text: str, user_id: str):
    # Create AI instance for this user
    ai = JournalAI(user_id=user_id)
    
    # Get AI reflection
    reflection = ai.chat(f"Reflect on this journal entry: {entry_text}")
    
    # Load existing memory
    history = load_user_memory(user_id)
    
    # Create new record
    new_record = {
        "timestamp": datetime.now().isoformat(),
        "entry": entry_text,
        "reflection": reflection
    }
    
    history.append(new_record)
    save_user_memory(user_id, history)
    
    return {
        "reflection": reflection,
        "entries_stored": len(history)
    }

def get_weekly_insights(user_id: str):
    history = load_user_memory(user_id)
    if not history:
        return "No entries found for insights."
    
    recent_entries = [record["entry"] for record in history[-7:]]
    combined_text = "\n".join(recent_entries)
    
    # Create AI instance for this user
    ai = JournalAI(user_id=user_id)
    insight_prompt = f"Analyze these recent journal entries and provide weekly insights about patterns, emotions, and growth: {combined_text}"
    insights = ai.chat(insight_prompt)
    
    return insights