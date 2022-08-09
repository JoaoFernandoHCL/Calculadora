const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = window.document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const interDigits = parseFloat(stringNumber.split(".")[0]);
    const decimal = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(interDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = interDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimal != null) {
      return `${integerDisplay}.${decimal}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const floatPreviousOperand = parseFloat(this.previousOperand);
    const floatCurrentOperand = parseFloat(this.currentOperand);

    if (isNaN(floatPreviousOperand) || isNaN(floatCurrentOperand)) return;
    switch (this.operation) {
      case "+":
        result = floatPreviousOperand + floatCurrentOperand;
        break;
      case "-":
        result = floatPreviousOperand - floatCurrentOperand;
        break;
      case "÷":
        result = floatPreviousOperand / floatCurrentOperand;
        break;
      case "x":
        result = floatPreviousOperand * floatCurrentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButtton of numberButtons) {
  numberButtton.addEventListener("click", () => {
    calculator.appendNumber(numberButtton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
