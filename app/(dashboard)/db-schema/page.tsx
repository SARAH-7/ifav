import { Database, Table, Columns } from "lucide-react";

const SCHEMA_MODELS = [
  {
    name: "User",
    description: "Core account for founders, investors, admins",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "email", type: "String", isUnique: true },
      { name: "role", type: "Enum(UserRole)" },
      { name: "name", type: "String" },
    ]
  },
  {
    name: "Startup",
    description: "Companies raising funds. Belongs to a User.",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "name", type: "String" },
      { name: "stage", type: "Enum(StartupStage)" },
      { name: "founderId", type: "String", isFk: true },
      { name: "industry", type: "String" },
    ]
  },
  {
    name: "Investor",
    description: "VC/Angel profile linked to a User account.",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "userId", type: "String", isUnique: true, isFk: true },
      { name: "firm", type: "String" },
      { name: "focusAreas", type: "Json" },
      { name: "stages", type: "Json" },
    ]
  },
  {
    name: "Document",
    description: "Pitch decks, one-pagers tied to Startups.",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "startupId", type: "String", isFk: true },
      { name: "type", type: "Enum(DocumentType)" },
      { name: "storageKey", type: "String" },
    ]
  },
  {
    name: "PitchDeckAnalysis",
    description: "AI-generated scoring for a Document.",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "documentId", type: "String", isFk: true },
      { name: "overallScore", type: "Int" },
      { name: "criteriaScores", type: "Json" },
      { name: "suggestions", type: "Json" },
    ]
  },
  {
    name: "Connection",
    description: "Networking ties between Users (Founders & Investors).",
    columns: [
      { name: "id", type: "String", isPk: true },
      { name: "fromUserId", type: "String", isFk: true },
      { name: "toUserId", type: "String", isFk: true },
      { name: "status", type: "Enum(ConnectionStatus)" },
    ]
  }
];

export default function DbSchemaPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent flex items-center gap-3">
          <Database className="h-8 w-8 text-primary" />
          Database Schema
        </h1>
        <p className="mt-2 text-sm text-purple-300 dark:text-blue-300 font-medium">
          Prisma models visualized with key columns, types, and relations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SCHEMA_MODELS.map((model) => (
          <div key={model.name} className="rounded-2xl border border-blue-500/20 bg-blue-900/40 backdrop-blur-md overflow-hidden shadow-xl shadow-blue-900/20 flex flex-col">
            <div className="bg-gradient-to-r from-blue-900/80 to-blue-800/80 p-4 border-b border-blue-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-bold text-white">{model.name}</h2>
              </div>
            </div>
            
            <div className="p-4 bg-blue-950/50 text-xs text-blue-300 border-b border-blue-500/10">
              {model.description}
            </div>

            <div className="p-4 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                <Columns className="h-4 w-4" /> Columns
              </div>
              <ul className="space-y-2">
                {model.columns.map(col => (
                  <li key={col.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">{col.name}</span>
                      {col.isPk && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-500/30">PK</span>}
                      {col.isFk && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">FK</span>}
                      {col.isUnique && <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/30">UQ</span>}
                    </div>
                    <span className="font-mono text-xs text-accent/80">{col.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-xs text-blue-400/50 mt-12 bg-blue-900/10 py-4 rounded-xl border border-blue-500/10">
        Schema abbreviated for core MVP functionality (Event, AssistantChat, FundraisingRound omitted for brevity).
      </div>
    </div>
  );
}
