export const environment = {
  GOOGLE_ID: process.env.GATSBY_GOOGLE_ID
}
export class Environment {
  public static get googleId() {
    return process.env.GATSBY_GOOGLE_ID as string
  }
}
