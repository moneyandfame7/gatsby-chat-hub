/* lib  */
import { GatsbyNode } from 'gatsby'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
  const { createPage } = actions

  createPage({
    path: '/c',
    component: path.resolve('src', 'pages', 'conversation.tsx')
  })
}
export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    createPage(page)
  }
  if (page.path === '/conversation/') {
    deletePage(page)
  }
}
