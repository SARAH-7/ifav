import React from "react";
import { Rocket } from "lucide-react";

// The previous version imported DealStage from somewhere where it was undefined.
// We'll define it locally so it works.
const DealStage = {
  identified: "IDENTIFIED",
  outreach_sent: "OUTREACH_SENT",
  in_conversation: "IN_CONVERSATION",
  due_diligence: "DUE_DILIGENCE",
  term_sheet: "TERM_SHEET",
  closed_won: "CLOSED_WON",
  closed_lost: "CLOSED_LOST",
};

const STAGES = [
  { id: DealStage.identified, label: "Identified", color: "bg-blue-500" },
  { id: DealStage.outreach_sent, label: "Outreach Sent", color: "bg-primary" },
  { id: DealStage.in_conversation, label: "In Conversation", color: "bg-accent" },
  { id: DealStage.due_diligence, label: "Due Diligence", color: "bg-primary" },
  { id: DealStage.term_sheet, label: "Term Sheet", color: "bg-gradient-to-r from-primary to-accent" },
  { id: DealStage.closed_won, label: "Closed Won", color: "bg-emerald-500" },
];

export default function PipelinePage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col p-4 md:p-8">
      <div className="mb-6 flex shrink-0 items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">Deal Pipeline</h1>
          <p className="text-sm md:text-base text-purple-300 dark:text-blue-300 font-medium">Track and manage your investment opportunities.</p>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {STAGES.map((stage) => (
          <div key={stage.id} className="w-[85vw] md:w-80 shrink-0 flex flex-col gap-4 snap-start">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${stage.color}`} />
              <h3 className="font-semibold text-foreground">{stage.label}</h3>
              <span className="ml-auto rounded-full bg-blue-100 dark:bg-white/10 px-2 py-0.5 text-xs text-foreground font-medium">0</span>
            </div>
            
            <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-white/40 dark:bg-white/5 p-3 border border-blue-100 dark:border-white/5 shadow-inner min-h-[300px] backdrop-blur-md">
              <div className="flex flex-col items-center justify-center p-8 text-center text-blue-300 dark:text-purple-300 h-full">
                <Rocket className="h-8 w-8 mb-2 opacity-20 text-accent" />
                <p className="text-sm font-medium">No deals in this stage</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
