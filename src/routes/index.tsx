import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, homeHeroImage } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${companyInfo.name} — ${companyInfo.tagline}` },
      {
        name: "description",
        content: `${companyInfo.tagline} ${companyInfo.name}, Chennai. ${companyInfo.email}`,
      },
      { property: "og:title", content: companyInfo.name },
      { property: "og:description", content: companyInfo.tagline },
      { property: "og:image", content: homeHeroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: homeHeroImage },
    ],
  }),
  component: Index,
});

const marqueeWords = [
  "Signage", "LED", "ACP", "Vinyl", "Name plates", "Events",
  "Signage", "LED", "ACP", "Vinyl", "Name plates", "Events",
];

function Index() {
  const featured = projects.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-editorial pb-24 pt-12 md:pb-32 md:pt-20">
          <div className="grid items-end gap-12 md:grid-cols-12">
            <div className="md:col-span-7 animate-float-up">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="inline-block h-px w-12 bg-ink" />
                Aarav Signboard — print, signage &amp; install
              </p>
              <h1 className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight text-ink text-balance">
                <em className="italic text-primary">Bold</em> signboards
                <br />
                <span className="relative inline-block">
                  &amp; reliable
                  <span className="absolute -bottom-2 left-0 h-3 w-full -skew-x-6 bg-highlight -z-0" />
                </span>{" "}
                print work.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                From LED and backlit shop boards to ACP, vinyl, name plates, and
                event stands — we fabricate, finish, and install so your brand
                reads clearly on the street and on site.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/work"
                  className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ink-foreground transition-base hover:shadow-elevated"
                >
                  See our work →
                </Link>
                <Link
                  to="/contact"
                  className="micro-lift inline-flex items-center gap-2 rounded-full border border-ink/15 bg-transparent px-6 py-3.5 text-sm font-medium text-ink transition-base hover:border-ink hover:bg-ink hover:text-ink-foreground"
                >
                  Get a quote
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative">
                <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-highlight md:h-32 md:w-32" />
                <img
                  src={homeHeroImage}
                  alt="Hoarding and large-format print by Aarav Signboard"
                  width={1920}
                  height={1280}
                  className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-elevated"
                />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-card px-5 py-4 shadow-elevated">
                  <p className="font-display text-3xl text-ink">20+</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Product lines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-ink/10 bg-ink py-6 text-ink-foreground overflow-hidden">
          <div className="marquee">
            {marqueeWords.map((w, i) => (
              <span key={i} className="font-display text-3xl italic md:text-5xl">
                <span className="text-highlight">✺</span>{" "}
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-editorial">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                From our shop floor
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] text-ink md:text-7xl">
                Featured <em className="italic text-primary">work</em>.
              </h2>
            </div>
            <Link
              to="/work"
              className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ink-foreground transition-base hover:shadow-elevated"
            >
              View all services →
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              to="/work"
              className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-ink-foreground transition-base hover:shadow-elevated"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-highlight">What we do</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-6xl">
                Signage &amp; print
                <br />
                <span className="italic text-highlight">under one roof.</span>
              </h2>
              <p className="mt-6 max-w-md text-ink-foreground/70">
                We work with shop owners, contractors, and event teams — from
                material choice and print to mounting and on-site install when
                you need it.
              </p>
            </div>
            <ul className="grid gap-x-12 gap-y-10 md:col-span-7 md:grid-cols-2">
              {[
                { n: "01", t: "Illuminated signs", d: "LED, backlit flex, and lightboxes." },
                { n: "02", t: "Facade & ACP", d: "Panels, canopies, and outdoor durability." },
                { n: "03", t: "Vinyl & pasting", d: "Fleet, glass, and high-tack wraps." },
                { n: "04", t: "Events & retail", d: "Rollups, backdrops, promo tables, and more." },
              ].map((s) => (
                <li key={s.n} className="border-t border-ink-foreground/15 pt-5">
                  <p className="font-display text-sm tabular-nums text-highlight">{s.n}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-ink-foreground/60">{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Kind words
          </p>
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] text-ink md:text-5xl text-balance">
            "Aarav Signboard turned our shopfront around in one week — LED board
            is bright, clean, and the team handled
            <em className="italic text-primary"> install without fuss.</em>"
          </blockquote>
          <p className="mt-10 text-sm text-muted-foreground">
            Local retail client — mix of signage &amp; print
          </p>
        </div>
      </section>
    </div>
  );
}
