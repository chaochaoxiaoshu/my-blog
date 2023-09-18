import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Button from '../components/button'
import {
  heroSection,
  heroTitle,
  heroDescription,
  heroImage,
} from './index.module.scss'
import Hero from '../images/hero_1x.svg'
import HeroDark from '../images/hero_1x_dark.svg'
import { navigate } from 'gatsby'

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div className={heroSection}>
        <Hero className={`${heroImage} hero`} />
        <HeroDark className={`${heroImage} hero-dark`} />
        <div>
          <h1 className={heroTitle}>realglow.cn</h1>
          <p className={heroDescription}>分享博文、展示作品的个人网页</p>
          <Button onClick={() => navigate('/blog')}>博客</Button>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Home' />

export default IndexPage
