import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'
import {
  page,
  article,
  insideArticle,
  title,
  date,
  heroImage,
  aside,
  asideTitle,
  asideLink,
} from './post.module.scss'

interface TableOfContentsItem {
  url: string
  title: string
  items?: TableOfContentsItem[]
}

interface BlogPostPorps {
  data: {
    mdx: {
      tableOfContents: {
        items?: TableOfContentsItem[]
      }
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
  const tableOfContent = data.mdx.tableOfContents.items

  return (
    <Layout>
      <div className={page}>
        <article className={article}>
          <div className={insideArticle}>
            <small className={date}>{data.mdx.frontmatter.date}</small>
            <h1 className={title}>{data.mdx.frontmatter.title}</h1>
            <GatsbyImage
              className={heroImage}
              image={image}
              alt={data.mdx.frontmatter.hero_image_alt}
            />
            <div className={`markdown`}>{children}</div>
          </div>
        </article>
        {tableOfContent && (
          <aside className={aside}>
            <div className={asideTitle}>本篇目录</div>
            {tableOfContent?.map((item) => (
              <>
                <a className={asideLink} href={item.url}>
                  {item.title}
                </a>
                {item.items?.map((subItem) => (
                  <a
                    style={{ paddingLeft: '0.8rem' }}
                    className={asideLink}
                    href={subItem.url}
                  >
                    {subItem.title}
                  </a>
                ))}
              </>
            ))}
          </aside>
        )}
      </div>
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
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
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
