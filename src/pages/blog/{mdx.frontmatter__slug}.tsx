import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import { title, date, heroImage, article } from './post.module.scss'

interface BlogPostPorps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        hero_image: FileNode
        hero_image_alt: string
        hero_image_credit_link: string
        hero_image_credit_text: string
      }
    }
  }
  children: React.ReactNode
}

const BlogPost: React.FC<BlogPostPorps> = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)!
  return (
    <Layout>
      <small className={date}>{data.mdx.frontmatter.date}</small>
      <h1 className={title}>{data.mdx.frontmatter.title}</h1>
      <GatsbyImage
        className={heroImage}
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <article className={`markdown ${article}`}>{children}</article>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

interface HeadProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        hero_image: FileNode
        hero_image_alt: string
        hero_image_credit_link: string
        hero_image_credit_text: string
      }
    }
  }
}

export const Head: React.FC<HeadProps> = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

export default BlogPost
