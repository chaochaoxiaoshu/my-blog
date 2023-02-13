import * as React from 'react'
import { footer } from './footer.module.scss'

const Footer: React.FC = () => {
  const date = new Date()
  return (
    <footer className={footer}>
      Copyright &copy; {date.getFullYear()} RealGlow. All rights reserved.
    </footer>
  )
}

export default Footer
