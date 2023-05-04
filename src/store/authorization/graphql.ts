import { gql } from '@apollo/client'
import type { DocumentNode } from 'graphql'

import { AUTH_RESPONSE_FRAGMENT } from '@store/user/graphql'

/* Mutations */
export const LOGIN_MUTATION: DocumentNode = gql`
  mutation Login($loginInput: AuthInput!) {
    login(loginInput: $loginInput) {
      ...AllAuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`
export const REFRESH_MUTATION: DocumentNode = gql`
  mutation Refresh($refreshInput: AuthInput!) {
    refresh(refreshInput: $refreshInput) {
      ...AllAuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`
