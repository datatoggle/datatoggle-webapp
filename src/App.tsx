import './App.css'
import "firebase/auth"
import {CssBaseline} from '@material-ui/core'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import NewProjectPage from './pages/NewProjectPage'
import ProjectListPage from './pages/ProjectListPage'
import ProjectPage from './pages/projectpage/ProjectPage'
import firebase from 'firebase/app';
import AuthCheck from './components/AuthCheck'
import {HOME_URL, LOGIN_URL, NEW_PROJECT_URL} from './service/urls'
import LoginPage from './pages/LoginPage'
import datatoggle from '@datatoggle/datatoggle-sdk'

const firebaseConfig = {
  apiKey: "AIzaSyD33FHNwomuZ43VUBgtOW4dJ3ePUIRAcps",
  authDomain: "datatoggle-b83b6.firebaseapp.com",
  projectId: "datatoggle-b83b6",
  storageBucket: "datatoggle-b83b6.appspot.com",
  messagingSenderId: "771767793475",
  appId: "1:771767793475:web:2300917ead156fc80921f6",
  measurementId: "G-EHS9SKZVVH"
}

firebase.initializeApp(firebaseConfig)
datatoggle.init("d7fd4558-fbf6-4cc4-a002-61a45a2a8a69")

function App() {
  return <>
    <CssBaseline/>
    <BrowserRouter>
      <div>
        <Switch>
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
        </Switch>
      </div>
    </BrowserRouter>
  </>
}

export default App

// list of screens:
// * login, affiche le login, redirige vers liste de projets si loggé
// list of projects, affiche la liste de projets, redirige sur new project si zero
// new project
// project dashboard
