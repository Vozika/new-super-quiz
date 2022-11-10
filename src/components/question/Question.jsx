import React from "react";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const Question = () => {
  const { question } = useSelector((store) => store.engine);
  const { currentQuestion } = useSelector((store) => store.score);
  const { numberOfQuestions, interfaceText } = useSelector(
    (store) => store.options
  );

  const objectLength = question.object.length;

  const question_object = {
    color: "#707070",
    fontWeight: "600",
    marginBottom: 2,
    p: 0,
    fontSize: {
      xs: objectLength > 14 ? 30 : objectLength > 18 ? 20 : 48,
      sm: 50,
      xl: 70,
    },
    lineHeight: {
      xs: 1.1,
    },
  };

  return (
    <div>
      <Chip
        variant="outlined"
        label={`${currentQuestion} ${interfaceText.OUT_OF} ${numberOfQuestions.current}`}
      />
      <Typography variant="h5" sx={{ marginTop: 2, p: 0 }}>
        {question.text}
      </Typography>
      <Typography sx={question_object}>{question.object}</Typography>
    </div>
  );
};

export default Question;
