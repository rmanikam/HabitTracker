import React, { useEffect, useState } from "react";
import moment from "moment";
import done from "../../assets/yes.png";
import notDone from "../../assets/delete (2).png";
import none from "../../assets/hyphen.png";
import { useDispatch, useSelector } from "react-redux";
import styles from "../WeekView/WeekView.module.css";
import {
  habitDone,
  habitNone,
  habitNotDone,
  statusSelector,
  toggleShow,
} from "../../reducers/habitReducer";
import { useNavigate } from "react-router-dom";
const WeekView = () => {
  // created weekArr variable and setWeekArr function using useState hook
  // and initialized it with value of empty object
  const [weekArr, setWeekArr] = useState([]);
  // called useDispatch hook and saved it in dispatch variable
  const dispatch = useDispatch();
  // called useNavigate hook and saved it in navigate variable
  const navigate = useNavigate();
  // used useSelector hook and passed it value of
  // statusSelector and assigned value from it to statuses variable
  let statuses = useSelector(statusSelector);
  //  called useEffect hook and pushed to days array an object containing
  // key value pair of day and its value and key value pair of date and its value

  useEffect(() => {
    const days = [];

    for (var i = 0; i < 7; i++) {
      const date = moment().subtract(i, "days").format("DD/MM/YYYY");
      days.push({
        day: moment().subtract(i, "days").format("dddd"),
        date: date,
      });
      if (!statuses[date]) {
        dispatch(habitNone(date));
      }
    }
    setWeekArr(days.reverse());
  }, []);

  // called getStatus function and passed it parameters of date, status
  const getStatus = (date, status) => {
    return statuses[date] === status ? styles.active : "";
  };
  // called handleDetail function
  const handleDetail = () => {
    dispatch(toggleShow());
    navigate("/add-habit");
  };
  return (
    <div className={styles.outerContainer}>
      {/* map over weekArr which is an array */}
      {weekArr.map((item) => {
        return (
          <div className={styles.innerContainer}>
            <div className={styles.day}>{item.day}</div>
            <div className={styles.date}>{item.date}</div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => dispatch(habitDone(item.date))}
                className={`${getStatus(item.date, "Done")}`}
              >
                <img src={done} alt="done" className={styles.done} />
              </button>
              <button
                onClick={() => dispatch(habitNotDone(item.date))}
                className={`${getStatus(item.date, "NotDone")}`}
              >
                <img src={notDone} alt="not done" className={styles.notDone} />
              </button>
              <button
                onClick={() => dispatch(habitNone(item.date))}
                className={`${getStatus(item.date, "None")}`}
              >
                <img src={none} alt="none" className={styles.none} />
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={handleDetail} className={styles.btn}>
        Detail View
      </button>
    </div>
  );
};

export default WeekView;
