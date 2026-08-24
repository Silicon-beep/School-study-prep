import { mcq } from '../mcq'

const B = 'chem-1'

function question(id: string, stem: string, correct: string, distractors: [string, string, string], explanation: string) {
  return mcq(B, id, stem, [[correct, true], ...distractors.map((body) => [body, false] as [string, boolean])], explanation)
}

export const chemistry1Supplement = [
  question('chem-1-010', 'Which subatomic particle determines an element atomic number?', 'Proton', ['Neutron', 'Electron', 'Photon'], 'Atomic number equals the number of protons in the nucleus.'),
  question('chem-1-011', 'Isotopes of the same element differ in their number of:', 'Neutrons', ['Protons', 'Valence shells', 'Atomic symbols'], 'Isotopes have the same proton count but different neutron counts.'),
  question('chem-1-012', 'Which electrons are most involved in chemical bonding?', 'Valence electrons', ['Core electrons', 'Neutrons', 'Nuclear protons'], 'Valence electrons occupy the outer shell and participate in bonds.'),
  question('chem-1-013', 'Across a period from left to right, atomic radius generally:', 'Decreases', ['Increases', 'Stays exactly constant', 'Becomes zero'], 'Increasing nuclear charge pulls electrons closer across a period.'),
  question('chem-1-014', 'An ionic bond is primarily the attraction between:', 'Oppositely charged ions', ['Two neutral nuclei', 'Shared neutron pairs', 'Identical molecules'], 'Electron transfer creates cations and anions that attract electrostatically.'),
  question('chem-1-015', 'Which molecule has a bent molecular geometry?', 'H2O', ['CO2', 'CH4', 'BeCl2'], 'Two bonding pairs and two lone pairs give water a bent shape.'),
  question('chem-1-016', 'Why is water a polar molecule?', 'Its polar bonds and bent shape create a net dipole', ['It has no electrons', 'It is perfectly linear', 'Hydrogen is a metal'], 'The O-H bond dipoles do not cancel in water bent geometry.'),
  question('chem-1-017', 'The strongest intermolecular force between water molecules is:', 'Hydrogen bonding', ['Metallic bonding', 'Ionic bonding', 'Covalent network bonding'], 'Hydrogen attached to oxygen enables strong hydrogen-bond attractions.'),
  question('chem-1-018', 'Which change is a physical change?', 'Melting ice', ['Burning methane', 'Rusting iron', 'Decomposing water'], 'Melting changes physical state without changing molecular identity.'),
  question('chem-1-019', 'What is the molar mass of H2O to the nearest whole number?', '18 g/mol', ['10 g/mol', '16 g/mol', '36 g/mol'], 'Two hydrogens contribute about 2 g/mol and oxygen contributes 16 g/mol.'),
  question('chem-1-020', 'How many moles are in 36 g of H2O?', '2 mol', ['0.5 mol', '18 mol', '36 mol'], 'Moles equal mass divided by molar mass: 36/18 = 2.'),
  question('chem-1-021', 'In a balanced equation, coefficients represent relative numbers of:', 'Molecules or moles', ['Protons only', 'Electron shells', 'Elements in the periodic table'], 'Stoichiometric coefficients give particle and mole ratios.'),
  question('chem-1-022', 'What type of reaction is AB + CD → AD + CB?', 'Double replacement', ['Synthesis', 'Decomposition', 'Combustion'], 'The compounds exchange ions or partners in a double-replacement reaction.'),
  question('chem-1-023', 'A substance that is oxidized:', 'Loses electrons', ['Gains electrons', 'Gains neutrons', 'Loses all protons'], 'Oxidation is electron loss; reduction is electron gain.'),
  question('chem-1-024', 'What volume does 1 mol of an ideal gas occupy at STP using 0°C and 1 atm?', 'About 22.4 L', ['About 1 L', 'About 10 L', 'About 44.8 mL'], 'At standard temperature and pressure, one ideal-gas mole occupies about 22.4 L.'),
  question('chem-1-025', 'At constant temperature, pressure and volume are related by:', 'An inverse relationship', ['A direct relationship', 'No relationship', 'An exponential increase together'], 'Boyle law states that pressure rises as volume falls for fixed gas amount and temperature.'),
  question('chem-1-026', 'The energy required to start a chemical reaction is called:', 'Activation energy', ['Ionization number', 'Heat capacity', 'Bond order'], 'Reactants must overcome an activation-energy barrier before forming products.'),
  question('chem-1-027', 'A catalyst speeds a reaction by:', 'Lowering activation energy', ['Raising product energy', 'Changing equilibrium composition', 'Being consumed completely'], 'A catalyst provides a lower-energy pathway and is regenerated.'),
  question('chem-1-028', 'A solution with pH 3 has how many times the hydrogen-ion concentration of pH 5?', '100 times', ['2 times', '10 times', '1,000 times'], 'Each pH unit is a factor of ten, so two units represent 10².'),
  question('chem-1-029', 'A Brønsted-Lowry acid is a substance that:', 'Donates a proton', ['Accepts a proton', 'Donates an electron pair only', 'Produces neutrons'], 'Brønsted-Lowry acids donate H+ and bases accept H+.'),
  question('chem-1-030', 'At chemical equilibrium:', 'Forward and reverse reaction rates are equal', ['All reactants are gone', 'The reaction has stopped', 'Concentrations must be equal'], 'Equilibrium is dynamic: both reactions continue at equal rates.'),
]