import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import APIURL from '../../helpers/environment'

const useStyles = makeStyles(() => ({

  card: {
    padding: "1em",
    width: "30vw",
    margin: "10em auto"
  },

  button: {
    marginTop: "1em",
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
  const [kanji, setKanji] = useState('');
  const [mnemonic, setMnemonic] = useState([]);

  const classes = useStyles();
  
  const fetchMnemonic = () => {
    let url = `${APIURL}/home`

    fetch(url)
      .then((res) => res.json())
      .then(data => {
        console.log('data =>', data)
        setMnemonic(data)
      })
      .catch(err => console.log(err))
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    {!props.token && window.alert('Please login to post')}
    let url = `${APIURL}/home`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ story: { text: text, kanji: props.kanji.kanji.character } }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log('DATA ==>', data)
        setText('')
        setKanji('abc')
        setKanji(props.kanji.kanji.character)
        fetchMnemonic();
      })
      .catch(err => console.log(err))
  }



  return (
    <div>
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