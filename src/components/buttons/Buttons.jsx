import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import { switchLessAnswers } from "../../features/options/optionsSlice";

const Buttons = ({ backToStart }) => {
  const dispatch = useDispatch();
  const { show5050, interfaceText, lessAnswers } = useSelector(
    (store) => store.options
  );

  return (
    <div>
      <Stack>
        {show5050 && (
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(switchLessAnswers());
              console.log(lessAnswers);
            }}
          >
            {interfaceText.BUTTON_5050}
          </Button>
        )}

        <Button variant="contained" onClick={() => backToStart()}>
          {interfaceText.BACK_TO_START}
        </Button>
      </Stack>
    </div>
  );
};

export default Buttons;