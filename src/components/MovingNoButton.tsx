"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type Point = { x: number; y: number };

type MovingNoButtonProps = {
  zoneRef: RefObject<HTMLDivElement | null>;
  yesRef: RefObject<HTMLButtonElement | null>;
};

const buttonClass =
  "h-12 min-w-[5.5rem] rounded-full border border-charcoal/20 bg-ivory px-6 text-sm text-charcoal";

export function MovingNoButton({ zoneRef, yesRef }: MovingNoButtonProps) {
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cooling = useRef(false);
  const [pos, setPos] = useState<Point | null>(null);
  const [hasFled, setHasFled] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const place = useCallback(
    (next: Point, countAttempt: boolean) => {
      cooling.current = true;
      setPos(next);
      if (countAttempt) {
        setHasFled(true);
        setAttempts((count) => count + 1);
      }
      window.setTimeout(() => {
        cooling.current = false;
      }, reduced ? 0 : 460);
    },
    [reduced],
  );

  const flee = useCallback(() => {
    const zone = zoneRef.current;
    const button = buttonRef.current;
    const yes = yesRef.current;
    if (!zone || !button || cooling.current) return;

    const zoneRect = zone.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const yesRect = yes?.getBoundingClientRect();
    const pad = 6;
    const maxX = Math.max(zoneRect.width - buttonRect.width - pad, pad);
    const maxY = Math.max(zoneRect.height - buttonRect.height - pad, pad);
    const currentX = buttonRect.left - zoneRect.left;
    const currentY = buttonRect.top - zoneRect.top;

    let chosen: Point = {
      x: pad + Math.random() * (maxX - pad),
      y: pad + Math.random() * (maxY - pad),
    };

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const candidate = {
        x: pad + Math.random() * (maxX - pad),
        y: pad + Math.random() * (maxY - pad),
      };
      const distance = Math.hypot(candidate.x - currentX, candidate.y - currentY);
      const hitsYes =
        yesRect != null &&
        candidate.x < yesRect.right - zoneRect.left + 8 &&
        candidate.x + buttonRect.width > yesRect.left - zoneRect.left - 8 &&
        candidate.y < yesRect.bottom - zoneRect.top + 8 &&
        candidate.y + buttonRect.height > yesRect.top - zoneRect.top - 8;

      if (distance > 64 && !hitsYes) {
        chosen = candidate;
        break;
      }
    }

    place(chosen, true);
  }, [place, yesRef, zoneRef]);

  useEffect(() => {
    const zone = zoneRef.current;
    const button = buttonRef.current;
    if (!zone || !button) return;
    const zoneRect = zone.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setPos({
      x: buttonRect.left - zoneRect.left,
      y: buttonRect.top - zoneRect.top,
    });
  }, [zoneRef]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
      );
      if (distance < 92) flee();
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [flee]);

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        tabIndex={-1}
        aria-label="No, this one keeps slipping away"
        initial={false}
        animate={pos ? { left: pos.x, top: pos.y } : undefined}
        transition={
          hasFled && !reduced
            ? { type: "spring", stiffness: 420, damping: 30, mass: 0.7 }
            : { duration: 0 }
        }
        className={`${buttonClass} ${pos ? "absolute" : "absolute top-1 left-1/2 translate-x-3"}`}
        onPointerDown={(event) => {
          event.preventDefault();
          flee();
        }}
        onClick={(event) => {
          event.preventDefault();
          flee();
        }}
      >
        No
      </motion.button>
      {attempts >= 2 && pos ? (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.45 }}
          className="pointer-events-none absolute w-24 text-left font-hand text-[1.2rem] leading-tight text-charcoal/75"
          style={{
            left: Math.max(8, Math.min(pos.x - 8, 220)),
            top: Math.min(pos.y + 56, 168),
            rotate: "-7deg",
          }}
        >
          Are you
          <br />
          serious?
        </motion.p>
      ) : null}
    </>
  );
}
