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
        <p className="mt-8 font-serif text-xl leading-relaxed text-charcoal/80 sm:text-2xl">
          Here’s to more memories,
          <br />
          more adventures,
          <br />
          and a really good year ahead.
        </p>
        <p className="mt-8 text-sm tracking-wide text-charcoal/55">
          Made with love, just for you.
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
        <button
          type="button"
          onClick={onReplay}
          className="mt-12 text-sm text-charcoal/70 underline decoration-champagne underline-offset-[5px] transition-colors hover:text-charcoal"
        >
          Replay the presents ↻
        </button>
      </div>
    </div>
  );
}
