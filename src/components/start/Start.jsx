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

const Start = ({ startQuiz, toLocalStorage }) => {
  const { interfaceText, options } = useSelector((store) => store.options);
  const { modal } = useSelector((store) => store.structure);
  const { statistics } = useSelector((store) => store.utilities);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h1">{interfaceText.MAIN_TITLE}</Typography>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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

      <Button
        variant="contained"
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
        onClick={() => {
          dispatch(setOptions(true));
          dispatch(setModal(true));
        }}
      >
        {interfaceText.OPTIONS}
      </Button>
      <Button
        variant="outlined"
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
        onClick={() => {
          dispatch(switchRU(true));
        }}
      >
        {interfaceText.CHANGE_LANGUAGE}
      </Button>
    </div>
  );
};

export default Start;
