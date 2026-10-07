"use client";

import { BirthdayIntro } from "@/components/BirthdayIntro";
import { FinalMessage } from "@/components/FinalMessage";
import { GiftOpening } from "@/components/GiftOpening";
import { GiftReveal } from "@/components/GiftReveal";
import { GiftSelection } from "@/components/GiftSelection";
import { giftById, gifts } from "@/lib/gifts";
import type { Phase } from "@/lib/types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const OPENED_GIFTS_KEY = "raj-birthday-opened";

const openedListeners = new Set<() => void>();

function subscribeOpened(listener: () => void) {
  openedListeners.add(listener);
  return () => openedListeners.delete(listener);
}

function readOpenedSnapshot() {
  return localStorage.getItem(OPENED_GIFTS_KEY) ?? "[]";
}

function readOpenedServerSnapshot() {
  return "[]";
}

function writeOpenedGifts(ids: string[]) {
  localStorage.setItem(OPENED_GIFTS_KEY, JSON.stringify(ids));
  openedListeners.forEach((listener) => listener());
}

function parseOpenedGifts(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const known = new Set(gifts.map((gift) => gift.id));
    return [
      ...new Set(parsed.filter((id): id is string => typeof id === "string" && known.has(id))),
    ];
  } catch {
    return [];
  }
}

export function Experience() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealIndex, setRevealIndex] = useState(0);
  const openedSnapshot = useSyncExternalStore(
    subscribeOpened,
    readOpenedSnapshot,
    readOpenedServerSnapshot,
  );
  const openedIds = useMemo(() => parseOpenedGifts(openedSnapshot), [openedSnapshot]);

  const markOpened = useCallback(
    (id: string) => {
      if (openedIds.includes(id)) return;
      writeOpenedGifts([...openedIds, id]);
    },
    [openedIds],
  );

  const openGift = (id: string) => {
    const index = gifts.findIndex((gift) => gift.id === id);
    setSelectedId(id);
    setRevealIndex(index);
    if (reduced || openedIds.includes(id)) {
      markOpened(id);
      setPhase("gift-reveal");
      return;
    }
    setPhase("opening-gift");
  };

  const finishOpen = useCallback(
    (id: string) => {
      markOpened(id);
      setPhase("gift-reveal");
    },
    [markOpened],
  );

  const replay = () => {
    setSelectedId(null);
    writeOpenedGifts([]);
    setRevealIndex(0);
    setPhase("gift-selection");
  };

  const selectedGift = giftById(selectedId);
  const revealedGift = gifts[revealIndex];

  return (
    <main className="relative min-h-dvh overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center gap-4 px-5 py-5 text-[11px] font-medium tracking-[0.28em] text-charcoal/50 uppercase sm:px-8">
        <span>Raj</span>
        <span className="h-px flex-1 bg-charcoal/15" />
        <span>33</span>
      </div>

      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <motion.section
            key="intro"
            className="absolute inset-0"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease }}
          >
            <BirthdayIntro onYes={() => setPhase("gift-selection")} />
          </motion.section>
        ) : null}

        {phase === "gift-selection" ? (
          <motion.section
            key="gift-selection"
            className="absolute inset-0"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0.15 : 0.55, ease }}
          >
            <GiftSelection
              openedIds={openedIds}
              onPick={openGift}
              onFinal={() => setPhase("final")}
            />
          </motion.section>
        ) : null}

        {phase === "opening-gift" && selectedGift ? (
          <motion.section
            key="opening-gift"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.35, ease }}
          >
            <GiftOpening gift={selectedGift} onComplete={() => finishOpen(selectedGift.id)} />
          </motion.section>
        ) : null}

        {phase === "gift-reveal" && revealedGift ? (
          <motion.section
            key="gift-reveal"
            className="absolute inset-0"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0.15 : 0.55, ease }}
          >
            <GiftReveal
              gift={revealedGift}
              allOpened={openedIds.length === gifts.length}
              onNext={() => setPhase("gift-selection")}
              onFinal={() => setPhase("final")}
            />
          </motion.section>
        ) : null}

        {phase === "final" ? (
          <motion.section
            key="final"
            className="absolute inset-0"
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.6, ease }}
          >
            <FinalMessage onReplay={replay} />
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
