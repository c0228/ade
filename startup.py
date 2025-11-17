import subprocess
import sys
import os

def run_background(cmd, cwd=None):
    if os.name == "nt":
        # Windows: run with no console
        subprocess.Popen(
            cmd,
            cwd=cwd,
            creationflags=subprocess.CREATE_NO_WINDOW,
            shell=True
        )
    else:
        # macOS + Linux
        subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            stdin=subprocess.DEVNULL,
            shell=True
        )

# Start Flask backend
run_background("venv/Scripts/python app.py" if os.name == "nt" else "venv/bin/python app.py", cwd="be")

# Start React frontend
run_background("npm start", cwd="fe")

print("Flask + React apps started silently in the background.")
