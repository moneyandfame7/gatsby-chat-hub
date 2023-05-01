import { AuthorizationStore } from './authorization'

export const store = Object.freeze({
  authorization: new AuthorizationStore()
})
export const authorizationStore = new AuthorizationStore()
