import React from 'react';
import AddFood from './Components/AddFood';
import Food from './Components/Food';
import './Foods.scoped.css'

import { useSelector, useDispatch } from 'react-redux';
import { loadAsync, selectFoods } from './foodSlice';
import { useEffect } from 'react';

function Foods() {
    const foods = useSelector(selectFoods);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAsync());
    }, [dispatch]);

    return (
        <div className='content-area'>
            <h1>Food Page</h1>
            <div className='card'>
              <AddFood />
            </div>
              {foods.map((food) => (
                <div className='card'>
                  <Food key={food._id}  food={food}/>
                </div>
              ))}
        </div>
    );
};


export default Foods;
