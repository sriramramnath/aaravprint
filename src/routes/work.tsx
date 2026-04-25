import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our work — Aarav Signboard" },
      {
        name: "description",
        content:
          "Signage and print from Aarav Signboard: LED, ACP, vinyl, name plates, events, and more.",
      },
      { property: "og:title", content: "Our work — Aarav Signboard" },
      { property: "og:description", content: "Real jobs from our shop — every category with photos." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="bg-background">
      <section className="container-editorial pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Gallery — {projects.length} product categories
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink text-balance">
          Real <em className="italic text-primary">signage</em> from our
          <span className="relative inline-block">
            <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-6 bg-highlight -z-0" />
            <span className="relative px-2"> floor </span>
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
          Each card matches a type of work we produce — photos are from the same
          jobs we ship for shops, fleets, and events. Tap through for details and
          a quote.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
