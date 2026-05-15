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
    d: "We pick the right boards, films, and metals for your needs — sun, rain, and daily use.",
  },
  {
    n: "02",
    t: "Clear quotes",
    d: "Size, material, and fittings are clearly listed. No surprise charges when we deliver.",
  },
  {
    n: "03",
    t: "From file to finished board",
    d: "We check the design, print, make, and install — so everything looks right in real life.",
  },
  {
    n: "04",
    t: "On-time where possible",
    d: "We take rush jobs when we can. If we cannot meet your date, we will let you know early.",
  },
];

function StudioPage() {
  return (
    <div className="bg-background">
      <section className="container-editorial py-20 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-4 max-w-5xl text-balance font-display text-[clamp(2.25rem,8vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white md:text-[clamp(2.5rem,5vw,2.875rem)]">
          <span className="text-primary">Aarav Signboard</span> is your{" "}
          <span className="border-b-[3px] border-primary pb-0.5">signage</span> and print partner.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-base">{companyInfo.tagline}</p>
        <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
          We are a printing workshop based in Chennai. Check the work section for photos of what we
          make — every item below is something we supply and install.
        </p>
      </section>

      <section className="border-t border-border bg-card py-20 text-card-foreground md:py-20">
        <div className="container-editorial grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Principles
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-4xl">
              How we
              <br />
              <span className="text-primary">work.</span>
            </h2>
          </div>
          <ul className="grid gap-x-12 gap-y-10 md:col-span-8 md:grid-cols-2">
            {principles.map((p) => (
              <li key={p.n} className="border-t border-border pt-5">
                <p className="font-numeric text-sm font-medium text-primary">{p.n}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Capabilities
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Every <span className="text-primary">product</span> we offer.
          </h2>
        </div>
        <ul className="mt-14 space-y-0 divide-y divide-border">
          {productServiceLabels.map((line, i) => (
            <li
              key={line}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-6 py-5 transition-colors hover:bg-card"
            >
              <span className="font-numeric text-sm font-medium text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-semibold text-foreground md:text-xl">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border bg-card py-20">
        <div className="container-editorial text-center">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight text-white md:text-4xl text-balance">
            Ready to tell us about your job?
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
