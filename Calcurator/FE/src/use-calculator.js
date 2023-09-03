import { useState } from "react";
export const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [result, setResult] = useState(0);
  const [tempInput, setTempInput] = useState(0);
  const [tempOperator, setTempOperator] = useState(null);
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      let finalInput = isClickedEqual ? tempInput : input;
      let finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(0);
      setTempInput(0);
      setTempOperator(null);
    }
  };
  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
