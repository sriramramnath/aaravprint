import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial Memphis-style decorative shapes used as ambient page accents.
 * Rendered inside an `aria-hidden`, `pointer-events-none` layer so they
 * never interfere with interaction or assistive tech.
 *
 * Half-circles are always attached flush to a side (top/right/bottom/left)
 * and are intentionally static — only smaller accents (dots, waves) carry
 * subtle motion. Positions are tuned so shapes sit in side gutters and edge
 * bands and do not overlap with body text or headlines.
 */

type ShapeColor = "primary" | "highlight" | "ink" | "cream";

const colorVar: Record<ShapeColor, string> = {
  primary: "var(--color-primary)",
  highlight: "var(--color-highlight)",
  ink: "var(--color-ink)",
  cream: "var(--color-cream)",
};

type ShapeBaseProps = {
  color?: ShapeColor;
  className?: string;
  style?: CSSProperties;
};

type Side = "top" | "right" | "bottom" | "left";

/**
 * Half-circle that sits flush against a chosen side. Use Tailwind classes
 * to position along the perpendicular axis (e.g. side="bottom" + left-12).
 */
function HalfCircle({
  color = "highlight",
  side = "bottom",
  size = 120,
  className,
  style,
}: ShapeBaseProps & { side?: Side; size?: number }) {
  const isHorizontal = side === "top" || side === "bottom";
  const longSide = size;
  const shortSide = size / 2;
  const width = isHorizontal ? longSide : shortSide;
  const height = isHorizontal ? shortSide : longSide;

  let viewBox = "";
  let path = "";
  switch (side) {
    case "bottom":
      viewBox = "0 0 100 50";
      path = "M0 50 A 50 50 0 0 1 100 50 Z";
      break;
    case "top":
      viewBox = "0 0 100 50";
      path = "M0 0 A 50 50 0 0 0 100 0 Z";
      break;
    case "left":
      viewBox = "0 0 50 100";
      path = "M0 0 A 50 50 0 0 1 0 100 Z";
      break;
    case "right":
      viewBox = "0 0 50 100";
      path = "M50 0 A 50 50 0 0 0 50 100 Z";
      break;
  }

  const sideAnchor: Record<Side, string> = {
    top: "top-0",
    right: "right-0",
    bottom: "bottom-0",
    left: "left-0",
  };

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={cn("absolute select-none", sideAnchor[side], className)}
      style={style}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path d={path} fill={colorVar[color]} />
    </svg>
  );
}

function DotGrid({
  color = "primary",
  rows = 3,
  cols = 3,
  dot = 5,
  gap = 10,
  className,
  style,
}: ShapeBaseProps & { rows?: number; cols?: number; dot?: number; gap?: number }) {
  const w = cols * dot + (cols - 1) * gap;
  const h = rows * dot + (rows - 1) * gap;
  const dots: Array<{ cx: number; cy: number }> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ cx: c * (dot + gap) + dot / 2, cy: r * (dot + gap) + dot / 2 });
    }
  }
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={cn("absolute select-none", className)}
      style={style}
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={dot / 2} fill={colorVar[color]} />
      ))}
    </svg>
  );
}

