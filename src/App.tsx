import './App.css'
import "firebase/auth"
import {CssBaseline} from '@material-ui/core'
import {
  BrowserRouter,
  Switch
} from 'react-router-dom'
import firebase from 'firebase/app';
import datatoggle from '@datatoggle/datatoggle-sdk'
import {Options} from '@datatoggle/datatoggle-sdk/'
import Routes from './routes'

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
datatoggle.init(process.env.REACT_APP_DATATOGGLE_API_KEY as string, new Options(true))

function App() {
  return <>
    <CssBaseline/>
    <BrowserRouter>
        <Switch>
          <Routes/>
        </Switch>
    </BrowserRouter>
  </>
}

export default App
