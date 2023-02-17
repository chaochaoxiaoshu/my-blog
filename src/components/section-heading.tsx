import * as React from 'react'
import { hero, heroTitle } from './section-heading.module.scss'

interface HeroProps {
  title: string
}

const Hero: React.FC<HeroProps> = (props) => {
  const { title } = props
  return (
    <div className={hero}>
      <h1 className={heroTitle}>{title}</h1>
    </div>
  )
}

export default Hero
