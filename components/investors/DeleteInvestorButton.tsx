"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteInvestor } from "@/app/actions/investors";

export function DeleteInvestorButton({
  investorId,
  investorName,
}: {
  investorId: string;
  investorName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`Delete "${investorName}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteInvestor(investorId);
      router.push("/investors");
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
      {isPending ? "Deleting…" : "Delete investor"}
    </button>
  );
}

