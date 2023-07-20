import React from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAsync as loadFoodAsync } from '../Food/foodSlice';
import { loadAsync as loadExerciseAsync } from '../Exercise/exerciseSlice';
import { loadAsync as loadDayAsync, selectDay } from './daySlice';
import { selectActiveProfile } from '../Profile/profileSlice';

import './Day.scoped.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddFood from './Components/AddFood';
import AddExercise from "./Components/AddExercise";
import ExerciseCard from "./Components/ExerciseCard";
import FoodCard from './Components/FoodCard';
import Stats from './Components/Stats';

function Day() {
  const dispatch = useDispatch();

  const days = useSelector(selectDay);
  const activeProfile = useSelector(selectActiveProfile);

  useEffect(() => {
      dispatch(loadExerciseAsync());
      dispatch(loadFoodAsync());
      dispatch(loadDayAsync(activeProfile._id));
  }, [dispatch, activeProfile]);


  const checkIfDayExists = (date) => {
    const day = days.find(day => new Date(day.date).toISOString() === date.toISOString());
    return day;
  };

  const tempDate = new Date();
  tempDate.setHours(0,0,0,0);

  const [date, setDate] = useState(tempDate);
  const [day, setDay] = useState(checkIfDayExists(date));

  useEffect(() => {
    setDay(checkIfDayExists(date));
  }, [days]);

  const handleDateChange = (date) => {
    setDate(new Date(date));
    const selectedDay = checkIfDayExists(date);
    if (selectedDay) {
      setDay(selectedDay);
    } else {
      setDay(null);
    }
  };

  return (
    <div className="content-area">
      <h1>Day</h1>
      <h2>Datum</h2>
      <Calendar onChange={handleDateChange} value={date} />

      <Stats day={day} />

      <h2>Essen</h2>
      <AddFood day={day} date={date} />
      {day && day.food.map((dayFood) => (
        <FoodCard key={dayFood._id} dayFood={dayFood} day={day} />
      ))}

      <h2>Übungen</h2>
      <AddExercise day={day} date={date} />
      {day && day.exercise?.map((dayExercise) => (
        <ExerciseCard key={dayExercise._id} day={day} dayExercise={dayExercise} />
      ))}
    </div>
  );
};

export default Day;
