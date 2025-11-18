import json
import datetime
import time
import os
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

from src.settings.constants import PROJECT_ROOT, PROMPTS_ROOT

def load_prompt(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def extract_json(text: str):
    if not text:
        return None

    cleaned = text.strip()

    # Remove markdown fences like ```json or ``` anything
    cleaned = cleaned.replace("```json", "").replace("```", "").strip()

    # Extract only the JSON part (everything between the first { and last })
    if "{" in cleaned and "}" in cleaned:
        cleaned = cleaned[cleaned.find("{") : cleaned.rfind("}") + 1]

    return cleaned

# -----------------------------------------------------------
# 1. Load environment variables
# -----------------------------------------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL")

if not API_KEY or not MODEL_NAME:
    raise ValueError("❌ Missing GEMINI_API_KEY or GEMINI_MODEL in .env file")

# -----------------------------------------------------------
# 2. Configure Gemini API
# -----------------------------------------------------------
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(MODEL_NAME)

# -----------------------------------------------------------
# 3. Daily Auto-Research Meta Prompt
# -----------------------------------------------------------
PROMPT_FILE = PROMPTS_ROOT / "research-and-innovate.txt"
DAILY_META_PROMPT = load_prompt(PROMPT_FILE)

# -----------------------------------------------------------
# 4. Run the prompt
# -----------------------------------------------------------
def run_daily_research():
    print("🔍 Running Gemini Daily Auto-Research...")

    response = model.generate_content(DAILY_META_PROMPT)
    raw = response.text
    json_str = extract_json(raw)

    try:
        data = json.loads(json_str)
    except Exception as e:
        print("❌ JSON Parsing Error:", e)
        print("Raw Response:")
        print(response.text)
        return

    # -----------------------------------------------------------
    # 5. Save JSON file
    # -----------------------------------------------------------
    timestamp = int(time.time() * 1000)
    filename = f"data/research/daily_research_{timestamp}.json"
    file_path = Path(filename)

    # Create the folder automatically
    file_path.parent.mkdir(parents=True, exist_ok=True)

    # Write the file
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"✅ Saved: {filename}")


# -----------------------------------------------------------
# 6. Entry Point
# -----------------------------------------------------------
if __name__ == "__main__":
    run_daily_research()
