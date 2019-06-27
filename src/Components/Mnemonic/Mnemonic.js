import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../Contexts/UserContext'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import APIURL from '../../helpers/environment';


const useStyles = makeStyles(theme => ({

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
    justifyContent: 'center',
    marginTop: 10,
    width: "80%",
    textAlign: 'center'
  },

  button: {
    backgroundColor: 'lightgray',
    marginTop: '0em',
    marginLeft: '.5em',
    marginRight: '.5em',
    marginBottom: '.5em',
    padding: .5,
    fontSize: '.8em'
  },

  character: {
    padding: '0em',
    margin: '.5em',
    textAlign: 'center'

  },

  text: {
    margin: '.5em'
  },

  user: {
    margin: '1em'
  },

  editing: {
    width: '70vw'
  }

}));


const MnemonicEdit = (props) => {
  const [mnemonic, setMnemonic] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(props.text);
  const user = useContext(UserContext)

  const classes = useStyles();

  const fetchMnemonic = () => {
    fetch('http://localhost:3000/home', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    }).then((res) => res.json())
      .then((data) => {
        setMnemonic(data);
      })
  };

  const mnemonicUpdate = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/home/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify({ story: { text: newValue } }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    }).then((res) => {
      fetchMnemonic();
      setNewValue('')
    })
  };

  const mnemonicDelete = (event) => {
    event.preventDefault();
    fetch(`${APIURL}/home/${props.id}`, {
      method: 'DELETE',
      body: JSON.stringify({story: {story: props.id} }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    }).then((res) => {
      fetchMnemonic()
    })
  };

  return (
    <Paper className={classes.paper}>
      <h2 className={classes.character}>{props.kanji}</h2>

      {isEditing && <em><TextField
        className={classes.editing}
        defaultValue="Naked input"
        value={newValue} type='text'
        onChange={(e) => setNewValue(e.target.value)}
      >{newValue || props.text}</TextField></em>}

      {!isEditing && <h4 className={classes.text}>{newValue || props.text}</h4>}
      <h5 className={classes.user}><em>Posted by: {props.ownerName}</em></h5>

      {isEditing && <Button className={classes.button} onClick={(e) => {
        mnemonicUpdate(e)
        setIsEditing(false)
      }}>
        Save</Button>

      }

      {isEditing && <Button className={classes.button} onClick={(e) => {
        mnemonicDelete(e)
      }}>Delete</Button>
      }

      {!isEditing && props.owner === user.id && <Button className={classes.button} onClick={() => {
        setIsEditing(true)
      }}>Edit</Button>}


    </Paper>
  )

}

export default MnemonicEdit;




//Previous within paper tags
{/* <h2>{props.kanji}</h2>{props.text}
      <br />
      <h5><em>Posted by: {props.ownerName}</em></h5> */}