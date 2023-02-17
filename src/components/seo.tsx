import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

type SeoProps = {
  title: string
}

const Seo: React.FC<SeoProps> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <link rel='icon' type='svg' href='/logo.svg'></link>
    </>
  )
}

export default Seo
