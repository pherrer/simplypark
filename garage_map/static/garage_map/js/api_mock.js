/*
  Purpose: Generate mock spot status data for the frontend.
  It simulates random occupancy changes so the map feels alive before sensors are wired in.

  CONFIG SECTION
  You can control two things:

  1) BUSYNESS
     - very_free: mostly available
     - normal_busy: balanced (this is the most realistic default)
     - really_busy: mostly occupied

  2) SIMULATION SPEED
     - slow: changes happen less often
     - medium: changes happen at a realistic pace (this is the most realistic default)
     - fast: changes happen very often

  Defaults are set to NORMAL BUSY + MEDIUM SPEED because that usually looks the most real.
*/

// ------------------------------
// Config
// ------------------------------

const BUSYNESS_PRESETS = {
  // Lower occupied_start means more green at the beginning.
  // Lower flip_chance means the lot changes less dramatically.
  very_free: {
    occupied_start: 0.15,
    flip_chance: 0.45,
    flips_min: 1,
    flips_max: 3
  },

  // This one is the most realistic default.
  normal_busy: {
    occupied_start: 0.40,
    flip_chance: 0.60,
    flips_min: 2,
    flips_max: 6
  },

  // Higher occupied_start means more red at the beginning.
  really_busy: {
    occupied_start: 0.90,
    flip_chance: 0.90,
    flips_min: 6,
    flips_max: 10
  }
};

const SPEED_PRESETS = {
  // Slower updates means it feels calmer, but it can look "stuck" during demos.
  slow: {
    interval_ms: 1600
  },

  // This one is the most realistic default.
  medium: {
    interval_ms: 900
  },

  // Fast is fun for showing motion, but it can look too chaotic.
  fast: {
    interval_ms: 100
  }
};

// Default settings
// Change these if you want a different starting point, or use setMockConfig() in the console.
const CONFIG = {
  busyness: "normal_busy",
  speed: "medium"
};

function _getBusyness() {
  return BUSYNESS_PRESETS[CONFIG.busyness] || BUSYNESS_PRESETS.normal_busy;
}

function _getSpeed() {
  return SPEED_PRESETS[CONFIG.speed] || SPEED_PRESETS.medium;
}

// ------------------------------
// Mock store
// ------------------------------

// Simple in memory mock data store for parking spots, keyed by spot id.
const _mockSpots = new Map();

// This initializes the mocked spots with random availability.
// It is called by app.js after loading the layout, passing in the list of spot ids.
function initMockSpotIds(spotIds) {
  _mockSpots.clear();

  const busy = _getBusyness();

  for (const id of spotIds) {
    // occupied_start is the probability a spot starts as occupied.
    const startsOccupied = Math.random() < busy.occupied_start;

    _mockSpots.set(id, {
      id,
      status: startsOccupied ? "occupied" : "available",
      last_updated: new Date().toISOString()
    });
  }
}

// ------------------------------
// Simulation
// ------------------------------

// This simulates random changes in spot statuses.
function _randomFlipTick() {
  // If there are no spots, do nothing.
  if (_mockSpots.size === 0) return;

  const busy = _getBusyness();

  // Pick how many spots we try to touch this tick.
  // The busyness preset controls how chaotic the changes feel.
  const flipsRange = busy.flips_max - busy.flips_min + 1;
  const flips = busy.flips_min + Math.floor(Math.random() * flipsRange);

  const ids = Array.from(_mockSpots.keys());

  for (let i = 0; i < flips; i++) {
    const pick = ids[Math.floor(Math.random() * ids.length)];
    const cur = _mockSpots.get(pick);

    // Decide whether to actually flip this specific spot.
    // Higher flip_chance means more switching.
    const shouldFlip = Math.random() < busy.flip_chance;

    const nextStatus = shouldFlip
      ? (cur.status === "available" ? "occupied" : "available")
      : cur.status;

    // Only update timestamp if something changed, so it is not lying.
    if (nextStatus !== cur.status) {
      _mockSpots.set(pick, {
        ...cur,
        status: nextStatus,
        last_updated: new Date().toISOString()
      });
    }
  }
}

// We keep a reference to the timer so we can restart it if the config changes.
let _timerId = null;

function _startTimer() {
  if (_timerId !== null) clearInterval(_timerId);
  _timerId = setInterval(_randomFlipTick, _getSpeed().interval_ms);
}

// Start with defaults right away.
_startTimer();

// ------------------------------
// Public API used by app.js
// ------------------------------

// This simulates fetching the current state of all parking spots.
// It returns an object with the level_id, last_updated timestamp, and a list of spots with their id and status.
async function getSpotState() {
  const spots = Array.from(_mockSpots.values())
    .map(s => ({ id: s.id, status: s.status }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return {
    level_id: "L1",
    last_updated: new Date().toISOString(),
    spots
  };
}

// Optional helper: you can change the simulation without touching the file.
// Example in DevTools console:
//   window.setMockConfig({ busyness: 'really_busy', speed: 'fast' })
// If you pass invalid values, it falls back to the defaults.
function setMockConfig(next) {
  if (next && typeof next === "object") {
    if (typeof next.busyness === "string") CONFIG.busyness = next.busyness;
    if (typeof next.speed === "string") CONFIG.speed = next.speed;
  }

  // Restart timer with the new speed.
  _startTimer();
}

// Expose to window so app.js can call them.
window.initMockSpotIds = initMockSpotIds;
window.getSpotState = getSpotState;
window.setMockConfig = setMockConfig;