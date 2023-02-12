import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import { container } from './layout.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={container}>{children}</main>
    </div>
  )
}

export default Layout
