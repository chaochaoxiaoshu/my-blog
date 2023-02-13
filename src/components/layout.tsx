import * as React from 'react'
import Header from './header'
import Footer from './footer'
import { container } from './layout.module.scss'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: string
}

const Layout: React.FC<LayoutProps> = ({ children, maxWidth }) => {
  const [theme, toggleTheme] = useTheme()
  if (theme === null) return null
  return (
    <>
      <Header useTheme={[theme, toggleTheme]} />
      <main className={container} style={{ maxWidth: maxWidth }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
