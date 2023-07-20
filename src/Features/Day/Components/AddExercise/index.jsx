import React from "react";
import  { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectExercises } from '../../../Exercise/exerciseSlice';
import { addDayAsync, updateDayAsync } from '../../daySlice';
import { selectActiveProfile } from '../../../Profile/profileSlice';

import Card from '../../../../Components/Card';

function AddExercise(props) {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const activeProfile = useSelector(selectActiveProfile);

  const [exerciseId, setExerciseId] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');


  const handleAddExercise = () => {
    if (props.day) {
      console.log('updateExercise');
      dispatch(
        updateDayAsync({
          _id: props.day._id,
          food: props.day.food,
          exercise: [
            ...props.day.exercise,
            { exerciseId, timeInMinutes: exerciseTime }
          ],
          profileId: props.day.profileId,
        })
      );
    } else {
      console.log('addExercise');
      dispatch(
        addDayAsync({
          date: props.date,
          food: [],
          exercise: [
            { exerciseId, timeInMinutes: exerciseTime }
          ],
          profileId: activeProfile._id,
        })
      );
    };
    setExerciseId('');
    setExerciseTime('');
  };

    const exerciseOptions = (
      <>
        <option value={null}>Auswählen</option>
        {exercises.map((exercise) => (
          <option value={exercise._id} key={exercise._id}>
            {exercise.name}
          </option>
        ))}
      </>
    )

    const buttons = (
      <button type="submit" onClick={handleAddExercise} >Hinzufügen</button>
    )

  return (
    <Card buttons={buttons}>
      <form>
          <label htmlFor="exercise">Übung wählen</label>
          <select name="exercise" value={exerciseId} onChange={(e) => setExerciseId(e.target.value)}>
            {exerciseOptions}
          </select>
          <label htmlFor="time">Zeit</label>
          <input type="number" name="time" value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} />min
        </form>
    </Card>
  );
};

export default AddExercise;
