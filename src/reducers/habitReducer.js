import { createSlice } from "@reduxjs/toolkit";

// created initalState
const initialState = {
  viewHabits: [],
  show: false,
  display: false,
  statuses: {},
};

// created habitSlice variable using createSlice method
const habitSlice = createSlice({
  name: "habits",
  initialState: initialState,
  reducers: {
    addHabit: (state, action) => {
      state.viewHabits.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.viewHabits = state.viewHabits.filter((item) => {
        return item.index !== action.payload;
      });
    },
    toggleShow: (state) => {
      state.show = !state.show;
    },
    toggleShowNew: (state) => {
      state.display = !state.display;
    },
    habitDone: (state, action) => {
      state.statuses[action.payload] = "Done";
    },
    habitNotDone: (state, action) => {
      state.statuses[action.payload] = "NotDone";
    },
    habitNone: (state, action) => {
      state.statuses[action.payload] = "None";
    },
  },
});

// assigned value of habitSlice.reducer to habitReducer and exported it
export const habitReducer = habitSlice.reducer;

// destructured addHabit and deleteItem from habitSlice.actions and exported it
export const {
  addHabit,
  deleteItem,
  toggleShow,
  toggleShowNew,
  habitDone,
  habitNotDone,
  habitNone,
} = habitSlice.actions;

// exported habitSelector
export const habitSelector = (state) => state.habit.viewHabits;

export const showSelector = (state) => state.habit.show;

export const showSelectorNew = (state) => state.habit.display;

export const statusSelector = (state) => state.habit.statuses;
