# Purpose: Convert the parking spot CSV into a JSON layout used by the frontend. It writes the output into static assets.
import csv
import json
from pathlib import Path

# update these paths for your repo
CSV_PATH = Path(__file__).parent / "Parking Spots Data - Sheet1.csv"
OUT_PATH = Path("garage_map/static/garage_map/assets/garage_layout.json")

CANVAS_W = 1024
CANVAS_H = 1536
LEVEL_ID = "L1"

def main():
    spots = []

    with CSV_PATH.open(newline="", encoding="utf8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # your sheet has a trailing space on "id "
            raw_id = row.get("id") or row.get("id ") or row.get("ID") or row.get("ID ")
            if raw_id is None:
                raise ValueError("Could not find id column. Expected id or id ")

            num = int(float(raw_id))
            sid = f"P{num:03d}"

            spots.append({
                "id": sid,
                "x": float(row["x"]),
                "y": float(row["y"]),
                "w": float(row["w"]),
                "h": float(row["h"]),
                "angle": float(row.get("angle", 0) or 0)
            })

    layout = {
        "level_id": LEVEL_ID,
        "canvas": {"width": CANVAS_W, "height": CANVAS_H},
        "background": "garage_map/assets/floor1.png",
        "spots": spots
    }

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUT_PATH.write_text(json.dumps(layout, indent=2), encoding="utf8")
    print(f"Wrote {OUT_PATH} with {len(spots)} spots")

if __name__ == "__main__":
    main()