import { makeStyles } from '@material-ui/core/styles';
import React, {FunctionComponent} from 'react'
import logo from '../images/logo.png';

const useStyles = makeStyles({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 32+16+8,
    paddingTop: 16+8,
    alignItems: 'center'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 480,
    width: '100%'
  },
  logoBar: {
    width: '100%',
    paddingBottom: 32+8
  },
  logo: {
    width: 128+32,
  }
});

interface Props {
  children: React.ReactNode;
}

const LoginPage: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className={classes.logoBar}>
        <img className={classes.logo} src={logo} alt={'DataToggle'}/>
      </div>
      <div className={classes.column}>
        {props.children}
      </div>
    </div>
  );
}

export default LoginPage
