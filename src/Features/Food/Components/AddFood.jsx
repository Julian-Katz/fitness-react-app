import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodAsync, selectError } from '../foodSlice';

import Card from '../../../Components/Card';

function AddFood() {
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const [name, setName] = useState("");
    const [baseAmount, setBaseAmount] = useState();
    const [energy, setEnergy] = useState();
    const [fat, setFat] = useState();
    const [carbohydrates, setCarbohydrates] = useState();
    const [protein, setProtein] = useState();
    const [salt, setSalt] = useState();
    const [fiber, setFiber] = useState();
    const [drink, setDrink] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addFoodAsync({
            name,
            baseAmount,
            energy,
            fat,
            carbohydrates,
            protein,
            salt,
            fiber,
            drink,
        }));
    }

    const buttons = (
      <>
        <button type="submit" className='button' onClick={handleSubmit} >Hinzufügen</button>
      </>
    )

    return (
      <Card buttons={buttons}>
        <form>
          <div className="header">
          </div>
          <label htmlFor="name">Name</label>
          <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
          <label htmlFor="baseAmount">Basis Gewicht (g)</label>
          <input type="number" id='baseAmount' onChange={(e) => setBaseAmount(e.target.value)} />
          <label htmlFor="energy">Kalorien (kcal)</label>
          <input type="number" id='energy' onChange={(e) => setEnergy(e.target.value)} />
          <label htmlFor="fat">Fett (g)</label>
          <input type="number" id='fat' onChange={(e) => setFat(e.target.value)} />
          <label htmlFor="carbohydrates">Kohlenhydrate (g)</label>
          <input type="number" id='carbohydrates' onChange={(e) => setCarbohydrates(e.target.value)} />
          <label htmlFor="protein">Eiweiß (g)</label>
          <input type="number" id='protein' onChange={(e) => setProtein(e.target.value)} />
          <label htmlFor="salt">Salz (g)</label>
          <input type="number" id='salt' onChange={(e) => setSalt(e.target.value)} />
          <label htmlFor="fiber">Ballaststoffe (g)</label>
          <input type="number" id='fiber' onChange={(e) => setFiber(e.target.value)} />
          <label htmlFor="drink">Getränk</label>
          <input type="checkbox" id='drink' onChange={(e) => setDrink(e.target.checked)} />
          <p>{error}</p>
        </form>
      </Card>
    );
};

export default AddFood;
