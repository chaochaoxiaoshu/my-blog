// React
import * as React from 'react'
// Components
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Hero from '../components/section-heading'
import Seo from '../components/seo'
// Types
import type { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
// Functions
import _ from 'lodash'
// Styles
import {
  page,
  content,
  wrapper,
  tagsGroup,
  tagItem,
  postItem,
  postDate,
  postTitle,
  postExcerpt,
  postImage,
  postImageLeft,
  aside,
  asideTitle,
  asideLink,
  asideLinkGroup,
  active,
} from './blog.module.scss'

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
        <div className={postItem}>
          {/* gatsby-plugin-image 默认的css样式声明于用户声明之后，无法覆盖，所以包裹一个div */}
          <div className={postImageLeft}>
            <GatsbyImage image={image} alt={imageAlt} />
          </div>
          <div>
            <small className={postDate}>{date}</small>
            <h2 className={postTitle}>{title}</h2>
            <div className={postImage}>
              <GatsbyImage image={image} alt={imageAlt} />
            </div>
            <p className={postExcerpt}>{excerpt}</p>
          </div>
        </div>
      </Link>
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
  path: string
  pageContext: {
    tags: string[]
    allTags: Array<{
      tag: string
      totalCount: number
    }>
  }
}

const BlogPage: React.FC<BlogPageProps> = (props) => {
  const { data, path, pageContext } = props

  const tagIsActive = (tag: string) => {
    return `/blog/tags/${_.kebabCase(tag)}/` === path
  }

  return (
    <Layout>
      <Hero title='博客' />
      <div className={page}>
        <div className={content}>
          <div className={tagsGroup}>
            <Link
              to='/blog'
              className={`${tagItem} ${path === '/blog/' && active}`}
            >
              全部
            </Link>
            {pageContext.allTags.map((item) => (
              <Link
                key={item.tag}
                to={`/blog/tags/${_.kebabCase(item.tag)}`}
                className={`${tagItem} ${tagIsActive(item.tag) && active}`}
              >
                {item.tag} ({item.totalCount})
              </Link>
            ))}
          </div>
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
        </div>
        <aside className={aside}>
          <div className={asideTitle}>分类</div>
          <div className={asideLinkGroup}>
            <Link
              to='/blog'
              className={`${asideLink} ${path === '/blog/' && active}`}
            >
              全部
            </Link>
            {pageContext.allTags.map((item) => (
              <Link
                key={item.tag}
                to={`/blog/tags/${_.kebabCase(item.tag)}`}
                className={`${asideLink} ${tagIsActive(item.tag) && active}`}
              >
                {item.tag} ({item.totalCount})
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($tags: [String]) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: $tags } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          slug
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData
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
