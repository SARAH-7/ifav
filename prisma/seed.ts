import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const userId = "demo-founder-1";
  await prisma.user.upsert({
    where: { id: userId },
    create: {
      id: userId,
      email: "founder@demo.ifav.io",
      name: "Demo Founder",
      role: "founder",
    },
    update: {},
  });

  const s1 = await prisma.startup.upsert({
    where: { id: "seed-startup-1" },
    create: {
      id: "seed-startup-1",
      name: "FlowFin",
      tagline: "Smart treasury for SMBs",
      description: "We help small businesses manage cash flow and payments with AI-driven forecasting.",
      stage: "seed",
      industry: "fintech",
      website: "https://example.com",
      founderId: userId,
    },
    update: {},
  });

  await prisma.startup.upsert({
    where: { id: "seed-startup-2" },
    create: {
      id: "seed-startup-2",
      name: "HealthBridge",
      tagline: "Interop for healthcare data",
      description: "Secure, compliant data sharing between providers and payers.",
      stage: "pre_seed",
      industry: "healthtech",
      founderId: userId,
    },
    update: {},
  });

  await prisma.investor.upsert({
    where: { id: "seed-investor-1" },
    create: {
      id: "seed-investor-1",
      name: "Jane Capital",
      firm: "Venture Partners",
      title: "Partner",
      checkSizeMin: 500,
      checkSizeMax: 2000,
      focusAreas: ["fintech", "AI"],
      stages: ["seed", "series_a"],
    },
    update: {},
  });
  await prisma.investor.upsert({
    where: { id: "seed-investor-2" },
    create: {
      id: "seed-investor-2",
      name: "Alex Chen",
      firm: "Angel",
      title: "Angel Investor",
      checkSizeMin: 50,
      checkSizeMax: 200,
      focusAreas: ["healthtech", "fintech"],
      stages: ["pre_seed", "seed"],
    },
    update: {},
  });

  await prisma.event.create({
    data: {
      title: "Demo Day Spring 2025",
      description: "Pitch to investors and get feedback.",
      startDate: new Date("2025-04-15T14:00:00"),
      location: "San Francisco",
      type: "demo_day",
      link: "https://example.com/demoday",
    },
  });

  await prisma.acceleratorProgram.create({
    data: {
      name: "Y Combinator",
      description: "Top accelerator for early-stage startups.",
      deadline: new Date("2025-09-01"),
      link: "https://ycombinator.com/apply",
    },
  });

  await prisma.document.upsert({
    where: { id: "seed-doc-1" },
    create: {
      id: "seed-doc-1",
      startupId: s1.id,
      type: "pitch_deck",
      name: "Seed deck draft",
      storageKey: "Problem: SMBs struggle with cash flow visibility. Solution: AI-powered treasury dashboard. Market: $X billion. Traction: 50 pilot customers. Team: 3 co-founders, ex-Stripe. Ask: $1.5M seed.",
    },
    update: {},
  });

  console.log("Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
