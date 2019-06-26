import React, { useState, useEvent, useEffect } from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({

  card: {
    padding: "1em",
    width: "30vw",
    margin: "10em auto"
  },

  paper: {
    margin: "2em auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    width: "80%"
  },

}));

const MnemonicGet = () => {
  const [mnemonic, setMnemonic] = useState([]);

  useEffect(() => fetchMnemonic(), []);

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

  return (
    <div>
        <div>{mnemonic.map((data, index) => 
            <Paper className={classes.paper} key={index}><br /><em>Posted by: {data.owner} </em><br />{data.text}<br /><br /></Paper>)}
      </div>
    </div>
  )
}

export default MnemonicGet;