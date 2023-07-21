import React from 'react';
import './Food.scoped.css'
import InlineEdit from '../../../Components/InlineEdit';
import Card from '../../../Components/Card';
import MeatBalls from '../../../Components/MeatBalls';

import { ReactComponent as FoodIcon } from '../../../assets/icons/lunch_dining.svg';
import { ReactComponent as DrinkIcon } from '../../../assets/icons/water_full.svg';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteFoodAsync, updateFoodAsync } from '../foodSlice';

function Food(props) {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [food, setFood] = useState({...props.food});


    const handleUpdate = () => {
      setEdit(!edit);
      dispatch(updateFoodAsync(food));
    }
    const handleStopUpdate = () => {
      setEdit(!edit);
      setFood({...props.food});
    }
    const handleDelete = () => {
      dispatch(deleteFoodAsync(food._id));
    }

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
        <button type="button" className='button' onClick={handleStopUpdate}>
          Verwerfen
        </button>
        </>
      )}
      </>
    );

    return (
        <Card buttons={buttons}>
          <div className="header">
            <h2>
              { food.drink ? <DrinkIcon /> : <FoodIcon /> }
              <InlineEdit
                type='text'
                value={food.name}
                edit={edit}
                handleChange={(event) => setFood({...food, name: event.target.value})}
              />
            </h2>
            <MeatBalls>
            <button type='button' onClick={handleDelete}>
              löschen
            </button>
            </MeatBalls>
          </div>
          <table id="Books">
            <caption>
              Nährwerte pro
              <InlineEdit
                type='number'
                value={food.baseAmount}
                edit={edit}
                handleChange={(event) => setFood({...food, baseAmount: event.target.value})}
              />
              g
            </caption>
            <tbody>
              <tr>
                <th>Energie</th>
                <td>
                  <InlineEdit
                    type='number'
                    value={food.energy}
                    edit={edit}
                    handleChange={(event) => setFood({...food, energy: event.target.value})}
                    />
                    <span> kcal</span>
                </td>
              </tr>
              <tr>
                <th>Eiweiß</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.protein}
                  edit={edit}
                  handleChange={(event) => setFood({...food, protein: event.target.value})}
                />
                <span> g</span>
                </td>
              </tr>
              <tr>
                <th>Kohlenhydrate</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.carbohydrates}
                  edit={edit}
                  handleChange={(event) => setFood({...food, carbohydrates: event.target.value})}
                />
                <span> g</span>
                </td>
              </tr>
              <tr>
                <th>Fett</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.fat}
                  edit={edit}
                  handleChange={(event) => setFood({...food, fat: event.target.value})}
                />
                <span> g</span>
                </td>
              </tr>
              <tr>
                <th>Ballaststoffe</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.fiber}
                  edit={edit}
                  handleChange={(event) => setFood({...food, fiber: event.target.value})}
                />
                <span> g</span>
                </td>
              </tr>
              <tr>
                <th>Salz</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.salt}
                  edit={edit}
                  handleChange={(event) => setFood({...food, salt: event.target.value})}
                />
                <span> g</span>
                </td>
              </tr>
            </tbody>
          </table>
          {edit && (
            <>
            <label htmlFor="drink"><b>Getränk: </b></label>
            <input type="checkbox" id='drink' checked={food.drink} onChange={(event) => setFood({...food, drink: event.target.checked})} />
            </>
          )}
        </Card>
    );
};


export default Food;
