import { OperationVariables, useLazyQuery } from '@apollo/client'
import { DocumentNode } from 'graphql'
import { throttle } from 'lodash'

export const useDebounceQuery = <Data, Input extends OperationVariables>(query: DocumentNode) => {
	const [lazyGet, { data, loading }] = useLazyQuery<Data, Input>(query)

	return {
		get: throttle(lazyGet, 500, { leading: false }),
		data,
		loading,
	}
}
