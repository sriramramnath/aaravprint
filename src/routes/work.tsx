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
      {
        property: "og:description",
        content: "Real jobs from our shop — every category with photos.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="bg-background">
      <section className="container-editorial pb-20 pt-16 md:pb-20 md:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Gallery — {projects.length} product categories
        </p>
        <h1 className="mt-4 max-w-4xl text-balance font-display text-[clamp(2.25rem,8vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-white md:text-[clamp(2.75rem,6vw,3rem)]">
          Real <span className="text-primary">signage</span> from our{" "}
          <span className="border-b-[3px] border-primary pb-0.5">store</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-base">
          Each card shows a type of work we do. Photos are from real jobs we deliver for shops,
          vehicles, and events. Tap for details and a quote.
        </p>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
