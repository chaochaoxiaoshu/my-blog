import * as React from 'react'
import type { CSSProperties } from 'react'
import { footer } from './footer.module.scss'

interface FooterProps {
  style?: CSSProperties
}

const Footer: React.FC<FooterProps> = (props) => {
  const date = new Date()
  return (
    <footer style={props.style} className={footer}>
      Copyright &copy; {date.getFullYear()} Zhang Xin.
      <br /> All rights reserved.
    </footer>
  )
}

export default Footer
