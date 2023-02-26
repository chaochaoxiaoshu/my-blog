import * as React from 'react'
import { useContext } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Button from '../components/button'
import { ThemeContext } from '../components/layout'
import { heroSection, heroTitle, test, tast } from './index.module.scss'
import Hero from '../images/hero_1x.svg'
import HeroDark from '../images/hero_1x_dark.svg'
import { Link } from 'gatsby'

const IndexPage: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  console.log(themeContext)

  return (
    <Layout>
      <div className={heroSection}>
        <Hero className='hero' />
        <HeroDark className='hero-dark' />
        <div>
          <h1 className={heroTitle}>爱屏幕上发生的一切</h1>
          <Link to='/blog'>
            <Button>博客</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Home' />

export default IndexPage
