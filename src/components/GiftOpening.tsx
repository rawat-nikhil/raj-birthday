"use client";

import { GiftBox } from "@/components/GiftBox";
import { gifts } from "@/lib/gifts";
import type { Gift } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const shards = [
  { x: -98, y: -92, rotate: -22, delay: 0.05, width: 16, height: 9 },
  { x: 90, y: -78, rotate: 16, delay: 0.1, width: 18, height: 10 },
  { x: -78, y: -30, rotate: 10, delay: 0.02, width: 12, height: 8 },
  { x: 104, y: -22, rotate: -18, delay: 0.14, width: 14, height: 8 },
  { x: -24, y: -128, rotate: 26, delay: 0.08, width: 11, height: 7 },
  { x: 30, y: -132, rotate: -8, delay: 0.16, width: 12, height: 11 },
];

type GiftOpeningProps = {
  gift: Gift;
  onComplete: () => void;
};

export function GiftOpening({ gift, onComplete }: GiftOpeningProps) {
  const reduced = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const [unwrapping, setUnwrapping] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduced) {
      onCompleteRef.current();
      return;
    }
    const start = window.setTimeout(() => setUnwrapping(true), 520);
    const done = window.setTimeout(() => onCompleteRef.current(), 2100);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(done);
    };
  }, [reduced]);

  const selectedIndex = gifts.findIndex((item) => item.id === gift.id);

  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="relative h-72 w-full max-w-xl">
        {gifts.map((item, index) => {
          const selected = item.id === gift.id;
          const offset = (index - selectedIndex) * 150;
          return (
            <motion.div
              key={item.id}
              className="absolute top-6 left-1/2"
              initial={{ x: offset - 84, opacity: 1, scale: 1 }}
              animate={{
                x: selected ? -84 : offset * 1.2 - 84,
                opacity: selected ? 1 : 0,
                scale: selected ? 1.08 : 0.94,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <GiftBox tone={item.box} size="lg" opening={selected && unwrapping} />
            </motion.div>
          );
        })}
        {unwrapping
          ? shards.map((shard) => (
              <motion.span
                key={`${shard.x}-${shard.y}`}
                aria-hidden="true"
                className="absolute top-24 left-1/2 block bg-[#efe4d2]"
                style={{ width: shard.width, height: shard.height }}
                initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                animate={{
                  x: shard.x,
                  y: shard.y,
                  opacity: [0, 1, 0],
                  rotate: shard.rotate,
                }}
                transition={{ duration: 1.15, delay: shard.delay, ease: [0.22, 1, 0.36, 1] }}
              />
            ))
          : null}
      </div>
    </div>
  );
}
