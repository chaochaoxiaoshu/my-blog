import * as React from 'react'
import Header from './header'
import { container } from './layout.module.scss'
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, toggleTheme] = useTheme()
  if (theme === null) return null
  return (
    <div>
      <Header useTheme={[theme, toggleTheme]} />
      <main className={container}>{children}</main>
    </div>
  )
}

export default Layout
