"use client";

import { closingImage } from "@/lib/gifts";
import Image from "next/image";

type FinalMessageProps = {
  onReplay: () => void;
};

export function FinalMessage({ onReplay }: FinalMessageProps) {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto px-6 py-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <h2 className="font-serif text-5xl leading-none font-normal tracking-[-0.035em] sm:text-6xl">
          Happy 33rd, Raj.
        </h2>
        <p className="mt-8 font-serif text-md leading-relaxed text-charcoal/80 sm:text-xl">
          You are so much more than the person I love.
          <br />
          You are kind, strong, thoughtful,
          <br />
          and someone who makes the people around you feel loved.
          <br />
          I hope you never forget how special you are,
          <br />
          how far you’ve come,
          <br />
          and how much more is waiting for you.
          <br />
          Keep dreaming. Keep growing.
          <br />
          And most importantly, keep being you.
          <br />
          The world is a little better with you in it.
        </p>
        <figure className="mt-10 w-36 -rotate-2 bg-paper p-2 pb-6 shadow-[0_16px_30px_rgba(28,27,25,0.08)] sm:w-40">
          <div className="relative aspect-4/5">
            <Image
              src={closingImage.src}
              alt={closingImage.alt}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </figure>
        <p className="mt-8 text-sm tracking-wide text-charcoal/55">
          Happy birthday to my favourite human.{" "}
          <span className="text-[#e23b3b]">♥</span>
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="mt-12 text-sm text-charcoal/70 underline decoration-champagne underline-offset-[5px] transition-colors hover:text-charcoal"
        >
          Replay the vow&apos;s ↻
        </button>
      </div>
    </div>
  );
}
