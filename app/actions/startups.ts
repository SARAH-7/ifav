"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { startupSchema, type StartupInput } from "@/lib/validations";

const DEMO_USER_ID = "demo-founder-1";

export async function getStartups() {
  return prisma.startup.findMany({
    orderBy: { updatedAt: "desc" },
    include: { founder: { select: { name: true, email: true } } },
  });
}

export async function getStartupById(id: string) {
  return prisma.startup.findUnique({
    where: { id },
    include: {
      founder: true,
      documents: {
        include: { analyses: true },
      },
      fundraisingRounds: true,
    },
  });
}

export async function createStartup(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = startupSchema.safeParse({
    ...raw,
    foundedYear: raw.foundedYear ? Number(raw.foundedYear) : undefined,
    teamSize: raw.teamSize ? Number(raw.teamSize) : undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
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
  const created = await prisma.startup.create({
    data: {
      ...parsed.data,
      founderId: DEMO_USER_ID,
    },
  });
  revalidatePath("/startups");
  revalidatePath("/dashboard");
  redirect(`/startups/${created.id}`);
}

export async function updateStartup(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = startupSchema.safeParse({
    ...raw,
    foundedYear: raw.foundedYear ? Number(raw.foundedYear) : undefined,
    teamSize: raw.teamSize ? Number(raw.teamSize) : undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  await prisma.startup.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePath("/startups");
  revalidatePath(`/startups/${id}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteStartup(id: string) {
  await prisma.startup.delete({ where: { id } });
  revalidatePath("/startups");
  revalidatePath("/dashboard");
  return { success: true };
}
