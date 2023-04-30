import { FirebaseOptions } from 'firebase/app'

export class FirebaseConfig implements FirebaseOptions {
  public readonly apiKey = process.env.GATSBY_FIREBASE_API_KEY

  public readonly authDomain = process.env.GATSBY_FIREBASE_AUTH_DOMAIN

  public readonly databaseURL = process.env.GATSBY_FIREBASE_DATABASE_URL

  public readonly projectId = process.env.GATSBY_FIREBASE_PROJECT_ID

  public readonly storageBucket = process.env.GATSBY_FIREBASE_STORAGE_BUCKET

  public readonly messagingSenderId = process.env.GATSBY_FIREBASE_MESSAGING_SENDER

  public readonly appId = process.env.GATSBY_FIREBASE_APP_I
}
