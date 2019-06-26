import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';

import Container from '@material-ui/core/Container';


const Auth = (props) => {

  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }


  return (
    <Container>
          <Login storeToken={props.storeToken} updateToken={updateToken} /> 
          <Signup storeToken={props.storeToken} updateToken={updateToken} />               
    </Container>
  )
}


export default Auth;