import React, { useState, useEffect, useCallback } from 'react'
import TopBar from './TopBar'
import Legend from './Legend'
import GarageMap from './GarageMap'
import { useMockData } from '../hooks/useMockData'

const REFRESH_MS = typeof window.getMockRefreshInterval === "function" 
  ? window.getMockRefreshInterval() 
  : 900

const GarageMapContainer = ({ layoutUrl, bgUrl }) => {
  const [layout, setLayout] = useState(null)
  const [spots, setSpots] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)
  const [error, setError] = useState(null)

  // Load the garage layout JSON
  useEffect(() => {
    const loadLayout = async () => {
      try {
        const response = await fetch(layoutUrl)
        if (!response.ok) throw new Error('Failed to load layout')
        const data = await response.json()
        setLayout(data)
        
        // Initialize mock data with spot IDs
        if (typeof window.initMockSpotIds === 'function') {
          window.initMockSpotIds(data.spots.map(s => s.id))
        }
      } catch (err) {
        setError('Layout error')
        console.error('Error loading layout:', err)
      }
    }

    loadLayout()
  }, [layoutUrl])

  // Poll for spot status updates
  useEffect(() => {
    if (!layout) return

    const updateSpotStates = async () => {
      try {
        if (typeof window.getSpotState !== 'function') return
        
        const data = await window.getSpotState()
        setSpots(data.spots)
        setLastUpdated(data.last_updated)
      } catch (err) {
        setError('Error updating spots')
        console.error('Error fetching spot state:', err)
      }
    }

    // Initial update
    updateSpotStates()

    // Poll at interval
    const intervalId = setInterval(updateSpotStates, REFRESH_MS)

    return () => clearInterval(intervalId)
  }, [layout])

  // Calculate stats from spots
  const stats = React.useMemo(() => {
    const available = spots.filter(s => s.status === 'available').length
    const occupied = spots.length - available
    return { available, occupied }
  }, [spots])

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!layout) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <TopBar 
        available={stats.available}
        occupied={stats.occupied}
        lastUpdated={lastUpdated}
      />
      <main className="wrap">
        <Legend />
        <GarageMap 
          layout={layout}
          spots={spots}
          bgUrl={bgUrl}
        />
      </main>
    </>
  )
}

export default GarageMapContainer
