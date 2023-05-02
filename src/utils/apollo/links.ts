import { ApolloLink, createHttpLink, Observable, FetchResult } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { authorizationStore } from '@store/root'
import { getAccessToken } from './helpers'
import { Logger } from '@utils/logger'

// const authLink = () =>
//   new ApolloLink((operation, forward) => {
//     console.log('[OperationName]:', operation.operationName)

//     const token = getTokenForHeaders(operation)

//     operation.setContext((context: { headers: KeyValue }) => ({
//       headers: {
//         authorization: token ? `Bearer ${token}` : '',
//         ...context.headers
//       }
//     }))
//     return typeof window !== undefined ? forward(operation) : null
//   })

export const httpLink = () =>
  createHttpLink({
    uri: process.env.GATSBY_API_URL
  })

export const errorLink = () =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // switch (err.extensions.code) {
        //   case 'UNAUTHENTICATED':
        //     if (isRefreshOperation(operation)) {
        //       return
        //     }
        //     const observable = new Observable<FetchResult<Record<string, any>>>(observer => {
        //       ;(async () => {
        //         try {
        //           const access = await authorizationStore.refreshAccessToken()
        //           if (!access) {
        //             console.log('AccessToken not provided')
        //             // throw new GraphQLError('AccessToken not provided')
        //           } else {
        //             // Retry the failed request
        //             const subscriber = {
        //               next: observer.next.bind(observer),
        //               error: observer.error.bind(observer),
        //               complete: observer.complete.bind(observer)
        //             }

        //             const test = forward(operation).subscribe(subscriber)
        //             console.log(test)
        //           }
        //         } catch (err) {
        //           observer.error(err)
        //         }
        //       })()
        //     })

        //     return observable
        // }

        Logger.error({ title: err.message })
      }
    }
    if (networkError) {
      Logger.error({
        title: `[Network Error]:`,
        value: networkError
      })
    }
  })

export const linkTokenToHeaders = () =>
  setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken()
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : ''
      }
    }
  })
