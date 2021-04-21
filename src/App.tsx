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
import ProjectPage from './pages/ProjectPage'
import firebase from 'firebase/app';
import AuthCheck from './components/AuthCheck'
import {HOME_URL, NEW_PROJECT_URL} from './service/urls'

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

function App() {
  return <>
    <CssBaseline/>
    <AuthCheck>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path={NEW_PROJECT_URL}>
            <NewProjectPage />
          </Route>
          <Route path={HOME_URL}>
            <ProjectListPage />
          </Route>
          <Route path="/project/:uri">
            <ProjectPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </AuthCheck>
  </>
}

export default App

// list of screens:
// * login, affiche le login, redirige vers liste de projets si loggé
// list of projects, affiche la liste de projets, redirige sur new project si zero
// new project
// project dashboard
