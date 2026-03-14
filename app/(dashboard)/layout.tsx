import { Sidebar } from "@/components/layout/Sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* 
        The sidebar is 16rem (w-64) wide on md+ screens. 
        We add md:ml-64 so the main content doesn't get hidden behind it. 
      */}
      <main className="flex-1 overflow-auto bg-blue-950 md:ml-64">
        {children}
      </main>
    </div>
  );
}
