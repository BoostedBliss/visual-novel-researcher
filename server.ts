import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Storyboard Generation Endpoint
  app.post('/api/generate-storyboard', async (req, res) => {
    try {
      const { paperTitle, paperText, animeStyle, researchDomain } = req.body;

      if (!paperText || !paperTitle) {
        return res.status(400).json({ error: 'Missing paper title or content.' });
      }

      const ai = getGenAI();

      if (!ai) {
        // Fallback procedural generator if API key is not present
        return res.json({
          success: true,
          isSample: true,
          novel: createProceduralNovel(paperTitle, paperText, animeStyle || 'steins_academia', researchDomain || 'Applied Sciences')
        });
      }

      const prompt = `You are a master anime visual novel director and senior research scientist.
Transform the following research paper / NotebookLM study content into an immersive, character-driven anime visual novel.
Crucial directive: Do not merely summarize the final conclusions! You MUST show the experimental path taken to reach those conclusions:
1. The initial hypothesis & why it was formed.
2. The grit of the failed trial, anomaly, or control failure that stumped the lab.
3. The breakthrough hypothesis or experimental pivot.
4. The rigorous verification assay (controls, negative controls, edge cases).
5. The core finding and paradigm shift.

Paper Title: ${paperTitle}
Scientific Domain: ${researchDomain || 'Cutting-Edge Research'}
Anime Aesthetic Style: ${animeStyle || 'steins_academia'}
Paper / NotebookLM Content:
${paperText.slice(0, 12000)}

Create 3-4 distinct anime characters with rich dynamics:
- Lead Researcher (passionate, observant prodigy)
- Senior PI / Skeptic (demanding rigorous proof, challenging premature conclusions)
- Methodologist / Lab Engineer (hands-on, precision-driven, manages hardware/assays)
- Optional AI Assistant or companion analyst

Provide 4 chapters with 8-10 dynamic scenes with branching player choices that test scientific intuition!`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              paperCitation: { type: Type.STRING },
              scientificDomain: { type: Type.STRING },
              animeStyle: { type: Type.STRING },
              summary: { type: Type.STRING },
              coreDiscovery: { type: Type.STRING },
              experimentalHypothesis: { type: Type.STRING },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    title: { type: Type.STRING },
                    role: { type: Type.STRING, enum: ['lead_investigator', 'mentor_skeptic', 'methodologist', 'ai_assistant'] },
                    avatarVariant: { type: Type.STRING, enum: ['prodigy', 'mentor', 'engineer', 'analyst', 'companion'] },
                    primaryColor: { type: Type.STRING },
                    accentColor: { type: Type.STRING },
                    signatureVoicePitch: { type: Type.NUMBER }
                  },
                  required: ['id', 'name', 'title', 'role', 'avatarVariant', 'primaryColor', 'accentColor', 'signatureVoicePitch']
                }
              },
              chapters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    phase: { type: Type.STRING, enum: ['hypothesis', 'failed_trial', 'breakthrough_method', 'control_verification', 'paradigm_shift'] }
                  },
                  required: ['id', 'title', 'subtitle', 'phase']
                }
              },
              initialSceneId: { type: Type.STRING },
              scenes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    chapterId: { type: Type.STRING },
                    speakerId: { type: Type.STRING },
                    expression: { type: Type.STRING, enum: ['neutral', 'excited', 'puzzled', 'eureka', 'serious'] },
                    dialogue: { type: Type.STRING },
                    innerMonologue: { type: Type.STRING },
                    backgroundType: { type: Type.STRING, enum: ['cryo_em_chamber', 'server_cluster', 'cleanroom_bench', 'academic_lecture_hall', 'particle_accelerator', 'greenhouse_field'] },
                    scientificLog: {
                      type: Type.OBJECT,
                      properties: {
                        stepTitle: { type: Type.STRING },
                        phase: { type: Type.STRING, enum: ['hypothesis', 'failed_trial', 'breakthrough_method', 'control_verification', 'paradigm_shift'] },
                        experimentalAction: { type: Type.STRING },
                        observedData: { type: Type.STRING },
                        deduction: { type: Type.STRING },
                        confidenceDelta: { type: Type.NUMBER }
                      },
                      required: ['stepTitle', 'phase', 'experimentalAction', 'observedData', 'deduction', 'confidenceDelta']
                    },
                    branchChoice: {
                      type: Type.OBJECT,
                      properties: {
                        prompt: { type: Type.STRING },
                        scientificDilemma: { type: Type.STRING },
                        options: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              id: { type: Type.STRING },
                              text: { type: Type.STRING },
                              experimentalRationale: { type: Type.STRING },
                              scientificClue: { type: Type.STRING },
                              nextSceneId: { type: Type.STRING },
                              soundEffect: { type: Type.STRING, enum: ['success', 'puzzle', 'critical', 'eureka'] },
                              confidenceReward: { type: Type.NUMBER }
                            },
                            required: ['id', 'text', 'experimentalRationale', 'scientificClue', 'nextSceneId', 'confidenceReward']
                          }
                        }
                      },
                      required: ['prompt', 'scientificDilemma', 'options']
                    },
                    nextSceneId: { type: Type.STRING },
                    isEnding: { type: Type.BOOLEAN }
                  },
                  required: ['id', 'chapterId', 'speakerId', 'expression', 'dialogue', 'backgroundType']
                }
              }
            },
            required: ['id', 'title', 'paperCitation', 'scientificDomain', 'animeStyle', 'summary', 'coreDiscovery', 'experimentalHypothesis', 'characters', 'chapters', 'scenes', 'initialSceneId', 'keyTakeaways']
          }
        }
      });

      const parsedData = JSON.parse(response.text || '{}');
      res.json({ success: true, novel: parsedData });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown generation error';
      console.error('Gemini generation error:', errorMessage);
      // Generate intelligent fallback
      const { paperTitle, paperText, animeStyle, researchDomain } = req.body;
      const fallbackNovel = createProceduralNovel(paperTitle || 'Research Study', paperText || '', animeStyle || 'steins_academia', researchDomain || 'Scientific Frontier');
      res.json({ success: true, novel: fallbackNovel, warning: errorMessage });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Visual Novel Studio server running on http://0.0.0.0:${PORT}`);
  });
}

