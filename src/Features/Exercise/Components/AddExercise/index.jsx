import React from 'react';
import { addExerciseAsync, selectError } from '../../exerciseSlice';
import { useState } from 'react';
import './AddExercise.scoped.css';
import Card from '../../../../Components/Card';
import { useDispatch, useSelector } from 'react-redux';

function Exercises() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const [name, setName] = useState("");
  const [baseTime, setBaseTime] = useState();
  const [energyBurned, setEnergyBurned] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExerciseAsync({
        name,
        baseTime,
        energyBurned,
    }));
  }

  const buttons = (
    <>
      <button type="submit" className='button' onClick={handleSubmit} >Hinzufügen</button>
    </>
  )

  return (
    <Card buttons={buttons}>
      <form>
        <div className="header">
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
        <label htmlFor="fiber">Zeit (min)</label>
        <input type="number" id='fiber' onChange={(e) => setBaseTime(e.target.value)} />
        <label htmlFor="drink">Verbrannte kcal</label>
        <input type="number" id='drink' onChange={(e) => setEnergyBurned(e.target.value)} />
        <p>{error}</p>
      </form>
    </Card>
  );
};

export default Exercises;
