import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TransitionEvent,
} from "react";
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

const CARD_IMAGE_ROTATION_MS = 2000;
const CARD_SLIDE_MS = 580;

export function ProjectCard({ project, index }: Props) {
  const offset = index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12";
  const frames = useMemo(() => Array.from(new Set(project.images)), [project.images]);
  const slides = useMemo(() => {
    if (frames.length > 0) return frames;
    return project.images[0] ? [project.images[0]] : [];
  }, [frames, project.images]);
  /** Extra slot clones first slide so we can slide forward from last → first without rewinding the strip. */
  const strip = useMemo(
    () => (slides.length > 1 ? [...slides, slides[0]!] : slides),
    [slides],
  );
  const slotCount = strip.length;
  const [slideIndex, setSlideIndex] = useState(0);
  const [stripJump, setStripJump] = useState(false);
  const pauseRotation = useRef(false);

  useEffect(() => {
    setSlideIndex(0);
    setStripJump(false);
  }, [project.slug]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      if (pauseRotation.current || document.hidden) return;
      setSlideIndex((i) => {
        if (i < slides.length - 1) return i + 1;
        return slides.length;
      });
    }, CARD_IMAGE_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const handleStripTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;
      if (slides.length <= 1) return;
      if (slideIndex !== slides.length) return;
      setStripJump(true);
      setSlideIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setStripJump(false));
      });
    },
    [slideIndex, slides.length],
  );

  const slideTranslatePct = slotCount > 0 ? (100 * slideIndex) / slotCount : 0;

  return (
    <article className={`group min-w-0 max-w-full ${offset}`}>
      <div className="micro-card block min-w-0 overflow-hidden rounded-[28px] border border-white/50 bg-card/90 backdrop-blur-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-base hover:border-white/65 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        <div
          className="relative aspect-[4/3] min-w-0 overflow-hidden overflow-x-clip rounded-b-none bg-[linear-gradient(180deg,rgb(255,251,234/0.95),rgb(255,255,255/0.88))]"
          onMouseEnter={() => {
            if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
              pauseRotation.current = true;
            }
          }}
          onMouseLeave={() => {
            pauseRotation.current = false;
          }}
        >
          {slotCount > 0 ? (
            <div
              className="flex h-full min-w-0 w-full motion-reduce:!transition-none"
              style={{
                width: `${slotCount * 100}%`,
                transform: `translate3d(-${slideTranslatePct}%,0,0)`,
                transitionProperty: stripJump || slides.length <= 1 ? "none" : "transform",
                transitionDuration:
                  stripJump || slides.length <= 1 ? undefined : `${CARD_SLIDE_MS}ms`,
                transitionTimingFunction: "cubic-bezier(0.25, 0.82, 0.42, 0.97)",
              }}
              onTransitionEnd={handleStripTransitionEnd}
            >
              {strip.map((src, i) => {
                const isClone = slides.length > 1 && i === strip.length - 1;
                const alt =
                  isClone || slides.length <= 1
                    ? slides.length <= 1
                      ? project.name
                      : ""
                    : `${project.name} — preview ${i + 1} of ${slides.length}`;
                return (
                  <div
                    key={`${project.slug}-${i}-${src}`}
                    className="relative flex h-full min-w-0 shrink-0 items-center justify-center"
                    style={{ width: `${100 / slotCount}%` }}
                    aria-hidden={isClone ? true : undefined}
                  >
                    <img
                      src={src}
                      alt={alt}
                      width={1280}
                      height={960}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="h-full w-full min-w-0 max-w-full object-contain p-2 transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="absolute left-4 top-4 z-10 rounded-full border border-white/55 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground glass-panel backdrop-blur-md">
            {project.category}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="default"
                className="micro-lift absolute bottom-4 right-4 z-10 rounded-[14px] border border-[rgb(255,214,10/0.45)] px-5 text-xs font-semibold uppercase tracking-wider shadow-[0_8px_24px_rgba(255,214,10,0.25)]"
              >
                View
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[98vw] max-w-6xl overflow-hidden rounded-[28px] border border-white/45 bg-[rgb(255,255,255/0.92)] p-3 shadow-[0_20px_56px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:w-[95vw] sm:p-6 lg:w-[92vw]">
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
