import { gql } from '@apollo/client'
import type { DocumentNode } from 'graphql'

/* Fragments */
export const USER_FRAGMENT: DocumentNode = gql`
  fragment AllUserFields on User {
    id
    email
    displayName
    username
    photo
    createdAt
  }
`
/* @TODO показати це, переніс цей фрагмент сюди, бо коли він в authorization, то пише cannot use before initialization */
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
  mutation CreateUsername($createUsernameInput: CreateUsernameInput!) {
    createUsername(createUsernameInput: $createUsernameInput) {
      ...AllAuthResponseFields
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`
