import { gql } from '@apollo/client'
import { client } from '@utils/apollo/clients'
import { flow, makeAutoObservable, makeObservable, observable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

type FetchStatus = 'idle' | 'pending' | 'error' | 'success'
const userQuery = gql`
  query {
    users {
      id
      displayName
      username
      email
    }
  }
`
export interface UsersResponse {
  users: any[]
}
export class CounterStore {
  public value: number = 0
  public state: FetchStatus = 'idle'
  public token: string = ''

  constructor() {
    /* autoBind --> щоб не губилось this */
    makeAutoObservable(this, {}, { autoBind: true })

    makePersistable(this, {
      name: 'counter',
      properties: ['value']
    })
  }

  public increment() {
    console.log('asdlflasdlflasdlf')
    this.value++
  }

  public decrement() {
    this.value--
  }

  public setStatus(status: FetchStatus) {
    this.state = status
  }

  async fetchUsers(): Promise<UsersResponse | undefined> {
    try {
      this.setStatus('pending')
      const { data } = await client.query<UsersResponse>({
        query: userQuery
      })
      console.log('query')
      this.setStatus('success')
      return data
    } catch (e) {
      this.setStatus('error')
    }
  }

  async googleLogin(): Promise<void | undefined> {
    try {
      window.open('http://localhost:8001/auth/google/login')
    } catch (e) {
      console.log(e)
    }
  }
}
