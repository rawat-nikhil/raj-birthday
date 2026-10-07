"use client";

import type { GiftBoxTone } from "@/lib/types";
import { motion, useReducedMotion } from "framer-motion";

const tones: Record<
  GiftBoxTone,
  { body: string; lid: string; ribbon: string; edge: string }
> = {
  red: {
    body: "#8e2f2f",
    lid: "#a34444",
    ribbon: "#e7dfd2",
    edge: "rgba(255,255,255,0.08)",
  },
  black: {
    body: "#171717",
    lid: "#262626",
    ribbon: "#d9d0c3",
    edge: "rgba(255,255,255,0.06)",
  },
  green: {
    body: "#1f4d32",
    lid: "#2a6240",
    ribbon: "#e7dfd2",
    edge: "rgba(255,255,255,0.08)",
  },
};

const sizes = {
  md: { width: 96, body: 68, lid: 24 },
  lg: { width: 168, body: 108, lid: 36 },
};

function Bow({ color }: { color: string }) {
  return (
    <div className="relative h-8 w-14" aria-hidden="true">
      <span
        className="absolute top-1.5 left-0 h-5 w-6 rounded-[50%]"
        style={{ background: color, transform: "rotate(-28deg)" }}
      />
      <span
        className="absolute top-1.5 right-0 h-5 w-6 rounded-[50%]"
        style={{ background: color, transform: "rotate(28deg)" }}
      />
      <span
        className="absolute top-[2.75] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full"
        style={{ background: color, boxShadow: "inset 0 0 0 1px rgba(28,27,25,0.08)" }}
      />
    </div>
  );
}

type GiftBoxProps = {
  tone: GiftBoxTone;
  size?: "md" | "lg";
  opening?: boolean;
  opened?: boolean;
};

export function GiftBox({ tone, size = "md", opening = false, opened = false }: GiftBoxProps) {
  const reduced = useReducedMotion();
  const palette = tones[tone];
  const dim = sizes[size];
  const settled = opened && !opening;
  const lift = (opening && !reduced) || settled;

  return (
    <div className="relative" style={{ width: dim.width, height: dim.body + dim.lid + 28 }}>
      <div
        className="absolute inset-x-5 bottom-1 h-3 rounded-full bg-charcoal/15 blur-md transition-transform duration-500 group-hover:scale-x-125"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 overflow-hidden"
        style={{
          bottom: 12,
          height: dim.body,
          background: palette.body,
          borderRadius: 3,
          boxShadow: `inset 0 0 0 1px ${palette.edge}, 0 16px 30px rgba(28,27,25,0.08)`,
        }}
      >
        {opening && !reduced ? (
          <motion.div
            className="pointer-events-none absolute inset-x-4 top-0 h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,246,230,0.95) 0%, rgba(255,246,230,0) 72%)",
            }}
          />
        ) : null}
        <motion.div
          className="absolute inset-y-0 left-1/2 w-[13%] -translate-x-1/2"
          style={{ background: palette.ribbon }}
          animate={lift ? { scaleX: 0.55, opacity: settled ? 0.7 : 0.55 } : { scaleX: 1, opacity: 1 }}
          transition={{ duration: settled ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-x-0 top-1/2 h-[15%] -translate-y-1/2"
          style={{ background: palette.ribbon }}
        />
      </div>
      <motion.div
        className="absolute"
        style={{
          left: -7,
          right: -7,
          height: dim.lid,
          top: 22,
          background: palette.lid,
          borderRadius: 3,
          boxShadow: `inset 0 0 0 1px ${palette.edge}, inset 0 -5px 0 rgba(28,27,25,0.08)`,
          transformOrigin: "50% 100%",
        }}
        animate={lift ? { y: settled ? -36 : -92, rotate: settled ? -6 : -8 } : { y: 0, rotate: 0 }}
        transition={{ duration: settled ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-y-0 left-1/2 w-[11%] -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-0.5"
          style={{ background: palette.ribbon }}
        />
        <motion.div
          className="absolute top-[-5.5] left-1/2 -translate-x-1/2 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-3"
          animate={
            lift
              ? { y: settled ? -6 : -16, rotate: settled ? -8 : -16, opacity: settled ? 0.35 : 0 }
              : { y: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: settled ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Bow color={palette.ribbon} />
        </motion.div>
      </motion.div>
    </div>
  );
}
