import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setStart,
  setMain,
  setModal,
} from "../../features/structure/structureSlice";

import { switchRU } from "../../features/options/optionsSlice";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

import Options from "../options/Options";

const Start = ({ startQuiz }) => {
  const { interfaceText } = useSelector((store) => store.options);
  const { modal } = useSelector((store) => store.structure);
  const dispatch = useDispatch();



  return (
    <div>
      <Typography variant="h1">{interfaceText.MAIN_TITLE}</Typography>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={() => {
          dispatch(setModal(false));
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
          <Options startQuiz={startQuiz} />
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
        {interfaceText.NORMAL_QUIZ}
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(setModal(true));
        }}
      >
        {interfaceText.OPTIONS}
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
