/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {client} from 'utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

async function getUser() {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  const [user, setUser] = React.useState(null)

  const login = formData => auth.login(formData).then(u => setUser(u))
  const register = formData => auth.register(formData).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  React.useEffect(() => {
    getUser().then(u => {
      setUser(u)
    })
  }, [])

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
