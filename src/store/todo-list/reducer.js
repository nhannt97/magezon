import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'todoList';

const initialState = JSON.parse(localStorage.getItem(namespace) || "[]");

export const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      state.sort((todo1, todo2) => todo1 > todo2);
      localStorage.todoList = JSON.stringify(state);
    },
    updateTodo: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id)
      state[index] = {
        ...state[index],
        ...action.payload
      };
      localStorage.todoList = JSON.stringify(state);
    },
    removeTodo: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload)
      state.splice(index, 1)
      localStorage.todoList = JSON.stringify(state);
    },
    doneAll: (state) => {
      const newTodoList = state.map(item => ({
        ...item,
        completed: true
      }));
      localStorage.todoList = JSON.stringify(newTodoList)
      return newTodoList
    },
    reDoneAll: (state) => {
      const newTodoList = state.map(item => ({
        ...item,
        completed: false
      }))
      localStorage.todoList = JSON.stringify(newTodoList)
      return newTodoList
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  updateTodo,
  removeTodo,
  doneAll,
  reDoneAll
} = slice.actions;
// Selector
export const todoListSelector = (store) => store[namespace];
// Reducer
export const { reducer } = slice;
