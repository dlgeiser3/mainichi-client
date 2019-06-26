import React, { useState } from 'react';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Kanji from './Components/Kanji/Kanji';
import MnemonicPost from './Components/Mnemonic/MnemonicPost';
import MnemonicGet from './Components/Mnemonic/MnemonicGet';
import MnemonicEdit from './Components/Mnemonic/MnemonicEdit';


function App() {
  const [token, setToken] = useState('');

  const storeToken = (token) => { setToken(token) }

  return (
    <div className="App">
      <Navbar storeToken={storeToken}/>
      <Kanji />
      <MnemonicPost token={token}/>
      <MnemonicGet />
      <MnemonicEdit token={token}/>
    </div>
  );
}

export default App;
