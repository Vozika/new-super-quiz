import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const Question = () => {
  const { question } = useSelector((store) => store.engine);
  const { currentQuestion } = useSelector((store) => store.score);
  const { numberOfQuestions, flip, interfaceText } = useSelector(
    (store) => store.options
  );

  return (
    <div>
      <Chip
        variant="outlined"
        label={`${currentQuestion} ${interfaceText.OUT_OF} ${numberOfQuestions.current}`}
      />
      <Typography variant="h4">{question.text}</Typography>
      <Typography variant="h4" sx={{ marginTop: 1 }}>
        {question.object}
      </Typography>
    </div>
  );
};

export default Question;
