import { prisma } from "@/lib/prisma";
import { Award } from "lucide-react";

export default async function AcceleratorPage() {
  const programs = await prisma.acceleratorProgram.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Accelerator
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Curated accelerator programs and application deadlines.
      </p>

      <div className="mt-8">
        {programs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
            <Award className="mx-auto h-10 w-10 text-blue-300" />
            <p className="mt-3 text-purple-300 dark:text-blue-300">
              No accelerator programs added yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {programs.map((p) => (
              <li
                key={p.id}
                className="rounded-xl border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-blue-900"
              >
                <h3 className="font-medium text-blue-900 dark:text-white">
                  {p.name}
                </h3>
                {p.description && (
                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                    {p.description}
                  </p>
                )}
                {p.deadline && (
                  <p className="mt-2 text-xs text-purple-300">
                    Deadline: {new Date(p.deadline).toLocaleDateString()}
                  </p>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Apply →
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
