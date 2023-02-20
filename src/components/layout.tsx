import * as React from 'react'
// Components
import Header from './header'
import Footer from './footer'
// Hooks
import { useTheme } from '@skagami/gatsby-plugin-dark-mode'
// Styles
import { container } from './layout.module.scss'
// Types
import { CSSProperties } from 'react'

interface LayoutProps {
  children: React.ReactNode
  headerStyle?: CSSProperties
  footerStyle?: CSSProperties
  maxWidth?: string
  minHeight?: string
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, maxWidth, minHeight, headerStyle, footerStyle } = props
  const [theme, toggleTheme] = useTheme()
  if (theme === null) return null
  return (
    <>
      <Header style={headerStyle} useTheme={[theme, toggleTheme]} />
      <main
        className={container}
        style={{ maxWidth: maxWidth, minHeight: minHeight }}
      >
        {children}
      </main>
      <Footer style={footerStyle} />
    </>
  )
}

export default Layout
