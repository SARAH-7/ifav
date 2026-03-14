import Link from "next/link";
import { getDocuments } from "@/app/actions/documents";
import { getStartups } from "@/app/actions/startups";
import { UploadDocumentForm } from "@/components/documents/UploadDocumentForm";
import { AnalyzePitchButton } from "@/components/documents/AnalyzePitchButton";
import { createDocument } from "@/app/actions/documents";
import { FileText, Sparkles } from "lucide-react";

export default async function DocumentsPage() {
  const [documents, startups] = await Promise.all([
    getDocuments(),
    getStartups(),
  ]);

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Documents
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Pitch decks and one-pagers. Upload content and run AI analysis for
        scoring and improvement suggestions.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {documents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
              <FileText className="mx-auto h-10 w-10 text-blue-300" />
              <p className="mt-3 text-purple-300 dark:text-blue-300">
                No documents yet. Add a pitch deck or one-pager to get AI
                analysis.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {documents.map((d) => {
                const latest = d.analyses[0];
                return (
                  <li
                    key={d.id}
                    className="rounded-xl border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-blue-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-blue-900 dark:text-white">
                          {d.name}
                        </h3>
                        <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
                          <Link
                            href={`/startups/${d.startup.id}`}
                            className="hover:underline"
                          >
                            {d.startup.name}
                          </Link>
                          {" · "}
                          {d.type}
                        </p>
                        {latest && (
                          <div className="mt-3 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-200">
                              Score: {latest.overallScore}/100
                            </span>
                            {latest.feedback && (
                              <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
                                {latest.feedback}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      {!latest && (
                        <AnalyzePitchButton
                          documentId={d.id}
                          hasContent={!!(d.storageKey && d.storageKey.length > 50)}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div>
          <div className="rounded-xl border border-blue-100 bg-white/50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <h2 className="font-medium text-blue-900 dark:text-white">
              Add document
            </h2>
            <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
              Paste pitch content below for AI analysis.
            </p>
            <UploadDocumentForm
              action={createDocument}
              startups={startups}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyzeButton({
  documentId,
  hasContent,
}: {
  documentId: string;
  hasContent: boolean;
}) {
  return (
    <form action="/api/analyze-pitch" method="post" className="inline-block">
      <input type="hidden" name="documentId" value={documentId} />
      <button
        type="submit"
        disabled={!hasContent}
        className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-200 disabled:opacity-50 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60"
      >
        Analyze with AI
      </button>
    </form>
  );
}
