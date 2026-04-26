import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectCarousel } from "@/components/project-carousel";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const offset = index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12";
  const frames = useMemo(() => Array.from(new Set(project.images)), [project.images]);
  const src = frames[0] ?? project.images[0];

  return (
    <article className={`group ${offset}`}>
      <div className="micro-card block overflow-hidden rounded-3xl bg-card shadow-soft transition-base hover:shadow-elevated">
        <div className="relative aspect-[4/3] overflow-hidden rounded-b-none bg-ink/95">
          <img
            src={src}
            alt={project.name}
            width={1280}
            height={960}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-base duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink backdrop-blur">
            {project.category}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="micro-lift absolute bottom-4 right-4 rounded-full border border-border bg-card/95 px-5 text-xs font-semibold uppercase tracking-wider text-ink shadow-soft hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
              >
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[98vw] max-w-6xl overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-elevated sm:w-[95vw] sm:rounded-lg sm:bg-background/95 sm:p-6 sm:backdrop-blur-sm lg:w-[92vw]">
              <DialogHeader className="px-1 pt-1 text-center sm:px-0 sm:pt-0 sm:text-center">
                <DialogTitle className="mx-auto w-full px-10 text-center font-display text-base leading-snug text-ink sm:px-12 sm:text-2xl">
                  {project.name}
                </DialogTitle>
              </DialogHeader>
              <ProjectCarousel images={frames} alt={project.name} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl text-ink">
              <Link to="/work/$slug" params={{ slug: project.slug }} className="hover:text-primary">
                {project.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end px-1">
        <Link
          to="/contact"
          className="micro-link text-xs font-medium uppercase tracking-wider text-ink underline-offset-4 hover:text-primary"
        >
          Get a quote →
        </Link>
      </div>
    </article>
  );
}
