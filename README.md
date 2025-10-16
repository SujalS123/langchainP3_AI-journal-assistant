# AI Journal Assistant

A personal journal assistant that remembers your conversations using LangChain memory.

## Setup

**Requirements:** Python 3.11+

1. **Install dependencies:**
   ```bash
   cd backend
   # Clean install (recommended)
   install.bat
   # OR manual install
   pip install -r requirements.txt
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Add your GOOGLE_API_KEY to .env
   ```

3. **Run the server:**
   ```bash
   cd backend
   python -m app.main
   ```

## API Endpoints

- `POST /api/chat` - Chat with AI assistant
- `GET /api/summary` - Get weekly summary
- `GET /api/health` - Health check

## Usage

```bash
# Chat with AI
curl -X POST "http://localhost:8000/api/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "I had a productive day today!"}'

# Get weekly summary
curl "http://localhost:8000/api/summary"
```