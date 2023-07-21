import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDayAsync, selectError } from "../../daySlice";
import { selectExercises } from '../../../Exercise/exerciseSlice';

import InlineEdit from '../../../../Components/InlineEdit';
import MeatBalls from "../../../../Components/MeatBalls";
import Card from "../../../../Components/Card";

function ExerciseCard(props) {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const error = useSelector(selectError);

  const [exerciseTime, setExerciseTime] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setExerciseTime(props.dayExercise.timeInMinutes);
  }, []);

  const findExerciseById = (id) => {
    const exercise = exercises.find((exercise) => exercise._id === id);
    return exercise;
  }

  const handleUpdate = () => {
    const updateIndex = props.day.exercise.findIndex((exercise) => exercise._id === props.dayExercise._id);
    dispatch(
      updateDayAsync({
        _id: props.day._id,
        food: props.day.food,
        exercises: [
          ...props.day.exercise.toSpliced(
            updateIndex,
             1,
             { _id: props.dayExercise._id, exerciseId: props.dayExercise.exerciseId, timeInMinutes: exerciseTime }
          ),
        ],
        profileId: props.day.profileId,
      })
    );
    setEdit(false);
  };

  const handleStopUpdate = () => {
    setExerciseTime(props.dayExercise.timeInMinutes);
    setEdit(false);
  };

  const handleDelete = () => {
    const deleteIndex = props.day.exercise.findIndex((exercise) => exercise._id === props.dayExercise._id);
    dispatch(
      updateDayAsync({
        _id: props.day._id,
        food: props.day.food,
        exercise: [
          ...props.day.exercise.toSpliced(
            deleteIndex,
             1,
          ),
        ],
        profileId: props.day.profileId,
      })
    );
  };

  const buttons = (
    <>
    {!edit && (
      <button type="button" className='button' onClick={() => setEdit(!edit)}>
        Bearbeiten
      </button>
    )}

    {edit && (
      <>
      <button type="button" className='button' onClick={handleUpdate}>
        Speichern
      </button>
      <button type="button" className='button secondary' onClick={handleStopUpdate}>
        Verwerfen
      </button>
      </>
    )}
    </>
  );

  return (
    <Card key={props.dayExercise._id} buttons={buttons}>
      <div className="header">
        <h2>{ findExerciseById(props.dayExercise.exerciseId).name }</h2>
        <MeatBalls>
          <button type='button' onClick={handleDelete}>
            löschen
          </button>
        </MeatBalls>
      </div>
      <div>
      <p>
        <InlineEdit
          type='number'
          value={exerciseTime}
          edit={edit}
          handleChange={(event) => setExerciseTime(event.target.value)}
        />
        <span> min</span>
      </p>
      <p>{error}</p>
      </div>
    </Card>
  );
}

export default ExerciseCard;
