import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, ShieldCheck, Wrench, Award } from "lucide-react";
import { projects, homeHeroImage } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { companyInfo } from "@/lib/company";
import billboardImage from "@/assets/image.png";

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

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-background pb-16 pt-8 md:pb-20 md:pt-10">
        <div
          aria-hidden
          className="absolute inset-0 -z-30 bg-[radial-gradient(130%_100%_at_8%_0%,#fff9b0_0%,#facc15_22%,#60a5fa_52%,#2563eb_72%,#1e3a8a_100%)]"
        />
        <div
          aria-hidden
          className="absolute -left-28 top-10 -z-20 h-[24rem] w-[24rem] rounded-full bg-yellow-300/65 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-16 top-8 -z-20 h-[26rem] w-[26rem] rounded-full bg-sky-300/55 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(176deg,rgba(249,247,238,0.12)_0%,rgba(249,247,238,0.06)_33.75%,rgba(249,247,238,1)_34.05%,rgba(249,247,238,1)_100%)] md:bg-[linear-gradient(176deg,rgba(249,247,238,0.12)_0%,rgba(249,247,238,0.06)_82%,rgba(249,247,238,1)_82.3%,rgba(249,247,238,1)_100%)]"
        />
        <img
          aria-hidden
          src={billboardImage}
          alt=""
          width={1024}
          height={683}
          className="pointer-events-none absolute left-1/2 top-12 -z-20 w-[90vw] -translate-x-1/2 select-none object-contain opacity-95 md:left-auto md:top-auto md:w-[min(46vw,34rem)] md:translate-x-0 md:bottom-[10%] md:right-4 lg:bottom-[9%] lg:right-10 lg:w-[min(42vw,36rem)]"
        />

        <div className="container-editorial">
          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="animate-float-up px-1 pt-10 md:pt-8 lg:pt-6">
              <div className="h-[20rem] sm:h-[24rem] md:hidden" aria-hidden />

              <div className="mt-6 flex flex-wrap items-center gap-4 md:order-3 md:mt-6">
                <Link
                  to="/work"
                  className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-ink-foreground transition-base hover:shadow-elevated"
                >
                  Start now →
                </Link>
                <Link
                  to="/contact"
                  className="micro-lift inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/90 px-7 py-4 text-base font-semibold text-ink backdrop-blur transition-base hover:bg-white"
                >
                  Contact sales
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 pb-4 md:order-2">
                {[
                  {
                    title: "High Quality\nMaterials",
                    body: "Premium materials that ensure long-lasting performance outdoors.",
                    icon: Award,
                  },
                  {
                    title: "Custom\nDesigns",
                    body: "Unique, creative designs that bring your brand to life.",
                    icon: PenLine,
                  },
                  {
                    title: "Expert\nInstallation",
                    body: "Skilled team for safe, precise and on-time installations.",
                    icon: Wrench,
                  },
                  {
                    title: "Durable &\nReliable",
                    body: "Built to withstand all weather and stay vibrant for years.",
                    icon: ShieldCheck,
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-ink/12 bg-white/88 p-3 shadow-soft backdrop-blur sm:p-5"
                  >
                    <div className="flex flex-col items-start gap-2.5 md:flex-row md:gap-3">
                      <div className="mx-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-white/95 text-highlight shadow-soft md:mx-0 sm:size-11">
                        <item.icon className="size-4 sm:size-5" strokeWidth={2.2} />
                      </div>
                      <div className="w-full">
                        <h2 className="whitespace-pre-line font-display text-[1.55rem] leading-[0.92] text-ink sm:text-[2rem]">
                          {item.title}
                        </h2>
                        <p className="mt-1.5 max-w-[20ch] text-xs leading-relaxed text-ink/75 sm:mt-2 sm:max-w-[22ch] sm:text-sm">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div
              className="relative hidden h-[260px] md:h-[340px] lg:block lg:h-[430px]"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-background py-24 md:pb-28 md:pt-16">
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
                We work with shop owners, contractors, and event teams — from material choice and
                print to mounting and on-site install when you need it.
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
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Kind words</p>
          <blockquote className="mt-8 font-display text-3xl leading-[1.15] text-ink md:text-5xl text-balance">
            "Aarav Signboard turned our shopfront around in one week — LED board is bright, clean,
            and the team handled
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
