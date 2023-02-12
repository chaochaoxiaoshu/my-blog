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
  asideSubtitle,
} from './index.module.scss'
import Hero from '../../components/hero'

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
    <>
      <Link to={`/blog/${slug}`}>
        <article className={postMobile}>
          <small className={postDate}>{date}</small>
          <h2 className={postTitle}>{title}</h2>
          <GatsbyImage className={postImage} image={image} alt={imageAlt} />
          <p className={postExcerpt}>{excerpt}</p>
        </article>
      </Link>
      <article className={postDesktop}>
        <GatsbyImage className={postImage} image={image} alt={imageAlt} />
        <div>
          <small className={postDate}>{date}</small>
          <Link to={`/blog/${slug}`}>
            <h2 className={postTitle}>{title}</h2>
          </Link>
          <p className={postExcerpt}>{excerpt}</p>
        </div>
      </article>
    </>
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
          <small className={asideSubtitle}>类别</small>
          <span>JavaScript</span>
          <span>CSS</span>
          <span>HTML</span>
          <span>TypeScript</span>
          <span>Node.js</span>
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
          date(formatString: "MMMM D YYYY")
          title
          slug
          hero_image_alt
          hero_image_credit_link
          hero_image_credit_text
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
        excerpt
      }
    }
  }
`

export const Head = () => <Seo title='Blog' />

export default BlogPage
