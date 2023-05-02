import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  GraphQLRequest,
  InMemoryCache,
  Observable,
  createHttpLink
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { getOperationName } from '@apollo/client/utilities'
import { GraphQLError } from 'graphql'

import { refreshAccessMutation } from '@store/authorization'
import { authorizationStore } from '@store/root'
import jwtDecode from 'jwt-decode'
import { JwtPayload } from '@store/authorization/type'
import { errorLink, httpLink, linkTokenToHeaders } from './apollo/links'

type KeyValue = {
  [key: string]: string | undefined
}

const isRefreshOperation = (operation: GraphQLRequest) => {
  return operation.operationName === getOperationName(refreshAccessMutation)
}

const getTokenForHeaders = (operation: GraphQLRequest) => {
  const { access, refresh } = authorizationStore.getTokens()
  return isRefreshOperation(operation) ? refresh : access
}

let pendingAccessTokenPromise: any = null
