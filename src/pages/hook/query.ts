import { OperationVariables, useQuery } from '@apollo/client'
import { client } from '@utils/apollo/clients'
import { DocumentNode } from 'graphql'

export const useCustomQuery = <TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  variables?: TVariables
) => {
  const { data, loading, error } = useQuery<TData, TVariables>(query, {
    variables,
    client
  })

  return { data, loading, error }
}
