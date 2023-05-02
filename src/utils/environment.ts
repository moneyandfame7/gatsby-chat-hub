export const environment = {
  GOOGLE_ID: process.env.GATSBY_GOOGLE_ID
}
export class Environment {
  public static get googleId() {
    return process.env.GATSBY_GOOGLE_ID as string
  }

  public static apiUrl() {
    return process.env.GATSBY_API_URL as string
  }

  public static get nodeEnv() {
    return process.env.NODE_ENV as string
  }
}
