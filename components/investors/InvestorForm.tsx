"use client";

import { useActionState } from "react";
import type { Investor } from "@prisma/client";
import { asStringArray } from "@/lib/json";

type FormAction = (
  formData: FormData
) => Promise<{ error?: Record<string, string[] | undefined>; success?: boolean }>;

type Props = {
  action: FormAction;
  investor?: Investor | null;
  submitLabel?: string;
};

export function InvestorForm({
  action,
  investor,
  submitLabel = "Create investor",
}: Props) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => action(formData),
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Name *
        </label>
        <input
          id="name"
          name="name"
          defaultValue={investor?.name}
          required
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
        {state?.error?.name && (
          <p className="mt-1 text-sm text-red-600">{state.error.name[0]}</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firm"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Firm
          </label>
          <input
            id="firm"
            name="firm"
            defaultValue={investor?.firm ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={investor?.title ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={investor?.email ?? ""}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="linkedInUrl"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          LinkedIn URL
        </label>
        <input
          id="linkedInUrl"
          name="linkedInUrl"
          type="url"
          defaultValue={investor?.linkedInUrl ?? ""}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="checkSizeMin"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Check size min ($k)
          </label>
          <input
            id="checkSizeMin"
            name="checkSizeMin"
            type="number"
            min={0}
            defaultValue={investor?.checkSizeMin ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="checkSizeMax"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Check size max ($k)
          </label>
          <input
            id="checkSizeMax"
            name="checkSizeMax"
            type="number"
            min={0}
            defaultValue={investor?.checkSizeMax ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="focusAreas"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Focus areas (comma-separated)
        </label>
        <input
          id="focusAreas"
          name="focusAreas"
          defaultValue={asStringArray(investor?.focusAreas).join(", ")}
          placeholder="e.g. fintech, healthtech, AI"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="stages"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Stages (comma-separated)
        </label>
        <input
          id="stages"
          name="stages"
          defaultValue={asStringArray(investor?.stages).join(", ")}
          placeholder="e.g. seed, series_a"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      {state?.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Saved successfully.
        </p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
      >
        {submitLabel}
      </button>
    </form>
  );
}
