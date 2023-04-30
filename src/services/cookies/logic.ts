import JsCookies, { CookieAttributes } from 'js-cookie'

export enum CookieKey {
  JwtAT = 'jwt-at',
  JwtRT = 'jwt-rt'
}
class Cookies {
  public get(key: string) {
    return JsCookies.get(key)
  }
}

export const cookies = new Cookies()
