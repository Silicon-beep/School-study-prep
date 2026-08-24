import { mcq } from '../mcq'
import { calculus1Supplement } from './calculus1Supplement'

const B = 'calc-1'

export const calculus1 = [
  mcq(
    B,
    'calc-1-001',
    'What is the derivative of f(x) = x\u00b3?',
    [
      ['3x\u00b2', true],
      ['x\u00b2', false],
      ['3x', false],
      ['x\u2074/4', false],
    ],
    'The power rule gives d/dx[x\u207f] = n\u00b7x\u207f\u207b\u00b9, so the derivative of x\u00b3 is 3x\u00b2.',
  ),
  mcq(
    B,
    'calc-1-002',
    'What is lim(x\u21920) sin(x)/x?',
    [
      ['0', false],
      ['1', true],
      ['\u221e', false],
      ['Undefined', false],
    ],
    'This is a standard limit equal to 1. Direct substitution gives 0/0, so it needs the squeeze theorem or L\u2019H\u00f4pital\u2019s rule.',
    2,
  ),
  mcq(
    B,
    'calc-1-003',
    'What is the derivative of f(x) = e\u02e3?',
    [
      ['x\u00b7e\u02e3\u207b\u00b9', false],
      ['e\u02e3', true],
      ['e\u02e3/x', false],
      ['ln(x)', false],
    ],
    'e\u02e3 is its own derivative \u2014 the property that makes e the natural base for exponentials.',
  ),
  mcq(
    B,
    'calc-1-004',
    'What does the definite integral of a velocity function over an interval represent?',
    [
      ['Acceleration', false],
      ['Displacement', true],
      ['Average speed', false],
      ['Jerk', false],
    ],
    'Integrating velocity over time gives displacement. Differentiating velocity would instead give acceleration.',
    2,
  ),
  mcq(
    B,
    'calc-1-005',
    'Using the product rule, what is d/dx[x\u00b7sin(x)]?',
    [
      ['cos(x)', false],
      ['sin(x) + x\u00b7cos(x)', true],
      ['x\u00b7cos(x)', false],
      ['sin(x) \u2212 x\u00b7cos(x)', false],
    ],
    'The product rule is (fg)\u2032 = f\u2032g + fg\u2032. Here f = x and g = sin(x), giving 1\u00b7sin(x) + x\u00b7cos(x).',
    2,
  ),
  mcq(
    B,
    'calc-1-006',
    'A function is continuous at x = a if:',
    [
      ['f(a) is defined', false],
      ['The limit as x\u2192a exists', false],
      ['The limit as x\u2192a equals f(a)', true],
      ['f\u2032(a) exists', false],
    ],
    'Continuity requires all three: f(a) defined, the limit existing, and the two being equal. The third condition implies the others.',
    3,
  ),
  mcq(
    B,
    'calc-1-007',
    'What is \u222b2x dx?',
    [
      ['2 + C', false],
      ['x\u00b2 + C', true],
      ['2x\u00b2 + C', false],
      ['x\u00b2/2 + C', false],
    ],
    'Reverse the power rule: raise the exponent and divide by the new exponent. 2x integrates to x\u00b2, plus the constant of integration.',
  ),
  mcq(
    B,
    'calc-1-008',
    'At a local maximum of a differentiable function, the first derivative is:',
    [
      ['Positive', false],
      ['Negative', false],
      ['Zero', true],
      ['Undefined', false],
    ],
    'The tangent line is horizontal at a smooth local max, so f\u2032 = 0. Note that f\u2032 = 0 alone does not guarantee a maximum \u2014 it could be a minimum or inflection point.',
    2,
  ),
  mcq(
    B,
    'calc-1-009',
    'What does the chain rule compute?',
    [
      ['The derivative of a product', false],
      ['The derivative of a quotient', false],
      ['The derivative of a composite function', true],
      ['The integral of a sum', false],
    ],
    'The chain rule handles f(g(x)), giving f\u2032(g(x))\u00b7g\u2032(x). Products and quotients have their own rules.',
    2,
  ),
  ...calculus1Supplement,
]
