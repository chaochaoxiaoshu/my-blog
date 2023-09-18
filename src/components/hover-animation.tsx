import React from 'react'
import {
  hoverAnimationContainer,
  main,
  alt,
} from './hover-animation.module.scss'

interface HoverAnimationProps {
  children: React.ReactNode
}

const HoverAnimation: React.FC<HoverAnimationProps> = (props) => {
  const { children } = props
  return (
    <div className={hoverAnimationContainer}>
      <div className={main}>{children}</div>
      <div className={alt}>{children}</div>
    </div>
  )
}

export default HoverAnimation
