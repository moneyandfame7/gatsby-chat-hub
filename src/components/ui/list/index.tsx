import React from 'react'

import { Scrollable, ScrollableProps } from '@components/ui'
import { ListItem } from './item'

interface ListProps extends ScrollableProps {}
const _List: React.FC<ListProps> = ({ ...props }) => {
  return <Scrollable {...props} />
}

export const List = Object.assign(_List, {
  Item: ListItem
})
