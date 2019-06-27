import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import APIURL from '../../helpers/environment'

const useStyles = makeStyles(() => ({

  button: {
    marginTop: "2em",
    width: "60%",
    backgroundColor: 'lightgray'
  },

  input: {
    marginTop: 10,
    width: "50%"
  }

}));

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/user/create`, {
      method: 'POST',
      body: JSON.stringify({ user: { username: username, email: email, password: password } }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      (response) => response.json()
    ).then((data) => {
      props.updateToken(data.sessionToken)
      window.alert("You're signed up!")
    })
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        
        <label htmlFor="email">Email</label>
        <br />
        <input className={classes.input} onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
        <br />

        <label htmlFor="username">Username</label>
        <br />
        <input className={classes.input} onChange={(e) => setUsername(e.target.value)} name="username" value={username} />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input className={classes.input} onChange={(e) => setPassword(e.target.value)} name="password" value={password} />
        <br />

        <Button type="submit" className={classes.button}>Signup</Button>
      </form>
    </div>
  )
}

export default Signup;