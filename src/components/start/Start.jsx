import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setStart, setMain } from "../../features/structure/structureSlice";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Start = ({ startQuiz }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography variant="h1">NEW SUPER QUIZ</Typography>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setStart(false));
          dispatch(setMain(true));
          startQuiz();
        }}
      >
        Start
      </Button>
    </div>
  );
};

export default Start;
