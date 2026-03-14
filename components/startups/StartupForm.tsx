"use client";

import { useActionState } from "react";
import type { Startup } from "@prisma/client";

const STAGES = [
  "idea",
  "pre_seed",
  "seed",
  "series_a",
  "series_b",
  "growth",
] as const;

type FormAction = (
  formData: FormData
) => Promise<{ error?: Record<string, string[] | undefined>; success?: boolean }>;

type Props = {
  action: FormAction;
  startup?: Startup | null;
  submitLabel?: string;
};

export function StartupForm({
  action,
  startup,
  submitLabel = "Create startup",
}: Props) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      return action(formData);
    },
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
          defaultValue={startup?.name}
          required
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
        {state?.error?.name && (
          <p className="mt-1 text-sm text-red-600">{state.error.name[0]}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="tagline"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={startup?.tagline ?? ""}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={startup?.description ?? ""}
          rows={3}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="stage"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Stage *
        </label>
        <select
          id="stage"
          name="stage"
          defaultValue={startup?.stage ?? "idea"}
          required
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Industry
        </label>
        <input
          id="industry"
          name="industry"
          defaultValue={startup?.industry ?? ""}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            defaultValue={startup?.website ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            defaultValue={startup?.location ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="foundedYear"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Founded year
          </label>
          <input
            id="foundedYear"
            name="foundedYear"
            type="number"
            min={1900}
            max={2100}
            defaultValue={startup?.foundedYear ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="teamSize"
            className="block text-sm font-medium text-blue-700 dark:text-blue-200"
          >
            Team size
          </label>
          <input
            id="teamSize"
            name="teamSize"
            type="number"
            min={0}
            defaultValue={startup?.teamSize ?? ""}
            className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
          />
        </div>
      </div>
      {state?.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Saved successfully.
        </p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
