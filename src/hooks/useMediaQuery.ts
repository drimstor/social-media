import React, { useEffect } from 'react'

const useMediaQuery = (queryInput: string) => {
  const [targetReached, setTargetReached] = React.useState(false)

  const updateTarget = React.useCallback((e: any) => {
    if (e.matches) setTargetReached(true)
    else setTargetReached(false)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(queryInput)
      media.addEventListener('change', updateTarget)

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) setTargetReached(true)

      return () => media.removeEventListener('change', updateTarget)
    }
  }, [])

  return targetReached
}

export default useMediaQuery
