# Purpose: Convert a parking spot JSON layout into a CSV file
import json
import csv
from pathlib import Path

# Update this path - use parent directory to go up from tools_Delete-Later
JSON_PATH = Path(__file__).parent.parent / "static/garage_map/assets/garage_layout.json"

def json_to_csv(json_path):
    """Convert JSON garage layout to CSV format"""
    
    json_path = Path(json_path)
    
    if not json_path.exists():
        raise FileNotFoundError(f"JSON file not found: {json_path}")
    
    # Read JSON file
    with json_path.open("r", encoding="utf8") as f:
        data = json.load(f)
    
    spots = data.get("spots", [])
    
    if not spots:
        raise ValueError("No spots found in JSON file")
    
    # Create output filename with "(Converted)"
    stem = json_path.stem
    output_filename = f"{stem} (Converted).csv"
    output_path = json_path.parent / output_filename
    
    # Write to CSV
    with output_path.open("w", newline="", encoding="utf8") as f:
        fieldnames = ["id", "x", "y", "w", "h", "angle"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        
        writer.writeheader()
        for spot in spots:
            writer.writerow({
                "id": spot.get("id", ""),
                "x": spot.get("x", ""),
                "y": spot.get("y", ""),
                "w": spot.get("w", ""),
                "h": spot.get("h", ""),
                "angle": spot.get("angle", 0)
            })
    
    print(f"Wrote {output_path} with {len(spots)} spots")

if __name__ == "__main__":
    json_to_csv(JSON_PATH)