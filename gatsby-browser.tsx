import * as React from 'react'
import { Provider } from 'react-redux'
import { GatsbyBrowser } from 'gatsby'
import { store } from './src/store'

export const wrapRootElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}
