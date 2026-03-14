"use client";

import { useActionState } from "react";

type FormAction = (
  formData: FormData
) => Promise<{ error?: Record<string, string[] | undefined>; success?: boolean }>;

export function EventForm({ action }: { action: FormAction }) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => action(formData),
    null
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Title *
        </label>
        <input
          id="title"
          name="title"
          required
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
          rows={2}
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Start date *
        </label>
        <input
          id="startDate"
          name="startDate"
          type="datetime-local"
          required
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
        <input
          id="type"
          name="type"
          placeholder="webinar, meetup, demo_day"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-blue-700 dark:text-blue-200"
        >
          Link
        </label>
        <input
          id="link"
          name="link"
          type="url"
          className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-blue-900 shadow-sm dark:border-blue-600 dark:bg-blue-900 dark:text-white"
        />
      </div>
      {state?.success && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Event created.
        </p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
      >
        Create event
      </button>
    </form>
  );
}
