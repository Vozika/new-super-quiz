import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

const Finish = () => {
  const { numberOfQuestions, interfaceText } = useSelector(
    (store) => store.options
  );
  const { rightAnswer } = useSelector((store) => store.score);
  return <div>
    <Typography variant="h5">
        {rightAnswer} {interfaceText.OUT_OF} {numberOfQuestions}{" "}
        {interfaceText.QUESTIONS_CORRECT}
        <br />
        
      </Typography>
  </div>;
};

export default Finish;
