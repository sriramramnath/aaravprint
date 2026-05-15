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
      <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
        Couldn't load project
      </h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="cta-energy mt-6 inline-flex items-center justify-center px-6 py-3 font-display text-sm transition-base"
      >
        Retry
      </button>
    </div>
  );
}

function ProjectNotFound() {
  return (
    <div className="container-editorial py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-white">Project not found</h1>
      <Link to="/work" className="micro-link mt-6 inline-block text-sm font-medium">
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
      <section className="container-editorial pb-20 pt-16 md:pb-20 md:pt-20">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-primary"
        >
          ← All work
        </Link>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
              {project.category} · <span className="font-numeric">{project.year}</span>
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,3rem)] font-bold leading-[1.08] tracking-tight text-white">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg italic leading-snug text-[#eaecef]/80 md:text-xl text-balance">
              {project.tagline}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Starting from
            </p>
            <p className="mt-2 font-numeric text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {formatInr(project.startingPrice)}
            </p>
            <Link
              to="/contact"
              className="cta-energy mt-5 inline-flex min-h-10 items-center gap-2 px-6 py-2.5 text-sm font-semibold"
            >
              Get a quote →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-20">
        <ProjectCarousel images={project.images} alt={project.name} />
      </section>

      <section className="border-t border-border bg-card py-20 text-card-foreground md:py-20">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Produced for
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
              {project.client}
            </p>

            <p className="mt-10 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Scope
            </p>
            <ul className="mt-3 space-y-1.5 text-[#eaecef]">
              {project.scope.map((s) => (
                <li key={s}>— {s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Details
            </p>
            <p className="mt-4 font-display text-xl font-semibold leading-snug text-[#eaecef] md:text-2xl text-balance">
              {project.description}
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-numeric text-2xl font-semibold text-primary md:text-4xl">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-20 md:py-20">
        <div className="container-editorial text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Like what you see?
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
            Need something <span className="text-primary">similar?</span>
          </h2>
          <Link
            to="/contact"
            className="cta-energy mt-10 inline-flex items-center gap-3 px-8 py-3 text-sm font-semibold"
          >
            Request a quote for {project.name} →
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-card py-20">
        <div className="container-editorial">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            More work
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group micro-card block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-white">{p.name}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {p.category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
