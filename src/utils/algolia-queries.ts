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
  const { id, frontmatter, excerpt } = node
  return {
    objectID: id,
    ...frontmatter,
    excerpt,
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
