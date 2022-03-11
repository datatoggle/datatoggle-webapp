import './App.css'
import "firebase/auth"
import {
  Route, useLocation
} from 'react-router-dom'
import NewWorkspacePage from './pages/NewWorkspacePage'
import WorkspaceListPage from './pages/WorkspaceListPage'
import WorkspacePage from './pages/workspace/WorkspacePage'
import AuthCheck from './components/AuthCheck'
import {HOME_URL, LOGIN_URL, NEW_WORKSPACE_URL, SIGNUP_URL, WORKSPACE_PATH} from './service/urls'
import {useEffect} from 'react'
import datatoggle from '@datatoggle/datatoggle-sdk'
import SignupPage from './pages/signuplogin/SignupPage'
import LoginPage from './pages/signuplogin/LoginPage'

function Routes() {

  const location = useLocation()

  useEffect(() => {
    datatoggle.page(location.pathname)
  },[location])

  return <>
        <Route exact path={NEW_WORKSPACE_URL}>
          <AuthCheck>
            <NewWorkspacePage />
          </AuthCheck>
        </Route>
        <Route path={WORKSPACE_PATH}>
          <AuthCheck>
            <WorkspacePage />
          </AuthCheck>
        </Route>
        <Route exact path={LOGIN_URL}>
          <AuthCheck preventRedirect={true}>
            <LoginPage />
          </AuthCheck>
        </Route>
      <Route exact path={SIGNUP_URL}>
        <AuthCheck preventRedirect={true}>
          <SignupPage />
        </AuthCheck>
      </Route>
        <Route exact path={HOME_URL}>
          <AuthCheck>
            <WorkspaceListPage />
          </AuthCheck>
        </Route>
  </>
}

export default Routes

// list of screens:
// * login, affiche le login, redirige vers liste de projets si loggé
// list of workspaces, affiche la liste de projets, redirige sur new workspace si zero
// new workspace
// workspace dashboard

