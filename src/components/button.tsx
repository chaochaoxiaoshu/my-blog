import * as React from 'react'
import { customButton } from './button.module.scss'
import HoverAnimation from './hover-animation'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props
  return (
    <button onClick={onClick} className={customButton}>
      <HoverAnimation>{children}</HoverAnimation>
    </button>
  )
}

export default Button
