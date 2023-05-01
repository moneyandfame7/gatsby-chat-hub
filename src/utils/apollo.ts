import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { LocalKey, localStore } from '@services/localstore'

type KeyValue = {
  [key: string]: string | undefined
}
const authLink = () =>
  new ApolloLink((operation, forward) => {
    const token = localStore.get<string>(LocalKey.AccessToken)
    if (token) {
      operation.setContext((context: { headers: KeyValue }) => ({
        headers: {
          authorization: token,
          ...context.headers
        }
      }))
    }
    return typeof window !== undefined ? forward(operation) : null
  })

const httpLink = () =>
  createHttpLink({
    uri: process.env.GATSBY_API_URL
  })

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   console.log(graphQLErrors)
//   console.log(networkError)
// })

// const link = ApolloLink.from([authLink, errorLink, httpLink])

export const client = new ApolloClient({
  link: ApolloLink.from([authLink(), httpLink()]),
  cache: new InMemoryCache()
})
