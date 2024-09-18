import React, { useEffect, useState } from "react";
import styles from "../Form/HabitForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addHabit,
  deleteItem,
  habitSelector,
  showSelectorNew,
  toggleShow,
  toggleShowNew,
} from "../../reducers/habitReducer";
import { toast } from "react-toastify";
const HabitForm = () => {
  // created habits variable and setHabits function using useState hook
  // and initialized it with value of ""
  const [habits, setHabits] = useState("");
  // used useSelector hook and passed it value of
  // showSelectorNew and assigned the value from it to showValueNew variable
  const showValueNew = useSelector(showSelectorNew);

  // called useSelector and passed habitSelector value inside it and
  // destructured it to get value of viewHabits array from it
  const viewHabits = useSelector(habitSelector);
  //  created arr variable and setArr function using useState hook and
  //  initialized it with initial value of []
  const [arr, setArr] = useState([]);
  // called useNavigate hook and saved it in navigate variable
  const navigate = useNavigate();

  // called useDispatch hook and saved it in dispatch variable
  const dispatch = useDispatch();

  // called useEffect hook and assigned setArr function with value of viewHabits array
  useEffect(() => {
    setArr(viewHabits);
  }, [viewHabits]);

  // called handleSave function
  const handleSave = (e) => {
    e.preventDefault();

    // Generate a random index value
    const indexValue = Math.floor(Math.random() * 100);
    // if habits is not empty then dispatch action of addHabit
    if (habits) {
      dispatch(addHabit({ name: habits, index: indexValue }));
      // called toast message of habit added successfully
      toast("Your habit added successfully");
      // clear the habits variable to empty string
      setHabits("");
      dispatch(toggleShowNew());
    }
  };

  // called handleDelete function
  const handleDelete = (index) => {
    // dispatched an action of deleteItem and passed index in it
    dispatch(deleteItem(index));
    // called toast message of habit deleted successfully
    toast("Your habit deleted successfully");
  };

  // called handleToggleShow function
  const handleToggleShow = () => {
    // dispatched an action of toggleShow
    dispatch(toggleShow());
    // navigate to WeekView Component
    navigate("/week-view");
  };

  return (
    <div className={styles.outerContainer}>
      {showValueNew ? (
        /* created a form */
        <form className={styles.form} onSubmit={handleSave}>
          {/* created a label Add Habit */}
          <label>Add Habit</label>
          {/* created a input field of Add Habit */}
          <input
            type="text"
            placeholder="Enter Habit"
            className={styles.input}
            value={habits}
            onChange={(e) => setHabits(e.target.value)}
          />
          {/* Created a button Container which contains cancel and save button */}
          <div className={styles.btnContainer}>
            <button
              className={styles.cancel}
              onClick={() => dispatch(toggleShowNew())}
            >
              Cancel
            </button>
            <button className={styles.save}>Save</button>
          </div>
        </form>
      ) : null}
      {/* created a table  */}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th className={styles.index}>Index</th>
              <th className={styles.habit}>Habit</th>
            </tr>
          </thead>
          <tbody>
            {/* map over the array */}
            {arr?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className={styles.indexValue}>{item.index}</td>
                  <td className={styles.habitName}>{item.name}</td>
                  <td className={styles.weekView}>
                    <button onClick={handleToggleShow} className={styles.week}>
                      WeekView
                    </button>
                  </td>
                  <td className={styles.deleteButton}>
                    <button
                      onClick={() => handleDelete(item.index)}
                      className={styles.delete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitForm;
