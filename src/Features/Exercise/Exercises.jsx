import React, { useEffect } from 'react';
import './Exercises.scoped.css';
import AddExercises from './Components/AddExercises';
import { useSelector, useDispatch } from 'react-redux';
import { loadAsync, selectExercises } from './exerciseSlice';

function Exercises() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);

  return (
    <div className='content-area'>
      <h1>Übungen</h1>
      <AddExercises />
      {
        exercises.map((exercise) => (
          <div>{exercise.name}</div>
        ))
      }
    </div>
  );
};

export default Exercises;
