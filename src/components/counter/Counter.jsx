import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";

const Counter = () => {
  const { rightAnswer, wrongAnswer } = useSelector((store) => store.score);
  const { interfaceText } = useSelector((store) => store.options);

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">{interfaceText.RIGHT}</Typography>
          <Avatar sx={{ width: 50, height: 50 }}>{rightAnswer}</Avatar>
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">{interfaceText.WRONG}</Typography>
          <Avatar sx={{ width: 50, height: 50 }}>{wrongAnswer}</Avatar>
        </Stack>
      </Stack>
    </div>
  );
};

export default Counter;
