import Link from "next/link";
import { notFound } from "next/navigation";
import { getStartupById, updateStartup } from "@/app/actions/startups";
import { StartupForm } from "@/components/startups/StartupForm";
import { DeleteStartupButton } from "@/components/startups/DeleteStartupButton";
import { ArrowLeft, FileText } from "lucide-react";

export default async function StartupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const startup = await getStartupById(id);
  if (!startup) notFound();

  return (
    <div className="p-6 md:p-8">
      <Link
        href="/startups"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to startups
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
            {startup.name}
          </h1>
          {startup.tagline && (
            <p className="mt-1 text-blue-600 dark:text-blue-300">
              {startup.tagline}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 dark:bg-blue-800 dark:text-blue-200">
              {startup.stage}
            </span>
            {startup.industry && (
              <span className="rounded bg-blue-50 px-2 py-1 text-sm text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                {startup.industry}
              </span>
            )}
          </div>
          {startup.description && (
            <p className="mt-4 text-blue-600 dark:text-blue-300">
              {startup.description}
            </p>
          )}
          <div className="mt-6">
            <h2 className="text-sm font-medium text-purple-300 dark:text-blue-300">
              Documents & AI analysis
            </h2>
            {startup.documents.length === 0 ? (
              <p className="mt-2 text-sm text-purple-300">
                No documents. Upload a pitch deck from{" "}
                <Link
                  href="/documents"
                  className="font-medium text-blue-900 underline dark:text-white"
                >
                  Documents
                </Link>{" "}
                to get AI scoring and suggestions.
              </p>
            ) : (
              <ul className="mt-2 space-y-2">
                {startup.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-300" />
                    <span className="text-sm">{doc.name}</span>
                    {doc.analyses.length > 0 && (
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                        Scored
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full max-w-xl lg:w-96">
          <div className="rounded-xl border border-blue-100 bg-white/50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <h2 className="font-medium text-blue-900 dark:text-white">
              Edit profile
            </h2>
            <StartupForm
              action={updateStartup.bind(null, id)}
              startup={startup}
              submitLabel="Save changes"
            />
            <div className="mt-4 border-t border-blue-100 pt-4 dark:border-blue-700">
              <DeleteStartupButton startupId={id} startupName={startup.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
