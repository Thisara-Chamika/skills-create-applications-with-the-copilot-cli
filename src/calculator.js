#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation
 * - square root
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
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
    case 'modulo':
    case 'mod':
    case '%':
      return modulo(left, right);
    case 'power':
    case '^':
      return power(left, right);
    case 'squareRoot':
    case 'sqrt':
      return squareRoot(left);
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use add, subtract, multiply, divide, modulo, power, or squareRoot.`
      );
  }
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <left> [right]');
  console.log('Operations: add, subtract, multiply, divide, modulo, power, squareRoot');
  console.log('Aliases: +, -, *, x, X, /, %, ^, sqrt');
}

function main(argv) {
  const [operation, leftValue, rightValue] = argv.slice(2);
  const unaryOperations = new Set(['squareRoot', 'sqrt']);

  if (
    !operation ||
    leftValue === undefined ||
    (!unaryOperations.has(operation) && rightValue === undefined)
  ) {
    printUsage();
    return;
  }

  const left = parseNumber(leftValue, 'left operand');
  const result = unaryOperations.has(operation)
    ? calculate(operation, left)
    : calculate(operation, left, parseNumber(rightValue, 'right operand'));

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
  modulo,
  power,
  squareRoot,
  calculate,
  parseNumber,
  main,
};
