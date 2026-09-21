export type AnimeStyle = 
  | 'steins_academia' 
  | 'cyberpunk_lab' 
  | 'naturalist_ghibli' 
  | 'shonen_experiment' 
  | 'kyoto_clean';

export type CharacterExpression = 'neutral' | 'excited' | 'puzzled' | 'eureka' | 'serious';

export interface Character {
  id: string;
  name: string;
  title: string;
  role: 'lead_investigator' | 'mentor_skeptic' | 'methodologist' | 'ai_assistant';
  avatarVariant: 'prodigy' | 'mentor' | 'engineer' | 'analyst' | 'companion';
  primaryColor: string;
  accentColor: string;
  signatureVoicePitch: number; // Hz for Web Audio blips
}

export interface ScientificLogEntry {
  stepTitle: string;
  phase: 'hypothesis' | 'failed_trial' | 'breakthrough_method' | 'control_verification' | 'paradigm_shift';
  experimentalAction: string;
  observedData: string;
  deduction: string;
  confidenceDelta: number; // e.g. +15, -10, +25
}

export interface BranchOption {
  id: string;
  text: string;
  experimentalRationale: string;
  scientificClue: string;
  nextSceneId: string;
  soundEffect?: 'success' | 'puzzle' | 'critical' | 'eureka';
  confidenceReward: number;
}

export interface BranchChoice {
  prompt: string;
  scientificDilemma: string;
  options: BranchOption[];
}

export interface Scene {
  id: string;
  chapterId: string;
  speakerId: string; // Character.id or 'NARRATOR'
  expression: CharacterExpression;
  dialogue: string;
  innerMonologue?: string;
  backgroundType: 'cryo_em_chamber' | 'server_cluster' | 'cleanroom_bench' | 'academic_lecture_hall' | 'particle_accelerator' | 'greenhouse_field';
  scientificLog?: ScientificLogEntry;
  branchChoice?: BranchChoice;
  nextSceneId?: string;
  isEnding?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  phase: 'hypothesis' | 'failed_trial' | 'breakthrough_method' | 'control_verification' | 'paradigm_shift';
}

export interface GlossaryTerm {
  term: string;
  category: 'methodology' | 'biomolecule' | 'physics_concept' | 'model_architecture' | 'instrumentation';
  shortDefinition: string;
  narrativeContext: string;
  experimentalSignificance: string;
  relatedPaperSnippet?: string;
  referenceUrl?: string;
}

export interface ResearchNode {
  id: string;
  sceneId: string;
  chapterId: string;
  title: string;
  type: 'hypothesis' | 'failed_assay' | 'control_pivot' | 'synthesis' | 'breakthrough';
  shortSummary: string;
  empiricalEvidence: string;
  status: 'passed' | 'failed' | 'breakthrough' | 'active' | 'upcoming';
  childrenIds: string[];
}

export interface CustomPlayerCharacter {
  name: string;
  title: string;
  artStyle: AnimeStyle;
  hairStyle: 'prodigy_flow' | 'spiky_engineer' | 'classic_scholar' | 'twin_tails' | 'sleek_cyber';
  hairColor: string; // hex
  eyeShape: 'sparkling' | 'sharp_analytical' | 'inquisitive_round' | 'calm_focused';
  eyeColor: string; // hex
  clothingStyle: 'lab_coat' | 'tech_vest' | 'formal_blazer' | 'cyber_jumpsuit' | 'naturalist_field';
  clothingColor: string; // hex
  accessory: 'none' | 'glasses' | 'forehead_goggles' | 'cyber_earpiece' | 'id_badge';
  specialtyBackstory: 'structural_biology' | 'computational_tensors' | 'quantum_optics' | 'experimental_controls';
  backstoryText: string;
}

export interface VisualNovel {
  id: string;
  title: string;
  paperCitation: string;
  scientificDomain: string;
  animeStyle: AnimeStyle;
  summary: string;
  coreDiscovery: string;
  experimentalHypothesis: string;
  characters: Character[];
  chapters: Chapter[];
  scenes: Scene[];
  initialSceneId: string;
  keyTakeaways: string[];
  glossary?: GlossaryTerm[];
  researchPath?: ResearchNode[];
}
