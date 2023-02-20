import * as React from 'react'
// Components
import Layout from '../components/layout'
import Seo from '../components/seo'
// Styles
import { StaticImage } from 'gatsby-plugin-image'

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <p>I</p>
    </Layout>
  )
}

export const Head = () => <Seo title='About Me' />

export default AboutPage
