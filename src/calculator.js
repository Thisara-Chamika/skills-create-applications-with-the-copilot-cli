#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function parseNumber(value, name) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${name}: "${value}" is not a number.`);
  }

  return parsed;
}

function calculate(operation, left, right) {
  switch (operation) {
    case 'add':
    case '+':
      return add(left, right);
    case 'subtract':
    case '-':
      return subtract(left, right);
    case 'multiply':
    case '*':
    case 'x':
    case 'X':
      return multiply(left, right);
    case 'divide':
    case '/':
      return divide(left, right);
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use add, subtract, multiply, or divide.`
      );
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <left> <right>');
  console.log('Operations: add, subtract, multiply, divide');
  console.log('Aliases: +, -, *, x, X, /');
}

function main(argv) {
  const [operation, leftValue, rightValue] = argv.slice(2);

  if (!operation || leftValue === undefined || rightValue === undefined) {
    printUsage();
    return;
  }

  const left = parseNumber(leftValue, 'left operand');
  const right = parseNumber(rightValue, 'right operand');
  const result = calculate(operation, left, right);

  console.log(result);
}

if (require.main === module) {
  try {
    main(process.argv);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  parseNumber,
  main,
};
