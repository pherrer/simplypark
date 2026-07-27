import React, { useMemo } from 'react'

const TopBar = ({ available, occupied, lastUpdated }) => {
  const formattedTime = useMemo(() => {
    if (!lastUpdated) return '-'
    try {
      const date = new Date(lastUpdated)
      return date.toLocaleTimeString()
    } catch {
      return '-'
    }
  }, [lastUpdated])

  return (
    <header className="topbar">
      <div>
        <h1>SimplyPark</h1>
        <div className="subtitle">Garage map prototype (not real-time)</div>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="label">Available</div>
          <div className="value">{available}</div>
        </div>
        <div className="stat">
          <div className="label">Occupied</div>
          <div className="value">{occupied}</div>
        </div>
        <div className="stat">
          <div className="label">Last updated</div>
          <div className="value small">{formattedTime}</div>
        </div>
      </div>
    </header>
  )
}

export default TopBar
