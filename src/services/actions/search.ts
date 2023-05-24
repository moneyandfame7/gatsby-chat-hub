import { useMemo } from 'react'

import { SearchStore } from '@services/store/search'

export const useSelectSearchUsers = (store: SearchStore) => {
	return useMemo(() => store.selectResult((state) => state.users), [store.state.users])
}

export const useSelectSearchGlobal = (store: SearchStore) => {
	return useMemo(() => store.selectResult((state) => state.global), [store.state.global])
}
