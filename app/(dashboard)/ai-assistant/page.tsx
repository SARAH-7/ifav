import { getOrCreateChat, sendMessage } from "@/app/actions/assistant";
import { Bot } from "lucide-react";

export default async function AIAssistantPage() {
  const chat = await getOrCreateChat();

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col p-6 md:p-8">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
          AI Assistant
        </h1>
      </div>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Ask about startups, investors, pitch feedback, or fundraising.
      </p>

      <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-xl border border-blue-100 bg-white/50 dark:border-blue-800 dark:bg-blue-900/30">
        <div className="flex-1 overflow-y-auto p-4">
          {chat.messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <p className="text-purple-300 dark:text-blue-300">
                  Start a conversation. Try:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-600 dark:text-blue-200">
                  <li>• What should I include in my seed pitch deck?</li>
                  <li>• How do I find investors for a pre-seed fintech?</li>
                  <li>• Review my startup idea: [paste brief description]</li>
                </ul>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {chat.messages.map((m) => (
                <li
                  key={m.id}
                  className={
                    m.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl bg-blue-900 px-4 py-2 text-white dark:bg-blue-50 dark:text-blue-900"
                        : "max-w-[85%] rounded-2xl bg-white px-4 py-2 shadow dark:bg-blue-800 dark:text-white"
                    }
                  >
                    <p className="whitespace-pre-wrap text-sm">{m.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form
          action={sendMessage}
          className="border-t border-blue-100 p-4 dark:border-blue-700"
        >
          <div className="flex gap-2">
            <input
              name="content"
              placeholder="Type your message…"
              required
              className="flex-1 rounded-lg border border-blue-200 bg-white px-4 py-2 text-blue-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-blue-600 dark:bg-blue-900 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-100"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
