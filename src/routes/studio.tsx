import { createFileRoute, Link } from "@tanstack/react-router";
import { productServiceLabels } from "@/data/projects";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "About — Aarav Signboard" },
      {
        name: "description",
        content: `${companyInfo.tagline} Full product list and principles.`,
      },
      { property: "og:title", content: `About — ${companyInfo.name}` },
      { property: "og:description", content: companyInfo.tagline },
    ],
  }),
  component: StudioPage,
});

const principles = [
  {
    n: "01",
    t: "Materials that last",
    d: "We match boards, films, and metals to your environment — sun, rain, and daily wear.",
  },
  {
    n: "02",
    t: "Clear quotes",
    d: "Size, material, and fixings spelled out. No surprise line items when we deliver.",
  },
  {
    n: "03",
    t: "From file to facade",
    d: "Artwork check, print, fabrication, and install — coordinated so graphics line up in real life.",
  },
  {
    n: "04",
    t: "On-time where possible",
    d: "Rush jobs when capacity allows. If we cannot hit your date, we will say so early.",
  },
];

function StudioPage() {
  return (
    <div className="bg-background">
      <section className="container-editorial py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">About</p>
        <h1 className="mt-4 max-w-5xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] text-ink text-balance">
          <em className="italic text-primary">Aarav Signboard</em> is your
          <span className="relative inline-block">
            <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-6 bg-highlight -z-0" />
            <span className="relative px-2"> signage </span>
          </span>
          and print partner.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {companyInfo.tagline}
        </p>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
          We are a print-first workshop serving Chennai and beyond. Browse the work section for
          photos from our shop — every product below is a category we supply and install.
        </p>
      </section>

      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-editorial grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-highlight">Principles</p>
            <h2 className="mt-4 font-display text-4xl leading-[1] md:text-5xl">
              How we
              <br />
              <span className="italic text-highlight">work.</span>
            </h2>
          </div>
          <ul className="grid gap-x-12 gap-y-10 md:col-span-8 md:grid-cols-2">
            {principles.map((p) => (
              <li key={p.n} className="micro-lift border-t border-ink-foreground/15 pt-5">
                <p className="font-display text-sm tabular-nums text-highlight">{p.n}</p>
                <h3 className="mt-2 font-display text-2xl">{p.t}</h3>
                <p className="mt-2 text-sm text-ink-foreground/60">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-editorial py-24 md:py-32">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Capabilities</p>
          <h2 className="mt-4 font-display text-5xl text-ink md:text-6xl">
            Every <em className="italic text-primary">product</em> we offer.
          </h2>
        </div>
        <ul className="mt-14 space-y-0 divide-y divide-ink/10">
          {productServiceLabels.map((line, i) => (
            <li
              key={line}
              className="group micro-lift grid grid-cols-[auto_1fr] items-baseline gap-6 py-5 transition-base hover:bg-cream"
            >
              <span className="font-display text-sm tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl text-ink md:text-2xl">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-cream py-24">
        <div className="container-editorial text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl text-ink md:text-6xl text-balance">
            Ready to brief a job?
          </h2>
          <Link
            to="/contact"
            className="cta-energy mt-8 inline-flex items-center gap-2 px-7 py-3.5 font-display text-sm tracking-wide transition-base"
          >
            Contact Aarav Signboard →
          </Link>
        </div>
      </section>
    </div>
  );
}
