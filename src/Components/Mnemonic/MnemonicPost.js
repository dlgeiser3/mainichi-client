import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({

  card: {
    padding: "1em",
    width: "30vw",
    margin: "10em auto"
  },

  button: {
    marginTop: "2em",
    width: "10%",
    backgroundColor: "lightgray"
  },
  input: {
    marginTop: 10,
    width: "80%"
  }

}));


const MnemonicPost = (props) => {
  const [text, setText] = useState('');
  const [mnemonic, setMnemonic] = useState([]);

  const classes = useStyles();
  const fetchMnemonic = () => {
    let url = 'http://localhost:3000/home'

    fetch(url)
      .then((res) => res.json())
      .then(data => {
        console.log('data =>', data)
        setMnemonic(data)
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = 'http://localhost:3000/home'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ story: { text: text } }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log('DATA ==>', data)
        setText('')
        fetchMnemonic();
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <br />
      <br />
      <form onSubmit={handleSubmit} >
        <TextField
          className={classes.input}
          variant="outlined"
          label="Mnemonic"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)} />
        <br />
        <Button className={classes.button} type="submit">Submit</Button>
      </form>
      <br />
    </div>
  )
}

export default MnemonicPost;