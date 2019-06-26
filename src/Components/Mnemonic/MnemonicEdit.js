import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const MnemonicEdit = (props) => {

  const [editText, setEditText] = useState();
  const [mnemonic, setMnemonic] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [mnemonicToUpdate, setMnemonicToUpdate] = useState({});


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
        console.log(data)
      })
  };

  const editUpdateMnemonic = (mnemonic) => {
    setMnemonicToUpdate(mnemonic);
    console.log(mnemonic);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  useEffect(() => {
    fetchMnemonic();
  }, [])


  const mnemonicUpdate = (event, mnemonic) => {
    event.preventDefault();
    fetch(`http://localhost:3000/home/${mnemonicToUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({ story: { text: editText } }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    }).then((res) => {
      fetchMnemonic();
      updateOff();
    })
  }

  return (
    <h1>Hello</h1>
  )

}

export default MnemonicEdit;