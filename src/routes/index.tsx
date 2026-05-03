import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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

function Index() {
  const featured = projects.slice(0, 4);
  const heroShuffleImages = useMemo(() => {
    const unique = Array.from(new Set(projects.flatMap((project) => project.images)));
    return unique;
  }, []);
  const [activeShuffle, setActiveShuffle] = useState(0);

  useEffect(() => {
    if (heroShuffleImages.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveShuffle((prev) => {
        if (heroShuffleImages.length <= 1) return 0;
        let next = prev;
        while (next === prev) {
          next = Math.floor(Math.random() * heroShuffleImages.length);
        }
        return next;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [heroShuffleImages]);

  const activeImage = heroShuffleImages[activeShuffle] ?? homeHeroImage;

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-background pb-16 pt-12 md:pb-20 md:pt-14">
        <img
          aria-hidden
          src={activeImage}
          alt=""
          className="absolute inset-0 -z-30 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(253,212,6,0.84)_0%,rgba(253,212,6,0.78)_38%,rgba(253,212,6,0.72)_100%)]"
        />

        <div className="container-editorial">
          <div className="relative flex min-h-[31rem] items-center justify-center py-6 md:min-h-[40rem] md:py-10">
            <div className="animate-float-up relative z-20 flex max-w-4xl flex-col items-center px-1 pt-2 text-center md:pt-4">
              <div className="space-y-1 font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.045em] text-ink">
                <div className="relative inline-block">
                  <p>
                    <span className="italic text-primary">Clear</span>{" "}
                    <span className="text-ink">signs.</span>
                  </p>
                </div>
                <div className="relative inline-block pt-1.5">
                  <p>
                    <span className="italic text-primary">Quality</span>{" "}
                    <span className="text-ink">prints.</span>
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
                Premium sign boards, print, and installation crafted for visibility that lasts.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-7">
                <Link
                  to="/work"
                  className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-ink-foreground transition-base hover:shadow-elevated"
                >
                  Start now →
                </Link>
                <Link
                  to="/contact"
                  className="micro-lift inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/88 px-7 py-4 text-base font-semibold text-ink backdrop-blur transition-base hover:bg-white"
                >
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-background py-24 md:pb-28 md:pt-16">
        <div className="container-editorial">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our work</p>
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

          <div className="grid min-w-0 gap-x-8 gap-y-16 md:grid-cols-2">
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
                We help shop owners, contractors, and event teams with material selection, printing,
                fitting, and on-site installation when needed.
              </p>
            </div>
            <ul className="grid gap-x-12 gap-y-10 md:col-span-7 md:grid-cols-2">
              {[
                { n: "01", t: "Illuminated signs", d: "LED boards, backlit flex, and light boxes." },
                { n: "02", t: "Facade & ACP", d: "Panels, canopies, and signs made for outdoor use." },
                { n: "03", t: "Vinyl & pasting", d: "Vinyl for vehicles, glass, and strong wrap jobs." },
                { n: "04", t: "Events & retail", d: "Roll-ups, backdrops, promo tables, and more." },
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
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Kind words</p>
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] text-ink md:text-5xl text-balance">
            "Aarav Signboard turned our shopfront around in one week — LED board is bright, clean,
            and the team handled
            <em className="italic text-primary"> install without fuss.</em>"
          </blockquote>
          <p className="mt-10 text-sm text-muted-foreground">
            Local retail client - signage and print work
          </p>
        </div>
      </section>
    </div>
  );
}
