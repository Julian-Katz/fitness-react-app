import React from 'react';
import Card from '../../../../Components/Card';
import { useState } from 'react';
import InlineEdit from '../../../../Components/InlineEdit';
import MeatBalls from '../../../../Components/MeatBalls';
import { useDispatch } from 'react-redux';
import { deleteExerciseAsync, updateExerciseAsync } from '../../exerciseSlice';

function ExerciseCard(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [exercise, setExercise] = useState({...props.exercise});

  const handleUpdate = () => {
    setEdit(!edit);
    dispatch(updateExerciseAsync(exercise));
  }
  const handleStopUpdate = () => {
    setEdit(!edit);
    setExercise({...props.exercise});
  }
  const handleDelete = () => {
    dispatch(deleteExerciseAsync(exercise._id));
  }

  const buttons = (
    <>
    {!edit && (
      <button type="button" onClick={() => setEdit(!edit)}>
        bearbeiten
      </button>
    )}

    {edit && (
      <>
      <button type="button" onClick={handleUpdate}>
        speichern
      </button>
      <button type="button" onClick={handleStopUpdate}>
        verwerfen
      </button>
      </>
    )}
    </>
  );

  return (
    <Card buttons={buttons}>
      <div className="header">
        <h2>
          <InlineEdit
            type='text'
            value={exercise.name}
            edit={edit}
            handleChange={(event) => setExercise({...exercise, name: event.target.value})}
          />
        </h2>
        <MeatBalls>
          <button type='button' onClick={handleDelete}>
            löschen
          </button>
        </MeatBalls>
      </div>
      <div>
        <p>
          <b>Zeit: </b>
          <InlineEdit
            type='number'
            value={exercise.baseTime}
            edit={edit}
            handleChange={(event) => setExercise({...exercise, baseTime: event.target.value})}
          />
        </p>
        <p>
          <b>Verbrannte Energie: </b>
          <InlineEdit
            type='number'
            value={exercise.energyBurned}
            edit={edit}
            handleChange={(event) => setExercise({...exercise, energyBurned: event.target.value})}
          />
        </p>
      </div>
    </Card>
  );
}

export default ExerciseCard;
