import React from "react";
import { bool, number, func, string, oneOfType } from "prop-types";

import { useDispatch } from "react-redux";
import { reDoneAll } from "store/todo-list/reducer";

import {
  Box,
  Button,
} from "@material-ui/core";

import style from "component/Status/style.module.scss";

Status.propTypes = {
  totalItemActive: number,
  status: oneOfType([string, bool]),
  onChangeStatus: func,
};

function Status({ totalItemActive, status, onChangeStatus, hasDoneItem }) {
  const dispatch = useDispatch();

  const handleReDoneAll = () => dispatch(reDoneAll());

  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderTop="1px solid #ccc"
    >
      <Box component="div" display="flex" alignItems="center">
        {totalItemActive} items left
      </Box>
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        <Button
          size="small"
          variant="outlined"
          classes={{
            outlined: status !== "all" ? style.noBorderBtn : "",
          }}
          onClick={() => onChangeStatus("all")}
        >
          All
        </Button>
        <Button
          size="small"
          variant="outlined"
          classes={{
            outlined: status !== "notCompleted" ? style.noBorderBtn : "",
          }}
          onClick={() => onChangeStatus("notCompleted")}
        >
          Active
        </Button>
        <Button
          size="small"
          variant="outlined"
          classes={{
            outlined: status !== "completed" ? style.noBorderBtn : "",
          }}
          onClick={() => onChangeStatus("completed")}
        >
          Completed
        </Button>
      </Box>
      <Box component="div" display="flex" alignItems="center">
        <Button
          size="small"
          variant="outlined"
          onClick={handleReDoneAll}
          classes={{
            root: style.noBorderBtn,
          }}
          disabled={!hasDoneItem}
        >
          Clear completed
        </Button>
      </Box>
    </Box>
  );
}

export default Status;
