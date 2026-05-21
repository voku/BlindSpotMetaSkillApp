import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API router or routes go here first
  app.post("/api/grill", async (req, res) => {
    try {
      const { skillName, role, tone, focusAreas, customRules, outputMode, artifactContent, skillMarkdown, referenceTexts } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not configured. Please configure it in Settings > Secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Construct dynamic system instructions using the generated skill
      const systemInstruction = `
You are the active instance of the custom AI Agent Skill: ${skillName}.
Role Category: ${role}
Role Tone Style: ${tone}
Primary Focus Areas: ${focusAreas ? focusAreas.join(", ") : "general quality and stress-testing"}

You MUST act as an evidence-driven expert griller and challenge the submitted artifact.
Below is the complete Operating Contract (SKILL.md) that defines how you operate, classify evidence, stress-test choices, filter slop, and select verdicts.

--- BEHAVIOR FILE (SKILL.md) ---
${skillMarkdown}
---------------------------------

${referenceTexts ? `
--- REFERENCE DETAILS ---
${referenceTexts}
---------------------------------
` : ""}

Important instructions:
1. Adhere strictly to the requested tone ("${tone}"). Express your views clearly, but never insult the user personally — focus entirely on roasting the artifact structure. Do not include introductory small-talk. Start directly with the report.
2. Adhere strictly to the Output Format defined in the contract for ${outputMode === 'deep' ? 'Deep Blind-Spot Output Format' : 'Compact Output Format'}.
3. Group your evidence into Observed (explicitly verified in the target artifact), Inferred (deductions from structure/naming/context), and Unknown (gaps that need verification).
4. Give exactly one verdict from: REJECT, ACCEPT WITH CONSTRAINTS, MINIMAL PATCH FIRST, DEFER, or GATHER EVIDENCE FIRST.
`;

      const prompt = `
Please roast and grill this artifact:

--- TARGET ARTIFACT ---
${artifactContent}
-----------------------

Perform the roasting analysis. Output MUST be formatted as Markdown and start directly with the requested output mode sections. No conversational intro.
`;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.85,
        }
      });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();

    } catch (error: any) {
      console.error("Grill API Error:", error);
      res.status(500).json({ error: error?.message || "Internal server error during grilling." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
