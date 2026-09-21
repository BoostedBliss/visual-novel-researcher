import { GlossaryTerm, ResearchNode } from '../types';

export const CRISPR_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'crRNA',
    category: 'biomolecule',
    shortDefinition: 'CRISPR RNA. A small non-coding RNA containing a spacer sequence transcribed from past viral encounters.',
    narrativeContext: 'Emiko initially loaded purified Cas9 with crRNA only, expecting it to cleave plasmid targets on its own.',
    experimentalSignificance: 'Acts as the genomic GPS targeting coordinates, but cannot form the catalytic cleavage complex without tracrRNA annealing.',
    relatedPaperSnippet: 'Jinek et al. (Science 2012): "CRISPR-associated Cas9 endonuclease requires both crRNA and trans-activating crRNA (tracrRNA) for site-directed DNA cleavage."',
    referenceUrl: 'https://en.wikipedia.org/wiki/CRISPR#Cas9'
  },
  {
    term: 'tracrRNA',
    category: 'biomolecule',
    shortDefinition: 'Trans-activating crRNA. A distinct small RNA transcript that base-pairs with repeat regions of crRNA.',
    narrativeContext: 'The missing link discovered in Charpentier’s RNA-seq logs that turned inert Cas9 into an active molecular scalpel.',
    experimentalSignificance: 'Forms an RNA duplex structure recognized by Cas9’s REC lobe, orchestrating conformational activation.',
    relatedPaperSnippet: 'tracrRNA:crRNA base pairing directs RNase III processing and Cas9 endonuclease activation.',
    referenceUrl: 'https://en.wikipedia.org/wiki/Tracrrna'
  },
  {
    term: 'PAM',
    category: 'methodology',
    shortDefinition: 'Protospacer Adjacent Motif. A short 2-6 bp DNA sequence (5\'-NGG-3\' for SpCas9) adjacent to the target site.',
    narrativeContext: 'Kaito warns the team that without PAM interrogation, Cas9 will slide off the DNA without unwinding the double helix.',
    experimentalSignificance: 'Ensures self vs. non-self discrimination in bacteria and triggers rapid local DNA melting for RNA strand invasion.',
    relatedPaperSnippet: 'Cas9 interrogates flanking PAM motifs before initiating R-loop formation and sequential nicking of both strands.'
  },
  {
    term: 'sgRNA',
    category: 'methodology',
    shortDefinition: 'Single-Guide RNA. An engineered chimeric RNA fusing crRNA and tracrRNA via a designed GAAA tetraloop.',
    narrativeContext: 'Emiko and Ren’s eureka moment: simplifying nature’s dual-RNA system into a single programmable molecular reagent.',
    experimentalSignificance: 'Revolutionized genetics by turning a multi-component bacterial system into a single 100-nt guide easily synthesized or transfected.',
    relatedPaperSnippet: 'Engineered single-guide RNA chimeras direct site-specific cleavage of target plasmids and genomic DNA.'
  },
  {
    term: 'Agarose Gel Electrophoresis',
    category: 'instrumentation',
    shortDefinition: 'An assay separating charged DNA fragments by molecular size through an electric field matrix under UV or blue light.',
    narrativeContext: 'The laboratory assay where lanes showed whether target DNA was cut into twin fragments or stayed uncut.',
    experimentalSignificance: 'Standard diagnostic verification for in vitro endonuclease cleavage reactions.'
  },
  {
    term: 'HNH and RuvC',
    category: 'biomolecule',
    shortDefinition: 'The twin catalytic nuclease domains within the Cas9 protein architecture.',
    narrativeContext: 'Each domain acts like one blade of a pair of scissors, cutting one strand of the double helix.',
    experimentalSignificance: 'HNH cleaves the complementary DNA strand; RuvC cleaves the non-complementary strand ~3 bp upstream of PAM.'
  }
];

export const CRISPR_RESEARCH_PATH: ResearchNode[] = [
  {
    id: 'node-hypo-1',
    sceneId: 'crispr_s1',
    chapterId: 'ch1',
    title: 'Hypothesis: Cas9 + crRNA Cleavage',
    type: 'hypothesis',
    shortSummary: 'Assumed Cas9 and mature crRNA guide were sufficient for double-strand DNA cleavage.',
    empiricalEvidence: 'Lane 4 on 1% agarose gel showed completely intact supercoiled plasmid band. Zero cleavage.',
    status: 'failed',
    childrenIds: ['node-fail-1']
  },
  {
    id: 'node-fail-1',
    sceneId: 'crispr_s2',
    chapterId: 'ch1',
    title: 'Diagnostic Control: Denaturation Test',
    type: 'failed_assay',
    shortSummary: 'Tested whether recombinant Cas9 protein was misfolded or denatured during E. coli extraction.',
    empiricalEvidence: 'Circular dichroism and mass-spec confirmed stable folding and zinc-finger stability. Protein was intact.',
    status: 'passed',
    childrenIds: ['node-pivot-1']
  },
  {
    id: 'node-pivot-1',
    sceneId: 'crispr_s4',
    chapterId: 'ch2',
    title: 'Discovery of tracrRNA Dimer Partner',
    type: 'control_pivot',
    shortSummary: 'RNA deep-sequencing revealed high tracrRNA co-transcription in Streptococcus pyogenes.',
    empiricalEvidence: 'Dual-RNA incubation produced distinct double bands at 3.1 kb and 1.8 kb. Complete linearized cleavage!',
    status: 'breakthrough',
    childrenIds: ['node-synthesis-1']
  },
  {
    id: 'node-synthesis-1',
    sceneId: 'crispr_s7',
    chapterId: 'ch3',
    title: 'Engineering the Chimera sgRNA',
    type: 'synthesis',
    shortSummary: 'Engineered a synthetic GAAA tetraloop connecting crRNA 3\' end to tracrRNA 5\' stem-loop.',
    empiricalEvidence: 'Single chimeric guide cut plasmid DNA with matching kinetics and precision as native dual-RNA.',
    status: 'breakthrough',
    childrenIds: ['node-final-1']
  },
  {
    id: 'node-final-1',
    sceneId: 'crispr_s9',
    chapterId: 'ch4',
    title: 'Universal Programmable Gene Scalpel',
    type: 'breakthrough',
    shortSummary: 'Custom 20-nt guide reprogramming allows sequence-specific cleavage at any genomic target with 5\'-NGG PAM.',
    empiricalEvidence: 'Validated on 5 distinct loci with 98% cleavage efficiency and sub-nanomolar affinity.',
    status: 'passed',
    childrenIds: []
  }
];

