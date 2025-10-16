@echo off
echo Cleaning previous installation...
pip uninstall -y pydantic langchain langchain-core langchain-google-genai fastapi uvicorn

echo Installing fresh dependencies...
pip install --no-cache-dir -r requirements.txt

echo Installation complete!
pause