/* lib  */
import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

/* services  */
import { hasWindow } from '@utils/functions'
import type { NullableField } from '@types'
import type { User, IUserStore } from './type'

export class UserStore implements IUserStore {
  public user: NullableField<User> = null

  public readonly STORAGE_KEY: string = 'userStore'
  constructor() {
    /**
     * autoBind - щоб не губилось this і працювали традиційні функції
     */
    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: this.STORAGE_KEY,
      properties: ['user'],
      storage: hasWindow() ? window.localStorage : undefined
    })
  }
  public setUser(user: NullableField<User>): void {
    this.user = user
  }
}