function WavyLine({
  color = "primary",
  width = 96,
  thickness = 3,
  className,
  style,
}: ShapeBaseProps & { width?: number; thickness?: number }) {
  const h = 28;
  return (
    <svg
      viewBox={`0 0 100 ${h}`}
      width={width}
      height={(width * h) / 100}
      className={cn("absolute select-none", className)}
      style={style}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d={`M2 ${h / 2} Q 14 0, 26 ${h / 2} T 50 ${h / 2} T 74 ${h / 2} T 98 ${h / 2}`}
        stroke={colorVar[color]}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

type DecorVariant = "hero" | "page-hero" | "light" | "dark" | "subtle" | "edges";

export function DecorShapes({
  variant = "subtle",
  className,
}: {
  variant?: DecorVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {renderForVariant(variant)}
    </div>
  );
}

function renderForVariant(variant: DecorVariant) {
  switch (variant) {
    /**
     * HERO — centered headline (`max-w-4xl`, text-center) with generous
     * vertical padding. Shapes are restricted to the top padding band
     * above the headline, the bottom padding band below the CTAs, and
     * the side gutters only at xl+ where the centered text leaves a real
     * horizontal margin (≥150px each side).
     */
    case "hero":
      return (
        <>
          <DotGrid color="primary" className="left-4 top-4 md:left-10 md:top-8" />
          <DotGrid
            color="highlight"
            cols={4}
            rows={4}
            className="right-4 top-4 md:right-12 md:top-8"
          />

          <HalfCircle side="bottom" color="primary" size={100} className="left-4 md:left-12" />
          <HalfCircle side="bottom" color="highlight" size={130} className="right-4 md:right-12" />

          <HalfCircle
            side="left"
            color="highlight"
            size={130}
            className="top-1/2 hidden -translate-y-1/2 xl:block"
          />
          <HalfCircle side="right" color="primary" size={140} className="top-1/3 hidden xl:block" />
          <WavyLine
            color="primary"
            width={80}
            className="anim-shape-float bottom-1/3 left-10 hidden xl:block"
          />
          <WavyLine
            color="highlight"
            width={80}
            className="anim-shape-float right-10 top-1/4 hidden xl:block"
          />
        </>
      );

    /**
     * PAGE HERO — left-aligned headline (work / studio / contact intros).
     * The headline can fill the container width on smaller viewports, so
     * shapes only live in the top padding band (above the eyebrow tag)
     * and bottom padding band (below the description).
     */
    case "page-hero":
      return (
        <>
          <DotGrid color="primary" className="right-4 top-6 md:right-10 md:top-10" />
          <HalfCircle side="bottom" color="primary" size={100} className="left-4 md:left-12" />
          <HalfCircle side="bottom" color="highlight" size={120} className="right-4 md:right-12" />
        </>
      );

    /**
     * LIGHT — sections whose content fills the full container width
     * (e.g. card grids). Shapes only appear in top/bottom padding bands.
     */
    case "light":
      return (
        <>
          <DotGrid color="primary" className="left-4 top-10 md:left-12 md:top-12" />
          <DotGrid
            color="highlight"
            cols={4}
            rows={4}
            className="right-6 top-10 md:right-16 md:top-12"
          />
          <HalfCircle side="bottom" color="highlight" size={130} className="left-4 md:left-12" />
          <HalfCircle side="bottom" color="primary" size={110} className="right-4 md:right-12" />
        </>
      );

    /**
     * DARK — same constraints as `light` on a navy background; shapes use
     * the highlight (yellow) color so they remain visible against `bg-ink`.
     */
    case "dark":
      return (
        <>
          <DotGrid color="highlight" className="left-6 top-10 md:left-12 md:top-14" />
          <DotGrid
            color="highlight"
            cols={4}
            rows={4}
            className="right-6 top-10 md:right-16 md:top-14"
          />
          <HalfCircle side="bottom" color="highlight" size={120} className="left-4 md:left-12" />
          <HalfCircle side="bottom" color="highlight" size={100} className="right-4 md:right-12" />
        </>
      );

    /**
     * EDGES — narrow centered sections (testimonial). Like `hero`, side
     * shapes only appear at xl+ where the narrow text has a confirmed
     * horizontal gutter.
     */
    case "edges":
      return (
        <>
          <DotGrid color="primary" className="left-4 top-8 md:left-12 md:top-12" />
          <DotGrid
            color="highlight"
            cols={3}
            rows={3}
            className="right-4 top-8 md:right-12 md:top-12"
          />
          <HalfCircle side="bottom" color="highlight" size={120} className="left-4 md:left-12" />
          <HalfCircle side="bottom" color="primary" size={120} className="right-4 md:right-12" />
          <HalfCircle
            side="left"
            color="highlight"
            size={120}
            className="top-1/2 hidden -translate-y-1/2 xl:block"
          />
          <HalfCircle side="right" color="primary" size={120} className="top-1/3 hidden xl:block" />
        </>
      );

    /**
     * SUBTLE — minimal accents for sections whose content fills the
     * container (gallery, capabilities list, contact form).
     */
    case "subtle":
    default:
      return (
        <>
          <DotGrid color="primary" cols={3} rows={3} className="left-4 top-8 md:left-10" />
          <HalfCircle side="bottom" color="highlight" size={100} className="right-4 md:right-12" />
        </>
      );
  }
}
