import { useState, useEffect } from 'react'

/**
 * Custom hook for managing mock parking data
 * This integrates with the existing api_mock.js if present
 */
export const useMockData = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if mock functions are available
    if (typeof window.initMockSpotIds === 'function') {
      setIsInitialized(true)
    }
  }, [])

  return {
    isInitialized,
    initMockSpotIds: window.initMockSpotIds,
    getSpotState: window.getSpotState,
    getMockRefreshInterval: window.getMockRefreshInterval,
  }
}
