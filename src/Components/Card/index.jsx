import React from 'react';
import './Card.css'

function Card(props) {
    return (
        <div className='card'>
          <div className='card-content'>
            { props.children }
          </div>
          <div className='buttons'>
            { props.buttons }
          </div>
        </div>
    );
};


export default Card;
