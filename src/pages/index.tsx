import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <p>
        I'm making 中文字体测试 this by following 中文字体测试 the Gatsby
        Tutorial.中文字体测试
      </p>
    </Layout>
  )
}

export const Head = () => <Seo title='Home Page' />

export default IndexPage
