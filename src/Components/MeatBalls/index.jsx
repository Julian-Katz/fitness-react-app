import React, { useState } from 'react';
import './MeatBalls.css'

import { ReactComponent as MeatBallsIcon } from '../../assets/icons/more_horiz.svg';

function MeatBalls(props) {
  const [open, setOpen] = useState(false);


    return (
      <>
      <button className='meatballs' type='button' onClick={() => {setOpen(!open)}}>
        <MeatBallsIcon />
      {open && (
        <div className="options">
          { props.children }
        </div>
      )}
      </button>
      </>
    );
};


export default MeatBalls;
