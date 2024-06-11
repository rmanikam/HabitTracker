import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showSelector,
  toggleShow,
  toggleShowNew,
} from "../../reducers/habitReducer";

const Navbar = () => {
  // used useSelector hook and passed it value of
  // showSelector and assigned value from it to showValue variable
  const showValue = useSelector(showSelector);

  // called useDispatch hook and saved it in dispatch variable
  const dispatch = useDispatch();
  // called useNavigate hook and saved it in navigate variable
  const navigate = useNavigate();

  // called handleToggleShow function
  const handleToggleShow = () => {
    // dispatched an action of toggleShow
    dispatch(toggleShow());
    // if showValue is true then navigate to HabitForm Component else navigate to WeekView Component
    navigate(showValue ? "/add-habit" : "/week-view");
  };

  // called handleToggleShowNew function

  const handleToggleShowNew = () => {
    // navigate to HabitForm Component
    navigate("/add-habit");
    // dispatched an action of toggleShowNew
    dispatch(toggleShowNew());
  };

  return (
    <div className={styles.outerContainer}>
      {/* created a button of Detail View */}

      <button className={styles.detailButton} onClick={handleToggleShow}>
        {/* if showValue is true then show WeekView button else show Detail View button */}
        {showValue ? "Week View" : "Detail View"}
      </button>

      {/* created a Add Habit button */}

      <button className={styles.add} onClick={handleToggleShowNew}>
        Add Habit
      </button>

      {/* used outlet to show the UI of HabitForm component which is children of Navbar */}
      <Outlet />
    </div>
  );
};

export default Navbar;
