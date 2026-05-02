/*
/* Purpose: Render the garage map SVG and update spot colors. It loads the layout JSON and polls the mock data provider. */
const REFRESH_MS = 1000; // 1 second refresh

const availableEl = document.getElementById("availableCount");
const occupiedEl = document.getElementById("occupiedCount");
const lastUpdatedEl = document.getElementById("lastUpdated");

const bgEl = document.getElementById("mapBg");
const svgEl = document.getElementById("mapOverlay");

let spotEls = new Map();

function updateStats(spots, lastUpdatedIso) {
  const available = spots.filter(s => s.status === "available").length;
  const occupied = spots.length - available;

  availableEl.textContent = String(available);
  occupiedEl.textContent = String(occupied);

  const dt = lastUpdatedIso ? new Date(lastUpdatedIso) : null;
  lastUpdatedEl.textContent = dt ? dt.toLocaleTimeString() : "-";
}

function buildSvg(layout) {
  const w = layout.canvas.width;
  const h = layout.canvas.height;

  bgEl.src = window.GARAGE_BG_URL || "";
  svgEl.setAttribute("viewBox", `0 0 ${w} ${h}`);

  svgEl.innerHTML = "";
  spotEls = new Map();

  for (const s of layout.spots) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", String(s.x));
    rect.setAttribute("y", String(s.y));
    rect.setAttribute("width", String(s.w));
    rect.setAttribute("height", String(s.h));
    rect.setAttribute("rx", "3");
    rect.setAttribute("ry", "3");
    rect.setAttribute("data-id", s.id);
    rect.classList.add("map-spot", "available");

    const angle = Number(s.angle || 0);
    if (angle !== 0) {
      const cx = s.x + s.w / 2;
      const cy = s.y + s.h / 2;
      rect.setAttribute("transform", `rotate(${angle} ${cx} ${cy})`);
    }

    svgEl.appendChild(rect);
    spotEls.set(s.id, rect);
  }
}

async function getSpotState() {
  const res = await fetch("/spots/");
  if (!res.ok) throw new Error("Failed to fetch spots");
  return await res.json();
}


async function loadLayout() {
  const url = window.GARAGE_LAYOUT_URL;
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error("Failed to load layout");
  return res.json();
}

function applyStatuses(spots) {
  for (const s of spots) {
    const el = spotEls.get(s.id);
    if (!el) continue;
    el.classList.remove("available", "occupied", "unknown");
    const status = s.status || "unknown";
    el.classList.add(status);
  }
}

async function tick() {
    try {
    const data = await getSpotState();

    const spots = Object.entries(data).map(([id, status]) => ({
      id,
      status
    }));

    applyStatuses(spots);
    updateStats(spots, new Date().toISOString());

  } catch (e) {
    console.error(e);
    lastUpdatedEl.textContent = "Error";
  }
}

(async function main() {
  try {
    const layout = await loadLayout();
    buildSvg(layout);
    tick();
    setInterval(tick, REFRESH_MS);
  } catch (e) {
    lastUpdatedEl.textContent = "Layout error";
  }
})();

