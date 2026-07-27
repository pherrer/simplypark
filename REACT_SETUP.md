# SimplyPark - React Setup

## Overview
This project now includes a **React frontend** integrated with Django (Option 1: React within Django).

## Project Structure

```
simplypark/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── GarageMapContainer.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── Legend.jsx
│   │   │   └── GarageMap.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useMockData.js
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css
│   └── index.html              # Dev HTML template
├── garage_map/
│   ├── templates/
│   │   └── garage_map/
│   │       ├── index.html      # Original vanilla JS version
│   │       └── index_react.html # React version
│   └── static/garage_map/
│       ├── react-dist/         # Built React assets (production)
│       ├── css/
│       └── js/
├── vite.config.js              # Vite configuration
└── package.json                # Node dependencies & scripts
```

## Development Workflow

### 1. Development Mode (Hot Reload)

**Start Django server:**
```bash
python manage.py runserver
```

**In a separate terminal, start Vite dev server:**
```bash
npm run dev
```

**Access the React version:**
- Visit: `http://localhost:8000/map/react/`
- Vite will proxy requests and provide hot module replacement

### 2. Production Build

**Build React for production:**
```bash
npm run build
```

This compiles React to optimized static files in `garage_map/static/garage_map/react-dist/`

**Run Django with built assets:**
```bash
python manage.py runserver
```
The template will automatically serve the built files when `DEBUG=False`

## Available Routes

- `/map/` - Original vanilla JavaScript version
- `/map/react/` - New React version

## Features Converted to React

✅ **Components:**
- `GarageMapContainer` - Main container with state management
- `TopBar` - Statistics and header
- `Legend` - Color legend for parking spots
- `GarageMap` - SVG rendering of parking spots

✅ **Functionality:**
- Dynamic spot status updates
- Polling for real-time data
- Integration with existing mock data API
- Responsive SVG rendering
- Stats calculation (available/occupied)

✅ **Architecture:**
- React Hooks for state management
- Custom hooks for mock data integration
- Component-based structure
- Integration with existing Django static assets

## Key Differences from Vanilla JS

### State Management
**Before (Vanilla JS):**
```javascript
let spotEls = new Map()
function updateStats(spots) { ... }
```

**After (React):**
```javascript
const [spots, setSpots] = useState([])
const stats = useMemo(() => { ... }, [spots])
```

### DOM Manipulation
**Before:**
```javascript
const rect = document.createElementNS(...)
rect.classList.add('available')
svgEl.appendChild(rect)
```

**After:**
```javascript
<rect className={`map-spot ${status}`} ... />
```

### Polling
**Before:**
```javascript
setInterval(tick, REFRESH_MS)
```

**After:**
```javascript
useEffect(() => {
  const intervalId = setInterval(update, REFRESH_MS)
  return () => clearInterval(intervalId)
}, [])
```

## Next Steps

You can now extend the React app with:

1. **User authentication integration**
2. **Real-time WebSocket updates** (replacing mock polling)
3. **Advanced UI features:**
   - Spot filtering
   - Search functionality
   - Click handlers for spot details
   - Booking interface
4. **State management** with Context API or Redux
5. **Routing** with React Router for multiple views
6. **Testing** with React Testing Library

## Why This Approach?

**React within Django (Option 1) gives you:**
- ✅ Keep existing Django infrastructure
- ✅ Easy authentication/sessions
- ✅ Simpler deployment
- ✅ Progressive migration path
- ✅ Can run both versions side-by-side

**Future considerations from your roadmap:**
- Add any features from your senior design document
- Scale to handle real sensor data
- Add user accounts and reservations
- Mobile app integration possibilities

## Scripts

```bash
# Development
npm run dev          # Start Vite dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Django
python manage.py runserver     # Start Django (port 8000)
```

## Notes

- The React version uses the same CSS from `styles.css`
- Mock data API (`api_mock.js`) is loaded before React bundle
- Django template variables are passed via window globals
- Development uses Vite dev server, production uses built assets
