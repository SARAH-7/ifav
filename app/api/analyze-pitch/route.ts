import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey: openaiApiKey });
  try {
    const body = await req.json();
    const { documentId, text } = body as { documentId: string; text?: string };

    if (!documentId) {
      return NextResponse.json(
        { error: "documentId required" },
        { status: 400 }
      );
    }

    const doc = await prisma.document.findUnique({
      where: { id: documentId },
      include: { startup: true },
    });
    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const contentToAnalyze =
      text ||
      (doc.storageKey && doc.storageKey.length > 100
        ? doc.storageKey
        : null);
    if (!contentToAnalyze) {
      return NextResponse.json(
        { error: "No pitch content to analyze. Add text or paste content." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert startup advisor and investor. Analyze the following pitch deck content and respond with a JSON object only (no markdown, no extra text) with exactly these keys:
- "overallScore": number from 1 to 100
- "criteriaScores": object with keys "problem", "solution", "market", "traction", "team", "ask" (each number 1-100)
- "feedback": string, 2-4 sentences of overall feedback
- "suggestions": array of 3-6 strings, each one actionable improvement

Pitch content:
---
${contentToAnalyze.slice(0, 12000)}
---`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(raw) as {
      overallScore?: number;
      criteriaScores?: Record<string, number>;
      feedback?: string;
      suggestions?: string[];
    };

    const overallScore = Math.min(
      100,
      Math.max(1, Number(parsed.overallScore) || 50)
    );
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
        modelUsed: "gpt-4o-mini",
      },
    });

    return NextResponse.json({
      success: true,
      overallScore,
      criteriaScores,
      feedback,
      suggestions,
    });
  } catch (e) {
    console.error("analyze-pitch error", e);
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Analysis failed",
      },
      { status: 500 }
    );
  }
}
