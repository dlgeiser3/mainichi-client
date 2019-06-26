import React, { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({

  hide: {
    height: '120px',
    overflow: 'scroll'
  },

  show: {
    display: 'block'
  }

}));



const Kanji = () => {
  const classes = useStyles();

  const collapseToggle = () => {
    this.classes.toggle("expand");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

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



    let url = `http://localhost:3000/kanji/${daynum}`

    fetch(url)
      .then(res => res.json())
      .then(data => setKanji(data))
      .catch(err => console.log(err));

  }
  console.log(kanji)
  return (
    <div>
      <h1>{kanji.kanji.character}</h1>
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