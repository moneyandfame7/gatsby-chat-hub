import React, { FC, useEffect, useState } from 'react'
import { pageHead } from '@components'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { app } from '@utils'
import logoPng from '@images/logo.png'

const LoginPage: FC = () => {
  // useEffect(() => {
  //   const unsubscribe = getAuth(app).onAuthStateChanged(user => {
  //     console.log(user, 'asdfasdfasdf')
  //   })
  //   return unsubscribe
  // }, [])
  useEffect(() => {
    /* getAuth(app).app */
  }, [])
  const handleButtonClick = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(getAuth(app), provider)
      const user = {
        email: result.user.email,
        username: `@${result.user.displayName?.trim().toLowerCase().replace(/ +/g, '')}`,
        displayName: result.user.displayName,
        photo: result.user.photoURL
      }
      /** @TODO: мутація login - подивитись які види авторизації можна зробити
       * не тільки ж jwt?
       *** *** *** ***
       * винести логіку, підключити redux + додати перевірку на юзера в store
       * check auth token + check Graphql Marius Auth, він там req.user робить
       * отже, можна буде робити query? на перевірку, чи авторизований
       * */
      console.log(user)
    } catch (e) {
      console.error(e)
    }
  }

  const checkInfo = () => {
    const info = getAuth(app).currentUser
    console.log(info)
  }
  const logout = async () => {
    try {
      await getAuth(app).signOut()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <main className="flex w-full h-full flex-col items-center justify-center">
      <div className="w-96 flex flex-col items-center justify-center flex-auto gap-2">
        <img src={logoPng} className="h-12 w-12" />
        <h1 className="text-4xl">Welcome to ChatHub</h1>
        <p className="font-medium text-gray-300">Login to your account with Google OAuth</p>
        {/* <Button onClick={handleButtonClick} icon={<FcGoogle fontSize={30} />}>
          Login
        </Button>
        <Button onClick={checkInfo}>Check info</Button>
        <Button onClick={logout}>Logout</Button> */}
      </div>
      <a href="mailto:davidoo1234e@gmail.com" className="py-3 underline text-gray-300">
        Email
      </a>
    </main>
  )
}

export default LoginPage

export const Head = pageHead({ title: 'Login' })
