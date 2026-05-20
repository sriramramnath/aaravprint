import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { projects, heroImages, homeHeroImage } from "@/data/projects";
import { HeroHeadline } from "@/components/hero-headline";
import { ProjectCard } from "@/components/project-card";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${companyInfo.name} — ${companyInfo.tagline}` },
      {
        name: "description",
        content: `${companyInfo.tagline} ${companyInfo.name}, Chennai. ${companyInfo.email}, ${companyInfo.phone}`,
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const activeImage = heroImages[activeImageIndex] ?? homeHeroImage;

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-background pb-16 pt-10 md:pb-20 md:pt-14">
        <img
          key={activeImage}
          aria-hidden
          src={activeImage}
          alt=""
          className="animate-hero-image absolute inset-0 -z-30 h-full w-full object-cover"
        />
        <div aria-hidden className="bg-hero-veil absolute inset-0 -z-20" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-black/20" />

        <div className="container-editorial">
          <div className="relative flex min-h-[31rem] items-center justify-center py-6 md:min-h-[40rem] md:py-10">
            <div className="animate-float-up relative z-20 flex max-w-4xl flex-col items-center px-1 pt-2 text-center md:pt-4">
              <HeroHeadline />

              <p className="hero-tagline-shadow mt-8 max-w-2xl text-sm leading-relaxed text-[#eaecef] drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] md:text-base">
                Premium sign boards, print, and installation crafted for visibility that lasts.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-7 md:gap-4">
                <Link
                  to="/work"
                  className="cta-energy inline-flex min-h-10 items-center gap-2 px-6 py-2.5 font-display text-sm transition-base"
                >
                  Start now →
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary-dark inline-flex min-h-10 items-center gap-2 border border-[#2b3139] px-6 py-2.5 font-display text-sm transition-base"
                >
                  Contact sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-t border-border bg-background py-20 md:py-20">
        <div className="container-editorial">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
                Our work
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[3rem]">
                Featured <span className="text-primary">work.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="cta-energy inline-flex items-center gap-2 px-6 py-3.5 font-display text-sm tracking-wide transition-base"
            >
              View all services →
            </Link>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              to="/work"
              className="cta-energy inline-flex items-center gap-2 px-6 py-3.5 font-display text-sm tracking-wide transition-base"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-t border-border bg-card py-20 text-card-foreground md:py-20">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
                What we do
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
                Signage &amp; print
                <br />
                <span className="text-primary">under one roof.</span>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                We help shop owners, contractors, and event teams pick materials, print, fit, and
                install boards on site.
              </p>
            </div>
            <ul className="grid gap-x-12 gap-y-10 md:col-span-7 md:grid-cols-2">
              {[
                {
                  n: "01",
                  t: "Illuminated signs",
                  d: "LED boards, backlit flex, and light boxes.",
                },
                {
                  n: "02",
                  t: "Facade & ACP",
                  d: "Panels, canopies, and signs made for outdoor use.",
                },
                {
                  n: "03",
                  t: "Vinyl & pasting",
                  d: "Vinyl for vehicles, glass, and strong wrap jobs.",
                },
                {
                  n: "04",
                  t: "Events & retail",
                  d: "Roll-ups, backdrops, promo tables, and more.",
                },
              ].map((s) => (
                <li key={s.n} className="border-t border-border pt-5">
                  <p className="font-numeric text-sm font-medium text-primary">{s.n}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-border bg-background py-20 md:py-20">
        <div className="container-editorial max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            What our clients say
          </p>
          <blockquote className="mt-8 font-display text-2xl font-semibold leading-[1.2] tracking-tight text-white md:text-4xl text-balance">
            &ldquo;Aarav Signboard made our shop look great in one week &mdash; LED board is bright,
            clean, and the team handled
            <span className="text-primary"> install without any trouble.</span>&rdquo;
          </blockquote>
          <p className="mt-10 text-sm text-muted-foreground">
            Local retail client - signage and print work
          </p>
        </div>
      </section>
    </div>
  );
}
