import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import APIURL from '../../helpers/environment'

const useStyles = makeStyles(() => ({

  hide: {
    height: '120px',
    overflow: 'scroll',
    marginTop: '-.9em'
  },

  show: {
    display: 'block'
  },

  character: {
    fontSize: '4em',
    marginTop: '.5em',
    marginBottom: '0em'
  },

}));



const Kanji = (props) => {
  const classes = useStyles();

  const [kanji, setKanji] = useState(
    {
      kanji:
      {
        meaning: {},
        onyomi: {},
        kunyomi: {},
        strokes: {},
      },
      examples: [
      ]
    }
  );

  useEffect(() => fetchKanji(), []);

  const fetchKanji = () => {
    Date.prototype.getDOY = function () {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((this - onejan) / 86400000);
    }
    var today = new Date();
    let daynum = today.getDOY();



    let url = `${APIURL}/kanji/${daynum}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setKanji(data);
        props.setKanji(data)
      })
      .catch(err => console.log(err));

  }
  console.log(kanji)
  return (
    <div>
      <h1 className={classes.character}>{kanji.kanji.character}</h1>
      <h3>Meaning: {kanji.kanji.meaning.english}</h3>
      <h3>Onyomi: {kanji.kanji.onyomi.katakana} ({kanji.kanji.onyomi.romaji})</h3>
      <h3>Kunyomi: {kanji.kanji.kunyomi.hiragana} ({kanji.kanji.kunyomi.romaji})</h3>
      <h3>Strokes: {kanji.kanji.strokes.count}</h3>
      <h3>Examples:</h3>
        <div className={classes.hide}><h3>{kanji.examples.map((example, index) =>
          <div key={index}>{example.japanese} - {example.meaning.english}</div>)}</h3>
        </div>
    </div>
  )
};


export default Kanji;