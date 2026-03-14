"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { analyzePitchDeck } from "@/app/actions/documents";

export function AnalyzePitchButton({
  documentId,
  hasContent,
}: {
  documentId: string;
  hasContent: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleAnalyze() {
    if (!hasContent) return;
    startTransition(async () => {
      const result = await analyzePitchDeck(documentId);
      if (result.error) alert(result.error);
      else router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleAnalyze}
      disabled={!hasContent || isPending}
      className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-200 disabled:opacity-50 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60"
    >
      {isPending ? "Analyzing…" : "Analyze with AI"}
    </button>
  );
}
