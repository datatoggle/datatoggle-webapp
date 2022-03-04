import './App.css'
import "firebase/auth"
import {createTheme, CssBaseline} from '@mui/material'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom'
import firebase from 'firebase/app';
import datatoggle from '@datatoggle/datatoggle-sdk'
import {Options} from '@datatoggle/datatoggle-sdk/'
import Routes from './routes'
import {primaryColor, secondaryColor} from './DesignConstants'

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

/*
following https://bareynol.github.io/mui-theme-creator/
and
https://material.io/inline-tools/color/
with complementary color
 */
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

function App() {
  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
          <Switch>
            <Routes/>
          </Switch>
      </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
}

export default App
