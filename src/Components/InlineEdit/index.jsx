import React from 'react';
import './InlineEdit.scoped.css'

function InlineEdit(props) {
  return (
    <>
      {
        props.edit ?
        <input
          type={props.type}
          value={props.value}
          onChange={(event) => props.handleChange(event)}
        /> :
        <span>{props.value}</span>
      }
    </>
  );
}

export default InlineEdit;
