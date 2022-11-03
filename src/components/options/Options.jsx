import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import {
  setNumberOfQuestions,
  setFlip,
  switchShow5050,
  setHideLetters,
  setOptions,
} from "../../features/options/optionsSlice";

import {
  setStart,
  setMain,
  setModal,
} from "../../features/structure/structureSlice";

const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(100%, 700px)",
  bgcolor: "background.paper",
  border: "1px solid #bdbdbd",
  boxShadow: 24,
  p: 3,
};

const Options = ({ startQuiz }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.engine);
  const { interfaceText, numberOfQuestions, show5050 } = useSelector(
    (store) => store.options
  );

  return (
    <Box sx={style}>
      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ width: "100%", bgcolor: "#bdbdbd" }}
        >
          <CardHeader
            sx={{
              fontSize: "1.3rem",
              margin: 0,
              textAlign: "left",
            }}
            disableTypography
            title={interfaceText.OPTIONS}
            avatar={
              <Avatar sx={{ bgcolor: "#dd3131" }} aria-label="options">
                <SettingsIcon />
              </Avatar>
            }
          ></CardHeader>
          <CancelIcon
            sx={{ marginRight: 2 }}
            onClick={() => {
              dispatch(setOptions(false));
              dispatch(setModal(false));
            }}
          />
        </Stack>

        <CardContent>
          <FormControl sx={{ margin: 0 }}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ margin: 0 }}
            >
              <Typography
                sx={{
                  marginTop: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {interfaceText.NUMBER_OF_QUESTIONS}
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {numberOfQuestions.options.map((option) => {
                return (
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option}
                    checked={
                      numberOfQuestions.current === option ? true : false
                    }
                    onChange={() => {
                      dispatch(setNumberOfQuestions(option));
                    }}
                  />
                );
              })}
            </RadioGroup>

            <Divider sx={{ margin: "0.5em 0" }} />

            <FormControlLabel
              sx={{
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
              disableTypography
              control={<Checkbox />}
              label={interfaceText.FLIP}
              onChange={() => {
                dispatch(setFlip());
              }}
            />
            <Typography sx={{ fontSize: "1rem", marginBottom: 0 }}>
              {interfaceText.FLIP_DESC}
            </Typography>

            <Divider sx={{ margin: "0.7em 0" }} />

            <FormControlLabel
              sx={{
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
              disableTypography
              control={<Checkbox />}
              label={interfaceText.SHOW5050}
              checked={show5050 ? true : false}
              onChange={() => dispatch(switchShow5050())}
            />
            <Typography sx={{ fontSize: "1rem", marginBottom: 0 }}>
              {interfaceText.SHOW5050_DESC}
            </Typography>

            <Divider sx={{ margin: "0.7em 0" }} />

            <FormControlLabel
              sx={{
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
              disableTypography
              control={<Checkbox />}
              label={interfaceText.HIDE_LETTERS}
              onChange={() => dispatch(setHideLetters())}
            />
            <Typography sx={{ fontSize: "1rem", marginBottom: 0 }}>
              {interfaceText.HIDE_LETTERS_DESC}
            </Typography>
          </FormControl>
        </CardContent>
      </Card>
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
    </Box>
  );
};

export default Options;
