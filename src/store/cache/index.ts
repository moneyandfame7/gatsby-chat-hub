import ms from 'milliseconds'
import { Conversation, Participant } from '@utils/graphql/conversations'
import { uniqBy } from 'lodash'
import { LocalStorage } from './localstorage'

interface CacheStoreOptions {
  name: string
  expiresIn?: number
}
interface CacheStoreFields {
  recentUsers: Participant[]
  recentConversations: Conversation[]
}

interface UpdateCacheOptions<T> {
  forUpdate: Array<T>
  exist: Array<T>
  length: number
}

export class CacheStore {
  public recentUsers: Participant[] = []
  public recentConversations: Conversation[] = []

  private RECENT_USERS_LENGTH = 20
  private RECENT_CONVERSATIONS_LENGTH = 20
  private STORAGE_KEY = 'ch-state-cache'
  private readonly localStorageService: LocalStorage<CacheStoreFields>
  constructor() {
    this.localStorageService = new LocalStorage({
      name: this.STORAGE_KEY,
      expiresIn: ms.minutes(3),
      encrypt: false
    })

    this.init()
  }

  public updateRecentUsers = (users: Participant[]): void => {
    const cached = this.updateCache({ exist: this.recentUsers, forUpdate: users, length: this.RECENT_USERS_LENGTH })

    this.localStorageService.set({ recentUsers: cached })
    this.recentUsers = cached
  }
  public updateRecentConversations = (conversations: Conversation[]): void => {
    console.log({ conversations })
  }
  public clear() {
    this.localStorageService.clear()
    this.recentUsers = []
    this.recentConversations = []
  }

  private updateCache = <T>(options: UpdateCacheOptions<T>): Array<T> => {
    const { forUpdate, exist, length } = options

    const merged = [...forUpdate, ...exist] // з'єднуємо нові та старі значення
    const sliced = merged.slice(0, length) // обрізаємо до максимальної довжини

    const result = [...sliced]

    return uniqBy(result, 'id')
  }
  private init = () => {
    this.recentUsers = this.localStorageService.get()?.recentUsers || []
    this.recentConversations = this.localStorageService.get()?.recentConversations || []
  }
}

export const cache = new CacheStore()
