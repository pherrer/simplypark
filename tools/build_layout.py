# Purpose: Provide a repo-root wrapper for the garage_map layout builder. It adjusts the path and invokes the real script.
import sys
from pathlib import Path

# Add garage_map/tools to path to import the main script
sys.path.insert(0, str(Path(__file__).parent.parent / "garage_map" / "tools"))

from build_layout import main

if __name__ == "__main__":
    main()
