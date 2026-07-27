import React from 'react'
import GarageMapContainer from './components/GarageMapContainer'
import './App.css'

function App() {
  // Get URLs from Django template (injected as window globals)
  const layoutUrl = window.GARAGE_LAYOUT_URL || '/static/garage_map/assets/garage_layout.json'
  const bgUrl = window.GARAGE_BG_URL || '/static/garage_map/assets/floor1.png'

  return (
    <div className="app">
      <GarageMapContainer 
        layoutUrl={layoutUrl}
        bgUrl={bgUrl}
      />
    </div>
  )
}

export default App
