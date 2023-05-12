import { LeftColumnUiStore } from '@store/ui/left'
import React from 'react'

export interface LeftColumnUI {
  leftColumnUiStore: LeftColumnUiStore
}
interface SettingsProps extends LeftColumnUI {}
export const Settings: React.FC<SettingsProps> = ({ leftColumnUiStore }) => {
  return <>Settings</>
}
