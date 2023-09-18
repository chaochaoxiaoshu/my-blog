import { useEffect, useState } from 'react'

export default function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollTop(window.scrollY)
    })
  }, [])
  return scrollTop
}
