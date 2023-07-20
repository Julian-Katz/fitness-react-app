import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDayAsync, updateDayAsync, selectError } from "../../daySlice";
import { selectFoods } from '../../../Food/foodSlice';
import { selectActiveProfile } from '../../../Profile/profileSlice';

import Card from "../../../../Components/Card";

function AddFood(props) {
  const dispatch = useDispatch();
  const foods = useSelector(selectFoods);
  const error = useSelector(selectError);
  const activeProfile = useSelector(selectActiveProfile);

  const [foodId, setFoodId] = useState('');
  const [foodAmount, setFoodAmount] = useState('');


  const handleAddFood = () => {
    if (props.day) {
      console.log('updateFood');
      dispatch(
        updateDayAsync({
          _id: props.day._id,
          food: [
            ...props.day.food,
            { foodId: foodId, amount: foodAmount }
          ],
          exercise: props.day.exercise,
          profileId: props.day.profileId,
        })
      );
    } else {
      console.log('addFood');
      dispatch(
        addDayAsync({
          date: props.date,
          food: [
            { foodId, amount: foodAmount }
          ],
          exercise: [],
          profileId: activeProfile._id,
        })
      );
    }
    setFoodId('');
    setFoodAmount('');
  };

  const foodOptions = (
    <>
      <option value={null}>Auswählen</option>
      {foods.map((food) => (
        <option value={food._id} key={food._id}>
          {food.name}
        </option>
      ))}
    </>
  )

  const buttons = (
    <button type="submit" className='button' onClick={handleAddFood} >Hinzufügen</button>
  )

  return (
    <>
      <Card buttons={buttons}>
        <form>
          <label htmlFor="foods">Essen wählen</label>
          <select name="foods" value={foodId} onChange={(e) => setFoodId(e.target.value)}>
            {foodOptions}
          </select>
          <label htmlFor="amount">Menge (g)</label>
          <input type="number" name="amount" value={foodAmount} onChange={(e) => setFoodAmount(e.target.value)} />
          <p>{error}</p>
        </form>
      </Card>
    </>
  );
}

export default AddFood;
