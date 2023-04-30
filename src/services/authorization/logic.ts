import { FirebaseApp, initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

import { User } from '@store/authorization'

import { FirebaseConfig } from './config'

interface Logger {
  user?: User
  error?: unknown
}

class Authorization {
  private readonly provider: GoogleAuthProvider = new GoogleAuthProvider()

  constructor(private readonly firebaseApp: FirebaseApp) {}

  public async googleLogin(): Promise<User | null> {
    try {
      const result = await signInWithPopup(this.firebaseAuthInstance, this.provider)

      const user: User = {
        email: result.user.email!,
        username: `@${result.user.displayName?.trim().toLowerCase().replace(/ +/g, '')}`,
        displayName: result.user.displayName!,
        photo: result.user.photoURL!
      }
      this.log({ user })
      await signOut(this.firebaseAuthInstance)

      return user
    } catch (error) {
      this.log({ error })

      return null
    }
  }

  public get currentUser() {
    return this.firebaseAuthInstance.currentUser
  }

  private get firebaseAuthInstance() {
    return getAuth(this.firebaseApp)
  }

  private log({ user, error }: Logger) {
    !error
      ? console.group('%c The user is logged in: ', 'color: green; font-size: 18px')
      : console.group('%c Error during authorization: ', 'color: red; font-size: 18px')
    console.log(user || error)
    console.groupEnd()
  }
}

const firebaseConfig = new FirebaseConfig()

const firebaseApplication = initializeApp(firebaseConfig)

export const firebaseAuthorization = new Authorization(firebaseApplication)
