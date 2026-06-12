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
  });

  it('rejects unsupported operations', () => {
    expect(() => calculator.calculate('mod', 1, 2)).toThrow(
      'Unsupported operation "mod". Use add, subtract, multiply, or divide.'
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

    expect(logSpy).toHaveBeenCalledWith(
      'Usage: node src/calculator.js <operation> <left> <right>'
    );
  });

  it('prints the computed result', () => {
    calculator.main(['node', 'src/calculator.js', 'add', '2', '3']);

    expect(logSpy).toHaveBeenCalledWith(5);
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
});
