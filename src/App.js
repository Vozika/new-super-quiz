import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { interfaceEN } from "./interface";
import Start from "./components/start/Start";
import Answers from "./components/answers/Answers";
import Counter from "./components/counter/Counter";
import Question from "./components/question/Question";
import Finish from "./components/finish/Finish";

import {
  oneItemToUsedData,
  spreadToUsedData,
  spreadToAnswers,
  pushToAnswers,
  randomizeAnswers,
  setQuestionText,
  setQuestionObject,
} from "./features/engine/engineSlice";

import {
  setScore,
  setRightAnswer,
  setWrongAnswer,
  setCurrentQuestion,
  clearScore,
  clearCurrentQuestion,
  clearRightAnswer,
  clearWrongAnswer,
} from "./features/score/scoreSlice";

import {
  setMain,
  setFinish,
  setStart,
} from "./features/structure/structureSlice";

import { setIsButtonClicked } from "./features/utilities/utilitiesSlice";

import Button from "@mui/material/Button";

function App() {
  const dispatch = useDispatch();
  const { start, main, finish } = useSelector((store) => store.structure);
  const { data, question, usedData } = useSelector((store) => store.engine);
  const { isButtonClicked } = useSelector((store) => store.utilities);
  const { currentQuestion } = useSelector((store) => store.score);
  const { numberOfQuestions, interfaceText, numberOfAnswers } = useSelector(
    (store) => store.options
  );

  // Standart function for a random number
  function getRandom(a) {
    const randomNumber = Math.floor(Math.random() * a);
    return randomNumber;
  }

  // Chooses randomly an object from the data array which will be the object of the question
  // StructuredClone makes a deep copy of an object
  function sliceItemFromData() {
    const randomNumber = getRandom(data.length);
    const itemFromData = structuredClone(
      data.slice(randomNumber, randomNumber + 1)[0]
    );
    itemFromData.isCorrect = true;
    console.log(Object.keys(itemFromData)[2]);
    return itemFromData;
  }

  function firstSlice() {
    const itemFromData = sliceItemFromData();
    dispatch(oneItemToUsedData(itemFromData));
  }

  //Checks if the usedData array already has an object, that has been used before in question
  // Prevents re-appearing of the same question object
  function checkUsedData() {
    const itemFromData = sliceItemFromData();

    const match = usedData.find((item) => item.id === itemFromData.id);

    if (match === undefined) {
      dispatch(spreadToUsedData(itemFromData));
    } else {
      checkUsedData();
    }
  }

  //Makes an array of 3 false answers plus one true
  function setAnswers() {
    const wrongAnswers = [];

    while (wrongAnswers.length < numberOfAnswers - 1) {
      const randomNumber = getRandom(data.length);
      const itemFromData = structuredClone(
        data.slice(randomNumber, randomNumber + 1)[0]
      );

      if (
        itemFromData.id !== usedData[usedData.length - 1].id &&
        wrongAnswers.find((item) => item.id === itemFromData.id) === undefined
      ) {
        itemFromData.isCorrect = false;
        wrongAnswers.push(itemFromData);
      } else {
        setAnswers();
      }
    }
    dispatch(spreadToAnswers(wrongAnswers));
    dispatch(pushToAnswers(usedData[usedData.length - 1]));
    dispatch(randomizeAnswers());
  }

  function setQuestion() {
    dispatch(setQuestionText(interfaceEN.QUESTION_TEXT));
    dispatch(
      setQuestionObject(usedData[usedData.length - 1].name.translations.en)
    );
  }

  function answerClicked(isCorrect) {
    if (!isButtonClicked) {
      if (isCorrect) {
        dispatch(setScore());
        dispatch(setRightAnswer());
      } else {
        dispatch(setWrongAnswer());
      }
    }
    dispatch(setIsButtonClicked(true));
    quiz();
  }

  function refreshUsedData() {
    if (usedData.length === data.length) {
      dispatch(oneItemToUsedData(usedData[usedData.length - 1]));
    }
  }

  function finishQuiz() {
    if (currentQuestion === numberOfQuestions.current && main) {
      dispatch(setMain(false));
      dispatch(setFinish(true));
      return;
    }
  }

  function clearAllScores() {
    dispatch(clearCurrentQuestion());
    dispatch(clearRightAnswer());
    dispatch(clearWrongAnswer());
    dispatch(clearScore());
  }

  function playAgain() {
    clearAllScores();
    dispatch(setFinish(false));
    dispatch(setMain(true));

    quiz();
  }

  function backToStart() {
    clearAllScores();
    main && dispatch(setMain(false));
    finish && dispatch(setFinish(false));
    dispatch(setStart(true));
  }

  useEffect(() => {
    firstSlice();
  }, []);

  useEffect(() => {
    refreshUsedData();
  }, [usedData]);

  function quiz() {
    finishQuiz();
    dispatch(setCurrentQuestion());
    dispatch(setIsButtonClicked(false));
    checkUsedData();
    setAnswers();
    setQuestion();
  }

  function startQuiz() {
    quiz();
  }

  return (
    <div className="App">
      {start && <Start startQuiz={startQuiz} />}
      {main && (
        <>
          <Question />
          <Answers answerClicked={answerClicked} /> <Counter />
          <Button variant="contained" onClick={() => backToStart()}>
            {interfaceText.BACK_TO_START}
          </Button>
        </>
      )}
      {finish && <Finish playAgain={playAgain} backToStart={backToStart} />}
    </div>
  );
}

export default App;
