import { graphql, useStaticQuery } from 'gatsby'

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
const useSiteMetadata = () => {
  const { site } = useStaticQuery<DataProps>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return site.siteMetadata
}

export default useSiteMetadata
