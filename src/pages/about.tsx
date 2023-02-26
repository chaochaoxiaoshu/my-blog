import * as React from 'react'
// Components
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* <div className='markdown' style={{ padding: '0 1.25rem' }}>
        <h2>为什么会有这个网站？</h2>
        <p>
          功利地讲，一直以来所做的努力全都是为了证明自己合格。所以，作为一个前端er，怎能不拥有一个属于自己的网站呢？
        </p>
        <p>
          用来告诉好朋友们：埋头苦干的日子里我在钻研些什么，总归不是在浪费时间；
          <br />
          告诉即将遇到的面试官：为什么我如此相信自己与众不同；
          <br />
          然后才是分享技术，毕竟，它只像是我的笔记本。
        </p>
        <p>
          但如果你要我敞开感性的一面，那么我飘飘然地想说：
          <br />
          在表达的能力枯死之前，让我们在世界上凿刻下我们来过的记号；
          <br />
          讲废话和走神才是生命的气口，说不定这正是我们真正与世界联结的时刻。
        </p>
      </div> */}
    </Layout>
  )
}

export const Head = () => <Seo title='About Me' />

export default AboutPage
