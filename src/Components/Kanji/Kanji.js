import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import APIURL from '../../helpers/environment'

const useStyles = makeStyles(() => ({

  open: {
    marginTop: '-1.5em',
    display: 'block',

  },

  dropdown: {
    cursor: 'pointer',
  },

  arrow: {
    verticalAlign: 'middle',
  },

  character: {
    fontSize: '4em',
    marginTop: '.5em',
    marginBottom: '0em'
  },

}));



const Kanji = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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

  function handleClick() {
    setOpen(!open);
  }

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
      <h3 className={classes.dropdown} button onClick={handleClick}>Examples{open ? <ExpandLess className={classes.arrow} /> : <ExpandMore className={classes.arrow} />}</h3>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <div className={classes.open}><h3>{kanji.examples.map((example, index) =>
          <div key={index}>{example.japanese} - {example.meaning.english}</div>)}</h3>
        </div>
      </Collapse>
    </div>
  )
};


export default Kanji;