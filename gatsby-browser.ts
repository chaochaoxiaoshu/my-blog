import './src/styles/global.scss'
import './src/styles/markdown.scss'
import './src/styles/search-box.css'

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}
