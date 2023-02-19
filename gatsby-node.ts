import path from 'path'
import _ from 'lodash'
import type { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions
  const blogTemplate = path.resolve('src/templates/blog.tsx')

  const result = await graphql(`
    query {
      allMdx {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  type TagData = {
    allMdx: {
      group: Array<{
        tag: string
        totalCount: number
      }>
    }
  }

  const data = result.data as TagData
  const tags = data.allMdx.group

  createPage({
    path: '/blog/',
    component: blogTemplate,
    context: {
      tags: tags.map((item) => item.tag),
      allTags: tags,
    },
  })

  for (const tagItem of tags) {
    createPage({
      path: `/blog/tags/${_.kebabCase(tagItem.tag)}/`,
      component: blogTemplate,
      context: {
        tags: [tagItem.tag],
        allTags: tags,
      },
    })
  }
}
