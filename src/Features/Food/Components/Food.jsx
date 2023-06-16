import React from 'react';
import './Food.scoped.css'
import InlineEdit from '../../../Components/InlineEdit';

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
    const handleDelete = () => {
      dispatch(deleteFoodAsync(food._id));
    }

    return (
        <div className='card'>
          <h2>
            <InlineEdit
              type='text'
              value={food.name}
              edit={edit}
              handleChange={(event) => setFood({...food, name: event.target.value})}
            />
          </h2>
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
                     kcal
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
                 g
                </td>
              </tr>
              <tr>
                <th>Kohlenhydrathe</th>
                <td>
                <InlineEdit
                  type='number'
                  value={food.carbohydrates}
                  edit={edit}
                  handleChange={(event) => setFood({...food, carbohydrates: event.target.value})}
                />
                 g
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
                 g
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
                 g
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
                 g
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={handleUpdate}>
            {edit ? 'speichern' : 'bearbeiten'}
          </button>
          <button type='button' onClick={handleDelete}>
            löschen
          </button>
        </div>
    );
};


export default Food;
