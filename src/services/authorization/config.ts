import { FirebaseOptions, initializeApp } from 'firebase/app'
import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup, signOut } from 'firebase/auth'

import { User } from '@store/authorization/type'

export class FirebaseAuthorization {
  private readonly _apiKey = process.env.GATSBY_FIREBASE_API_KEY

  private readonly _authDomain = process.env.GATSBY_FIREBASE_AUTH_DOMAIN

  private readonly _databaseURL = process.env.GATSBY_FIREBASE_DATABASE_URL

  private readonly _projectId = process.env.GATSBY_FIREBASE_PROJECT_ID

  private readonly _storageBucket = process.env.GATSBY_FIREBASE_STORAGE_BUCKET

  private readonly _messagingSenderId = process.env.GATSBY_FIREBASE_MESSAGING_SENDER

  private readonly _appId = process.env.GATSBY_FIREBASE_APP_I

  private readonly _Provider = new GoogleAuthProvider()

  private get _options(): FirebaseOptions {
    return {
      apiKey: this._apiKey,
      authDomain: this._authDomain,
      databaseURL: this._databaseURL,
      projectId: this._projectId,
      storageBucket: this._storageBucket,
      messagingSenderId: this._messagingSenderId,
      appId: this._appId
    }
  }

  private get _app() {
    return initializeApp(this._options)
  }

  private get _authInstance() {
    return getAuth(this._app)
  }

  private _userFromResult(result: UserCredential): User {
    return {
      email: result.user.email!,
      username: `@${result.user.displayName?.trim().toLowerCase().replace(/ +/g, '')}`,
      displayName: result.user.displayName!,
      photo: result.user.photoURL!
    }
  }

  public async googleLogin() {
    try {
      const result = await signInWithPopup(this._authInstance, this._Provider)
      const user = this._userFromResult(result)

      /* idk, maybe don't need it */
      await signOut(this._authInstance)

      return user
    } catch (error) {
      console.log('[FirebaseAuth]', error)
      return null
    }
  }
}
