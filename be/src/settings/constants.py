from pathlib import Path # convenient, cross-platform path handling.

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
PROMPTS_ROOT = PROJECT_ROOT / "src" / "prompts"