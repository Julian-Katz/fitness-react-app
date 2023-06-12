import React from 'react';
import { useState } from 'react';
import axios from '../../axiosURL';
import { useDispatch } from 'react-redux';
import { addFoodAsync } from './foodSlice';

function AddFood() {
    const dispatch = useDispatch();

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

    return (
        <div>
            <h2>AddFood</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' onChange={(e) => setName(e.target.value)} />
                <label htmlFor="baseAmount">baseAmount</label>
                <input type="number" id='baseAmount' onChange={(e) => setBaseAmount(e.target.value)} />
                <label htmlFor="energy">energy</label>
                <input type="number" id='energy' onChange={(e) => setEnergy(e.target.value)} />
                <label htmlFor="fat">fat</label>
                <input type="number" id='fat' onChange={(e) => setFat(e.target.value)} />
                <label htmlFor="carbohydrates">carbohydrates</label>
                <input type="number" id='carbohydrates' onChange={(e) => setCarbohydrates(e.target.value)} />
                <label htmlFor="protein">protein</label>
                <input type="number" id='protein' onChange={(e) => setProtein(e.target.value)} />
                <label htmlFor="salt">salt</label>
                <input type="number" id='salt' onChange={(e) => setSalt(e.target.value)} />
                <label htmlFor="fiber">fiber</label>
                <input type="number" id='fiber' onChange={(e) => setFiber(e.target.value)} />
                <label htmlFor="drink">drink</label>
                <input type="checkbox" id='drink' onChange={(e) => setDrink(e.target.checked)} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddFood;
