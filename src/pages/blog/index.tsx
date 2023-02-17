import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import {
  page,
  wrapper,
  postMobile,
  postDesktop,
  postDate,
  postTitle,
  postExcerpt,
  postImage,
  aside,
  asideTitle,
  asideLink,
} from './index.module.scss'
import Hero from '../../components/section-heading'

interface PostItemProps {
  slug: string
  date: string
  title: string
  excerpt: string
  imageSrc: FileNode
  imageAlt: string
}

const PostItem: React.FC<PostItemProps> = (props) => {
  const { slug, date, title, excerpt, imageSrc, imageAlt } = props
  const image = getImage(imageSrc)!
  return (
    <article>
      <Link to={`/blog/${slug}`}>
        <div className={postMobile}>
          <small className={postDate}>{date}</small>
          <h2 className={postTitle}>{title}</h2>
          <GatsbyImage className={postImage} image={image} alt={imageAlt} />
          <p className={postExcerpt}>{excerpt}</p>
        </div>
      </Link>
      <div className={postDesktop}>
        <GatsbyImage className={postImage} image={image} alt={imageAlt} />
        <div>
          <small className={postDate}>{date}</small>
          <Link to={`/blog/${slug}`}>
            <h2 className={postTitle}>{title}</h2>
          </Link>
          <p className={postExcerpt}>{excerpt}</p>
        </div>
      </div>
    </article>
  )
}

interface BlogPageProps {
  data: {
    allMdx: {
      nodes: Array<{
        frontmatter: {
          date: string
          title: string
          slug: string
          hero_image: FileNode
          hero_image_alt: string
        }
        id: string
        excerpt: string
      }>
    }
  }
}

const BlogPage: React.FC<BlogPageProps> = (props) => {
  const { data } = props
  return (
    <Layout>
      <Hero title='博客' />
      <div className={page}>
        <div className={wrapper}>
          {data.allMdx.nodes.map((node) => (
            <PostItem
              key={node.id}
              slug={node.frontmatter.slug}
              date={node.frontmatter.date}
              title={node.frontmatter.title}
              excerpt={node.excerpt}
              imageSrc={node.frontmatter.hero_image}
              imageAlt={node.frontmatter.hero_image_alt}
            />
          ))}
        </div>
        <aside className={aside}>
          <div className={asideTitle}>分类</div>
          <span className={asideLink}>JavaScript</span>
          <span className={asideLink}>CSS</span>
          <span className={asideLink}>HTML</span>
          <span className={asideLink}>TypeScript</span>
          <span className={asideLink}>Node.js</span>
        </aside>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          slug
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        id
        excerpt(pruneLength: 60)
      }
    }
  }
`

export const Head = () => <Seo title='Blog' />

export default BlogPage
