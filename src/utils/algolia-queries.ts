import { createContentDigest } from 'gatsby-core-utils'

const indexName = `Pages`

const pageQuery = `{
  pages: allMdx {
    edges {
      node {
        id
        frontmatter {
          title
          slug
          tags
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

interface QueryResult {
  node: {
    id: string
    frontmatter: {
      title: string
      slug: string
      tags: string[]
    }
    excerpt: string
  }
}

function pageToAlgoliaRecord({ node }: QueryResult) {
  const newNode = {
    ...node,
    internal: {
      contentDigest: createContentDigest(node),
    },
  }
  const { id, frontmatter, excerpt, internal } = newNode
  return {
    objectID: id,
    ...frontmatter,
    excerpt,
    internal,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }: { data: any }) =>
      data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

export default queries
