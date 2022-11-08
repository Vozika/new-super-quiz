import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styles } from "../../styles";

import { setQuestionColor } from "../../features/engine/engineSlice";
import { Stack } from "@mui/material";

const Answers = ({ answerClicked }) => {
  const dispatch = useDispatch();
  const { question, subject } = useSelector((store) => store.engine);
  const { lessAnswers, hideLetters, translations } = useSelector(
    (store) => store.options
  );
  const { isButtonClicked } = useSelector((store) => store.utilities);

  return (
    <Stack sx={styles.stack}>
      {question.answers.map((answer) => {
        const buttonText = answer[subject].translations[translations];
        const hiddenButtonText =
          buttonText[0] +
          buttonText.slice(1, buttonText.length - 1).replaceAll(/\S/g, "*") +
          buttonText.slice(-1);

        return (
          <Button
            variant="contained"
            key={answer.id}
            sx={{
              ...styles.btn,
              display: answer.toHide && lessAnswers ? "none" : "inline",
            }}
            color={
              isButtonClicked && answer.isCorrect
                ? "success"
                : isButtonClicked && !answer.isCorrect && answer.color
                ? "error"
                : "primary"
            }
            onClick={() => {
              dispatch(
                setQuestionColor(
                  question.answers.findIndex((x) => x === answer)
                )
              );
              !isButtonClicked && answerClicked(answer.isCorrect);
            }}
          >
            {!hideLetters
              ? buttonText
              : hideLetters && answer.isCorrect && isButtonClicked
              ? buttonText
              : hiddenButtonText}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Answers;
