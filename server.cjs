var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  let aiClient = null;
  function getGenAI() {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return aiClient;
  }
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasApiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });
  app.post("/api/generate-storyboard", async (req, res) => {
    try {
      const { paperTitle, paperText, animeStyle, researchDomain } = req.body;
      if (!paperText || !paperTitle) {
        return res.status(400).json({ error: "Missing paper title or content." });
      }
      const ai = getGenAI();
      if (!ai) {
        return res.json({
          success: true,
          isSample: true,
          novel: createProceduralNovel(paperTitle, paperText, animeStyle || "steins_academia", researchDomain || "Applied Sciences")
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
Scientific Domain: ${researchDomain || "Cutting-Edge Research"}
Anime Aesthetic Style: ${animeStyle || "steins_academia"}
Paper / NotebookLM Content:
${paperText.slice(0, 12e3)}

Create 3-4 distinct anime characters with rich dynamics:
- Lead Researcher (passionate, observant prodigy)
- Senior PI / Skeptic (demanding rigorous proof, challenging premature conclusions)
- Methodologist / Lab Engineer (hands-on, precision-driven, manages hardware/assays)
- Optional AI Assistant or companion analyst

Provide 4 chapters with 8-10 dynamic scenes with branching player choices that test scientific intuition!`;
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              id: { type: import_genai.Type.STRING },
              title: { type: import_genai.Type.STRING },
              paperCitation: { type: import_genai.Type.STRING },
              scientificDomain: { type: import_genai.Type.STRING },
              animeStyle: { type: import_genai.Type.STRING },
              summary: { type: import_genai.Type.STRING },
              coreDiscovery: { type: import_genai.Type.STRING },
              experimentalHypothesis: { type: import_genai.Type.STRING },
              keyTakeaways: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              characters: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    id: { type: import_genai.Type.STRING },
                    name: { type: import_genai.Type.STRING },
                    title: { type: import_genai.Type.STRING },
                    role: { type: import_genai.Type.STRING, enum: ["lead_investigator", "mentor_skeptic", "methodologist", "ai_assistant"] },
                    avatarVariant: { type: import_genai.Type.STRING, enum: ["prodigy", "mentor", "engineer", "analyst", "companion"] },
                    primaryColor: { type: import_genai.Type.STRING },
                    accentColor: { type: import_genai.Type.STRING },
                    signatureVoicePitch: { type: import_genai.Type.NUMBER }
                  },
                  required: ["id", "name", "title", "role", "avatarVariant", "primaryColor", "accentColor", "signatureVoicePitch"]
                }
              },
              chapters: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    id: { type: import_genai.Type.STRING },
                    title: { type: import_genai.Type.STRING },
                    subtitle: { type: import_genai.Type.STRING },
                    phase: { type: import_genai.Type.STRING, enum: ["hypothesis", "failed_trial", "breakthrough_method", "control_verification", "paradigm_shift"] }
                  },
                  required: ["id", "title", "subtitle", "phase"]
                }
              },
              initialSceneId: { type: import_genai.Type.STRING },
              scenes: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    id: { type: import_genai.Type.STRING },
                    chapterId: { type: import_genai.Type.STRING },
                    speakerId: { type: import_genai.Type.STRING },
                    expression: { type: import_genai.Type.STRING, enum: ["neutral", "excited", "puzzled", "eureka", "serious"] },
                    dialogue: { type: import_genai.Type.STRING },
                    innerMonologue: { type: import_genai.Type.STRING },
                    backgroundType: { type: import_genai.Type.STRING, enum: ["cryo_em_chamber", "server_cluster", "cleanroom_bench", "academic_lecture_hall", "particle_accelerator", "greenhouse_field"] },
                    scientificLog: {
                      type: import_genai.Type.OBJECT,
                      properties: {
                        stepTitle: { type: import_genai.Type.STRING },
                        phase: { type: import_genai.Type.STRING, enum: ["hypothesis", "failed_trial", "breakthrough_method", "control_verification", "paradigm_shift"] },
                        experimentalAction: { type: import_genai.Type.STRING },
                        observedData: { type: import_genai.Type.STRING },
                        deduction: { type: import_genai.Type.STRING },
                        confidenceDelta: { type: import_genai.Type.NUMBER }
                      },
                      required: ["stepTitle", "phase", "experimentalAction", "observedData", "deduction", "confidenceDelta"]
                    },
                    branchChoice: {
                      type: import_genai.Type.OBJECT,
                      properties: {
                        prompt: { type: import_genai.Type.STRING },
                        scientificDilemma: { type: import_genai.Type.STRING },
                        options: {
                          type: import_genai.Type.ARRAY,
                          items: {
                            type: import_genai.Type.OBJECT,
                            properties: {
                              id: { type: import_genai.Type.STRING },
                              text: { type: import_genai.Type.STRING },
                              experimentalRationale: { type: import_genai.Type.STRING },
                              scientificClue: { type: import_genai.Type.STRING },
                              nextSceneId: { type: import_genai.Type.STRING },
                              soundEffect: { type: import_genai.Type.STRING, enum: ["success", "puzzle", "critical", "eureka"] },
                              confidenceReward: { type: import_genai.Type.NUMBER }
                            },
                            required: ["id", "text", "experimentalRationale", "scientificClue", "nextSceneId", "confidenceReward"]
                          }
                        }
                      },
                      required: ["prompt", "scientificDilemma", "options"]
                    },
                    nextSceneId: { type: import_genai.Type.STRING },
                    isEnding: { type: import_genai.Type.BOOLEAN }
                  },
                  required: ["id", "chapterId", "speakerId", "expression", "dialogue", "backgroundType"]
                }
              }
            },
            required: ["id", "title", "paperCitation", "scientificDomain", "animeStyle", "summary", "coreDiscovery", "experimentalHypothesis", "characters", "chapters", "scenes", "initialSceneId", "keyTakeaways"]
          }
        }
      });
      const parsedData = JSON.parse(response.text || "{}");
      res.json({ success: true, novel: parsedData });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown generation error";
      console.error("Gemini generation error:", errorMessage);
      const { paperTitle, paperText, animeStyle, researchDomain } = req.body;
      const fallbackNovel = createProceduralNovel(paperTitle || "Research Study", paperText || "", animeStyle || "steins_academia", researchDomain || "Scientific Frontier");
      res.json({ success: true, novel: fallbackNovel, warning: errorMessage });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Visual Novel Studio server running on http://0.0.0.0:${PORT}`);
  });
}
function createProceduralNovel(title, text, animeStyle, domain) {
  const cleanSnippet = text.slice(0, 300).replace(/[\r\n]+/g, " ").trim() || "A breakthrough inquiry into empirical phenomena.";
  return {
    id: "generated-" + Date.now(),
    title: `Operation ${title.slice(0, 30)}: The Proof Pathway`,
    paperCitation: title,
    scientificDomain: domain || "Empirical Science",
    animeStyle: animeStyle || "steins_academia",
    summary: `An anime visual novel exploring the rigorous experimental voyage of: ${title}.`,
    coreDiscovery: cleanSnippet,
    experimentalHypothesis: `Can empirical testing validate the theoretical assumptions behind ${title}?`,
    keyTakeaways: [
      "Initial control tests exposed critical anomalies in existing models.",
      "A methodical redesign of the experimental protocol unlocked reproducible signals.",
      "Peer-verified conclusions reshaped the domain consensus."
    ],
    characters: [
      {
        id: "char_lead",
        name: "Dr. Ren Amamiya",
        title: "Principal Investigator",
        role: "lead_investigator",
        avatarVariant: "prodigy",
        primaryColor: "#0284c7",
        accentColor: "#38bdf8",
        signatureVoicePitch: 480
      },
      {
        id: "char_mentor",
        name: "Prof. Yoko Kanno",
        title: "Senior Fellow",
        role: "mentor_skeptic",
        avatarVariant: "mentor",
        primaryColor: "#7c3aed",
        accentColor: "#a78bfa",
        signatureVoicePitch: 240
      },
      {
        id: "char_eng",
        name: "Kenji Sato",
        title: "Lead Instrumentation Engineer",
        role: "methodologist",
        avatarVariant: "engineer",
        primaryColor: "#059669",
        accentColor: "#34d399",
        signatureVoicePitch: 360
      }
    ],
    chapters: [
      { id: "ch1", title: "Chapter 1: The Discrepancy", subtitle: "Initial Observations", phase: "hypothesis" },
      { id: "ch2", title: "Chapter 2: The Calibration Crisis", subtitle: "Failed Controls", phase: "failed_trial" },
      { id: "ch3", title: "Chapter 3: The Methodological Shift", subtitle: "The New Protocol", phase: "breakthrough_method" },
      { id: "ch4", title: "Chapter 4: The Definitive Signal", subtitle: "Consensus Achieved", phase: "paradigm_shift" }
    ],
    initialSceneId: "sc_1",
    scenes: [
      {
        id: "sc_1",
        chapterId: "ch1",
        speakerId: "char_lead",
        expression: "puzzled",
        dialogue: `We gathered the preliminary data for "${title}". But look at these readings\u2014they diverge completely from the standard literature!`,
        innerMonologue: "If the baseline assumptions are flawed, every downstream conclusion we built might collapse...",
        backgroundType: "cleanroom_bench",
        scientificLog: {
          stepTitle: "Baseline Experimental Sweep",
          phase: "hypothesis",
          experimentalAction: "Executed preliminary data capture against baseline theoretical parameters.",
          observedData: "Signal-to-noise ratio was under 1.4; key indicators showed significant variance from standard theory.",
          deduction: "Existing literature models fail to explain the anomalous boundary behavior.",
          confidenceDelta: 10
        },
        nextSceneId: "sc_2"
      },
      {
        id: "sc_2",
        chapterId: "ch2",
        speakerId: "char_mentor",
        expression: "serious",
        dialogue: "Before you celebrate a revolution, Ren, rule out mundane experimental artifacts. Was the instrument properly zeroed, or did environmental noise contaminate the sensor arrays?",
        backgroundType: "academic_lecture_hall",
        branchChoice: {
          prompt: "Troubleshooting Dilemma: How do we isolate the source of the anomaly?",
          scientificDilemma: "Distinguishing true physical signal from systematic measurement drift.",
          options: [
            {
              id: "opt_blind_control",
              text: "Perform an interleaved negative control assay with blinded baseline samples.",
              experimentalRationale: "Blinded negative controls verify that the detector registers a true null when no substrate is present.",
              scientificClue: "Negative control demonstrates zero baseline drift, confirming the anomaly is genuine.",
              nextSceneId: "sc_3_valid",
              soundEffect: "eureka",
              confidenceReward: 25
            },
            {
              id: "opt_crank_power",
              text: "Increase amplifier gain by 300% to brute-force the signal.",
              experimentalRationale: "Amplifying without filtering merely magnifies thermal noise and saturates the ADC converters.",
              scientificClue: "High noise floor masks delicate secondary harmonics.",
              nextSceneId: "sc_3_noise",
              soundEffect: "puzzle",
              confidenceReward: 5
            }
          ]
        }
      },
      {
        id: "sc_3_noise",
        chapterId: "ch2",
        speakerId: "char_eng",
        expression: "serious",
        dialogue: "Increasing gain just pegged our sensors at the ceiling! Kenji warned us\u2014we must use the blinded negative control protocol!",
        backgroundType: "cleanroom_bench",
        nextSceneId: "sc_3_valid"
      },
      {
        id: "sc_3_valid",
        chapterId: "ch3",
        speakerId: "char_eng",
        expression: "excited",
        dialogue: "The negative controls passed with zero drift! That means the anomaly in the sample is 100% real physical interaction!",
        backgroundType: "cleanroom_bench",
        scientificLog: {
          stepTitle: "Rigorous Control Verification",
          phase: "breakthrough_method",
          experimentalAction: "Ran 12 blinded interleaved trials with reference standard and active test samples.",
          observedData: "Zero false-positives on blank substrates. Statistically robust delta (p < 0.001) on target sample.",
          deduction: "The observed phenomenon is an authentic physical mechanism.",
          confidenceDelta: 25
        },
        nextSceneId: "sc_4"
      },
      {
        id: "sc_4",
        chapterId: "ch4",
        speakerId: "char_lead",
        expression: "eureka",
        dialogue: `We did it! The synthesized data confirms our new framework: ${cleanSnippet.slice(0, 140)}... The research paper's findings are fully verified!`,
        backgroundType: "server_cluster",
        isEnding: true,
        scientificLog: {
          stepTitle: "Discovery Confirmed",
          phase: "paradigm_shift",
          experimentalAction: "Synthesized complete empirical proof and cross-validated with external benchmarks.",
          observedData: "Replication rate reached 99.4% across multiple independent trials.",
          deduction: "Successfully established the new foundational paradigm for this research domain.",
          confidenceDelta: 30
        }
      }
    ]
  };
}
startServer();
//# sourceMappingURL=server.cjs.map
