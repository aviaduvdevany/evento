import Heading from "@/components/Heading";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [
    {
      slug: "dj-practice-session",
    },
    {
      slug: "science-space-expo",
    },
  ];
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;

  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          className="object-cover z-0 blur-3xl"
          src={event.imageUrl}
          alt={event.name}
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="z-1 relative flex gap-6 lg:gap-16 flex-col lg:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Heading className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </Heading>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 state-effect transition text-lg capitalize mt-5 lg:mt-auto w-[95vw] sm:w-full py-2 rounded-md border-2 bg-blur border-white/10">
              Get Tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section paragraph={event.description} heading="About this event" />
        <Section paragraph={event.location} heading="Location" />
      </div>
    </main>
  );
}

type SectionProps = {
  heading: string;
  paragraph: React.ReactNode;
};

function Section({ heading, paragraph }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl mb-8">{heading}</h2>
      <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
        {paragraph}
      </p>
    </section>
  );
}
