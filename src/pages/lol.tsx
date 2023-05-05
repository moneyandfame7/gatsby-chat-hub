import { graphql } from 'gatsby'
import React, { FC } from 'react'

const LolPage: FC = () => {
  return <>Lol</>
}
export default LolPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
