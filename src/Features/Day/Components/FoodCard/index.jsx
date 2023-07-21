import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDayAsync, selectError } from "../../daySlice";
import { selectFoods } from '../../../Food/foodSlice';

import Card from "../../../../Components/Card";
import InlineEdit from '../../../../Components/InlineEdit';
import MeatBalls from "../../../../Components/MeatBalls";

function FoodCard(props) {
  const dispatch = useDispatch();
  const foods = useSelector(selectFoods);
  const error = useSelector(selectError);

  const [foodAmount, setFoodAmount] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setFoodAmount(props.dayFood.amount);
  }, []);

  const findFoodById = (id) => {
    const food = foods.find((food) => food._id === id);
    return food;
  }

  const handleUpdate = () => {
    const updateIndex = props.day.food.findIndex((food) => food._id === props.dayFood._id);
    dispatch(
      updateDayAsync({
        _id: props.day._id,
        food: [
          ...props.day.food.toSpliced(
            updateIndex,
             1,
             { _id: props.dayFood._id, foodId: props.dayFood.foodId, amount: foodAmount }
          ),
        ],
        exercise: props.day.exercise,
        profileId: props.day.profileId,
      })
    );
    setEdit(false);
  };

  const handleStopUpdate = () => {
    setFoodAmount(props.dayFood.amount);
    setEdit(false);
  };

  const handleDelete = () => {
    const deleteIndex = props.day.food.findIndex((food) => food._id === props.dayFood._id);
    dispatch(
      updateDayAsync({
        _id: props.day._id,
        food: [
          ...props.day.food.toSpliced(
            deleteIndex,
             1,
          ),
        ],
        exercise: props.day.exercise,
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
    <Card key={props.dayFood._id} buttons={buttons}>
      <div className="header">
        <h2>{ findFoodById(props.dayFood.foodId).name }</h2>
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
          value={foodAmount}
          edit={edit}
          handleChange={(event) => setFoodAmount(event.target.value)}
        />
        <span> g</span>
      </p>
      <p>{error}</p>
      </div>
    </Card>
  );
}

export default FoodCard;
