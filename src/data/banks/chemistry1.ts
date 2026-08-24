import { mcq } from '../mcq'
import { chemistry1Supplement } from './chemistry1Supplement'

const B = 'chem-1'

export const chemistry1 = [
  mcq(
    B,
    'chem-1-001',
    'What is the pH of a neutral aqueous solution at 25\u00b0C?',
    [
      ['0', false],
      ['7', true],
      ['10', false],
      ['14', false],
    ],
    'At 25\u00b0C water self-ionises so that [H\u207a] = [OH\u207b] = 10\u207b\u2077 M, giving a pH of exactly 7. The neutral point shifts at other temperatures.',
  ),
  mcq(
    B,
    'chem-1-002',
    'Which type of bond involves the sharing of electron pairs between atoms?',
    [
      ['Ionic', false],
      ['Covalent', true],
      ['Metallic', false],
      ['Hydrogen', false],
    ],
    'Covalent bonds share electron pairs. Ionic bonds transfer electrons outright, metallic bonding pools delocalised electrons, and hydrogen bonds are weak intermolecular attractions.',
  ),
  mcq(
    B,
    'chem-1-003',
    'How many protons does a carbon-12 atom have?',
    [
      ['6', true],
      ['12', false],
      ['14', false],
      ['18', false],
    ],
    'The atomic number defines the element: carbon is 6, so every carbon atom has 6 protons. The 12 is the mass number \u2014 protons plus neutrons.',
  ),
  mcq(
    B,
    'chem-1-004',
    'How many particles are in one mole of a substance?',
    [
      ['3.14 \u00d7 10\u00b2\u00b3', false],
      ['6.022 \u00d7 10\u00b2\u00b3', true],
      ['1.602 \u00d7 10\u207b\u00b9\u2079', false],
      ['9.109 \u00d7 10\u207b\u00b3\u00b9', false],
    ],
    'Avogadro\u2019s number, 6.022 \u00d7 10\u00b2\u00b3, defines the mole. It is the bridge between atomic-scale counts and gram-scale masses.',
  ),
  mcq(
    B,
    'chem-1-005',
    'In the reaction 2H\u2082 + O\u2082 \u2192 2H\u2082O, what is the limiting reactant if you have 4 mol H\u2082 and 1 mol O\u2082?',
    [
      ['H\u2082', false],
      ['O\u2082', true],
      ['Neither \u2014 they are balanced', false],
      ['Both equally', false],
    ],
    '4 mol H\u2082 would need 2 mol O\u2082, but only 1 mol is available. Oxygen runs out first, so it limits the reaction and leaves H\u2082 in excess.',
    3,
  ),
  mcq(
    B,
    'chem-1-006',
    'What is the oxidation state of oxygen in most compounds?',
    [
      ['+2', false],
      ['\u22121', false],
      ['\u22122', true],
      ['0', false],
    ],
    'Oxygen is normally \u22122. The exceptions are peroxides (\u22121) and compounds with fluorine, where oxygen can be positive.',
    2,
  ),
  mcq(
    B,
    'chem-1-007',
    'Which state of matter has a definite volume but no definite shape?',
    [
      ['Solid', false],
      ['Liquid', true],
      ['Gas', false],
      ['Plasma', false],
    ],
    'Liquids keep a fixed volume but flow to fit their container. Solids hold both shape and volume; gases hold neither.',
  ),
  mcq(
    B,
    'chem-1-008',
    'According to the ideal gas law, if temperature doubles at constant volume and moles, pressure will:',
    [
      ['Halve', false],
      ['Stay the same', false],
      ['Double', true],
      ['Quadruple', false],
    ],
    'PV = nRT. With V and n fixed, P is directly proportional to T, so doubling absolute temperature doubles pressure.',
    2,
  ),
  mcq(
    B,
    'chem-1-009',
    'An exothermic reaction is one that:',
    [
      ['Absorbs heat from the surroundings', false],
      ['Releases heat to the surroundings', true],
      ['Neither absorbs nor releases heat', false],
      ['Only occurs at high pressure', false],
    ],
    'Exothermic reactions release heat, so \u0394H is negative and the surroundings warm up. Endothermic reactions do the opposite.',
  ),
  ...chemistry1Supplement,
]
