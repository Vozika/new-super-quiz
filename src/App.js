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

import {
  setLessAnswers,
  setInterfaceText,
  setTranslations,
} from "./features/options/optionsSlice";

import { setIsButtonClicked } from "./features/utilities/utilitiesSlice";

function App() {
  const dispatch = useDispatch();
  const { start, main, finish } = useSelector((store) => store.structure);
  const { data, usedData, subject } = useSelector((store) => store.engine);
  const { isButtonClicked } = useSelector((store) => store.utilities);
  const { currentQuestion } = useSelector((store) => store.score);
  const {
    numberOfQuestions,
    numberOfAnswers,
    interfaceText,
    RU,
    translations,
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
    console.log(wrongAnswers);

    function wrong() {
      while (wrongAnswers.length < numberOfAnswers - 1) {
        const randomNumber = getRandom(data.length);
        const itemFromData = structuredClone(
          data.slice(randomNumber, randomNumber + 1)[0]
        );

        if (
          // itemFromData.id !== usedData[usedData.length - 1].id &&
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
    console.log(wrongAnswers);

    // Sets 2 wrong answers to hide when show5050 (in options) and lessAnswers (buttons) are active
    wrongAnswers[0].toHide = true;
    wrongAnswers[1].toHide = true;

    dispatch(spreadToAnswers(wrongAnswers));
    dispatch(pushToAnswers(usedData[usedData.length - 1]));
    dispatch(randomizeAnswers());
  }

  function setQuestion() {
    dispatch(setQuestionText(interfaceText.QUESTION_TEXT));
    dispatch(
      setQuestionObject(
        usedData[usedData.length - 1].name.translations[translations]
      )
    );
    console.log(usedData[usedData.length - 1].name[translations]);
    console.log(usedData[usedData.length - 1].name);
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
    dispatch(setLessAnswers(false));
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
    if (!RU) {
      dispatch(setInterfaceText(interfaceEN));
      dispatch(setTranslations("en"));
    }
  });

  useEffect(() => {
    if (RU) {
      dispatch(setInterfaceText(interfaceRU));
      dispatch(setTranslations("ru"));
    }
  });

  useEffect(() => {
    refreshUsedData();
  }, [usedData]);

  function quiz() {
    finishQuiz();
    dispatch(setCurrentQuestion());
    checkUsedData();
    setAnswers();
    setQuestion();
    dispatch(setIsButtonClicked(false));
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
          <Buttons backToStart={backToStart} />
        </>
      )}
      {finish && <Finish playAgain={playAgain} backToStart={backToStart} />}
    </div>
  );
}

export default App;
