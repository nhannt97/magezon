import React from "react";
import { arrayOf, string, bool, shape } from "prop-types";

import { Box } from "@material-ui/core";

import TodoItem from "component/TodoList/TodoItem";

TodoList.propTypes = {
  todoList: arrayOf(shape({
    title: string,
    deadline: string,
    completed: bool
  }))
}

function TodoList({ todoList }) {
  return (
    <Box component="div">
      {todoList?.map(item => (
        <TodoItem key={item.id} todoItem={item}/>
      ))}
    </Box>
  );
}

export default TodoList;
