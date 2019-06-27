import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../Contexts/UserContext'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';

import Mnemonic from './Mnemonic';

import APIURL from '../../helpers/environment'



const MnemonicList = (props) => {
  const [mnemonic, setMnemonic] = useState([]);
  const [kanji, setKanji] = useState('');
  const user = useContext(UserContext)

  useEffect(() => fetchMnemonic(), []);

  const fetchMnemonic = () => {
    let url = `${APIURL}/home`

    fetch(url)
      .then((res) => res.json())
      .then(data => {
        setMnemonic(data)
      })
      .catch(err => console.log(err))
  }
  

  return (
    <div>
      {mnemonic.map((data, index) => 
        < Mnemonic token={props.token} {...data} key={index}/>
        
      )}
    </div>
  )
}

export default MnemonicList;