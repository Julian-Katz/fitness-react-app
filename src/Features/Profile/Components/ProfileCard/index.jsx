import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileAsync, deleteProfileAsync, selectError } from '../../profileSlice';

import Card from '../../../../Components/Card';
import InlineEdit from '../../../../Components/InlineEdit';
import MeatBalls from '../../../../Components/MeatBalls';

function ProfileCard(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [profile, setProfile] = useState({...props.profile});

  const handleUpdate = () => {
    setEdit(!edit);
    dispatch(updateProfileAsync(profile));
  }
  const handleStopUpdate = () => {
    setEdit(!edit);
    setProfile({...props.profile});
  }
  const handleDelete = () => {
    dispatch(deleteProfileAsync(profile._id));
  }

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
    <Card buttons={buttons}>
      <div className="header">
        <h2>
          <InlineEdit
            type='text'
            value={profile.name}
            edit={edit}
            handleChange={(event) => setProfile({...profile, name: event.target.value})}
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
          <b>Alter: </b>
          <InlineEdit
            type='number'
            value={profile.age}
            edit={edit}
            handleChange={(event) => setProfile({...profile, age: event.target.value})}
          />
        </p>
        <p>
          <b>Größe: </b>
          <InlineEdit
            type='number'
            value={profile.height}
            edit={edit}
            handleChange={(event) => setProfile({...profile, height: event.target.value})}
          /> cm
        </p>
        <p>
          <b>Gewicht: </b>
          <InlineEdit
            type='number'
            value={profile.weight}
            edit={edit}
            handleChange={(event) => setProfile({...profile, weight: event.target.value})}
          /> kg
        </p>
        <p>
          <b>Geschlecht: </b>
          <span>{profile.sex}</span>
        </p>
      </div>
    </Card>
  );
}

export default ProfileCard;
