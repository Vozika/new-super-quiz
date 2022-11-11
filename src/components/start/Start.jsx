import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setStart,
  setMain,
  setModal,
} from "../../features/structure/structureSlice";

import { switchRU, setOptions } from "../../features/options/optionsSlice";
import {
  setStatistics,
  setLocalStorageData,
} from "../../features/utilities/utilitiesSlice";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

import Options from "../options/Options";
import Statistics from "../statistics/Statistics";

import { styles } from "../../styles";
import { Stack } from "@mui/material";

const Start = ({ startQuiz, toLocalStorage }) => {
  const { interfaceText, options } = useSelector((store) => store.options);
  const { modal } = useSelector((store) => store.structure);
  const { statistics } = useSelector((store) => store.utilities);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h2">{interfaceText.MAIN_TITLE}</Typography>

      <Modal
        sx={styles.modal}
        open={modal}
        onClose={() => {
          dispatch(setStatistics(false));
          dispatch(setOptions(false));
          dispatch(setModal(false));
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
          {options && <Options startQuiz={startQuiz} />}
          {statistics && <Statistics toLocalStorage={toLocalStorage} />}
        </>
      </Modal>
      <Stack sx={styles.stack}>
        <Button
          variant="contained"
          sx={styles.btn}
          onClick={() => {
            dispatch(setStart(false));
            dispatch(setMain(true));
            startQuiz();
          }}
        >
          {interfaceText.START_QUIZ}
        </Button>
        <Button
          variant="outlined"
          sx={styles.btn}
          onClick={() => {
            dispatch(setOptions(true));
            dispatch(setStatistics(false));
            dispatch(setModal(true));
          }}
        >
          {interfaceText.OPTIONS}
        </Button>
        <Button
          variant="outlined"
          sx={styles.btn}
          onClick={() => {
            dispatch(setLocalStorageData());
            dispatch(setStatistics(true));
            dispatch(setModal(true));
          }}
        >
          {interfaceText.STATISTICS}
        </Button>
        <Button
          variant="outlined"
          sx={styles.btn}
          onClick={() => {
            dispatch(switchRU(true));
          }}
        >
          {interfaceText.CHANGE_LANGUAGE}
        </Button>
      </Stack>
    </div>
  );
};

export default Start;
