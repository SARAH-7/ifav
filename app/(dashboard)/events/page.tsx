import { getEvents } from "@/app/actions/events";
import { EventForm } from "@/components/events/EventForm";
import { createEvent } from "@/app/actions/events";
import { Calendar } from "lucide-react";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-blue-900 dark:text-white">
        Events
      </h1>
      <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
        Ecosystem events: webinars, meetups, demo days.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-blue-200 bg-white/50 py-12 text-center dark:border-blue-700 dark:bg-blue-900/30">
              <Calendar className="mx-auto h-10 w-10 text-blue-300" />
              <p className="mt-3 text-purple-300 dark:text-blue-300">
                No events yet. Create the first one.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="rounded-xl border border-blue-100 bg-white p-4 dark:border-blue-800 dark:bg-blue-900"
                >
                  <h3 className="font-medium text-blue-900 dark:text-white">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-purple-300 dark:text-blue-300">
                    {new Date(e.startDate).toLocaleString()}
                    {e.location && ` · ${e.location}`}
                  </p>
                  {e.description && (
                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-300">
                      {e.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="rounded-xl border border-blue-100 bg-white/50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <h2 className="font-medium text-blue-900 dark:text-white">
              Create event
            </h2>
            <EventForm action={createEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}
