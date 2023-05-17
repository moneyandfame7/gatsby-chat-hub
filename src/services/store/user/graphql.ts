import { gql } from '@apollo/client'
import type { DocumentNode } from 'graphql'

/* Fragments */
export const USER_FRAGMENT: DocumentNode = gql`
  fragment AllUserFields on User {
    id
    email
    username
    photo
    createdAt
  }
`
export const AUTH_RESPONSE_FRAGMENT: DocumentNode = gql`
  fragment AllAuthResponseFields on AuthResponse {
    accessToken
    refreshToken
    user {
      ...AllUserFields
    }
  }
  ${USER_FRAGMENT}
`

/* Mutations */
export const CREATE_USERNAME_MUTATION: DocumentNode = gql`
  mutation CreateUsername($username: String!) {
    createUsername(username: $username) {
      ...AllAuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`

/* Queries */
export const SEARCH_USERS: DocumentNode = gql`
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      id
      username
      photo
    }
  }
`
