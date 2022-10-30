import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Answers = ({ startQuiz }) => {
  const dispatch = useDispatch();
  const { question, usedData } = useSelector((store) => store.engine);
  const { start, main, finish } = useSelector((store) => store.structure);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          startQuiz();
        }}
      >
        Start
      </Button>

      {question.answers.map((answer) => {
        return (
          <Button variant="contained" key={answer.id}>
            {answer.capital.translations.en}
          </Button>
        );
      })}
    </div>
  );
};

export default Answers;
