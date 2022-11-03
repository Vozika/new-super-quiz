import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Finish = ({ playAgain, backToStart }) => {
  const { numberOfQuestions, interfaceText } = useSelector(
    (store) => store.options
  );
  const { rightAnswer } = useSelector((store) => store.score);
  return (
    <div>
      <Typography variant="h5">
        {rightAnswer} {interfaceText.OUT_OF} {numberOfQuestions.current}{" "}
        {interfaceText.QUESTIONS_CORRECT}
        <br />
      </Typography>
      <Button variant="contained" onClick={() => playAgain()}>
        {interfaceText.PLAY_AGAIN}
      </Button>
      <Button variant="contained" onClick={() => backToStart()}>
        {interfaceText.BACK_TO_START}
      </Button>
    </div>
  );
};

export default Finish;
