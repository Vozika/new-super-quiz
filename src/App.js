import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Start from "./components/start/Start";
import Answers from "./components/answers/Answers";

import {
  firstUsedData,
  spreadToUsedData,
  spreadToAnswers,
  pushToAnswers,
  randomizeAnswers,
} from "./features/engine/engineSlice";

function App() {
  const dispatch = useDispatch();
  const { start, main, finish } = useSelector((store) => store.structure);
  const { data, question, usedData } = useSelector((store) => store.engine);
  // const [usedData, setUsedData] = useState([]);

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

    return itemFromData;
  }

  function firstSlice() {
    const itemFromData = sliceItemFromData();
    dispatch(firstUsedData(itemFromData));
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

  function answers() {
    const wrongAnswers = [];

    while (wrongAnswers.length < 3) {
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
        answers();
      }
    }
    dispatch(spreadToAnswers(wrongAnswers));
    dispatch(pushToAnswers(usedData[usedData.length - 1]));
    dispatch(randomizeAnswers());
  }

  useEffect(() => {
    firstSlice();
  }, []);

  function quiz() {
    checkUsedData();
    answers();
  }

  function startQuiz() {
    quiz();
  }

  console.log(usedData);

  return (
    <div className="App">
      {start && <Start startQuiz={startQuiz} />}
      {main && <Answers startQuiz={startQuiz} />}
    </div>
  );
}

export default App;
