const output = document.querySelector(".inputField");
const keys = document.querySelectorAll(".key");
let outputText = [];
// const operators = ["+", "-", "*", "/"];
const keyArray = Array.from(keys);
//on click functions on buttons
for (let i = 0; i < keyArray.length; i++) {
  let currentKey = keyArray[i].innerHTML;
  keyArray[i].addEventListener("click", () => {
    // if (currentKey === "=") {
    //     const result = calculateExpression(outputText.join(""));
    //     output.innerHTML = result;
    //     outputText = [];
    // } else if (currentKey === "C") {
    //     outputText = [];
    //     output.innerHTML = "";
    // } else {
    //     // console.log("i am here");
    //     console.log(outputText);
    //     outputText.push(keyArray[i].innerHTML);
    //     output.innerHTML = outputText.join("");
    // }
    switch (currentKey) {
      case "=": {
        const result = calculateExpression(outputText.join(""));
        output.innerHTML = result;
        outputText = [];
        break;
      }
      case "C":{
        outputText = [];
        output.innerHTML = "";
        break;
      }
      default:
        outputText.push(keyArray[i].innerHTML);
        console.log(outputText);
        output.innerHTML = outputText.join("");
    }
  });
}
function calculateExpression(expression) {
  // Remove white spaces from the expression
  // expression = expression.replace(/\s/g, '');
  // Define arrays to store numbers and operators
  let numbers = [];
  let operators = [];
  // Helper function to perform arithmetic operations
  function performOperation() {
    const operator = operators.pop();
    const operand2 = numbers.pop();
    const operand1 = numbers.pop();
    switch (operator) {
      case "+":
        numbers.push(operand1 + operand2);
        break;
      case "-":
        numbers.push(operand1 - operand2);
        break;
      case "*":
        numbers.push(operand1 * operand2);
        break;
      case "/":
        numbers.push(operand1 / operand2);
        break;
    }
  }
  // Loop through each character in the expression
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    // If character is a digit, parse the number
    if (!isNaN(parseInt(char))) {
      let num = parseInt(char);
      // Check for multiple digits
      while (!isNaN(parseInt(expression[i + 1]))) {
        num = num * 10 + parseInt(expression[i + 1]);
        i++;
      }
      numbers.push(num);
    }
    // If character is an operator, push to operators array
    // else if (char === "+" || char === "-" || char === "*" || char === "/") {
    //     while (
    //         operators.length > 0 &&
    //         precedence(operators[operators.length - 1]) >= precedence(char)
    //     ) {
    //         performOperation();
    //     }
    //     operators.push(char);
    // }
  }
  // Perform remaining operations
  while (operators.length > 0) {
    performOperation();
  }
  // The result should be the only number left in the numbers array
  return numbers.pop();
}

// Helper function to determine operator precedence
function precedence(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}
// Test the function
// const result = calculateExpression("2+5-7*53+900/3");
// console.log(result);
// Output: -334
