import Link from "next/link";
import { createStartup } from "@/app/actions/startups";
import { StartupForm } from "@/components/startups/StartupForm";
import { ArrowLeft } from "lucide-react";

export default function NewStartupPage() {
  return (
    <div className="p-6 md:p-8">
      <Link
        href="/startups"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-300 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to startups
      </Link>
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Add startup
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Create a new startup profile. All fields are dynamic and validated.
      </p>
      <div className="mt-6 max-w-xl">
        <StartupForm action={createStartup} />
      </div>
    </div>
  );
}
