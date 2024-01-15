import EventsList from "@/components/EventsList";
import Heading from "@/components/Heading";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

type props = {
  params: {
    city: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

type generateProps = {
  params: {
    city: string;
  };
};

const pageNumberSchema = z.coerce.number().int().positive().optional();

export function generateMetadata({ params }: generateProps): Metadata {
  const city = params.city;
  return {
    title: city === "all" ? "All Events" : `Events in ${city}`,
  };
}

export default async function EventsPage({ params, searchParams }: props) {
  const parcedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parcedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <Heading className="mb-28">
        {params.city === "all" ? "All Events" : `Events in ${params.city}`}
      </Heading>
      <Suspense fallback={<Loading />} key={params.city + parcedPage.data}>
        <EventsList city={params.city} page={parcedPage.data} />
      </Suspense>
    </main>
  );
}

