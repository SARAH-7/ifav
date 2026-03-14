"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { investorSchema } from "@/lib/validations";

export async function getInvestors() {
  return prisma.investor.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getInvestorById(id: string) {
  return prisma.investor.findUnique({
    where: { id },
  });
}

function parseArrays(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((x) => typeof x === "string");
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export async function createInvestor(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const focusAreas = parseArrays(raw.focusAreas);
  const stages = parseArrays(raw.stages);
  const parsed = investorSchema.safeParse({
    ...raw,
    checkSizeMin: raw.checkSizeMin ? Number(raw.checkSizeMin) : undefined,
    checkSizeMax: raw.checkSizeMax ? Number(raw.checkSizeMax) : undefined,
    focusAreas: focusAreas.length ? focusAreas : undefined,
    stages: stages.length ? stages : undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const created = await prisma.investor.create({
    data: {
      ...parsed.data,
      focusAreas: parsed.data.focusAreas ?? [],
      stages: parsed.data.stages ?? [],
    },
  });
  revalidatePath("/investors");
  revalidatePath("/dashboard");
  redirect(`/investors/${created.id}`);
}

export async function updateInvestor(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const focusAreas = parseArrays(raw.focusAreas);
  const stages = parseArrays(raw.stages);
  const parsed = investorSchema.safeParse({
    ...raw,
    checkSizeMin: raw.checkSizeMin ? Number(raw.checkSizeMin) : undefined,
    checkSizeMax: raw.checkSizeMax ? Number(raw.checkSizeMax) : undefined,
    focusAreas: focusAreas.length ? focusAreas : undefined,
    stages: stages.length ? stages : undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  await prisma.investor.update({
    where: { id },
    data: {
      ...parsed.data,
      focusAreas: parsed.data.focusAreas ?? [],
      stages: parsed.data.stages ?? [],
    },
  });
  revalidatePath("/investors");
  revalidatePath(`/investors/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteInvestor(id: string) {
  await prisma.investor.delete({ where: { id } });
  revalidatePath("/investors");
  revalidatePath("/dashboard");
}

export async function deleteInvestorById(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await deleteInvestor(id);
  redirect("/investors");
}
