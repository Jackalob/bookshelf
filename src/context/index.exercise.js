// 🐨 you don't need to do anything for the exercise, but there's an extra credit!
import * as React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from 'context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else if (failureCount < 2) return true
    else return false
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

function AppProviders({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
