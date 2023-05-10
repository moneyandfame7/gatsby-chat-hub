/* lib  */
import { makePersistable } from 'mobx-persist-store'
import ms from 'milliseconds'

/* services  */
import type { Participant } from '@utils/graphql/conversations'
import type { Conversation } from '@utils/graphql/conversations'
import { hasWindow } from '@utils/functions'
import ls from 'localstorage-slim'

interface LocalStorageConfiguration {
  /* key in localStorage */
  name: string

  /* in ms */
  expiresIn?: number
}

interface LocalStorageFieldsConfig {
  __expiresIn?: number
}
type LocalStorageType<T> = T & LocalStorageFieldsConfig
export class LocalStorage<Storage> {
  constructor(private readonly configuration: LocalStorageConfiguration) {
    this.init()
  }
  public get<T>() {
    try {
      return ls.get<Storage>(this.configuration.name)
    } catch (e) {
      console.warn(e)
    }
  }

  public set<T>(value: T) {
    try {
      this.get<Storage>(this.configuration.name)
      const existObj = this.get<LocalStorageType<Storage>>()
      const newObj = JSON.stringify({
        ...existObj,
        ...value
      })
      localStorage.setItem(this.configuration.name, newObj)
    } catch (e) {
      console.warn(e)
    }
  }

  public clear() {
    localStorage.removeItem(this.configuration.name)
  }

  private init() {
    try {
      const exist = this.get<LocalStorageType<Storage>>()
      if (!exist) {
        const newObj = {} as LocalStorageType<Storage>
        const now = Date.now()

        if (this.configuration.expiresIn) {
          newObj.__expiresIn = this.configuration.expiresIn + now
        }

        localStorage.setItem(this.configuration.name, JSON.stringify(newObj))
      } else {
        if (exist.__expiresIn) {
          const now = Date.now()
          if (exist.__expiresIn < now) {
            this.clear()
          }
        }
      }
    } catch (e) {
      console.warn(e)
    }
  }
}

interface RecommendationsState {
  recentUsers: Participant[]
  recentConversations: Conversation[]
}
export class Recommendations {
  private readonly STORAGE_KEY = 'ch-recommendations'
  private readonly COUNT_RECENT_USERS = 20
  private readonly COUNT_RECENT_CONVERSATIONS = 20
  private readonly localStorageService: LocalStorage<RecommendationsState>

  public recentUsers: Participant[] = []
  public recentConversations: Conversation[] = []

  constructor() {
    this.localStorageService = new LocalStorage({
      name: this.STORAGE_KEY,
      expiresIn: ms.minutes(2)
    })
  }

  public updateRecentUsers(values: Participant[]) {
    this.recentUsers = this.updateRecommendations(this.recentUsers, values, this.COUNT_RECENT_USERS)
  }

  public updateRecentConversations(values: Conversation[]) {
    this.recentConversations = this.updateRecommendations(
      this.recentConversations,
      values,
      this.COUNT_RECENT_CONVERSATIONS
    )
  }

  public reset() {
    this.recentUsers = []
    this.recentConversations = []
  }

  public resetRecentUsers() {
    this.recentUsers = []
  }

  public recetRecentConversations() {
    this.recentConversations = []
  }

  private updateRecommendations<T>(current: T[], updateValues: T[], length: number) {
    try {
      current.splice(0, 0, ...updateValues.reverse())

      if (current.length > length) {
        current.splice(length, updateValues.length - length)
      }

      return current
    } catch (e) {
      console.warn(e)
      return []
    }
  }
}

export const recommendations = new Recommendations()
