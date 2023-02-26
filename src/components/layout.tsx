import * as React from 'react'
import { createContext } from 'react'
// Components
import Header from './header'
import Footer from './footer'
// Hooks
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'
// Styles
import { container } from './layout.module.scss'
// Types
import type { CSSProperties } from 'react'

interface LayoutProps {
  children: React.ReactNode
  headerStyle?: CSSProperties
  footerStyle?: CSSProperties
  maxWidth?: string
  minHeight?: string
}

type ThemeContextType = {
  theme: string | null
  toggleTheme: (theme: string) => void
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: (string) => {},
})

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, maxWidth, minHeight, headerStyle, footerStyle } = props
  const [theme, toggleTheme] = useTheme()
  if (theme === null) return null
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header style={headerStyle} />
      <main
        className={container}
        style={{ maxWidth: maxWidth, minHeight: minHeight }}
      >
        {children}
      </main>
      <Footer style={footerStyle} />
    </ThemeContext.Provider>
  )
}

export default Layout
