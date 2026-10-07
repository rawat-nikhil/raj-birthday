"use client";

import { MovingNoButton } from "@/components/MovingNoButton";
import { useRef } from "react";

type BirthdayIntroProps = {
  onYes: () => void;
};

export function BirthdayIntro({ onYes }: BirthdayIntroProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <p className="text-[11px] font-medium tracking-[0.34em] text-charcoal/55 uppercase">
          Happy birthday
        </p>
        <h1 className="mt-5 font-serif text-[5.4rem] leading-none font-normal tracking-[-0.035em] text-charcoal sm:text-[6.75rem]">
          Raj!
        </h1>
        <div className="mx-auto mt-5 h-px w-10 bg-champagne" />
        <p className="mt-6 text-[15px] leading-7 text-charcoal/75">
          Today is all about you.
          <br />
          Are you ready to open your virtual presents?
        </p>

        <div ref={zoneRef} className="relative mx-auto mt-9 h-48 w-full">
          <button
            ref={yesRef}
            type="button"
            onClick={onYes}
            className="absolute top-1 left-1/2 inline-flex h-12 translate-x-[-118%] items-center gap-2 rounded-full bg-charcoal px-6 text-sm text-ivory transition-colors duration-300 hover:bg-[#2a2926] focus-visible:outline-Z focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal/30"
          >
            Yes
            <span aria-hidden="true">→</span>
          </button>
          <MovingNoButton zoneRef={zoneRef} yesRef={yesRef} />
        </div>
      </div>
    </div>
  );
}
