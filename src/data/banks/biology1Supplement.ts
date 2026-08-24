import { mcq } from '../mcq'

const B = 'bio-1'

function question(
  id: string,
  stem: string,
  correct: string,
  distractors: [string, string, string],
  explanation: string,
) {
  return mcq(
    B,
    id,
    stem,
    [
      [correct, true],
      [distractors[0], false],
      [distractors[1], false],
      [distractors[2], false],
    ],
    explanation,
  )
}

export const biology1Supplement = [
  // Quiz 1: Chapter 3, carbon and molecular diversity of life
  question('bio-1-010', 'How many covalent bonds can a carbon atom usually form?', 'Four', ['One', 'Two', 'Six'], 'Carbon has four valence electrons and usually completes its outer shell by forming four covalent bonds.'),
  question('bio-1-011', 'Which functional group makes an organic molecule more likely to act as an acid?', 'Carboxyl group', ['Hydroxyl group', 'Amino group', 'Methyl group'], 'A carboxyl group can donate a hydrogen ion, so molecules containing it often behave as acids.'),
  question('bio-1-012', 'Two molecules with the same molecular formula but different structures are called:', 'Isomers', ['Polymers', 'Ions', 'Enzymes'], 'Isomers share a molecular formula but differ in the arrangement of their atoms.'),
  question('bio-1-013', 'What distinguishes a hydrocarbon from many other organic molecules?', 'It contains only carbon and hydrogen', ['It always dissolves in water', 'It contains an amino group', 'It is always a ring'], 'Hydrocarbons consist only of carbon and hydrogen and are generally nonpolar.'),
  question('bio-1-014', 'Which functional group is written as -OH?', 'Hydroxyl group', ['Carbonyl group', 'Phosphate group', 'Sulfhydryl group'], 'A hydroxyl group contains oxygen bonded to hydrogen and often increases water solubility.'),
  question('bio-1-015', 'What relationship exists between two enantiomers?', 'They are nonsuperimposable mirror images', ['They differ in carbon count', 'They have different molecular formulas', 'They are identical in all environments'], 'Enantiomers are mirror-image isomers whose three-dimensional structures cannot be superimposed.'),
  question('bio-1-016', 'Which functional group can accept a proton and act as a base?', 'Amino group', ['Carboxyl group', 'Methyl group', 'Carbonyl group'], 'The nitrogen in an amino group can accept a hydrogen ion, giving the group basic properties.'),
  question('bio-1-017', 'Why is carbon especially suited to building diverse biological molecules?', 'It forms stable bonds with many elements and with itself', ['It has no valence electrons', 'It forms only ionic bonds', 'It cannot form chains'], 'Carbon can form four stable covalent bonds, including chains, branches, and rings.'),
  question('bio-1-018', 'A carbonyl group at the end of a carbon skeleton forms which type of compound?', 'An aldehyde', ['A ketone', 'An alcohol', 'An amine'], 'A terminal carbonyl produces an aldehyde; an internal carbonyl produces a ketone.'),
  question('bio-1-019', 'What does adding a phosphate group often do to an organic molecule?', 'Makes it more reactive and negatively charged', ['Makes it nonpolar', 'Removes all stored energy', 'Converts it into a hydrocarbon'], 'Phosphate groups carry negative charge and can help transfer energy or activate molecules.'),

  // Quiz 2: Chapter 4, cells and viruses
  question('bio-1-020', 'Which structure is present in both prokaryotic and eukaryotic cells?', 'Ribosomes', ['Nucleus', 'Mitochondria', 'Golgi apparatus'], 'All cells use ribosomes to synthesize proteins, but prokaryotes lack membrane-bound organelles.'),
  question('bio-1-021', 'What is the main function of the nucleolus?', 'Producing ribosomal RNA and assembling ribosomal subunits', ['Making ATP', 'Digesting macromolecules', 'Synthesizing lipids'], 'The nucleolus makes rRNA and combines it with proteins to form ribosomal subunits.'),
  question('bio-1-022', 'Which organelle modifies and sorts proteins received from the endoplasmic reticulum?', 'Golgi apparatus', ['Lysosome', 'Nucleolus', 'Centrosome'], 'The Golgi modifies, sorts, and packages proteins into vesicles for delivery.'),
  question('bio-1-023', 'What is a major function of lysosomes?', 'Intracellular digestion and recycling', ['Photosynthesis', 'DNA replication', 'Spindle formation'], 'Lysosomal enzymes digest macromolecules and recycle damaged cellular components.'),
  question('bio-1-024', 'Which cytoskeletal element forms the tracks used by many motor proteins?', 'Microtubules', ['Cellulose fibers', 'Phospholipids', 'Chromatin'], 'Microtubules support cell shape and serve as tracks for kinesin and dynein.'),
  question('bio-1-025', 'Why do cells remain relatively small?', 'A high surface-area-to-volume ratio supports efficient exchange', ['Small cells contain no DNA', 'Large cells cannot make proteins', 'Cell membranes grow faster than volume'], 'As a cell grows, volume increases faster than surface area, limiting material exchange.'),
  question('bio-1-026', 'A virus can reproduce only when it:', 'Uses a host cell molecular machinery', ['Develops its own ribosomes', 'Performs photosynthesis', 'Divides by mitosis'], 'Viruses lack the complete machinery for reproduction and must redirect a host cell.'),
  question('bio-1-027', 'What surrounds the genetic material of every virus?', 'A protein capsid', ['A cell wall', 'A nucleus', 'A phospholipid bilayer'], 'Every virus has a protein capsid; only some also have a lipid envelope.'),
  question('bio-1-028', 'Which organelle contains enzymes that break down fatty acids and detoxify peroxide?', 'Peroxisome', ['Ribosome', 'Central vacuole', 'Nucleus'], 'Peroxisomes oxidize fatty acids and convert harmful hydrogen peroxide to water.'),

  // Quiz 3: Chapter 6, metabolism
  question('bio-1-029', 'What does the first law of thermodynamics state?', 'Energy can change form but cannot be created or destroyed', ['Entropy always decreases', 'All reactions release energy', 'Matter can become energy without limit'], 'The first law describes conservation of energy during transfers and transformations.'),
  question('bio-1-030', 'A reaction with a negative change in free energy is:', 'Exergonic', ['Endergonic', 'At equilibrium only', 'Unable to occur'], 'Exergonic reactions release free energy and have a negative delta G.'),
  question('bio-1-031', 'How does ATP usually drive an endergonic cellular reaction?', 'By coupling ATP hydrolysis to the reaction', ['By raising activation energy', 'By cooling the cell', 'By changing an enzyme into a lipid'], 'Cells couple the favorable hydrolysis of ATP to reactions that require energy.'),
  question('bio-1-032', 'Where on an enzyme do substrates bind?', 'Active site', ['Phosphate tail', 'Lipid bilayer', 'Nucleoid'], 'The active site has a shape and chemistry that bind specific substrates.'),
  question('bio-1-033', 'A competitive inhibitor reduces enzyme activity by:', 'Competing with the substrate for the active site', ['Destroying all substrate molecules', 'Supplying extra ATP', 'Binding only to the product'], 'Competitive inhibitors occupy the active site and block substrate binding.'),
  question('bio-1-034', 'What happens to an enzyme after it catalyzes a reaction?', 'It can catalyze another reaction', ['It becomes a product', 'It is always destroyed', 'It permanently stores the substrate'], 'Enzymes are not consumed by the reactions they catalyze and can be reused.'),
  question('bio-1-035', 'What is feedback inhibition?', 'A pathway product inhibits an earlier enzyme in the pathway', ['A substrate activates every enzyme', 'ATP stops all metabolism', 'An enzyme converts itself into product'], 'Feedback inhibition prevents overproduction by letting an end product slow its own pathway.'),
  question('bio-1-036', 'Why can very high temperatures reduce enzyme activity?', 'They can disrupt the enzyme three-dimensional shape', ['They remove all carbon atoms', 'They make activation energy infinite', 'They convert substrates to DNA'], 'Excess heat can denature an enzyme, changing the active site and reducing function.'),

  // Quiz 4: Chapter 8, photosynthesis
  question('bio-1-037', 'Which pigment directly participates in the reaction center of a photosystem?', 'Chlorophyll a', ['Cellulose', 'Glycogen', 'Keratin'], 'Reaction centers contain a special pair of chlorophyll a molecules that donate excited electrons.'),
  question('bio-1-038', 'The light reactions of photosynthesis take place in the:', 'Thylakoid membranes', ['Stroma only', 'Mitochondrial matrix', 'Nuclear envelope'], 'Photosystems and electron carriers for the light reactions are embedded in thylakoid membranes.'),
  question('bio-1-039', 'What molecule supplies the electrons released by photosystem II?', 'Water', ['Carbon dioxide', 'Glucose', 'NADPH'], 'Photosystem II splits water, replacing electrons and releasing oxygen and hydrogen ions.'),
  question('bio-1-040', 'What are the main products of the light reactions used by the Calvin cycle?', 'ATP and NADPH', ['Oxygen and glucose', 'Carbon dioxide and water', 'Pyruvate and FADH2'], 'The light reactions produce ATP and NADPH, which power carbon fixation in the Calvin cycle.'),
  question('bio-1-041', 'Where does the Calvin cycle occur?', 'Chloroplast stroma', ['Thylakoid lumen', 'Cytosol of animal cells', 'Mitochondrial intermembrane space'], 'Calvin-cycle enzymes are located in the fluid stroma surrounding the thylakoids.'),
  question('bio-1-042', 'Which enzyme fixes carbon dioxide in the Calvin cycle?', 'Rubisco', ['ATP synthase', 'Amylase', 'DNA polymerase'], 'Rubisco attaches carbon dioxide to RuBP during carbon fixation.'),
  question('bio-1-043', 'What gas is released when water is split during photosynthesis?', 'Oxygen', ['Carbon dioxide', 'Nitrogen', 'Methane'], 'Splitting water at photosystem II releases molecular oxygen as a byproduct.'),
  question('bio-1-044', 'Chemiosmosis in a chloroplast directly powers:', 'ATP synthase', ['Rubisco binding to DNA', 'Glucose diffusion', 'Carbon dioxide release'], 'Hydrogen ions flowing through ATP synthase provide energy to make ATP.'),
  question('bio-1-045', 'What three-carbon sugar leaves the Calvin cycle?', 'G3P', ['RuBP', 'Pyruvate', 'Acetyl-CoA'], 'Glyceraldehyde-3-phosphate, or G3P, is the net carbohydrate product of the Calvin cycle.'),

  // Quiz 5: Chapter 10, meiosis and sexual reproduction
  question('bio-1-046', 'Homologous chromosomes separate during:', 'Anaphase I', ['Anaphase II', 'Metaphase I', 'Prophase II'], 'During anaphase I, homologous chromosome pairs move to opposite poles while sister chromatids stay joined.'),
  question('bio-1-047', 'Sister chromatids separate during which meiotic stage?', 'Anaphase II', ['Prophase I', 'Metaphase I', 'Telophase I only'], 'Anaphase II separates sister chromatids in a process similar to mitotic anaphase.'),
  question('bio-1-048', 'Crossing over normally occurs during:', 'Prophase I', ['Prophase II', 'Anaphase I', 'Telophase II'], 'Homologous chromosomes pair and exchange corresponding DNA segments during prophase I.'),
  question('bio-1-049', 'What is a tetrad?', 'A paired set of homologous chromosomes with four chromatids', ['Four unrelated gametes', 'One chromosome with four genes', 'A group of four ribosomes'], 'Synapsis brings two replicated homologs together, creating a four-chromatid tetrad.'),
  question('bio-1-050', 'Independent assortment results from the random:', 'Orientation of homologous pairs at metaphase I', ['Replication of DNA in meiosis II', 'Fusion of sister chromatids', 'Loss of all maternal chromosomes'], 'Each homologous pair independently faces either pole at metaphase I, generating chromosome combinations.'),
  question('bio-1-051', 'A human gamete normally contains how many chromosomes?', '23', ['46', '92', '44'], 'Gametes are haploid and contain one chromosome from each of the 23 homologous pairs.'),
  question('bio-1-052', 'Fertilization restores the diploid chromosome number by:', 'Combining two haploid gametes', ['Duplicating one gamete twice', 'Separating homologous chromosomes', 'Removing one parental genome'], 'Fusion of haploid egg and sperm nuclei creates a diploid zygote.'),
  question('bio-1-053', 'Which process contributes directly to genetic variation in meiosis?', 'Crossing over', ['DNA replication after meiosis II', 'Identical chromatid segregation', 'Binary fission'], 'Crossing over creates chromosomes containing new combinations of maternal and paternal alleles.'),
  question('bio-1-054', 'DNA replication occurs before meiosis I but:', 'Does not occur between meiosis I and meiosis II', ['Occurs twice before meiosis II', 'Never occurs before meiosis', 'Occurs during every anaphase'], 'A single round of DNA replication is followed by two meiotic divisions.'),

  // Quiz 6: Chapter 12, chromosomal basis of inheritance
  question('bio-1-055', 'A gene located on a sex chromosome is described as:', 'Sex-linked', ['Polyploid', 'Autosomal dominant only', 'Cytoplasmic'], 'Sex-linked genes reside on a sex chromosome, commonly the X chromosome.'),
  question('bio-1-056', 'Why are X-linked recessive traits more common in human males?', 'Males have only one X chromosome', ['Males have two X chromosomes', 'The Y chromosome activates every recessive allele', 'Females cannot inherit recessive alleles'], 'With one X chromosome, a male expresses an X-linked recessive allele whenever it is present.'),
  question('bio-1-057', 'Linked genes tend to be inherited together because they:', 'Are located near each other on the same chromosome', ['Have identical DNA sequences', 'Always control the same trait', 'Are found on different chromosomes'], 'Genes close together on one chromosome are less likely to be separated by crossing over.'),
  question('bio-1-058', 'Recombination frequency is used to estimate:', 'Distance between genes on a chromosome', ['The number of ribosomes in a cell', 'Protein molecular mass', 'The age of an organism'], 'Genes farther apart are separated by crossing over more often, producing higher recombination frequencies.'),
  question('bio-1-059', 'Nondisjunction is the failure of chromosomes to:', 'Separate normally during cell division', ['Replicate during interphase', 'Condense during prophase', 'Contain genes'], 'Nondisjunction sends abnormal chromosome numbers into daughter cells or gametes.'),
  question('bio-1-060', 'A cell with one extra copy of a particular chromosome is:', 'Trisomic', ['Monosomic', 'Haploid', 'Euploid'], 'Trisomy means that one chromosome type is represented by three copies instead of two.'),
  question('bio-1-061', 'A deletion mutation changes a chromosome by:', 'Removing a segment', ['Reversing a segment', 'Moving a segment to a nonhomologous chromosome', 'Duplicating the entire genome'], 'A chromosomal deletion removes genes contained within the missing segment.'),
  question('bio-1-062', 'An inversion occurs when a chromosome segment:', 'Reattaches in the reverse orientation', ['Is copied onto every chromosome', 'Is permanently converted to RNA', 'Moves without changing orientation to its homolog'], 'In an inversion, a segment breaks, flips, and reinserts into the same chromosome.'),
  question('bio-1-063', 'Which observation provides evidence for linked genes?', 'A testcross produces more parental than recombinant offspring', ['All four offspring classes are equally frequent', 'Every offspring has a new phenotype', 'The genes assort independently'], 'Linked genes generate an excess of parental combinations because crossovers do not always separate them.'),
  question('bio-1-064', 'A Barr body is:', 'A condensed, inactive X chromosome', ['An active Y chromosome', 'A bacterial plasmid', 'A duplicated autosome'], 'X inactivation condenses one X chromosome in many female mammalian cells into a Barr body.'),

  // Quiz 7: Chapter 14, gene expression
  question('bio-1-065', 'During transcription, RNA polymerase uses which molecule as a template?', 'DNA', ['Protein', 'Lipid', 'ATP synthase'], 'RNA polymerase reads a DNA template strand to build a complementary RNA molecule.'),
  question('bio-1-066', 'Which RNA carries codons from DNA to a ribosome?', 'Messenger RNA', ['Transfer RNA', 'Ribosomal RNA', 'Small nuclear DNA'], 'Messenger RNA carries the coding sequence that ribosomes translate into protein.'),
  question('bio-1-067', 'What is the role of transfer RNA during translation?', 'It matches an anticodon to a codon and delivers an amino acid', ['It copies DNA in the nucleus', 'It forms the cell membrane', 'It removes every intron'], 'Each tRNA uses its anticodon to recognize an mRNA codon and position the correct amino acid.'),
  question('bio-1-068', 'Which codon usually begins translation?', 'AUG', ['UAA', 'UAG', 'UGA'], 'AUG is the usual start codon and specifies methionine.'),
  question('bio-1-069', 'What happens when a ribosome reaches a stop codon?', 'A release factor ends translation', ['A tRNA adds another methionine', 'DNA replication begins', 'The mRNA becomes a chromosome'], 'Stop codons recruit release factors rather than tRNAs, causing the polypeptide to be released.'),
  question('bio-1-070', 'Eukaryotic RNA processing removes which sequences from pre-mRNA?', 'Introns', ['Exons', 'Codons', 'Promoters'], 'The spliceosome removes introns and joins exons to produce mature mRNA.'),
  question('bio-1-071', 'What is the function of a promoter?', 'It is a DNA site where transcription machinery assembles', ['It terminates every protein', 'It carries amino acids', 'It joins Okazaki fragments'], 'Promoter sequences position RNA polymerase and regulatory proteins to begin transcription.'),
  question('bio-1-072', 'A mutation that changes one amino acid to another is a:', 'Missense mutation', ['Silent mutation', 'Nonsense mutation', 'Chromosome duplication'], 'A missense mutation changes a codon so that it specifies a different amino acid.'),
  question('bio-1-073', 'Why can a base substitution be silent?', 'Multiple codons can specify the same amino acid', ['The ribosome ignores all mutations', 'DNA contains no coding regions', 'Every amino acid has one codon'], 'The genetic code is redundant, so some changed codons still encode the same amino acid.'),
  question('bio-1-074', 'An insertion of one nucleotide into a coding sequence usually causes a:', 'Frameshift mutation', ['Silent mutation only', 'Whole-genome duplication', 'Chromosome inversion'], 'Adding one nucleotide shifts the reading frame and changes downstream codons.'),

  // Quiz 8: Chapter 21, evolution
  question('bio-1-075', 'Natural selection acts directly on differences in:', 'Phenotype', ['Future needs', 'Acquired intentions', 'Species age'], 'Selection favors or removes expressed traits, while inheritance changes allele frequencies over generations.'),
  question('bio-1-076', 'What is an adaptation?', 'An inherited trait that improves reproductive success in an environment', ['Any change during an individual lifetime', 'A trait shared by every organism', 'A random event that never affects fitness'], 'Adaptations are heritable features shaped by selection because they improve fitness in a particular environment.'),
  question('bio-1-077', 'Genetic drift has the greatest effect in:', 'Small populations', ['Very large populations', 'Populations with no alleles', 'Only populations under artificial selection'], 'Random sampling can shift allele frequencies sharply when few individuals contribute to the next generation.'),
  question('bio-1-078', 'A population founded by a few individuals may experience the:', 'Founder effect', ['Hardy-Weinberg effect', 'Hybrid vigor rule', 'Use-and-disuse effect'], 'Founders carry only a sample of the source population alleles, so the new population may differ by chance.'),
  question('bio-1-079', 'Gene flow changes allele frequencies through:', 'Movement of individuals or gametes between populations', ['Random mutation within one cell only', 'Extinction of every population', 'Identical reproduction without migration'], 'Migration transfers alleles between populations and can make their gene pools more similar.'),
  question('bio-1-080', 'Which condition is required for Hardy-Weinberg equilibrium?', 'Random mating', ['Strong natural selection', 'A very small population', 'High migration'], 'Hardy-Weinberg equilibrium assumes random mating, no selection, no mutation, no migration, and a large population.'),
  question('bio-1-081', 'Homologous structures support common ancestry because they:', 'Share an underlying anatomy despite different functions', ['Always perform identical functions', 'Appear only in fossils', 'Contain no genetic information'], 'Shared structural patterns are best explained by inheritance from a common ancestor.'),
  question('bio-1-082', 'Convergent evolution commonly produces:', 'Analogous structures', ['Homologous chromosomes', 'Identical genomes', 'No phenotypic similarities'], 'Similar environmental pressures can independently shape similar functions in unrelated lineages.'),
  question('bio-1-083', 'What is reproductive isolation?', 'A barrier that prevents gene flow between populations', ['A process that always increases migration', 'Random mating within one population', 'The loss of all genetic variation'], 'Reproductive barriers stop populations from exchanging genes and can permit them to diverge into species.'),
  question('bio-1-084', 'A bottleneck effect occurs when:', 'A population is sharply reduced and loses alleles by chance', ['Every individual migrates equally', 'Mutation stops permanently', 'Selection preserves every allele'], 'A sudden population reduction leaves a small, unrepresentative gene pool and increases genetic drift.'),
]