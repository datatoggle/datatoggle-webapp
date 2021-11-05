import './App.css'
import "firebase/auth"
import {
  Route, useLocation
} from 'react-router-dom'
import NewProjectPage from './pages/NewProjectPage'
import ProjectListPage from './pages/ProjectListPage'
import ProjectPage from './pages/projectpage/ProjectPage'
import AuthCheck from './components/AuthCheck'
import {HOME_URL, LOGIN_URL, NEW_PROJECT_URL} from './service/urls'
import LoginPage from './pages/LoginPage'
import {useEffect} from 'react'
import datatoggle from '@datatoggle/datatoggle-sdk'

function Routes() {

  const location = useLocation()

  useEffect(() => {
    datatoggle.page(location.pathname)
  },[location])

  return <>
        <Route exact path={NEW_PROJECT_URL}>
          <AuthCheck>
            <NewProjectPage />
          </AuthCheck>
        </Route>
        <Route exact path="/project/:uri">
          <AuthCheck>
            <ProjectPage />
          </AuthCheck>
        </Route>
        <Route exact path={LOGIN_URL}>
          <LoginPage />
        </Route>
        <Route exact path={HOME_URL}>
          <AuthCheck>
            <ProjectListPage />
          </AuthCheck>
        </Route>
  </>
}

export default Routes

// list of screens:
// * login, affiche le login, redirige vers liste de projets si loggé
// list of projects, affiche la liste de projets, redirige sur new project si zero
// new project
// project dashboard

