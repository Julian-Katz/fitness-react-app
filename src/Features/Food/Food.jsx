import React from 'react';
import './Food.scoped.css';

import { useSelector, useDispatch } from 'react-redux';
import { loadAsync, selectFoods } from './foodSlice';
import { useEffect } from 'react';

function Food() {
    const foods = useSelector(selectFoods);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAsync());
    }, [dispatch]);
    
    console.log(foods);
    
    return (
        <div>
            <h2>Food Page</h2>
            <ul>
                {foods.map((food) => (
                    <li key={food._id}><b>{food.name}</b></li>
                ))}
            </ul>
        </div>
    );
};


export default Food;
