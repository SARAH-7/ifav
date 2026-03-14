import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvestorById, updateInvestor } from "@/app/actions/investors";
import { asStringArray } from "@/lib/json";
import { InvestorForm } from "@/components/investors/InvestorForm";
import { DeleteInvestorButton } from "@/components/investors/DeleteInvestorButton";
import { ArrowLeft } from "lucide-react";

export default async function InvestorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investor = await getInvestorById(id);
  if (!investor) notFound();

  return (
    <div className="p-6 md:p-8">
      <Link
        href="/investors"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to investors
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
            {investor.name}
          </h1>
          {(investor.firm || investor.title) && (
            <p className="mt-1 text-blue-600 dark:text-blue-300">
              {[investor.title, investor.firm].filter(Boolean).join(" · ")}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {asStringArray(investor.focusAreas).map((a) => (
              <span
                key={a}
                className="rounded bg-blue-50 px-2 py-1 text-sm text-blue-600 dark:bg-blue-800 dark:text-blue-300"
              >
                {a}
              </span>
            ))}
          </div>
          {(investor.checkSizeMin != null || investor.checkSizeMax != null) && (
            <p className="mt-2 text-sm text-purple-300 dark:text-blue-300">
              Check size: ${investor.checkSizeMin ?? "?"}k – $
              {investor.checkSizeMax ?? "?"}k
            </p>
          )}
        </div>
        <div className="w-full max-w-xl lg:w-96">
          <div className="rounded-xl border border-blue-100 bg-white/50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <h2 className="font-medium text-blue-900 dark:text-white">
              Edit profile
            </h2>
            <InvestorForm
              action={updateInvestor.bind(null, id)}
              investor={investor}
              submitLabel="Save changes"
            />
            <div className="mt-4">
              <DeleteInvestorButton investorId={id} investorName={investor.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
