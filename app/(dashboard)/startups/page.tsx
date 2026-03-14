import Link from "next/link";
import { getStartups } from "@/app/actions/startups";
import { Plus } from "lucide-react";

export default async function StartupsPage() {
  const startups = await getStartups();

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
            Startups
          </h1>
          <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
            Create and manage startup profiles (dynamic CRUD).
          </p>
        </div>
        <Link
          href="/startups/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
        >
          <Plus className="h-4 w-4" />
          Add startup
        </Link>
      </div>

      <div className="mt-6">
        {startups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
            <p className="text-purple-300 dark:text-blue-300">
              No startups yet. Add your first startup profile.
            </p>
            <Link
              href="/startups/new"
              className="mt-3 inline-block text-sm font-medium text-blue-900 underline dark:text-white"
            >
              Create startup
            </Link>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/startups/${s.id}`}
                  className="block rounded-xl border border-blue-100 bg-white p-4 transition hover:border-blue-200 hover:shadow dark:border-blue-800 dark:bg-blue-900 dark:hover:border-blue-700"
                >
                  <h3 className="font-medium text-blue-900 dark:text-white">
                    {s.name}
                  </h3>
                  {s.tagline && (
                    <p className="mt-1 text-sm text-purple-300 line-clamp-1 dark:text-blue-300">
                      {s.tagline}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                      {s.stage}
                    </span>
                    {s.industry && (
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                        {s.industry}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
