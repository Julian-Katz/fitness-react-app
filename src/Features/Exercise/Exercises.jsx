import React, { useEffect } from 'react';
import './Exercises.scoped.css';
import AddExercise from './Components/AddExercise';
import { useSelector, useDispatch } from 'react-redux';
import { loadAsync, selectExercises } from './exerciseSlice';
import ExerciseCard from './Components/ExerciseCard';

function Exercises() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);

  useEffect(() => {
    dispatch(loadAsync());
  }, [dispatch]);

  return (
    <div className='content-area'>
      <h1>Übungen</h1>
      <AddExercise />
      {
        exercises.map((exercise) => (
          <ExerciseCard exercise={exercise} key={exercise._id} />
        ))
      }
    </div>
  );
};

export default Exercises;
