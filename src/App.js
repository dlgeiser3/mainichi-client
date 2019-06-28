import React, { useState, useEffect } from 'react';
import './App.css';
import jws from 'jws';

import { UserProvider } from './Contexts/UserContext';
import Navbar from './Components/Navbar/Navbar';
import Kanji from './Components/Kanji/Kanji';
import MnemonicPost from './Components/Mnemonic/MnemonicPost';
import MnemonicList from './Components/Mnemonic/MnemonicsList';




function App() {
  const [token, setToken] = useState('');
  const [kanji, setKanji] = useState('');
  const [user, setUser] = useState({})

  const storeToken = (token) => {
    setToken(token);
    try {
      const { payload } = jws.decode(token);

      setUser({
        ...payload,
        token
      });
    } catch (err) { }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      storeToken(token)
    }
  }, [])

  return (
    <UserProvider value={user}>
      <div className="App">
        <Navbar storeToken={storeToken} />
        <Kanji setKanji={setKanji} />
        <MnemonicPost token={token} kanji={kanji} />
        <MnemonicList token={token}/>
      </div>
    </UserProvider>
  );
}

export default App;