function createProceduralNovel(title: string, text: string, animeStyle: string, domain: string) {
  const cleanSnippet = text.slice(0, 300).replace(/[\r\n]+/g, ' ').trim() || 'A breakthrough inquiry into empirical phenomena.';
  
  return {
    id: 'generated-' + Date.now(),
    title: `Operation ${title.slice(0, 30)}: The Proof Pathway`,
    paperCitation: title,
    scientificDomain: domain || 'Empirical Science',
    animeStyle: animeStyle || 'steins_academia',
    summary: `An anime visual novel exploring the rigorous experimental voyage of: ${title}.`,
    coreDiscovery: cleanSnippet,
    experimentalHypothesis: `Can empirical testing validate the theoretical assumptions behind ${title}?`,
    keyTakeaways: [
      'Initial control tests exposed critical anomalies in existing models.',
      'A methodical redesign of the experimental protocol unlocked reproducible signals.',
      'Peer-verified conclusions reshaped the domain consensus.'
    ],
    characters: [
      {
        id: 'char_lead',
        name: 'Dr. Ren Amamiya',
        title: 'Principal Investigator',
        role: 'lead_investigator',
        avatarVariant: 'prodigy',
        primaryColor: '#0284c7',
        accentColor: '#38bdf8',
        signatureVoicePitch: 480
      },
      {
        id: 'char_mentor',
        name: 'Prof. Yoko Kanno',
        title: 'Senior Fellow',
        role: 'mentor_skeptic',
        avatarVariant: 'mentor',
        primaryColor: '#7c3aed',
        accentColor: '#a78bfa',
        signatureVoicePitch: 240
      },
      {
        id: 'char_eng',
        name: 'Kenji Sato',
        title: 'Lead Instrumentation Engineer',
        role: 'methodologist',
        avatarVariant: 'engineer',
        primaryColor: '#059669',
        accentColor: '#34d399',
        signatureVoicePitch: 360
      }
    ],
    chapters: [
      { id: 'ch1', title: 'Chapter 1: The Discrepancy', subtitle: 'Initial Observations', phase: 'hypothesis' },
      { id: 'ch2', title: 'Chapter 2: The Calibration Crisis', subtitle: 'Failed Controls', phase: 'failed_trial' },
      { id: 'ch3', title: 'Chapter 3: The Methodological Shift', subtitle: 'The New Protocol', phase: 'breakthrough_method' },
      { id: 'ch4', title: 'Chapter 4: The Definitive Signal', subtitle: 'Consensus Achieved', phase: 'paradigm_shift' }
    ],
    initialSceneId: 'sc_1',
    scenes: [
      {
        id: 'sc_1',
        chapterId: 'ch1',
        speakerId: 'char_lead',
        expression: 'puzzled',
        dialogue: `We gathered the preliminary data for "${title}". But look at these readings—they diverge completely from the standard literature!`,
        innerMonologue: 'If the baseline assumptions are flawed, every downstream conclusion we built might collapse...',
        backgroundType: 'cleanroom_bench',
        scientificLog: {
          stepTitle: 'Baseline Experimental Sweep',
          phase: 'hypothesis',
          experimentalAction: 'Executed preliminary data capture against baseline theoretical parameters.',
          observedData: 'Signal-to-noise ratio was under 1.4; key indicators showed significant variance from standard theory.',
          deduction: 'Existing literature models fail to explain the anomalous boundary behavior.',
          confidenceDelta: 10
        },
        nextSceneId: 'sc_2'
      },
      {
        id: 'sc_2',
        chapterId: 'ch2',
        speakerId: 'char_mentor',
        expression: 'serious',
        dialogue: 'Before you celebrate a revolution, Ren, rule out mundane experimental artifacts. Was the instrument properly zeroed, or did environmental noise contaminate the sensor arrays?',
        backgroundType: 'academic_lecture_hall',
        branchChoice: {
          prompt: 'Troubleshooting Dilemma: How do we isolate the source of the anomaly?',
          scientificDilemma: 'Distinguishing true physical signal from systematic measurement drift.',
          options: [
            {
              id: 'opt_blind_control',
              text: 'Perform an interleaved negative control assay with blinded baseline samples.',
              experimentalRationale: 'Blinded negative controls verify that the detector registers a true null when no substrate is present.',
              scientificClue: 'Negative control demonstrates zero baseline drift, confirming the anomaly is genuine.',
              nextSceneId: 'sc_3_valid',
              soundEffect: 'eureka',
              confidenceReward: 25
            },
            {
              id: 'opt_crank_power',
              text: 'Increase amplifier gain by 300% to brute-force the signal.',
              experimentalRationale: 'Amplifying without filtering merely magnifies thermal noise and saturates the ADC converters.',
              scientificClue: 'High noise floor masks delicate secondary harmonics.',
              nextSceneId: 'sc_3_noise',
              soundEffect: 'puzzle',
              confidenceReward: 5
            }
          ]
        }
      },
      {
        id: 'sc_3_noise',
        chapterId: 'ch2',
        speakerId: 'char_eng',
        expression: 'serious',
        dialogue: 'Increasing gain just pegged our sensors at the ceiling! Kenji warned us—we must use the blinded negative control protocol!',
        backgroundType: 'cleanroom_bench',
        nextSceneId: 'sc_3_valid'
      },
      {
        id: 'sc_3_valid',
        chapterId: 'ch3',
        speakerId: 'char_eng',
        expression: 'excited',
        dialogue: 'The negative controls passed with zero drift! That means the anomaly in the sample is 100% real physical interaction!',
        backgroundType: 'cleanroom_bench',
        scientificLog: {
          stepTitle: 'Rigorous Control Verification',
          phase: 'breakthrough_method',
          experimentalAction: 'Ran 12 blinded interleaved trials with reference standard and active test samples.',
          observedData: 'Zero false-positives on blank substrates. Statistically robust delta (p < 0.001) on target sample.',
          deduction: 'The observed phenomenon is an authentic physical mechanism.',
          confidenceDelta: 25
        },
        nextSceneId: 'sc_4'
      },
      {
        id: 'sc_4',
        chapterId: 'ch4',
        speakerId: 'char_lead',
        expression: 'eureka',
        dialogue: `We did it! The synthesized data confirms our new framework: ${cleanSnippet.slice(0, 140)}... The research paper's findings are fully verified!`,
        backgroundType: 'server_cluster',
        isEnding: true,
        scientificLog: {
          stepTitle: 'Discovery Confirmed',
          phase: 'paradigm_shift',
          experimentalAction: 'Synthesized complete empirical proof and cross-validated with external benchmarks.',
          observedData: 'Replication rate reached 99.4% across multiple independent trials.',
          deduction: 'Successfully established the new foundational paradigm for this research domain.',
          confidenceDelta: 30
        }
      }
    ]
  };
}

startServer();
