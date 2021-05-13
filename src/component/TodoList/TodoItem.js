import React, { useState, useEffect } from "react";
import { string, bool } from "prop-types";

import { useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "store/todo-list/reducer";

import CloseIcon from '@material-ui/icons/Close';

import {
  Box,
  Checkbox,
  FormControl,
  Input,
  TextareaAutosize,
  IconButton
} from "@material-ui/core";

import style from "component/TodoList/style.module.scss";

TodoItem.propTypes = {
  todoItem: {
    title: string,
    deadling: string,
    completed: bool,
  },
};

function TodoItem({ todoItem }) {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState(todoItem);

  useEffect(() => {
    setTodo(todoItem)
  }, [todoItem])

  const handleChange = (field) => (e) => {
    setTodo({
      ...todo,
      [field]: e.target.value 
    })
  };

  const handleChangeStatus = () => {
    dispatch(updateTodo({
      id: todoItem.id,
      completed: !todoItem.completed
    }))
  }

  const handleUpdate = (field) => () => {
    dispatch(updateTodo({
      id: todoItem.id,
      [field]: todo[field] || todoItem[field]
    }))
  };

  const handleKeyPress = (field) => (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    document.activeElement.blur();
  }

  const handleRemove = () => {
    dispatch(removeTodo(todoItem.id))
  }

  return (
    <Box component="div" display="flex" alignItems="center" borderTop="1px solid #ccc">
      <Checkbox
        checked={todo.completed}
        onChange={handleChangeStatus}
        color="primary"
      />
      <FormControl className={style.textArea}>
        <TextareaAutosize
          className={style.title}
          placeholder="What needs to be done?"
          value={todo.title}
          onChange={handleChange("title")}
          onBlur={handleUpdate("title")}
          onKeyPress={handleKeyPress("title")}
        />
      </FormControl>
      <FormControl>
        <Input
          type="datetime-local"
          classes={{ root: style.deadline }}
          value={todo.deadline}
          onChange={handleChange("deadline")}
          onBlur={handleUpdate("deadline")}
          onKeyPress={handleKeyPress("title")}
        />
      </FormControl>
      <IconButton onClick={handleRemove}>
        <CloseIcon color="error"/>
      </IconButton>
    </Box>
  );
}

export default TodoItem;
