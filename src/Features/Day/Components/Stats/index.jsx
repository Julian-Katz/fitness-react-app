import React from "react";
import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFoods } from '../../../Food/foodSlice';
import { selectExercises } from '../../../Exercise/exerciseSlice';
import { selectActiveProfile, loadAsync as loadProfileAsync} from '../../../Profile/profileSlice';
import { loadAsync as loadFoodAsync } from '../../../Food/foodSlice';
import { loadAsync as loadExerciseAsync } from '../../../Exercise/exerciseSlice';
import { loadAsync as loadDayAsync } from '../../daySlice';
import Chart from "react-apexcharts";
import './Stats.scoped.css';

function Stats(props) {
  const dispatch = useDispatch();
  const activeProfile = useSelector(selectActiveProfile);
  const foods = useSelector(selectFoods);
  const exercises = useSelector(selectExercises);

  useEffect(() => {
    dispatch(loadProfileAsync())
    dispatch(loadDayAsync(activeProfile._id));
  }, [dispatch]);

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
  const [kcalPerDay, setKcalPerDay] = useState(0);
  const [proteinPerDay, setProteinPerDay] = useState(0);
  const [fatPerDay, setFatPerDay] = useState(0);
  const [carbsPerDay, setCarbsPerDay] = useState(0);

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

    setKcalPerDay(getKcalPerDay(activeProfile.sex, activeProfile.weight, activeProfile.height, activeProfile.age));
    setProteinPerDay(0.793664791 * activeProfile.weight);
    setFatPerDay((0.3 * kcalPerDay) / 9);
    setCarbsPerDay((kcalPerDay - (proteinPerDay * 4) - (fatPerDay * 9)) / 4);
  }, [props.day, activeProfile]);

  const options = {
    labels: ["Kalorien", "Eiweiß", "Fett", "Kohlenhydrate"],
    series: [
      Math.floor((currentKcalPerDay + currentExerciseKcalPerDay)  / kcalPerDay * 100 ),
      Math.floor(currentProteinPerDay / proteinPerDay * 100),
      Math.floor(currentFatPerDay / fatPerDay * 100),
      Math.floor(currentCarbsPerDay / carbsPerDay * 100)
    ],
  };

  return (
    <>
      <h2>Nährwerte</h2>
      <div className="element">
        <Chart
          type="radialBar"
          series={options.series}
          options={options}
        />
      </div>
      <div className="element">
        <p>Kalorien Tagesbedarf: {Math.floor(kcalPerDay)} kcal </p>
        <p>Kalorien durch Übungen: {Math.floor(currentExerciseKcalPerDay)} kcal</p>
        <p>Kalorien heute: {Math.floor(currentKcalPerDay + currentExerciseKcalPerDay)} / {Math.floor(kcalPerDay)} kcal</p>
        <p>Eiweiß heute:  {Math.floor(currentProteinPerDay)} / {Math.floor(proteinPerDay)} g</p>
        <p>Kohlenhydrate heute: {Math.floor(currentCarbsPerDay)} / {Math.floor(carbsPerDay)} g</p>
        <p>Fett heute: {Math.floor(currentFatPerDay)} / {Math.floor(fatPerDay)} g</p>
      </div>
    </>
  );
};

export default Stats;
