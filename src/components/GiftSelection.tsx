"use client";

import { GiftBox } from "@/components/GiftBox";
import { gifts } from "@/lib/gifts";
import { motion, useReducedMotion } from "framer-motion";

type GiftSelectionProps = {
  openedIds: string[];
  onPick: (id: string) => void;
  onFinal: () => void;
};

export function GiftSelection({ openedIds, onPick, onFinal }: GiftSelectionProps) {
  const reduced = useReducedMotion();
  const anyOpened = openedIds.length > 0;
  const allOpened = openedIds.length === gifts.length;

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <span className="text-champagne" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="3" y="9" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 12.5h16M11 9v10" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M11 9c0-2.4-1.4-4-3.2-4 1.6 1.2 2 2.6 2.2 4M11 9c0-2.4 1.4-4 3.2-4-1.6 1.2-2 2.6-2.2 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="mt-5 text-[11px] font-medium tracking-[0.34em] text-charcoal/55 uppercase">
          Yay!
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight font-normal tracking-[-0.03em] sm:text-5xl">
          You have 3 presents.
        </h2>
        <p className="mt-4 text-sm text-charcoal/65">
          {anyOpened ? "Pick another one." : "Pick any one to start."}
        </p>
        <div className="mt-12 flex flex-wrap items-end justify-center gap-8 sm:gap-14">
          {gifts.map((gift) => {
            const opened = openedIds.includes(gift.id);
            return (
              <motion.button
                key={gift.id}
                type="button"
                onClick={() => onPick(gift.id)}
                aria-label={`${opened ? "Reopen" : "Open"} present: ${gift.title.replace("\n", " ")}`}
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={`group cursor-pointer rounded-sm focus-visible:outline-Z focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-charcoal/30 ${
                  opened ? "opacity-70" : ""
                }`}
              >
                <span className="mb-1 block h-6 font-hand text-lg leading-none text-charcoal/60">
                  {opened ? "Opened" : ""}
                </span>
                <GiftBox tone={gift.box} opened={opened} />
              </motion.button>
            );
          })}
        </div>
        {allOpened ? (
          <button
            type="button"
            onClick={onFinal}
            className="mt-10 cursor-pointer rounded-full border border-charcoal/20 bg-paper px-4 py-2 text-sm text-charcoal shadow-[0_8px_20px_rgba(28,27,25,0.08)] transition-colors hover:bg-charcoal hover:text-ivory"
          >
            One last thing →
          </button>
        ) : null}
      </div>
    </div>
  );
}
