import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as auth from 'auth-provider'
import {buildUser} from 'test/generate'
import * as usersDB from 'test/data/users'
import {AppProviders} from 'context'

async function render(ui, {route = '/list', user, ...renderOptions} = {}) {
  user = typeof user === 'undefined' ? await loginAsUser() : user
  window.history.pushState({}, 'TEST PAGE', route)

  const returnValue = {
    ...rtlRender(ui, {wrapper: AppProviders, ...renderOptions}),
    user,
  }

  await waitForLoadingToFinish()

  return returnValue
}

async function loginAsUser(userProperties) {
  const user = buildUser(userProperties)
  await usersDB.create(user)
  const authUser = await usersDB.authenticate(user)
  window.localStorage.setItem(auth.localStorageKey, authUser.token)
  return authUser
}

function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ])
}

export * from '@testing-library/react'
export {render, userEvent, loginAsUser, waitForLoadingToFinish}
