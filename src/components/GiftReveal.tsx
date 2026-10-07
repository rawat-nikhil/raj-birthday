"use client";

import { PhotoCollage } from "@/components/PhotoCollage";
import type { Gift } from "@/lib/types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type GiftRevealProps = {
  gift: Gift;
  allOpened: boolean;
  onNext: () => void;
  onFinal: () => void;
};

function Heart() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 19.4s-6.4-4-6.4-8.2a3.6 3.6 0 0 1 6.4-1.8 3.6 3.6 0 0 1 6.4 1.8c0 4.2-6.4 8.2-6.4 8.2Z"
        fill="#e23b3b"
      />
    </svg>
  );
}

function GiftCard({ gift }: { gift: Gift }) {
  if (gift.layout === "collage") {
    return (
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-16">
        <PhotoCollage images={gift.images} />
        <article className="bg-paper px-7 py-9 shadow-[0_18px_40px_rgba(28,27,25,0.05)] sm:px-10">
          <h2 className="font-serif text-4xl leading-[1.15] font-normal tracking-[-0.03em] whitespace-pre-line sm:text-5xl">
            {gift.title}
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-7 whitespace-pre-line text-charcoal/75">
            {gift.body}
          </p>
        </article>
      </div>
    );
  }

  const image = gift.images[0];
  const portrait = gift.layout === "portrait";

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={`relative mx-auto w-full max-w-sm ${portrait ? "" : "md:justify-self-end"}`}>
        <figure
          className={`relative bg-paper p-3 pb-16 shadow-[0_18px_40px_rgba(28,27,25,0.1)] ${
            portrait ? "rotate-[1.5deg]" : "rotate-[-2.5deg]"
          }`}
        >
          <div className="relative aspect-4/5">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 80vw, 380px"
              className="object-cover"
            />
          </div>
          {gift.note ? (
            <p className="pointer-events-none absolute right-4 bottom-3 max-w-44 -rotate-2 text-right font-hand text-lg leading-tight text-charcoal/75">
              {gift.note}
            </p>
          ) : null}
        </figure>
      </div>
      <article className={portrait ? "md:pl-2" : ""}>
        <h2 className="font-serif text-4xl leading-[1.12] font-normal tracking-[-0.03em] sm:text-5xl">
          {gift.title}
        </h2>
        <p className="mt-6 max-w-sm text-[15px] leading-7 whitespace-pre-line text-charcoal/75">
          {gift.body}
        </p>
        {gift.layout === "editorial" ? (
          <div className="mt-8">
            <Heart />
          </div>
        ) : null}
      </article>
    </div>
  );
}

export function GiftReveal({ gift, allOpened, onNext, onFinal }: GiftRevealProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex h-full flex-col justify-center overflow-y-auto px-5 pt-24 pb-10 sm:px-10">
      <button
        type="button"
        onClick={allOpened ? onFinal : onNext}
        className="absolute top-16 right-5 z-30 cursor-pointer rounded-full border border-charcoal/20 bg-paper px-4 py-2 text-sm text-charcoal shadow-[0_8px_20px_rgba(28,27,25,0.08)] transition-colors hover:bg-charcoal hover:text-ivory sm:right-8"
      >
        {allOpened ? "One last thing →" : "Try the next one →"}
      </button>
      <div className="mx-auto w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: reduced ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <GiftCard gift={gift} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