export const TRANSFORMER_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Self-Attention',
    category: 'model_architecture',
    shortDefinition: 'An attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence.',
    narrativeContext: 'Dr. Aaron’s solution to eliminate recurrence bottleneck and allow tokens across long paragraphs to attend directly to one another.',
    experimentalSignificance: 'Computes Query-Key-Value dot products with O(1) sequential operations compared to O(N) in LSTMs.',
    relatedPaperSnippet: 'Vaswani et al. (NeurIPS 2017): "Attention Is All You Need. We propose the Transformer, based entirely on attention mechanisms."'
  },
  {
    term: 'Vanishing Gradient',
    category: 'methodology',
    shortDefinition: 'In deep recurrent architectures, error gradients shrink exponentially through long temporal backpropagation steps.',
    narrativeContext: 'The fundamental failure mode of deep LSTMs when trying to preserve syntax across 500+ token context windows.',
    experimentalSignificance: 'Prevented training of very deep NLP models prior to residual attention architectures.'
  },
  {
    term: 'Positional Encoding',
    category: 'methodology',
    shortDefinition: 'Sinusoidal or learned vectors injected into input embeddings to retain token ordering in permutation-invariant attention matrices.',
    narrativeContext: 'Maya realized that without recurrence, the model treated sentence word order like a bag of words.',
    experimentalSignificance: 'Enables parallel token ingestion without losing grammar or syntactic sequence information.'
  },
  {
    term: 'Scaled Dot-Product Attention',
    category: 'model_architecture',
    shortDefinition: 'Softmax((Q * K^T) / sqrt(d_k)) * V. Normalization by square root of key dimension prevents gradient saturation in extreme dimensions.',
    narrativeContext: 'Tuning the temperature denominator prevented softmax outputs from pushing gradients into flat near-zero regions.',
    experimentalSignificance: 'Crucial numerical stability factor that enabled scaling transformer models up to thousands of dimensions.'
  }
];

export const TRANSFORMER_RESEARCH_PATH: ResearchNode[] = [
  {
    id: 'tf-node-1',
    sceneId: 'tf_s1',
    chapterId: 'ch1_tf',
    title: 'Hypothesis: Stacking Bi-Directional LSTMs',
    type: 'hypothesis',
    shortSummary: 'Trained 16-layer recurrent networks with gating to conquer long-range dependency decay.',
    empiricalEvidence: 'WMT14 BLEU plateaued at 24.1; training wall-clock time was over 14 days due to sequential backprop.',
    status: 'failed',
    childrenIds: ['tf-node-2']
  },
  {
    id: 'tf-node-2',
    sceneId: 'tf_s2',
    chapterId: 'ch2_tf',
    title: 'Recurrence Abolition & All-Attention Design',
    type: 'control_pivot',
    shortSummary: 'Discarded sequential recurrence completely. Switched to multi-head scaled dot-product attention matrices.',
    empiricalEvidence: '100% parallel matrix tensor operations on 8 GPUs. Training speed accelerated by 8.4x.',
    status: 'breakthrough',
    childrenIds: ['tf-node-3']
  },
  {
    id: 'tf-node-3',
    sceneId: 'tf_s3',
    chapterId: 'ch3_tf',
    title: 'Multi-Head Subspace Projections',
    type: 'synthesis',
    shortSummary: 'Divided attention into 8 distinct parallel projection heads rather than a single global attention pool.',
    empiricalEvidence: 'Heads specialized dynamically: Head 1 attended to syntactic verbs, Head 4 to coreference pronouns.',
    status: 'breakthrough',
    childrenIds: ['tf-node-4']
  },
  {
    id: 'tf-node-4',
    sceneId: 'tf_s4',
    chapterId: 'ch4_tf',
    title: 'SOTA WMT14 Paradigm Shift (28.4 BLEU)',
    type: 'breakthrough',
    shortSummary: 'Transformer architecture surpassed all previous ensemble systems with just 3.5 days of training.',
    empiricalEvidence: 'Established the foundation for modern Foundation Models and large language model architectures.',
    status: 'passed',
    childrenIds: []
  }
];
