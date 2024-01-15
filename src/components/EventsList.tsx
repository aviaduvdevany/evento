import { Tevent } from "@/lib/Types";
import EventCard from "./EventCard";
import { getEvents } from "@/lib/server-utils";
import PaginationControls from "./PaginationControls";

type props = {
  city: string;
  page: number | undefined;
};

export default async function EventsList({ city, page = 1 }: props) {
  const { events, totalCount }: {events: Tevent[], totalCount: number} = await getEvents(city, page);

  return (
    <section className="max-w-[1100px] px-[20px] flex flex-wrap gap-10 justify-center">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls page={page} totalCount={totalCount} />
    </section>
  );
}
