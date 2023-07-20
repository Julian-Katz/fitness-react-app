import React from "react";
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFoods } from '../../../Food/foodSlice';
import { selectExercises } from '../../../Exercise/exerciseSlice';
import { selectActiveProfile } from '../../../Profile/profileSlice';

function Stats(props) {

  const activeProfile = useSelector(selectActiveProfile);
  const foods = useSelector(selectFoods);
  const exercises = useSelector(selectExercises);

  const findFoodById = (id) => {
    const food = foods.find((food) => food._id === id);
    return food;
  }

  const findExerciseById = (id) => {
    const exercise = exercises.find((exercise) => exercise._id === id);
    return exercise;
  };

  const getKcalPerDay = (sex, weight, height, age) => {
    if (sex === 'male') {
      return (10 * weight) + (6.25 * height ) - (5 * age) + 5;
    }

    if (sex === 'women') {
      return (10 * weight) + (6.25 * height ) - (5 * age) - 161;
    }
    return 0;
  };

  const getCurrentKcalPerDay = (day) => {
    let kcal = 0;
    day?.food.forEach(dayFood => {
      const food = findFoodById(dayFood.foodId);
      kcal += (food.energy / food.baseAmount) * dayFood.amount;
    });
    return kcal;
  }

  const getCurrentExerciseKcalPerDay = (day) => {
    let kcal = 0;
    day?.exercise.forEach(dayExercise => {
      const exercise = findExerciseById(dayExercise.exerciseId);
      console.log(dayExercise, exercise );
      kcal -= (exercise.energyBurned / exercise.baseTime) * dayExercise.timeInMinutes;
    });
    return kcal;
  };

  const getCurrentProteinPerDay = (day) => {
    let protein = 0;
    day?.food.forEach(dayFood => {
      const food = findFoodById(dayFood.foodId);
      protein += (food.protein / food.baseAmount) * dayFood.amount;
    });
    return protein;
  };

  const getCurrentFatPerDay = (day) => {
    let fat = 0;
    day?.food.forEach(dayFood => {
      const food = findFoodById(dayFood.foodId);
      fat += (food.fat / food.baseAmount) * dayFood.amount;
    });
    return fat;
  };

  const getCurrentCarbsPerDay = (day) => {
    let carbs = 0;
    day?.food.forEach(dayFood => {
      const food = findFoodById(dayFood.foodId);
      carbs += (food.carbohydrates / food.baseAmount) * dayFood.amount;
    });
    return carbs;
  };

  const [kcalPerDay, setKcalPerDay] = useState(getKcalPerDay(activeProfile.sex, activeProfile.weight, activeProfile.height, activeProfile.age));
  const [proteinPerDay, setProteinPerDay] = useState(0.793664791 * activeProfile.weight);
  const [fatPerDay, setFatPerDay] = useState((0.3 * kcalPerDay) / 9);
  const [carbsPerDay, setCarbsPerDay] = useState((kcalPerDay - (proteinPerDay * 4) - (fatPerDay * 9)) / 4);

  const [currentKcalPerDay, setCurrentKcalPerDay] = useState(getCurrentKcalPerDay(props.day));
  const [currentExerciseKcalPerDay, setCurrentExerciseKcalPerDay] = useState(getCurrentExerciseKcalPerDay(props.day));
  const [currentProteinPerDay, setCurrentProteinPerDay] = useState(getCurrentProteinPerDay(props.day));
  const [currentFatPerDay, setCurrentFatPerDay] = useState(getCurrentFatPerDay(props.day));
  const [currentCarbsPerDay, setCurrentCarbsPerDay] = useState(getCurrentCarbsPerDay(props.day));

  useEffect(() => {
    setCurrentKcalPerDay(getCurrentKcalPerDay(props.day));
    setCurrentExerciseKcalPerDay(getCurrentExerciseKcalPerDay(props.day));
    setCurrentProteinPerDay(getCurrentProteinPerDay(props.day));
    setCurrentFatPerDay(getCurrentFatPerDay(props.day));
    setCurrentCarbsPerDay(getCurrentCarbsPerDay(props.day));
  }, [props.day]);

  return (
    <>
      <h2>Tagesbedarf</h2>
      <div>
        <p>Kalorien pro Tag soll: {Math.floor(kcalPerDay)}kcal</p>
        <p>Kalorien pro Tag ist: {Math.floor(currentKcalPerDay)}kcal</p>
        <p>Kalorien pro Tag durch Übungen: {Math.floor(currentExerciseKcalPerDay)}kcal</p>
      </div>
      <div>
        <p>Eiweiß pro Tag soll: {Math.floor(proteinPerDay)}g</p>
        <p>Eiweiß pro Tag ist: {Math.floor(currentProteinPerDay)}g</p>
      </div>
      <div>
        <p>Kohlenhydrate pro Tag soll: {Math.floor(carbsPerDay)}g</p>
        <p>Kohlenhydrate pro Tag ist: {Math.floor(currentCarbsPerDay)}g</p>
      </div>
      <div>
        <p>Fett pro Tag soll: {Math.floor(fatPerDay)}g</p>
        <p>Fett pro Tag ist: {Math.floor(currentFatPerDay)}g</p>
      </div>
    </>
  );
};

export default Stats;
