"use server";

import { revalidatePath } from "next/cache";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

export async function getDocuments(startupId?: string) {
  return prisma.document.findMany({
    where: startupId ? { startupId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      startup: { select: { id: true, name: true } },
      analyses: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

export async function getDocumentById(id: string) {
  return prisma.document.findUnique({
    where: { id },
    include: {
      startup: true,
      analyses: true,
    },
  });
}

export async function createDocument(formData: FormData) {
  const startupId = formData.get("startupId") as string;
  const name = formData.get("name") as string;
  const type = (formData.get("type") as "pitch_deck" | "one_pager" | "financials" | "other") || "pitch_deck";
  if (!startupId || !name) return { error: "startupId and name required" };
  await prisma.document.create({
    data: {
      startupId,
      name,
      type,
      storageKey: formData.get("content") as string | null || null, // MVP: store raw text in storageKey for analysis
    },
  });
  revalidatePath("/documents");
  revalidatePath("/documents");
  revalidatePath("/startups/" + startupId);
  return { success: true };
}

export async function analyzePitchDeck(documentId: string) {
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    include: { startup: true },
  });
  if (!doc) return { error: "Document not found" };
  const content =
    doc.storageKey && doc.storageKey.length > 100 ? doc.storageKey : null;
  if (!content) {
    return {
      error:
        "No pitch content to analyze. Edit the document and add content (e.g. paste pitch text).",
    };
  }
  if (!genAI) {
    return { error: "GEMINI_API_KEY not set" };
  }
  const prompt = `You are an expert startup advisor and investor. Analyze this pitch content and respond with a JSON object only (no markdown, no prose) with exactly these keys:
- "overallScore": number from 1 to 100
- "criteriaScores": object with keys "problem", "solution", "market", "traction", "team", "ask" (each number 1-100)
- "feedback": string with 2-4 sentences of overall feedback
- "suggestions": array of 3-6 strings, each one an actionable improvement

Pitch:
---
${content.slice(0, 12000)}
---`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });
  const raw = result.text;
  if (!raw) return { error: "No AI response" };
  const parsed = JSON.parse(raw) as {
    overallScore?: number;
    criteriaScores?: Record<string, number>;
    feedback?: string;
    suggestions?: string[];
  };
  const overallScore = Math.min(100, Math.max(1, Number(parsed.overallScore) || 50));
  const criteriaScores = parsed.criteriaScores || {};
  const feedback = parsed.feedback || "";
  const suggestions = Array.isArray(parsed.suggestions)
    ? parsed.suggestions.slice(0, 8).filter((s) => typeof s === "string")
    : [];
  await prisma.pitchDeckAnalysis.create({
    data: {
      documentId,
      overallScore,
      criteriaScores: criteriaScores as object,
      feedback,
      suggestions,
      modelUsed: "gemini-2.5-flash",
    },
  });
  revalidatePath("/documents");
  revalidatePath("/startups/" + doc.startupId);
  return { success: true };
}
