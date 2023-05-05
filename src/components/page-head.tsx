import * as React from 'react'
import { HeadFC, graphql, useStaticQuery } from 'gatsby'

interface PageHeadParams {
  title: string
  postfix?: boolean
}
type PageHeadFC = (params: PageHeadParams) => HeadFC
type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
export const pageHead: PageHeadFC = ({ title, postfix = true }) => {
  return props => {
    const pageTitle = postfix ? `${title} | ChatHub` : title
    return <title>{pageTitle}</title>
  }
}
