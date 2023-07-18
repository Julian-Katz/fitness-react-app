import React from 'react';
import './Exercises.scoped.css';
import AddExercises from './Components/AddExercises';

function Exercises() {
    return (
        <div className='content-area'>
            <h1>Übungen</h1>
            <AddExercises />
        </div>
    );
};

export default Exercises;
