import { prisma } from "@/lib/prisma";
import { MessageSquare } from "lucide-react";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      sender: { select: { name: true, email: true } },
      recipient: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Messages
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Founder and investor messaging. (MVP: list only.)
      </p>

      <div className="mt-8">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
            <MessageSquare className="mx-auto h-10 w-10 text-blue-300" />
            <p className="mt-3 text-purple-300 dark:text-blue-300">
              No messages yet. Connect with founders or investors to start.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {messages.map((m) => (
              <li
                key={m.id}
                className="rounded-xl border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-blue-900"
              >
                <p className="text-sm text-purple-300 dark:text-blue-300">
                  {m.sender.name} → {m.recipient.name}
                </p>
                <p className="mt-1 text-blue-900 dark:text-white">
                  {m.content}
                </p>
                <p className="mt-2 text-xs text-blue-300">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
