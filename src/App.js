import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { todoListSelector, doneAll, reDoneAll } from "store/todo-list/reducer";
import { Typography, Box, Card } from "@material-ui/core";

import NewToDo from "component/NewToDo";
import TodoList from "component/TodoList";
import Status from "component/Status";

import style from "App.module.scss";

function App() {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListSelector);
  const [status, setStatus] = useState("all");
  const [showTodoList, setShowTodoList] = useState([]);
  const [isDoneAll, setIsDoneAll] = useState(
    Boolean(todoList?.filter((item) => !item.completed)?.length)
  );

  useEffect(() => {
    if (todoList?.filter((item) => !item.completed)?.length)
      setIsDoneAll(false);
    else setIsDoneAll(true);
    updateShowTodoList();
  }, [todoList]);

  useEffect(() => {
    updateShowTodoList()
  }, [status])

  const updateShowTodoList = () => {
    setShowTodoList(
      todoList?.filter(
        (todo) =>
          status === "all" ||
          (todo.completed && status === "completed") ||
          (!todo.completed && status === "notCompleted")
      )
    );
  };

  const handleChangeDoneAll = () => {
    if (isDoneAll) dispatch(reDoneAll());
    else dispatch(doneAll());
  };

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <Card classes={{ root: style.todoContainer }}>
      <Typography variant="h3" component="h3" color="primary">
        todos
      </Typography>
      <Box component="div" textAlign="left" bgcolor="white">
        <NewToDo
          enableDoneAll={Boolean(todoList?.length)}
          isDoneAll={isDoneAll}
          onChangeDoneAll={handleChangeDoneAll}
        />
        {showTodoList?.length > 0 && <TodoList todoList={showTodoList} />}
        <Status
          totalItemActive={todoList?.filter((todo) => !todo.completed)?.length}
          status={status}
          onChangeStatus={handleChangeStatus}
          hasDoneItem={Boolean(
            todoList?.filter((todo) => todo.completed)?.length
          )}
        />
      </Box>
    </Card>
  );
}

export default App;
