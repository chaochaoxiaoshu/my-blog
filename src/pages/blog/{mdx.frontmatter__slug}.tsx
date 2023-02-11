import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

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
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      {children}
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
      }
    }
  }
}

export const Head: React.FC<HeadProps> = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

export default BlogPost
