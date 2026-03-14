import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Wallet } from "lucide-react";

export default async function FundraisingPage() {
  const rounds = await prisma.fundraisingRound.findMany({
    orderBy: { updatedAt: "desc" },
    include: { startup: { select: { id: true, name: true } } },
  });

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Fundraising
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Active and past fundraising rounds by startup.
      </p>

      <div className="mt-8">
        {rounds.length === 0 ? (
          <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
            <Wallet className="mx-auto h-10 w-10 text-blue-300" />
            <p className="mt-3 text-purple-300 dark:text-blue-300">
              No fundraising rounds yet. Add rounds from startup profiles.
            </p>
            <Link
              href="/startups"
              className="mt-3 inline-block text-sm font-medium text-blue-900 underline dark:text-white"
            >
              Go to Startups
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {rounds.map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-blue-900"
              >
                <Link
                  href={`/startups/${r.startup.id}`}
                  className="font-medium text-blue-900 hover:underline dark:text-white"
                >
                  {r.startup.name}
                </Link>
                <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                  Target: ${r.amountTarget ?? "—"}k · Raised: $
                  {r.amountRaised ?? "—"}k · {r.stage ?? "—"}
                </p>
                {r.targetCloseDate && (
                  <p className="mt-1 text-xs text-purple-300">
                    Close: {new Date(r.targetCloseDate).toLocaleDateString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
