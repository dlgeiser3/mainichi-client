import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';

import Container from '@material-ui/core/Container';


const Auth = (props) => {

  const [sessionToken, setSessionToken] = useState();

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }


  return (
    <Container>
      <Login storeToken={props.storeToken} updateToken={updateToken} />
      <Signup storeToken={props.storeToken} updateToken={updateToken} />
    </Container>
  )
}


export default Auth;