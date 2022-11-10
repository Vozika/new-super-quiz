import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { styles } from "../../styles";

const Finish = ({ playAgain, backToStart }) => {
  const { numberOfQuestions, interfaceText } = useSelector(
    (store) => store.options
  );
  const { rightAnswer } = useSelector((store) => store.score);
  return (
    <Stack>
      <Typography variant="h5">
        {rightAnswer} {interfaceText.OUT_OF} {numberOfQuestions.current}{" "}
        {interfaceText.QUESTIONS_CORRECT}
        <br />
      </Typography>
      <Stack sx={styles.stack}>
        <Button variant="contained" sx={styles.btn} onClick={() => playAgain()}>
          {interfaceText.PLAY_AGAIN}
        </Button>
        <Button
          variant="outlined"
          sx={styles.btn}
          onClick={() => backToStart()}
        >
          {interfaceText.BACK_TO_START}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Finish;
