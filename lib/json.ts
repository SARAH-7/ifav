import type { Prisma } from "@prisma/client";

/** Safely treat JsonValue as string[] for display (SQLite stores arrays as Json). */
export function asStringArray(val: Prisma.JsonValue | null | undefined): string[] {
  if (val == null) return [];
  return Array.isArray(val) ? val.filter((x): x is string => typeof x === "string") : [];
}
