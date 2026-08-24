import { mcq } from '../mcq'
import { biology1Supplement } from './biology1Supplement'

const B = 'bio-1'

export const biology1 = [
  mcq(
    B,
    'bio-1-001',
    'Which organelle produces most of the ATP in a eukaryotic cell?',
    [
      ['Ribosome', false],
      ['Mitochondrion', true],
      ['Golgi apparatus', false],
      ['Nucleus', false],
    ],
    'Mitochondria carry out oxidative phosphorylation, which generates the large majority of a cell\u2019s ATP. Ribosomes build proteins, the Golgi packages them, and the nucleus stores DNA.',
  ),
  mcq(
    B,
    'bio-1-002',
    'During which phase of mitosis do chromosomes align along the cell\u2019s equator?',
    [
      ['Prophase', false],
      ['Metaphase', true],
      ['Anaphase', false],
      ['Telophase', false],
    ],
    'In metaphase the chromosomes line up on the metaphase plate. Prophase condenses them, anaphase separates the sister chromatids, and telophase reforms the nuclei.',
    2,
  ),
  mcq(
    B,
    'bio-1-003',
    'What is the primary structural component of the plasma membrane?',
    [
      ['Phospholipid bilayer', true],
      ['Cellulose', false],
      ['Peptidoglycan', false],
      ['Glycogen', false],
    ],
    'The membrane is built from a phospholipid bilayer. Proteins, cholesterol and carbohydrates are embedded in it, but the bilayer is the structural basis.',
  ),
  mcq(
    B,
    'bio-1-004',
    'Which molecule stores heritable genetic information in most living organisms?',
    [
      ['DNA', true],
      ['Protein', false],
      ['Lipid', false],
      ['Carbohydrate', false],
    ],
    'DNA stores heritable information. RNA transcribes and helps translate it, proteins do the cellular work, and lipids form membranes.',
  ),
  mcq(
    B,
    'bio-1-005',
    'In which organelle does photosynthesis occur?',
    [
      ['Mitochondrion', false],
      ['Chloroplast', true],
      ['Lysosome', false],
      ['Peroxisome', false],
    ],
    'Chloroplasts contain chlorophyll and carry out photosynthesis. Mitochondria do the reverse job \u2014 releasing energy from glucose.',
  ),
  mcq(
    B,
    'bio-1-006',
    'What is the end product of glycolysis?',
    [
      ['Lactate', false],
      ['Pyruvate', true],
      ['Acetyl-CoA', false],
      ['Citrate', false],
    ],
    'Glycolysis splits glucose into two molecules of pyruvate. What happens next depends on whether oxygen is available.',
    2,
  ),
  mcq(
    B,
    'bio-1-007',
    'A cell placed in a hypotonic solution will most likely:',
    [
      ['Shrink as water leaves', false],
      ['Swell as water enters', true],
      ['Stay exactly the same size', false],
      ['Immediately begin dividing', false],
    ],
    'A hypotonic solution has a lower solute concentration outside the cell, so water moves in by osmosis and the cell swells.',
    2,
  ),
  mcq(
    B,
    'bio-1-008',
    'Which process produces four genetically distinct haploid cells?',
    [
      ['Mitosis', false],
      ['Meiosis', true],
      ['Binary fission', false],
      ['Cytokinesis', false],
    ],
    'Meiosis halves the chromosome number and shuffles alleles through crossing over, yielding four distinct haploid cells. Mitosis produces two identical diploid cells.',
    2,
  ),
  mcq(
    B,
    'bio-1-009',
    'What is the role of an enzyme in a chemical reaction?',
    [
      ['It raises the activation energy', false],
      ['It lowers the activation energy', true],
      ['It changes the equilibrium point', false],
      ['It is consumed by the reaction', false],
    ],
    'Enzymes are catalysts: they lower activation energy so a reaction proceeds faster. They are not consumed and do not shift where equilibrium lies.',
  ),
  ...biology1Supplement,
]
