import { mcq } from '../mcq'
import { psychology1Supplement } from './psychology1Supplement'

const B = 'psyc-1'

export const psychology1 = [
  mcq(
    B,
    'psyc-1-001',
    'Which part of the neuron carries signals away from the cell body?',
    [
      ['Dendrite', false],
      ['Axon', true],
      ['Soma', false],
      ['Synapse', false],
    ],
    'The axon carries the outgoing signal. Dendrites receive incoming signals, the soma is the cell body, and the synapse is the gap between neurons.',
  ),
  mcq(
    B,
    'psyc-1-002',
    'In classical conditioning, what did Pavlov\u2019s dogs learn to associate with food?',
    [
      ['A bell', true],
      ['A light touch', false],
      ['A food bowl', false],
      ['A verbal command', false],
    ],
    'The bell was a neutral stimulus that, paired repeatedly with food, became a conditioned stimulus producing salivation on its own.',
  ),
  mcq(
    B,
    'psyc-1-003',
    'Which type of reinforcement increases behaviour by removing an unpleasant stimulus?',
    [
      ['Positive reinforcement', false],
      ['Negative reinforcement', true],
      ['Positive punishment', false],
      ['Negative punishment', false],
    ],
    'Negative reinforcement removes something aversive to increase a behaviour. It is often confused with punishment, which decreases behaviour.',
    3,
  ),
  mcq(
    B,
    'psyc-1-004',
    'Roughly how many items can short-term memory typically hold?',
    [
      ['3 \u00b1 1', false],
      ['7 \u00b1 2', true],
      ['15 \u00b1 3', false],
      ['Unlimited', false],
    ],
    'Miller\u2019s classic estimate is about seven items, plus or minus two. Chunking related items together effectively raises this.',
  ),
  mcq(
    B,
    'psyc-1-005',
    'Which brain structure is most associated with forming new long-term memories?',
    [
      ['Cerebellum', false],
      ['Hippocampus', true],
      ['Amygdala', false],
      ['Medulla', false],
    ],
    'The hippocampus consolidates new declarative memories. The amygdala handles emotional processing and the cerebellum coordinates movement.',
    2,
  ),
  mcq(
    B,
    'psyc-1-006',
    'What is the independent variable in an experiment?',
    [
      ['The variable that is measured', false],
      ['The variable that is manipulated', true],
      ['A variable held constant', false],
      ['An unmeasured confound', false],
    ],
    'The researcher manipulates the independent variable and measures the dependent variable to see what effect the manipulation had.',
  ),
  mcq(
    B,
    'psyc-1-007',
    'During which sleep stage does most vivid dreaming occur?',
    [
      ['Stage 1', false],
      ['Stage 2', false],
      ['Stage 3', false],
      ['REM sleep', true],
    ],
    'REM sleep features rapid eye movement, high brain activity and vivid dreams, alongside temporary muscle paralysis.',
  ),
  mcq(
    B,
    'psyc-1-008',
    'The tendency to attribute others\u2019 behaviour to personality rather than circumstance is called:',
    [
      ['Confirmation bias', false],
      ['Fundamental attribution error', true],
      ['Cognitive dissonance', false],
      ['The halo effect', false],
    ],
    'The fundamental attribution error over-weights disposition and under-weights situation \u2014 though we tend to do the reverse when explaining our own behaviour.',
    3,
  ),
  mcq(
    B,
    'psyc-1-009',
    'Which perspective explains behaviour primarily through unconscious conflict?',
    [
      ['Behavioural', false],
      ['Psychodynamic', true],
      ['Cognitive', false],
      ['Humanistic', false],
    ],
    'The psychodynamic perspective, rooted in Freud, emphasises unconscious drives. Behaviourism focuses on observable conditioning instead.',
    2,
  ),
  ...psychology1Supplement,
]
