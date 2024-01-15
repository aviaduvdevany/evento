"use client";

import { Tevent } from "@/lib/Types";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

type Props = {
  event: Tevent;
};

const MotionLink = motion(Link);

export default function EventCard({ event }: Props) {
  const eventDate = new Date(event.date);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.5 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const linkStyle = {
    scale: scaleProgress,
    opacity: opacityProgress,
  };

  return (
    <MotionLink
      ref={ref}
      className="h-[380px] max-w-[500px] flex-1 basis-80"
      href={`/event/${event.slug}`}
      style={{
        scale: scaleProgress as unknown as string,
        opacity: opacityProgress as unknown as string,
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
    >
      <section className="w-full h-full bg-white/[3%] rounded-xl overflow-hidden flex flex-col relative state-effect">
        <Image
          src={event.imageUrl}
          alt={event.name}
          width={500}
          height={250}
          className="h-[60%] object-cover"
        />
        <div className="flex items-center justify-center flex-col flex-1">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p className="italic text-white/75">By {event.organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{event.location}</p>
        </div>

        <section className="absolute left-[12px] flex flex-col justify-center items-center top-[12px] h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-[5px]">
            {eventDate.toLocaleDateString("en-US", { day: "2-digit" })}
          </p>
          <p className="text-xs uppercase text-accent">
            {eventDate.toLocaleDateString("en-US", { month: "short" })}
          </p>
        </section>
      </section>
    </MotionLink>
  );
}
