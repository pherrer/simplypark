import React, { useMemo } from 'react'

const GarageMap = ({ layout, spots, bgUrl }) => {
  const { width, height } = layout.canvas

  // Create a map of spot IDs to their status for quick lookup
  const spotStatusMap = useMemo(() => {
    const map = new Map()
    spots.forEach(spot => {
      map.set(spot.id, spot.status)
    })
    return map
  }, [spots])

  return (
    <section className="map-shell" ariaLabel="Garage map">
      <img 
        className="map-bg" 
        src={bgUrl} 
        alt="Garage layout" 
      />
      <svg 
        className="map-overlay" 
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {layout.spots.map(spot => {
          const status = spotStatusMap.get(spot.id) || 'available'
          const angle = Number(spot.angle || 0)
          
          // Calculate rotation center
          const cx = spot.x + spot.w / 2
          const cy = spot.y + spot.h / 2
          const transform = angle !== 0 ? `rotate(${angle} ${cx} ${cy})` : undefined

          return (
            <rect
              key={spot.id}
              x={spot.x}
              y={spot.y}
              width={spot.w}
              height={spot.h}
              rx="3"
              ry="3"
              className={`map-spot ${status}`}
              data-id={spot.id}
              transform={transform}
            />
          )
        })}
      </svg>
    </section>
  )
}

export default GarageMap
