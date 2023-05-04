import React, { type FC, type PropsWithChildren, createContext, useContext } from 'react'
import { RootStore } from '../store/root'

const StoreContext = createContext<RootStore>({} as RootStore)

interface StoreProviderProps extends PropsWithChildren {
  store: RootStore
}
export const StoreProvider: FC<StoreProviderProps> = ({ store, children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStores = (): RootStore => useContext(StoreContext)
