import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileAsync, selectError } from '../../profileSlice';

import Card from '../../../../Components/Card';

function Foods() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sex, setSex] = useState('');

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

  const buttons = (
    <>
      <button type="submit" className='button' onClick={handleSubmit} >Hinzufügen</button>
    </>
  )

  return (
    <Card buttons={buttons}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="age">Alter</label>
        <input id="age" type="number" onChange={(e) => setAge(e.target.value)} />
        <label htmlFor="height">Größe (cm)</label>
        <input id="height" type="number" onChange={(e) => setHeight(e.target.value)} />
        <label htmlFor="weight">Gewicht (kg)</label>
        <input id="weight" type="number" onChange={(e) => setWeight(e.target.value)} />
        <label htmlFor="sex">Geschlecht</label>
        <div>
          <input
            type="radio"
            id="male"
            name="sex"
            value="male"
            checked={sex === 'male'}
            onChange={(e) => {setSex(e.target.value)}}
          />
          <label htmlFor="male">Männlich</label>
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
          <label htmlFor="female">Weiblich</label>
        </div>
        <p>{error}</p>
      </form>
    </Card>
  );
}


export default Foods;
