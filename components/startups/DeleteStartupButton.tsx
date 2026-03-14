"use client";

import { useTransition } from "react";
import { deleteStartup } from "@/app/actions/startups";
import { useRouter } from "next/navigation";

export function DeleteStartupButton({
  startupId,
  startupName,
}: {
  startupId: string;
  startupName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`Delete "${startupName}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteStartup(startupId);
      router.push("/startups");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
    >
      {isPending ? "Deleting…" : "Delete startup"}
    </button>
  );
}
