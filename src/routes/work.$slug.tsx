import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";
import { ProjectCarousel } from "@/components/project-carousel";
import { formatInr } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Aarav Signboard` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Aarav Signboard` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:image", content: loaderData.images[0] },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.images[0] },
        ]
      : [{ title: "Work — Aarav Signboard" }],
  }),
  errorComponent: ProjectError,
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="container-editorial py-24 text-center">
      <h1 className="font-display text-4xl text-ink">Couldn't load project</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button
        onClick={() => { router.invalidate(); reset(); }}
        className="micro-lift mt-6 rounded-full bg-primary px-6 py-3 font-display text-sm tracking-wide text-primary-foreground hover:bg-primary-fixed"
      >
        Retry
      </button>
    </div>
  );
}

function ProjectNotFound() {
  return (
    <div className="container-editorial py-24 text-center">
      <h1 className="font-display text-5xl text-ink">Project not found</h1>
      <Link to="/work" className="micro-link mt-6 inline-block text-sm">
        ← Back to all work
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const project = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="container-editorial pb-12 pt-12 md:pb-16 md:pt-16">
        <Link to="/work" className="micro-link inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-ink">
          ← All work
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              {project.category} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl italic text-ink/70 md:text-3xl text-balance">
              {project.tagline}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Starting from
            </p>
            <p className="mt-2 font-display text-4xl text-ink">
              {formatInr(project.startingPrice)}
            </p>
            <Link
              to="/contact"
              className="micro-lift mt-5 inline-flex items-center gap-2 rounded-full bg-highlight px-6 py-3 text-sm font-medium text-highlight-foreground transition-base hover:shadow-glow"
            >
              Get a quote →
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="container-editorial pb-16">
        <ProjectCarousel images={project.images} alt={project.name} />
      </section>

      {/* DETAILS GRID */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Produced for</p>
            <p className="mt-2 font-display text-2xl text-ink">{project.client}</p>

            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">Scope</p>
            <ul className="mt-3 space-y-1.5">
              {project.scope.map((s) => (
                <li key={s} className="text-ink">— {s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Details</p>
            <p className="mt-4 font-display text-2xl leading-[1.3] text-ink md:text-3xl text-balance">
              {project.description}
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-3xl text-primary md:text-5xl">{m.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-editorial text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Like what you see?</p>
          <h2 className="mt-4 font-display text-5xl text-ink md:text-7xl text-balance">
            Need something <em className="italic text-primary">similar?</em>
          </h2>
          <Link
            to="/contact"
            className="micro-lift mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-sm font-medium tracking-wide text-primary-foreground transition-base hover:bg-primary-fixed hover:shadow-glow"
          >
            Request a quote for {project.name} →
          </Link>
        </div>
      </section>

      {/* MORE WORK */}
      <section className="bg-cream py-24">
        <div className="container-editorial">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">More work</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group micro-card block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover transition-base duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-3 font-display text-xl text-ink">{p.name}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
