"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";

export async function getEvents() {
  return prisma.event.findMany({
    orderBy: { startDate: "desc" },
  });
}

export async function createEvent(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const startDate = new Date(parsed.data.startDate);
  const endDate = parsed.data.endDate
    ? new Date(parsed.data.endDate)
    : undefined;
  await prisma.event.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      startDate,
      endDate,
      location: parsed.data.location,
      type: parsed.data.type,
      link: parsed.data.link,
    },
  });
  revalidatePath("/events");
  revalidatePath("/dashboard");
  return { success: true };
}
