import { mcq } from '../mcq'

const B = 'calc-1'

function question(id: string, stem: string, correct: string, distractors: [string, string, string], explanation: string) {
  return mcq(B, id, stem, [[correct, true], ...distractors.map((body) => [body, false] as [string, boolean])], explanation)
}

export const calculus1Supplement = [
  question('calc-1-010', 'What is lim(x→2) (x² - 4)/(x - 2)?', '4', ['0', '2', 'Undefined'], 'Factor the numerator as (x - 2)(x + 2), cancel, and evaluate x + 2 at 2.'),
  question('calc-1-011', 'If the left- and right-hand limits at x = a differ, the two-sided limit:', 'Does not exist', ['Equals their average', 'Is always zero', 'Equals f(a)'], 'A two-sided limit exists only when both one-sided limits agree.'),
  question('calc-1-012', 'Which theorem guarantees a zero between a and b when a continuous function changes sign?', 'Intermediate Value Theorem', ['Mean Value Theorem', 'Fundamental Theorem of Calculus', 'Squeeze Theorem'], 'A continuous function takes every value between f(a) and f(b), including zero.'),
  question('calc-1-013', 'What is lim(x→∞) 1/x?', '0', ['1', '∞', 'Does not exist'], 'The denominator grows without bound, making the fraction approach zero.'),
  question('calc-1-014', 'A removable discontinuity appears graphically as:', 'A hole', ['A vertical asymptote only', 'A corner', 'A horizontal tangent'], 'A removable discontinuity occurs when the limiting value exists but the function value is missing or different.'),
  question('calc-1-015', 'The derivative at a point is defined as a limit of:', 'Difference quotients', ['Riemann sums', 'Antiderivatives', 'Infinite products'], 'The derivative is the limiting average rate of change as the interval shrinks to zero.'),
  question('calc-1-016', 'What is d/dx[sin x]?', 'cos x', ['-cos x', 'sin x', '-sin x'], 'The derivative of sine is cosine.'),
  question('calc-1-017', 'What is d/dx[ln x] for x > 0?', '1/x', ['ln x', 'x', 'eˣ'], 'The natural logarithm has derivative 1/x on its domain.'),
  question('calc-1-018', 'What is d/dx[5x⁴ - 2x]?', '20x³ - 2', ['5x³ - 2', '20x⁴ - 2', '20x³'], 'Apply the power rule term by term.'),
  question('calc-1-019', 'Using the chain rule, d/dx[(3x + 1)²] is:', '6(3x + 1)', ['2(3x + 1)', '6x + 1', '(3x + 1)³/3'], 'Differentiate the outer square and multiply by the inner derivative 3.'),
  question('calc-1-020', 'If position is s(t), instantaneous velocity is:', 's′(t)', ['s(t)/t', 's″(t)', '∫s(t)dt'], 'Velocity is the first derivative of position with respect to time.'),
  question('calc-1-021', 'A critical number can occur where f′(x) is zero or:', 'Does not exist while f(x) is defined', ['f(x) is zero only', 'f″(x) is positive only', 'x is negative'], 'Critical numbers are domain points where the derivative is zero or undefined.'),
  question('calc-1-022', 'If f′ changes from positive to negative at c, f has a:', 'Local maximum at c', ['Local minimum at c', 'Vertical asymptote at c', 'Removable discontinuity at c'], 'The function rises before c and falls after c.'),
  question('calc-1-023', 'If f″(x) > 0 on an interval, the graph is:', 'Concave up', ['Concave down', 'Constant', 'Discontinuous'], 'A positive second derivative means slopes are increasing.'),
  question('calc-1-024', 'What is ∫x² dx?', 'x³/3 + C', ['2x + C', 'x³ + C', 'x²/2 + C'], 'Increase the exponent to 3 and divide by 3.'),
  question('calc-1-025', 'What is ∫₀² 3 dx?', '6', ['3', '2', '9'], 'The area of a rectangle of height 3 and width 2 is 6.'),
  question('calc-1-026', 'The Fundamental Theorem of Calculus connects:', 'Differentiation and integration', ['Limits and matrices', 'Geometry and probability only', 'Sequences and vectors'], 'It shows that accumulation functions differentiate back to their integrands.'),
  question('calc-1-027', 'A Riemann sum approximates:', 'A definite integral', ['A derivative at one point', 'A Taylor polynomial only', 'A differential equation solution only'], 'Riemann sums add rectangle areas to approximate net signed area.'),
  question('calc-1-028', 'What is ∫eˣ dx?', 'eˣ + C', ['xeˣ + C', 'ln x + C', 'eˣ/x + C'], 'Since eˣ is its own derivative, it is also its own antiderivative.'),
  question('calc-1-029', 'If F′(x) = f(x), then F is called:', 'An antiderivative of f', ['A discontinuity of f', 'A quotient of f', 'A critical number of f'], 'An antiderivative differentiates to the original function.'),
  question('calc-1-030', 'The average value of f on [a,b] is:', '(1/(b-a))∫ₐᵇ f(x) dx', ['f(a)+f(b)', '∫ₐᵇ f(x) dx', '(b-a)f(a)'], 'Divide the definite integral by the interval length.'),
]