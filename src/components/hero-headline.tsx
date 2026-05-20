import { useCallback, useEffect, useState } from "react";

const ROTATING_LINES = [
  { accent: "Fast", rest: "delivery." },
  { accent: "Quality", rest: "Prints." },
  { accent: "Quick", rest: "Installation." },
  { accent: "Strong", rest: "Materials." },
] as const;

const ROTATE_MS = 2000;
const ANIMATION_MS = 560;

function RotatingLine({ accent, rest }: { accent: string; rest: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      <span className="text-primary">{accent}</span>{" "}
      <span className="text-white">{rest}</span>
    </span>
  );
}

export function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  const advance = useCallback(() => {
    setIndex((current) => {
      setExitingIndex(current);
      return (current + 1) % ROTATING_LINES.length;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [advance]);

  useEffect(() => {
    if (exitingIndex === null) return;
    const timer = window.setTimeout(() => setExitingIndex(null), ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [exitingIndex, index]);

  const entering = ROTATING_LINES[index];
  const exiting = exitingIndex !== null ? ROTATING_LINES[exitingIndex] : null;

  return (
    <div className="hero-headline-glow w-full space-y-1 text-center font-display text-[clamp(2.25rem,10vw,4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] md:text-[clamp(2.75rem,8vw,4rem)]">
      <p className="leading-[1.08]">
        <span className="text-primary">Clear</span>{" "}
        <span className="text-white">signs.</span>
      </p>

      <div className="hero-spinner-viewport">
        {exiting && (
          <p
            key={`exit-${exitingIndex}`}
            className="hero-spinner-line hero-spinner-exit"
          >
            <RotatingLine accent={exiting.accent} rest={exiting.rest} />
          </p>
        )}
        <p
          key={`enter-${index}`}
          className={`hero-spinner-line ${exiting ? "hero-spinner-enter" : ""}`}
        >
          <RotatingLine accent={entering.accent} rest={entering.rest} />
        </p>
      </div>
    </div>
  );
}
