import Link from "next/link";
import { getStartups } from "@/app/actions/startups";
import { getInvestors } from "@/app/actions/investors";
import { asStringArray } from "@/lib/json";
import { GitBranch } from "lucide-react";

export default async function DualFlowPage() {
  const [startups, investors] = await Promise.all([
    getStartups(),
    getInvestors(),
  ]);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Dual flow
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Single view for founders (find investors) and investors (discover
        startups). Match by stage and focus.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-white p-5 dark:border-blue-800 dark:bg-blue-900">
          <h2 className="flex items-center gap-2 font-medium text-blue-900 dark:text-white">
            <GitBranch className="h-5 w-5 text-emerald-600" />
            For founders: discover investors
          </h2>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-300">
            {investors.length} investor{investors.length !== 1 ? "s" : ""}{" "}
            in the ecosystem. Filter by check size and focus.
          </p>
          <ul className="mt-4 space-y-2">
            {investors.slice(0, 5).map((i) => (
              <li key={i.id}>
                <Link
                  href={`/investors/${i.id}`}
                  className="text-sm font-medium text-blue-900 hover:underline dark:text-white"
                >
                  {i.name}
                  {i.firm ? ` · ${i.firm}` : ""}
                </Link>
                <p className="text-xs text-purple-300 dark:text-blue-300">
                  {asStringArray(i.focusAreas).slice(0, 3).join(", ") || "—"}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/investors"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
          >
            View all investors →
          </Link>
        </div>
        <div className="rounded-xl border border-blue-100 bg-white p-5 dark:border-blue-800 dark:bg-blue-900">
          <h2 className="flex items-center gap-2 font-medium text-blue-900 dark:text-white">
            <GitBranch className="h-5 w-5 text-blue-600" />
            For investors: discover startups
          </h2>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-300">
            {startups.length} startup{startups.length !== 1 ? "s" : ""}{" "}
            in the ecosystem. Filter by stage and industry.
          </p>
          <ul className="mt-4 space-y-2">
            {startups.slice(0, 5).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/startups/${s.id}`}
                  className="text-sm font-medium text-blue-900 hover:underline dark:text-white"
                >
                  {s.name}
                </Link>
                <p className="text-xs text-purple-300 dark:text-blue-300">
                  {s.stage}
                  {s.industry ? ` · ${s.industry}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/startups"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
          >
            View all startups →
          </Link>
        </div>
      </div>
    </div>
  );
}
