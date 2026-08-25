import type { QuestionWithChoices } from '../types'
import { biology1 } from './banks/biology1'
import { chemistry1 } from './banks/chemistry1'
import { calculus1 } from './banks/calculus1'
import { psychology1 } from './banks/psychology1'
import { physics1 } from './banks/physics1'
import { statistics1 } from './banks/statistics1'
import { economics1 } from './banks/economics1'
import { collegeMath1 } from './banks/collegeMath1'
import { communication1 } from './banks/communication1'

export const questions: QuestionWithChoices[] = [
  ...biology1,
  ...chemistry1,
  ...calculus1,
  ...psychology1,
  ...physics1,
  ...statistics1,
  ...economics1,
  ...collegeMath1,
  ...communication1,
]
