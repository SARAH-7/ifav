"use server";

import { revalidatePath } from "next/cache";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-founder-1";
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

export async function getOrCreateChat() {
  await prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    create: {
      id: DEMO_USER_ID,
      email: "founder@demo.ifav.io",
      name: "Demo Founder",
      role: "founder",
    },
    update: {},
  });
  let chat = await prisma.assistantChat.findFirst({
    where: { userId: DEMO_USER_ID },
    orderBy: { createdAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!chat) {
    chat = await prisma.assistantChat.create({
      data: { userId: DEMO_USER_ID, title: "New chat" },
      include: { messages: true },
    });
  }
  return chat;
}

export async function sendMessage(formData: FormData): Promise<void> {
  const content = formData.get("content") as string;
  if (!content?.trim()) throw new Error("Message required");
  if (!genAI) throw new Error("GEMINI_API_KEY not set");

  const chat = await getOrCreateChat();

  await prisma.assistantMessage.create({
    data: { chatId: chat.id, role: "user", content: content.trim() },
  });

  const messages = await prisma.assistantMessage.findMany({
    where: { chatId: chat.id },
    orderBy: { createdAt: "asc" },
  });

  const apiMessages = messages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const systemPrompt =
    "You are a helpful assistant for an ecosystem platform for founders, investors, and startups. You help with startup advice, investor matching, pitch feedback, and general questions about fundraising and building companies. Be concise and actionable.";

  const conversation = apiMessages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const prompt = `${systemPrompt}

Conversation so far:
${conversation}
User: ${content.trim()}

Assistant:`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  const assistantContent =
    result.text ?? "I couldn't generate a response.";

  await prisma.assistantMessage.create({
    data: { chatId: chat.id, role: "assistant", content: assistantContent },
  });

  revalidatePath("/ai-assistant");
}
