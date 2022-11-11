import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import {
  setNumberOfQuestions,
  switchFlip,
  switchShow5050,
  switchHideLetters,
  setOptions,
  setStatistics,
  switchRegion,
  switchIronMan,
} from "../../features/options/optionsSlice";

import {
  setStart,
  setMain,
  setModal,
} from "../../features/structure/structureSlice";

import { styles } from "../../styles";

const Options = ({ startQuiz }) => {
  const dispatch = useDispatch();

  const {
    interfaceText,
    numberOfQuestions,
    show5050,
    hideLetters,
    flip,
    region,
    ironMan,
  } = useSelector((store) => store.options);

  return (
    <Box sx={styles.options__box}>
      <Stack sx={styles.options__stack_cancelIcon}>
        <CancelIcon
          onClick={() => {
            dispatch(setOptions(false));
            dispatch(setModal(false));
          }}
        />
      </Stack>
      <Typography variant="h3" sx={{ position: "relative", top: -5, mb: 1 }}>
        {interfaceText.OPTIONS}
      </Typography>

      <Typography sx={styles.options_title}>
        {interfaceText.NUMBER_OF_QUESTIONS}
      </Typography>

      <FormControl>
        <RadioGroup
          row
          sx={{
            m: 0,
            p: 0,
            justifyContent: "center",
            backgroundColor: "white",
            position: "relative",
            left: 9,
          }}
        >
          {numberOfQuestions.options.map((option) => {
            return (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={{ m: 0.5, p: 0 }} />}
                label={option}
                checked={numberOfQuestions.current === option ? true : false}
                onChange={() => {
                  dispatch(setNumberOfQuestions(option));
                }}
              />
            );
          })}
        </RadioGroup>

        <Divider sx={styles.divider_first} />

        <FormControlLabel
          sx={styles.options_title}
          disableTypography
          control={<Checkbox />}
          label={interfaceText.SHOW5050}
          checked={show5050 && !ironMan ? true : false}
          disabled={ironMan ? true : false}
          onChange={() => dispatch(switchShow5050())}
        />
        <Typography>{interfaceText.SHOW5050_DESC}</Typography>

        <Divider sx={styles.divider} />

        <FormControlLabel
          sx={styles.options_title}
          disableTypography
          control={<Checkbox />}
          label={interfaceText.FLIP}
          checked={flip ? true : false}
          onChange={() => {
            dispatch(switchFlip());
          }}
        />
        <Typography>{interfaceText.FLIP_DESC}</Typography>

        <Divider sx={styles.divider} />

        <FormControlLabel
          sx={styles.options_title}
          disableTypography
          control={<Checkbox />}
          label={interfaceText.REGION}
          checked={region ? true : false}
          onChange={() => {
            dispatch(switchRegion());
          }}
        />
        <Typography>{interfaceText.REGION_DESC}</Typography>

        <Divider sx={styles.divider} />

        <FormControlLabel
          sx={styles.options_title}
          disableTypography
          control={<Checkbox />}
          label={interfaceText.HIDE_LETTERS}
          checked={hideLetters ? true : false}
          onChange={() => dispatch(switchHideLetters())}
        />
        <Typography>{interfaceText.HIDE_LETTERS_DESC}</Typography>

        <Divider sx={styles.divider} />

        <FormControlLabel
          sx={styles.options_title}
          disableTypography
          control={<Checkbox />}
          label={interfaceText.IRON_MAN_MODE}
          checked={ironMan ? true : false}
          onChange={() => {
            dispatch(switchIronMan());
          }}
        />
        <Typography>{interfaceText.IRON_MAN_MODE_DESC}</Typography>
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setOptions(false));
          dispatch(setModal(false));
          dispatch(setStart(false));
          dispatch(setMain(true));
          startQuiz();
        }}
      >
        {interfaceText.START_QUIZ}
      </Button>
      <br />
      <br />
    </Box>
  );
};

export default Options;
