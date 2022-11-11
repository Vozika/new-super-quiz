import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { interfaceEN } from "./interface";
import { interfaceRU } from "./interface";
import Start from "./components/start/Start";
import Answers from "./components/answers/Answers";
import Counter from "./components/counter/Counter";
import Question from "./components/question/Question";
import Finish from "./components/finish/Finish";
import Buttons from "./components/buttons/Buttons";

import { styles } from "./styles";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import {
  oneItemToUsedData,
  spreadToUsedData,
  spreadToAnswers,
  pushToAnswers,
  randomizeAnswers,
  setQuestionText,
  setQuestionObject,
  setSubject,
  setObject,
  clearUsedData,
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

import {
  setLessAnswers,
  setInterfaceText,
  setTranslations,
  setShow5050,
} from "./features/options/optionsSlice";

import {
  setIsButtonClicked,
  setLocalStorageData,
  setShowFade
} from "./features/utilities/utilitiesSlice";

function App() {
  const dispatch = useDispatch();

  const { start, main, finish } = useSelector((store) => store.structure);
  const { data, usedData, subject, object } = useSelector(
    (store) => store.engine
  );
  const { isButtonClicked, localStorageData } = useSelector(
    (store) => store.utilities
  );
  const { currentQuestion } = useSelector((store) => store.score);
  const {
    numberOfQuestions,
    numberOfAnswers,
    interfaceText,
    RU,
    translations,
    flip,
    region,
    ironMan,
    lessAnswers,
  } = useSelector((store) => store.options);

  // Standart function for a random number
  function getRandom(a) {
    const randomNumber = Math.floor(Math.random() * a);
    return randomNumber;
  }

  //This is a more complex solution, but I decided to use it just for education and experience:-)
  //Sets propety named 'color' for object that goes to question.answers
  //For making different color buttons in Answers.jsx
  function propetyUsingObject(object) {
    Object.defineProperties(object, {
      color: {
        value: false,
        writable: true,
      },
    });
  }

  // Chooses randomly an object from the data array which will be the object of the question
  // StructuredClone makes a deep copy of an object
  function sliceItemFromData() {
    const randomNumber = getRandom(data.length);
    const itemFromData = structuredClone(
      data.slice(randomNumber, randomNumber + 1)[0]
    );
    itemFromData.isCorrect = true;
    propetyUsingObject(itemFromData);

    return itemFromData;
  }

  function firstSlice() {
    const itemFromData = sliceItemFromData();
    propetyUsingObject(itemFromData);
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

    function wrong() {
      while (wrongAnswers.length < numberOfAnswers - 1) {
        const randomNumber = getRandom(data.length);
        const itemFromData = structuredClone(
          data.slice(randomNumber, randomNumber + 1)[0]
        );

        if (
          //For flip and region both
          itemFromData[object].translations.en !==
            usedData[usedData.length - 1][object].translations.en &&
          itemFromData[subject].translations.en !==
            usedData[usedData.length - 1][subject].translations.en &&
          wrongAnswers.find(
            (item) =>
              item[subject].translations.en ===
              itemFromData[subject].translations.en
          ) === undefined
        ) {
          itemFromData.isCorrect = false;
          propetyUsingObject(itemFromData);
          wrongAnswers.push(itemFromData);
        } else {
          wrong();
        }
      }
    }
    wrong();

    // Sets 2 wrong answers to hide when show5050 (in options) and lessAnswers (buttons) are active
    wrongAnswers[0].toHide = true;
    wrongAnswers[1].toHide = true;

    dispatch(spreadToAnswers(wrongAnswers));
    dispatch(pushToAnswers(usedData[usedData.length - 1]));
    dispatch(randomizeAnswers());
  }

  function questionText() {
    let questionText = "";

    switch (true) {
      case flip && region:
        questionText = interfaceText.QUESTION_REGION_TEXT_FLIP;
        break;
      case flip:
        questionText = interfaceText.QUESTION_TEXT_FLIP;
        break;
      case region:
        questionText = interfaceText.QUESTION_REGION_TEXT;
        break;
      default:
        questionText = interfaceText.QUESTION_TEXT;
    }
    return questionText;
  }

  function setQuestion() {
    dispatch(setQuestionText(questionText()));
    dispatch(
      setQuestionObject(
        usedData[usedData.length - 1][object].translations[translations]
      )
    );
  }

  function answerClicked(isCorrect) {
    if (!isButtonClicked) {
      if (lessAnswers) {
        localStorage.option5050 = Number(localStorage.option5050) + 1;
      }
      if (isCorrect) {
        dispatch(setScore());
        dispatch(setRightAnswer());
        localStorage.rightAnswers = Number(localStorage.rightAnswers) + 1;
      } else {
        localStorage.wrongAnswers = Number(localStorage.wrongAnswers) + 1;
        if (ironMan) {
          setTimeout(() => {
            finishIronMan();
          }, 900);
        }

        dispatch(setWrongAnswer());
      }
    }
    dispatch(setShowFade(false));
    setTimeout(() => {
      dispatch(setLessAnswers(false));
      quiz();
    }, 900);
    dispatch(setIsButtonClicked(true));
  }

  function refreshUsedData() {
    if (usedData.length === data.length) {
      dispatch(oneItemToUsedData(usedData[usedData.length - 1]));
    }
  }

  function ironManToLocalStorage() {
    if (currentQuestion > localStorage.getItem("ironManStreak")) {
      if (currentQuestion === numberOfQuestions.current && main) {
        localStorage.setItem("ironManStreak", currentQuestion);
      } else {
        localStorage.setItem("ironManStreak", currentQuestion - 1);
      }
    }
  }

  function finishQuiz() {
    if (currentQuestion === numberOfQuestions.current && main) {
      localStorage.gamesFinished = Number(localStorage.gamesFinished) + 1;
      if (ironMan) {
        ironManToLocalStorage();
      }
      dispatch(setMain(false));
      dispatch(setFinish(true));
      return;
    }
  }

  function finishIronMan() {
    ironManToLocalStorage();
    dispatch(setMain(false));
    dispatch(setFinish(true));
    return;
  }

  function clearAllScores() {
    dispatch(clearCurrentQuestion());
    dispatch(clearRightAnswer());
    dispatch(clearWrongAnswer());
    dispatch(clearScore());
    dispatch(setLessAnswers(false));
  }

  function playAgain() {
    if (ironMan) {
      localStorage.ironManAttempts = Number(localStorage.ironManAttempts) + 1;
    }
    clearAllScores();
    clearAndRefresh();
    dispatch(setFinish(false));
    dispatch(setMain(true));
    quiz();
  }

  function backToStart() {
    clearAllScores();
    clearAndRefresh();
    main && dispatch(setMain(false));
    finish && dispatch(setFinish(false));
    dispatch(setStart(true));
  }

  function toLocalStorage() {
    Object.keys(localStorageData).map(
      (data) => !localStorage.getItem(data) && localStorage.setItem(data, 0)
    );
  }

  //For 195 questions option (or all the items in data). Refreshes usedData array to prevent appearing items twice
  function clearAndRefresh() {
    if (numberOfQuestions.current === data.length) {
      dispatch(clearUsedData());
      firstSlice();
    }
  }

  function quiz() {
    dispatch(setShowFade(true));
    finishQuiz();
    dispatch(setCurrentQuestion());
    checkUsedData();
    setAnswers();
    setQuestion();
    dispatch(setIsButtonClicked(false));
  }

  function startQuiz() {
    if (ironMan) {
      localStorage.ironManAttempts = Number(localStorage.ironManAttempts) + 1;
    }
    
    quiz();
  }

  useEffect(() => {
    clearAndRefresh();
  }, [numberOfQuestions.current]);

  useEffect(() => {
    firstSlice();
  }, []);

  useEffect(() => {
    setLocalStorageData();
  }, []);

  useEffect(() => {
    toLocalStorage();
  }, []);

  useEffect(() => {
    if (flip && !region) {
      dispatch(setSubject("name"));
      dispatch(setObject("capital"));
    } else if (flip && region) {
      dispatch(setSubject("name"));
      dispatch(setObject("region"));
    } else if (region) {
      dispatch(setSubject("region"));
      dispatch(setObject("name"));
    } else {
      dispatch(setSubject("capital"));
      dispatch(setObject("name"));
    }
  });

  useEffect(() => {
    if (!RU) {
      dispatch(setInterfaceText(interfaceEN));
      dispatch(setTranslations("en"));
    }
    if (RU) {
      dispatch(setInterfaceText(interfaceRU));
      dispatch(setTranslations("ru"));
    }
  });

  useEffect(() => {
    if (ironMan) {
      dispatch(setShow5050(false));
    }
  });

  useEffect(() => {
    refreshUsedData();
  }, [usedData]);

  return (
    <div className="App">
      <Box sx={styles.box}>
        {start && (
          <Start startQuiz={startQuiz} toLocalStorage={toLocalStorage} />
        )}
        {main && (
          <Stack>
            <Question />
            <Answers answerClicked={answerClicked} />
            <Counter />
            <Buttons backToStart={backToStart} />
          </Stack>
        )}
        {finish && <Finish playAgain={playAgain} backToStart={backToStart} />}
      </Box>
    </div>
  );
}

export default App;
