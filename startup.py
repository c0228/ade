import subprocess
import threading
import sys
import os
import re

react_already_running = False  # global flag

def stream_output(process, prefix, on_error=None):
    """Stream logs from subprocess to current terminal."""
    global react_already_running

    for line in iter(process.stdout.readline, b''):
        decoded = line.decode(errors="ignore")

        # If React is already running, suppress all further logs
        if react_already_running and prefix == "REACT":
            continue

        sys.stdout.write(f"[{prefix}] {decoded}")

        # Detect port-in-use error (React only)
        if prefix == "REACT" and ("EADDRINUSE" in decoded or "address already in use" in decoded):
            if on_error and not react_already_running:
                on_error(process)
            continue

    process.stdout.close()


def run_process(cmd, cwd, prefix, on_error=None):
    p = subprocess.Popen(
        cmd,
        cwd=cwd,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    t = threading.Thread(target=stream_output, args=(p, prefix, on_error))
    t.daemon = True
    t.start()
    return p


# Handle React port error (skip + kill startup process)
def handle_port_in_use(process):
    global react_already_running
    react_already_running = True

    print("\n⚠️  React dev server is already running on this port.")
    print("👉 Skipping React startup… It’s ready to use.\n")

    try:
        process.terminate()
    except Exception:
        pass


# -------------------------------
# Correct paths for your project
# -------------------------------

# Root folder contains startup.py
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

BE_DIR = os.path.join(ROOT_DIR, "be")
FE_DIR = os.path.join(ROOT_DIR, "fe")

# Virtual Environment (inside be/)
if os.name == "nt":
    python_cmd = os.path.join(BE_DIR, "venv", "Scripts", "python.exe")
else:
    python_cmd = os.path.join(BE_DIR, "venv", "bin", "python")


# -------------------------------
# Start Flask (Python backend)
# -------------------------------
flask_proc = run_process(
    f"\"{python_cmd}\" app.py",
    cwd=BE_DIR,
    prefix="FLASK"
)

# -------------------------------
# Start React (Frontend)
# -------------------------------
react_proc = run_process(
    "npm start",
    cwd=FE_DIR,
    prefix="REACT",
    on_error=handle_port_in_use
)

print("Both apps starting… logs below 👇\n")


# Keep main thread alive
try:
    flask_proc.wait()

    if not react_already_running:
        react_proc.wait()

except KeyboardInterrupt:
    print("\nStopping servers…")
    flask_proc.terminate()

    if not react_already_running:
        react_proc.terminate()
