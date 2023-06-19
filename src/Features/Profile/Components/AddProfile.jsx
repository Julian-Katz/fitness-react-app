import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileAsync, selectError } from '../profileSlice';

function Foods() {
  const dispatch = useDispatch();
  // const error = useSelector(selectError);

  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [sex, setSex] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfileAsync({
      name,
      age,
      height,
      weight,
      sex,
    }))


  };

  return (
    <div className='content-area'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="age">Age</label>
        <input id="age" type="number" onChange={(e) => setAge(e.target.value)} />
        <label htmlFor="height">Height</label>
        <input id="height" type="number" onChange={(e) => setHeight(e.target.value)} />
        <label htmlFor="weight">Weight</label>
        <input id="weight" type="number" onChange={(e) => setWeight(e.target.value)} />
        <label htmlFor="sex">Sex</label>
        <div>
          <input
            type="radio"
            id="male"
            name="sex"
            value="male"
            checked={sex === 'male'}
            onChange={(e) => {setSex(e.target.value)}}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="sex"
            value="female"
            checked={sex === 'female'}
            onChange={(e) => {setSex(e.target.value)}}
          />
          <label htmlFor="female">Female</label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* <p>{ error }</p> */}
    </div>
  );
}


export default Foods;
