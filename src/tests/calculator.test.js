const calculator = require('../calculator');

describe('calculator arithmetic functions', () => {
  it('adds numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
    expect(calculator.add(-4, 9)).toBe(5);
  });

  it('subtracts numbers', () => {
    expect(calculator.subtract(10, 4)).toBe(6);
    expect(calculator.subtract(3, 8)).toBe(-5);
  });

  it('multiplies numbers', () => {
    expect(calculator.multiply(45, 2)).toBe(90);
    expect(calculator.multiply(-3, 6)).toBe(-18);
  });

  it('divides numbers', () => {
    expect(calculator.divide(20, 5)).toBe(4);
    expect(calculator.divide(9, 2)).toBe(4.5);
  });

  it('rejects division by zero', () => {
    expect(() => calculator.divide(10, 0)).toThrow(
      'Division by zero is not allowed.'
    );
  });

  it('calculates modulo', () => {
    expect(calculator.modulo(20, 6)).toBe(2);
    expect(calculator.modulo(45, 7)).toBe(3);
  });

  it('rejects modulo by zero', () => {
    expect(() => calculator.modulo(10, 0)).toThrow(
      'Modulo by zero is not allowed.'
    );
  });

  it('calculates power', () => {
    expect(calculator.power(2, 3)).toBe(8);
    expect(calculator.power(9, 0.5)).toBe(3);
  });

  it('calculates square root', () => {
    expect(calculator.squareRoot(81)).toBe(9);
    expect(calculator.squareRoot(2)).toBeCloseTo(Math.sqrt(2));
  });

  it('rejects square root of negative numbers', () => {
    expect(() => calculator.squareRoot(-1)).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });
});

describe('calculator helpers', () => {
  it('parses valid numbers', () => {
    expect(calculator.parseNumber('12', 'left operand')).toBe(12);
    expect(calculator.parseNumber('-3.5', 'right operand')).toBe(-3.5);
  });

  it('rejects invalid numbers', () => {
    expect(() => calculator.parseNumber('abc', 'left operand')).toThrow(
      'Invalid left operand: "abc" is not a number.'
    );
  });
});

describe('calculator operation dispatcher', () => {
  it('dispatches supported operations', () => {
    expect(calculator.calculate('add', 2, 3)).toBe(5);
    expect(calculator.calculate('+', 2, 3)).toBe(5);
    expect(calculator.calculate('subtract', 10, 4)).toBe(6);
    expect(calculator.calculate('-', 10, 4)).toBe(6);
    expect(calculator.calculate('multiply', 45, 2)).toBe(90);
    expect(calculator.calculate('*', 45, 2)).toBe(90);
    expect(calculator.calculate('divide', 20, 5)).toBe(4);
    expect(calculator.calculate('/', 20, 5)).toBe(4);
    expect(calculator.calculate('modulo', 20, 6)).toBe(2);
    expect(calculator.calculate('mod', 20, 6)).toBe(2);
    expect(calculator.calculate('%', 20, 6)).toBe(2);
    expect(calculator.calculate('power', 2, 4)).toBe(16);
    expect(calculator.calculate('^', 2, 4)).toBe(16);
    expect(calculator.calculate('squareRoot', 81)).toBe(9);
    expect(calculator.calculate('sqrt', 81)).toBe(9);
  });

  it('rejects unsupported operations', () => {
    expect(() => calculator.calculate('noop', 1, 2)).toThrow(
      'Unsupported operation "noop". Use add, subtract, multiply, divide, modulo, power, or squareRoot.'
    );
  });
});

describe('calculator CLI entry point', () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

  afterEach(() => {
    logSpy.mockClear();
  });

  it('prints usage when arguments are missing', () => {
    calculator.main(['node', 'src/calculator.js']);

    expect(logSpy).toHaveBeenNthCalledWith(
      1,
      'Usage: node src/calculator.js <operation> <left> [right]'
    );
    expect(logSpy).toHaveBeenNthCalledWith(
      2,
      'Operations: add, subtract, multiply, divide, modulo, power, squareRoot'
    );
    expect(logSpy).toHaveBeenNthCalledWith(
      3,
      'Aliases: +, -, *, x, X, /, %, ^, sqrt'
    );
  });

  it('prints the computed result', () => {
    calculator.main(['node', 'src/calculator.js', 'add', '2', '3']);

    expect(logSpy).toHaveBeenCalledWith(5);
  });

  it('prints the computed square root', () => {
    calculator.main(['node', 'src/calculator.js', 'sqrt', '81']);

    expect(logSpy).toHaveBeenCalledWith(9);
  });

  it('throws on invalid numeric input', () => {
    expect(() =>
      calculator.main(['node', 'src/calculator.js', 'add', 'two', '3'])
    ).toThrow('Invalid left operand: "two" is not a number.');
  });

  it('throws on division by zero', () => {
    expect(() =>
      calculator.main(['node', 'src/calculator.js', 'divide', '5', '0'])
    ).toThrow('Division by zero is not allowed.');
  });

  it('throws on negative square root input', () => {
    expect(() =>
      calculator.main(['node', 'src/calculator.js', 'sqrt', '-9'])
    ).toThrow('Square root of a negative number is not allowed.');
  });
});
