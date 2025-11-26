Guidance for future AI assistants working on this repo:

- The contact form API writes to two JSON files: `server/data/messages.json` and an external, cross-deployment path `../message.json` relative to the repo root (sibling to `thermatechWebsite`; on Windows this is typically `C:\Users\...\Desktop\message.json` if the repo is at `C:\Users\...\Desktop\thermatechWebsite`).
- Do not replace or truncate the external file. All writes must append new entries so historical submissions survive redeploys.
- If a messages file is missing, the backend initializes it to `[]` and then appends; ensure the path is writable.
- If a messages file exists but is not a valid JSON array, the backend will reset it to `[]` and then append.
- If you change storage paths or formats, update operations scripts (e.g., `sync_msg.ps1`) and ensure the process has write permission to the target directory.
