import Link from "next/link";
import { createInvestor } from "@/app/actions/investors";
import { InvestorForm } from "@/components/investors/InvestorForm";
import { ArrowLeft } from "lucide-react";

export default function NewInvestorPage() {
  return (
    <div className="p-6 md:p-8">
      <Link
        href="/investors"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to investors
      </Link>
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Add investor
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Create a new investor profile for discovery.
      </p>
      <div className="mt-6 max-w-xl">
        <InvestorForm action={createInvestor} />
      </div>
    </div>
  );
}
