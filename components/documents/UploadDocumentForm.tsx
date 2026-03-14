"use client";

import { useActionState } from "react";

type FormAction = (
  formData: FormData
) => Promise<{ error?: string; success?: boolean }>;

export function UploadDocumentForm({
  action,
  startups,
}: {
  action: FormAction;
  startups: { id: string; name: string }[];
}) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => action(formData),
    null
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-4">
      <div>
        <label
          htmlFor="startupId"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Startup
        </label>
        <select
          id="startupId"
          name="startupId"
          required
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        >
          {startups.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Document name *
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="e.g. Seed pitch deck 2024"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Type
        </label>
        <select
          id="type"
          name="type"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        >
          <option value="pitch_deck">Pitch deck</option>
          <option value="one_pager">One-pager</option>
          <option value="financials">Financials</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Pitch content (for AI analysis)
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          placeholder="Paste your pitch deck text here. AI will score and suggest improvements."
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Document added.
        </p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
      >
        Add document
      </button>
    </form>
  );
}
