import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { heroTitle } from './index.module.scss'

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div style={{ padding: '0 1.25rem' }}>
        <h1 className={heroTitle}>爱屏幕上发生的一切</h1>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title='Home' />

export default IndexPage
