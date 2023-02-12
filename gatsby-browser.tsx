import './src/styles/global.scss'

export const onClientEntry = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && mediaQuery.matches)
  ) {
    document.documentElement.setAttribute('data-theme', 'dark')
  }

  // Listening system theme changes
  mediaQuery.addEventListener('change', () => {
    if (mediaQuery.matches) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  })
}
