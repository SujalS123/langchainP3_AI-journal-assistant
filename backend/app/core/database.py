import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ai_journal")

client = MongoClient(MONGODB_URL)
database = client[DATABASE_NAME]

# Collections
users_collection = database.users
entries_collection = database.journal_entries
memories_collection = database.ai_memories