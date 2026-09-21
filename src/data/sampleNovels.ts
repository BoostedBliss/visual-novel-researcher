import { VisualNovel } from '../types';
import {
  CRISPR_GLOSSARY,
  CRISPR_RESEARCH_PATH,
  TRANSFORMER_GLOSSARY,
  TRANSFORMER_RESEARCH_PATH
} from './researchArtifacts';

export const SAMPLE_NOVELS: VisualNovel[] = [
  {
    id: 'crispr-cas9',
    title: 'Code of the Blade: The CRISPR-Cas9 Cleavage Assay',
    paperCitation: 'Jinek, Chylinski, Fonfara, Doudna, Charpentier (Science 2012)',
    scientificDomain: 'Molecular Genetics & Biochemistry',
    animeStyle: 'steins_academia',
    summary: 'Join Dr. Emiko and the RNA Lab as they investigate the mysterious Streptococcus immune defense. Experience how a baffling failed cleavage assay led to engineering the world’s first programmable dual-RNA guide.',
    coreDiscovery: 'Cas9 endonucleases require a dual-RNA structure (crRNA + tracrRNA) or an engineered single-guide RNA (sgRNA) along with a Protospacer Adjacent Motif (PAM) to achieve site-specific double-strand DNA cleavage.',
    experimentalHypothesis: 'Can a bacterial immune nuclease be reprogrammed with synthetic RNA to cleave targeted genomic DNA sequences at arbitrary loci?',
    glossary: CRISPR_GLOSSARY,
    researchPath: CRISPR_RESEARCH_PATH,
    keyTakeaways: [
      'Failed trials proved Cas9 + crRNA alone is catalytically inert; tracrRNA is an obligate cofactor.',
      'A 4-nucleotide synthetic tetraloop fused crRNA and tracrRNA into a single guide (sgRNA).',
      'The 5\'-NGG-3\' PAM sequence triggers initial DNA unwinding before RNA-DNA pairing.'
    ],
    characters: [
      {
        id: 'emiko',
        name: 'Dr. Emiko Vance',
        title: 'Lead Structural Biochemist',
        role: 'lead_investigator',
        avatarVariant: 'prodigy',
        primaryColor: '#0ea5e9',
        accentColor: '#38bdf8',
        signatureVoicePitch: 440
      },
      {
        id: 'kaito',
        name: 'Prof. Kaito Arisawa',
        title: 'Senior Molecular Geneticist',
        role: 'mentor_skeptic',
        avatarVariant: 'mentor',
        primaryColor: '#8b5cf6',
        accentColor: '#a78bfa',
        signatureVoicePitch: 220
      },
      {
        id: 'ren',
        name: 'Ren Tanaka',
        title: 'Assay Optimization Specialist',
        role: 'methodologist',
        avatarVariant: 'engineer',
        primaryColor: '#10b981',
        accentColor: '#34d399',
        signatureVoicePitch: 330
      },
      {
        id: 'aegis',
        name: 'A.E.G.I.S.',
        title: 'Lab Bio-Informatics Core',
        role: 'ai_assistant',
        avatarVariant: 'companion',
        primaryColor: '#f59e0b',
        accentColor: '#fbbf24',
        signatureVoicePitch: 660
      }
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'Chapter 1: The Inert Gel Bands',
        subtitle: 'The Failed Cleavage Assay',
        phase: 'failed_trial'
      },
      {
        id: 'ch2',
        title: 'Chapter 2: The Missing Transcript',
        subtitle: 'Discovering the tracrRNA Dimer',
        phase: 'breakthrough_method'
      },
      {
        id: 'ch3',
        title: 'Chapter 3: The Chimera Synthesis',
        subtitle: 'Engineering the Single Guide RNA',
        phase: 'control_verification'
      },
      {
        id: 'ch4',
        title: 'Chapter 4: The 5-Sigma Cut',
        subtitle: 'Universal Programmable Gene Editing',
        phase: 'paradigm_shift'
      }
    ],
    initialSceneId: 'crispr_s1',
    scenes: [
      {
        id: 'crispr_s1',
        chapterId: 'ch1',
        speakerId: 'emiko',
        expression: 'puzzled',
        dialogue: 'Look at this agarose gel under UV light... It makes no sense! Lane 4 contains purified Cas9, target plasmid DNA, and the transcribed crRNA spacer. The plasmid band is completely intact!',
        innerMonologue: 'Weeks of recombinant expression in E. coli... did our nuclease denature, or are we fundamentally misunderstanding the cleavage trigger?',
        backgroundType: 'cleanroom_bench',
        scientificLog: {
          stepTitle: 'Initial in vitro Reconstitution',
          phase: 'failed_trial',
          experimentalAction: 'Incubated 500 ng plasmid target with 100 nM Cas9 and 200 nM mature crRNA at 37°C for 60 min.',
          observedData: 'Supercoiled plasmid migrated identically to uncut control. Zero linearized fragments detected on 1% agarose gel.',
          deduction: 'Cas9 and crRNA alone are insufficient to trigger endonucleolytic double-strand cleavage.',
          confidenceDelta: -10
        },
        nextSceneId: 'crispr_s2'
      },
      {
        id: 'crispr_s2',
        chapterId: 'ch1',
        speakerId: 'kaito',
        expression: 'serious',
        dialogue: 'Calm down, Emiko. Science advances when assumptions crumble. In bacterial Streptococcus, this system neutralizes bacteriophages in vivo. What if your in vitro assay stripped away a mandatory partner?',
        backgroundType: 'cleanroom_bench',
        branchChoice: {
          prompt: 'Troubleshooting the Cleavage Failure: How do we identify the missing factor?',
          scientificDilemma: 'The nuclease is catalytically intact (confirmed via Bradford & mass spec), yet inert against the target DNA.',
          options: [
            {
              id: 'opt_tracr',
              text: 'Investigate small non-coding RNA reads from the deep RNA-seq library near the Cas operon.',
              experimentalRationale: 'High-throughput sequencing revealed a 24-nt complementary non-coding RNA (tracrRNA) transcribed adjacent to the CRISPR repeat-spacer array.',
              scientificClue: 'Look for sequence complementarity with the invariant repeat sequences.',
              nextSceneId: 'crispr_s3_tracr',
              soundEffect: 'eureka',
              confidenceReward: 20
            },
            {
              id: 'opt_salt',
              text: 'Assume buffer ionic strength is suboptimal; titrate Mg2+ and Zn2+ cofactor concentrations.',
              experimentalRationale: 'Divalent cations are necessary for RuvC and HNH catalytic folds, but altering buffer salts alone will not substitute for an absent RNA subunit.',
              scientificClue: 'Mg2+ titration shows no change in plasmid migration.',
              nextSceneId: 'crispr_s3_buffer',
              soundEffect: 'puzzle',
              confidenceReward: 5
            }
          ]
        }
      },
      {
        id: 'crispr_s3_buffer',
        chapterId: 'ch1',
        speakerId: 'ren',
        expression: 'serious',
        dialogue: 'We stepped MgCl2 from 1 mM to 25 mM across eight lanes. The result: still 100% uncut plasmid. Buffer ionic conditions are not the culprit. We have to look back at the genome transcripts!',
        backgroundType: 'cleanroom_bench',
        nextSceneId: 'crispr_s3_tracr'
      },
      {
        id: 'crispr_s3_tracr',
        chapterId: 'ch2',
        speakerId: 'emiko',
        expression: 'eureka',
        dialogue: 'Wait! Look at the differential RNA-seq data from Charpentier’s team! There is a 75-nucleotide trans-activating crRNA—tracrRNA—that pairs with the repeat region of pre-crRNA!',
        innerMonologue: 'In nature, RNase III trims this duplex, but does Cas9 actually require BOTH RNA molecules simultaneously inside its ribonucleoprotein binding pocket?',
        backgroundType: 'academic_lecture_hall',
        scientificLog: {
          stepTitle: 'Identification of Dual-RNA Duplex',
          phase: 'breakthrough_method',
          experimentalAction: 'Synthesized 89-nt mature tracrRNA and annealed with 42-nt crRNA targeting the green fluorescent protein (GFP) target locus.',
          observedData: 'Gel mobility shift assay (EMSA) shows a distinct high-molecular-weight band containing Cas9:crRNA:tracrRNA ternary complex.',
          deduction: 'Cas9 requires an active duplex scaffold. tracrRNA acts as a conformational bridge that locks the nuclease domains onto target DNA.',
          confidenceDelta: 25
        },
        nextSceneId: 'crispr_s4'
      },
      {
        id: 'crispr_s4',
        chapterId: 'ch2',
        speakerId: 'ren',
        expression: 'excited',
        dialogue: 'I just pulled the gel from the transilluminator! With tracrRNA present, the circular plasmid band collapsed completely into a razor-sharp linear fragment! Both strands of the target DNA were cut!',
        backgroundType: 'cleanroom_bench',
        nextSceneId: 'crispr_s5'
      },
      {
        id: 'crispr_s5',
        chapterId: 'ch3',
        speakerId: 'emiko',
        expression: 'eureka',
        dialogue: 'Dual RNAs work in bacteria, but synthesizing two separate RNA oligonucleotides for every genomic edit in mammalian research would be cumbersome. What if we fuse them into a single continuous transcript?',
        innerMonologue: 'If we connect the 3\' end of crRNA to the 5\' end of tracrRNA using a synthetic loop, will Cas9 still adopt its catalytically active conformation?',
        backgroundType: 'academic_lecture_hall',
        branchChoice: {
          prompt: 'Architecture Decision: How should we link crRNA and tracrRNA into a single guide?',
          scientificDilemma: 'The linker must preserve the Watson-Crick base pairing of the stem-loop while not obstructing Cas9’s REC lobe.',
          options: [
            {
              id: 'opt_tetraloop',
              text: 'Design a single-guide RNA (sgRNA) joined by an engineered 4-nucleotide GAAA tetraloop.',
              experimentalRationale: 'A GAAA tetraloop confers high thermodynamic stability without steric hindrance to the Cas9 bridge helix.',
              scientificClue: 'Stem-loop 1 and stem-loop 2 remain perfectly positioned to engage the PI (PAM-interacting) domain.',
              nextSceneId: 'crispr_s6_sgRNA',
              soundEffect: 'eureka',
              confidenceReward: 30
            },
            {
              id: 'opt_long_polyA',
              text: 'Insert an unstructured 30-nucleotide poly-Adenine flexible linker.',
              experimentalRationale: 'Too flexible; high entropic cost reduces Cas9 loading efficiency and destabilizes the repeat:anti-repeat duplex.',
              scientificClue: 'Yields partial cleavage with erratic off-target binding.',
              nextSceneId: 'crispr_s6_polya',
              soundEffect: 'puzzle',
              confidenceReward: 10
            }
          ]
        }
      },
      {
        id: 'crispr_s6_polya',
        chapterId: 'ch3',
        speakerId: 'kaito',
        expression: 'puzzled',
        dialogue: 'The poly-A linker gave sloppy, smeared bands. The thermodynamic floppiness is collapsing the RNP complex. Let’s try Emiko’s 4-nucleotide GAAA tetraloop design!',
        backgroundType: 'cleanroom_bench',
        nextSceneId: 'crispr_s6_sgRNA'
      },
      {
        id: 'crispr_s6_sgRNA',
        chapterId: 'ch3',
        speakerId: 'emiko',
        expression: 'excited',
        dialogue: 'The single-guide chimera (sgRNA) cleaved the target plasmid with even higher efficiency than the natural dual-RNA system! 100% stoichiometric digestion in under 15 minutes!',
        backgroundType: 'cleanroom_bench',
        scientificLog: {
          stepTitle: 'Validation of the sgRNA Chimera',
          phase: 'control_verification',
          experimentalAction: 'Engineered a 98-nt chimeric single-guide RNA with 20-nt target guide region linked to tracrRNA via GAAA loop. Tested against 5 distinct plasmid loci.',
          observedData: 'Clean, site-specific blunt cuts exactly 3 base pairs upstream of the 5\'-NGG-3\' PAM across all 5 loci.',
          deduction: 'A single synthesized RNA molecule is sufficient to program Cas9 cleavage at any specified genomic address.',
          confidenceDelta: 30
        },
        nextSceneId: 'crispr_s7'
      },
      {
        id: 'crispr_s7',
        chapterId: 'ch4',
        speakerId: 'aegis',
        expression: 'excited',
        dialogue: 'Confirmation complete. We have demonstrated that Cas9 can be targeted to ANY 20-base-pair coordinate by simply altering the first 20 nucleotides of the sgRNA transcript, provided an adjacent NGG PAM exists.',
        backgroundType: 'server_cluster',
        nextSceneId: 'crispr_s8'
      },
      {
        id: 'crispr_s8',
        chapterId: 'ch4',
        speakerId: 'kaito',
        expression: 'eureka',
        dialogue: 'Do you understand what you have achieved today, Emiko? You did not just explain bacterial immunity. You have handed humanity a molecular word processor for the code of life.',
        backgroundType: 'academic_lecture_hall',
        isEnding: true,
        scientificLog: {
          stepTitle: 'Paradigm Shift: Programmable Genome Editing',
          phase: 'paradigm_shift',
          experimentalAction: 'Published definitive Science 2012 protocol with biochemical mapping of HNH (cuts complementary strand) and RuvC (cuts non-complementary strand).',
          observedData: 'Universal adoption in mammalian, plant, and fungal systems within 12 months.',
          deduction: 'Bacterial CRISPR-Cas9 establishes the foundational paradigm of modern genetic medicine and synthetic biology.',
          confidenceDelta: 35
        }
      }
    ]
  },
  {
    id: 'attention-transformer',
    title: 'Recurrence Shattered: Attention Is All You Need',
    paperCitation: 'Vaswani et al., Google Brain & Google Research (NeurIPS 2017)',
    scientificDomain: 'Deep Learning & Artificial Intelligence',
    animeStyle: 'cyberpunk_lab',
    summary: 'Step inside the neural network compute cluster as researchers battle the sequential processing bottleneck of RNNs and LSTMs. Discover how self-attention unlocked parallel sequence modeling.',
    coreDiscovery: 'Sequential recurrence and convolutions can be discarded entirely in favor of multi-head self-attention, enabling $O(1)$ sequential operations and massive parallelization on modern hardware.',
    experimentalHypothesis: 'Can sequence transduction models eliminate recurrent hidden states and instead rely entirely on self-attention mechanisms to map dependencies between representations?',
    glossary: TRANSFORMER_GLOSSARY,
    researchPath: TRANSFORMER_RESEARCH_PATH,
    keyTakeaways: [
      'Recurrent models enforce sequential $O(n)$ dependencies, blocking GPU parallelization during training.',
      'Dot-product attention grows large in high dimensions; the $\\frac{1}{\\sqrt{d_k}}$ scaling factor prevents vanishing gradients.',
      'Multi-Head Attention allows the model to jointly attend to information from different representation subspaces.'
    ],
    characters: [
      {
        id: 'ash',
        name: 'Ash Raman',
        title: 'Lead Architecture Researcher',
        role: 'lead_investigator',
        avatarVariant: 'prodigy',
        primaryColor: '#06b6d4',
        accentColor: '#22d3ee',
        signatureVoicePitch: 480
      },
      {
        id: 'dr_chen',
        name: 'Dr. Evelyn Chen',
        title: 'Distinguished ML Scientist',
        role: 'mentor_skeptic',
        avatarVariant: 'mentor',
        primaryColor: '#ec4899',
        accentColor: '#f472b6',
        signatureVoicePitch: 260
      },
      {
        id: 'toru',
        name: 'Toru Takahashi',
        title: 'Distributed Systems Engineer',
        role: 'methodologist',
        avatarVariant: 'engineer',
        primaryColor: '#eab308',
        accentColor: '#fde047',
        signatureVoicePitch: 360
      }
    ],
    chapters: [
      {
        id: 'att_ch1',
        title: 'Chapter 1: The Recurrence Bottleneck',
        subtitle: 'The Limits of Sequential Processing',
        phase: 'hypothesis'
      },
      {
        id: 'att_ch2',
        title: 'Chapter 2: The Softmax Explosion',
        subtitle: 'Vanishing Gradients in Dot Products',
        phase: 'failed_trial'
      },
      {
        id: 'att_ch3',
        title: 'Chapter 3: The Scaling Factor',
        subtitle: 'Multi-Head Subspace Projections',
        phase: 'breakthrough_method'
      },
      {
        id: 'att_ch4',
        title: 'Chapter 4: SOTA Translation Matrix',
        subtitle: 'The Rise of the Transformer',
        phase: 'paradigm_shift'
      }
    ],
    initialSceneId: 'att_s1',
    scenes: [
      {
        id: 'att_s1',
        chapterId: 'att_ch1',
        speakerId: 'ash',
        expression: 'serious',
        dialogue: 'Look at our TPU telemetry. Cluster utilization is stalled at barely 14%! Because LSTMs compute $h_t$ based on $h_{t-1}$, token 500 must wait for all 499 preceding tokens before doing a single forward pass!',
        backgroundType: 'server_cluster',
        scientificLog: {
          stepTitle: 'Profiling Sequential RNN Complexity',
          phase: 'hypothesis',
          experimentalAction: 'Benchmarked WMT 2014 English-German translation using 8-layer stacked bi-directional LSTM with attention.',
          observedData: 'Training required 3.5 days across 8 P100 GPUs. Hardware utilization throttled by sequential step-dependencies.',
          deduction: 'Sequential computation is a structural hardware bottleneck that prevents scaling to larger datasets.',
          confidenceDelta: 10
        },
        nextSceneId: 'att_s2'
      },
      {
        id: 'att_s2',
        chapterId: 'att_ch1',
        speakerId: 'dr_chen',
        expression: 'serious',
        dialogue: 'Recurrence provides the inductive bias for word order. If you scrap recurrent state updates completely, how will tokens know their relative positions, and how will distant words interact?',
        backgroundType: 'server_cluster',
        branchChoice: {
          prompt: 'Architecture Pivot: What core mechanism will replace recurrence?',
          scientificDilemma: 'We need parallel matrix multiplication while retaining arbitrary long-range token relationships.',
          options: [
            {
              id: 'opt_self_att',
              text: 'Pure Self-Attention where every token computes Query-Key-Value dot products with all other tokens, paired with Sinusoidal Positional Encodings.',
              experimentalRationale: 'Enables constant $O(1)$ sequential operations and connects any two positions in a sentence in a single computational step.',
              scientificClue: 'Positional encodings inject order without recurrent dependencies.',
              nextSceneId: 'att_s3_success',
              soundEffect: 'eureka',
              confidenceReward: 25
            },
            {
              id: 'opt_dilated_conv',
              text: 'Stack 2D dilated convolutional kernels with gated linear units (like ByteNet).',
              experimentalRationale: 'While parallelizable, path length between distant tokens still scales logarithmically with network depth.',
              scientificClue: 'Logarithmic path requires deeper networks to connect distant references.',
              nextSceneId: 'att_s3_conv',
              soundEffect: 'puzzle',
              confidenceReward: 10
            }
          ]
        }
      },
      {
        id: 'att_s3_conv',
        chapterId: 'att_ch2',
        speakerId: 'toru',
        expression: 'puzzled',
        dialogue: 'The dilated conv stack trains faster than the LSTM, but for complex sentences over 60 words, cross-clause pronominal reference resolution drops significantly. We need all-to-all attention!',
        backgroundType: 'server_cluster',
        nextSceneId: 'att_s3_success'
      },
      {
        id: 'att_s3_success',
        chapterId: 'att_ch2',
        speakerId: 'ash',
        expression: 'puzzled',
        dialogue: 'We ran the pure dot-product attention: $\\text{Softmax}(Q K^T) V$. But during training with key dimension $d_k = 64$, the training loss flatlined and gradients vanished to zero! Why?',
        backgroundType: 'server_cluster',
        scientificLog: {
          stepTitle: 'Dot-Product Scale Anomaly',
          phase: 'failed_trial',
          experimentalAction: 'Trained raw dot-product self-attention with model dimension $d_{model} = 512$ and $d_k = 64$.',
          observedData: 'Gradient norms dropped below $10^{-6}$. Softmax probabilities collapsed into one-hot vectors with near-zero derivatives.',
          deduction: 'For large $d_k$, the dot products grow large in magnitude, pushing the softmax function into regions with minuscule gradients.',
          confidenceDelta: -15
        },
        nextSceneId: 'att_s4'
      },
      {
        id: 'att_s4',
        chapterId: 'att_ch3',
        speakerId: 'dr_chen',
        expression: 'eureka',
        dialogue: 'Under the assumption that components of $q$ and $k$ are independent random variables with mean 0 and variance 1, their dot product has mean 0 and variance $d_k$! The variance scales with the dimension!',
        innerMonologue: 'To counteract this variance explosion, we simply need to divide the dot products by $\\sqrt{d_k}$ before applying softmax!',
        backgroundType: 'academic_lecture_hall',
        scientificLog: {
          stepTitle: 'Scaled Dot-Product Attention Implementation',
          phase: 'breakthrough_method',
          experimentalAction: 'Introduced scaling factor: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$. Also deployed 8 parallel attention heads.',
          observedData: 'Loss curves stabilized immediately. Gradient descent progressed smoothly with learning rate warmup and Adam optimizer.',
          deduction: 'Scaling restores unit variance, allowing stable backpropagation through deep multi-head layers.',
          confidenceDelta: 30
        },
        nextSceneId: 'att_s5'
      },
      {
        id: 'att_s5',
        chapterId: 'att_ch4',
        speakerId: 'toru',
        expression: 'excited',
        dialogue: 'The English-to-German WMT evaluation just finished... BLEU score 28.4! That shatters the existing best ensemble by over 2.0 BLEU points, and trained in only 3.5 days on 8 GPUs!',
        backgroundType: 'server_cluster',
        nextSceneId: 'att_s6'
      },
      {
        id: 'att_s6',
        chapterId: 'att_ch4',
        speakerId: 'ash',
        expression: 'eureka',
        dialogue: 'No recurrent connections. No convolutional filters. Pure self-attention has established a new universal backbone for machine perception.',
        backgroundType: 'server_cluster',
        isEnding: true,
        scientificLog: {
          stepTitle: 'The Transformer Architecture Era',
          phase: 'paradigm_shift',
          experimentalAction: 'Benchmarked against state-of-the-art across WMT English-to-German and English-to-French benchmarks.',
          observedData: 'Superior BLEU score achieved at a fraction of the training cost of recurrent models.',
          deduction: 'Attention mechanisms provide sufficient expressive power to model global dependencies without recurrence.',
          confidenceDelta: 35
        }
      }
    ]
  }
];
