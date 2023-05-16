import { throttle } from 'lodash'
import { makeAutoObservable } from 'mobx'

type SearchName = 'contacts' | 'global'
type SearchOptions = {
  type: SearchName
  query: string
}

// const throttledSearch <T extends (...args: any[])>(func:T)=>{}

const throttledSearch = <T extends (...args: any[]) => void>(func: T) => {
  return throttle(func, 500, { leading: false })
}

export class SearchStore {
  private queryGlobalResult: any

  public isLoading: boolean = false
  public searchQuery: string = ''
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public searchByQueryGlobal = throttledSearch((query: string) => {
    console.log('[GLOBAL QUERY]:', query)
    this.setLoading(true)
    /**
     * @TODO debounce
     */
    this.searchQuery = query
    setTimeout(() => {
      this.setLoading(false)
    }, 500)
  })

  public searchByContacts = throttledSearch((query: string) => {
    console.log('[CONTACTS QUERY]: ', query)
  })
  public getContacts = (contact: string) => {
    /* by default, return from cache */
    /* contacts or No contacts matched your search. */
  }

  public getQueryGlobalResult = () => {
    /* messages, chats, contacts */
  }

  private setLoading = (status: boolean): void => {
    this.isLoading = status
  }

  public executeSearchQuery = ({ type, query }: SearchOptions) => {
    switch (type) {
      case 'contacts':
        this.searchByContacts(query)
        break
      case 'global':
        this.searchByQueryGlobal(query)
        break
    }
  }
}
