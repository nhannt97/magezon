import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { bool, func } from "prop-types";

import { useDispatch } from "react-redux";
import { addTodo } from "store/todo-list/reducer";

import AddIcon from "@material-ui/icons/Add";
import {
  Box,
  Checkbox,
  FormControl,
  Input,
  IconButton,
  FormHelperText,
} from "@material-ui/core";

import { convertTimeToLocaleString } from "helper";

import style from "component/NewToDo/style.module.scss";

NewToDo.propTypes = {
  enableDoneAll: bool,
  isDoneAll: bool,
  onChangeDoneAll: func,
};

function NewToDo({ enableDoneAll, isDoneAll, onChangeDoneAll }) {
  const dispatch = useDispatch();
  const [error, setError] = useState({
    title: "",
    deadline: "",
  });
  const [newTodo, setNewTodo] = useState({
    id: uuidv4(),
    title: "",
    deadline: convertTimeToLocaleString(new Date().getTime() + 30 * 60 * 1000),
    completed: false,
  });

  const handleChangeNewTodo = (field) => (e) => {
    if (e.target.value && error[field]) {
      setError({
        ...error,
        [field]: "",
      });
    }
    if (!e.target.value && !error[field]) {
      setError({
        ...error,
        [field]: "Invalid",
      });
    }
    setNewTodo({
      ...newTodo,
      [field]: e.target.value,
    });
  };

  const handleAddTodo = () => {
    if (!newTodo.title || !newTodo.deadline) {
      setError({
        title: !newTodo.title ? "Invalid" : "",
        deadline: !newTodo.deadline ? "Invalid" : "",
      });
      return;
    }

    dispatch(addTodo(newTodo));
    setNewTodo({
      id: uuidv4(),
      title: "",
      deadline: convertTimeToLocaleString(
        new Date().getTime() + 30 * 60 * 1000
      ),
      completed: false,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <Box component="div" display="flex" alignItems="center">
      <Checkbox
        color="primary"
        checked={isDoneAll}
        onChange={onChangeDoneAll}
        classes={{
          root: enableDoneAll ? style.showDoneAll : style.hideDoneAll,
        }}
      />
      <FormControl error={Boolean(error.title)}>
        <Input
          className={style.title}
          placeholder="What needs to be done?"
          value={newTodo.title}
          onChange={handleChangeNewTodo("title")}
          onKeyPress={handleKeyPress}
        />
        <FormHelperText>{error.title}</FormHelperText>
      </FormControl>
      <FormControl error={Boolean(error.deadline)}>
        <Input
          type="datetime-local"
          classes={{ root: style.deadline }}
          value={newTodo.deadline}
          onChange={handleChangeNewTodo("deadline")}
        />
        <FormHelperText>{error.deadline}</FormHelperText>
      </FormControl>
      <IconButton onClick={handleAddTodo}>
        <AddIcon classes={{ root: style.addIcon }} />
      </IconButton>
    </Box>
  );
}

export default NewToDo;
