import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { QuoteDialog } from "./quote-dialog";

type Props = {
  project: Project;
  index: number;
  /** If set, cycles through this project’s images (unique URLs) on this interval in ms. */
  shuffleIntervalMs?: number;
};

export function ProjectCard({ project, index, shuffleIntervalMs = 3000 }: Props) {
  const offset = index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12";
  const frames = useMemo(
    () => Array.from(new Set(project.images)),
    [project.images],
  );
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frames.length <= 1 || shuffleIntervalMs <= 0) return;
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, shuffleIntervalMs);
    return () => window.clearInterval(id);
  }, [frames.length, shuffleIntervalMs]);

  const src = frames[frame] ?? project.images[0];

  return (
    <article className={`group ${offset}`}>
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="micro-card block overflow-hidden rounded-3xl bg-card shadow-soft transition-base hover:shadow-elevated"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
          <img
            key={src}
            src={src}
            alt={project.name}
            width={1280}
            height={960}
            loading="lazy"
            className="h-full w-full object-cover transition-base duration-700 group-hover:scale-[1.04] animate-in fade-in-0 duration-300"
          />
          <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink backdrop-blur">
            {project.category}
          </div>
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl text-ink">{project.name}</h3>
            <span className="text-xs tabular-nums text-muted-foreground">
              {project.year}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex justify-end px-1">
        <QuoteDialog
          project={project}
          trigger={
            <button className="micro-link text-xs font-medium uppercase tracking-wider text-ink underline-offset-4 hover:text-primary">
              Get a quote →
            </button>
          }
        />
      </div>
    </article>
  );
}
