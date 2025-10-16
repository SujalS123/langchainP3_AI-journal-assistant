from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import journal, memory, auth
import uvicorn

app = FastAPI(title="AI Journal Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(journal.router, prefix="/api")
app.include_router(memory.router, prefix="/api/memory")

@app.get("/")
def root():
    return {"message": "AI Journal Assistant API"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)