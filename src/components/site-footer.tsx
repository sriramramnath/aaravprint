import { Link } from "@tanstack/react-router";
import { companyInfo } from "@/lib/company";
import logoSrc from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="container-editorial py-16 md:py-[4rem]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex flex-col gap-3">
              <img
                src={logoSrc}
                alt=""
                width={180}
                height={56}
                className="h-12 w-auto max-w-[200px] object-contain object-left"
                decoding="async"
              />
              <p className="font-display text-lg font-semibold text-white">{companyInfo.name}</p>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {companyInfo.tagline}
              </p>
              <a
                href={`mailto:${companyInfo.email}`}
                className="micro-link w-fit text-sm font-medium"
              >
                {companyInfo.email}
              </a>
            </div>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              — Let&apos;s make something
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
              Have a project in
              <br />
              <span className="text-primary">mind?</span>
            </h2>
            <Link
              to="/contact"
              className="cta-energy mt-8 inline-flex items-center gap-3 px-7 py-3.5 text-sm transition-base"
            >
              Start the conversation
              <span className="text-lg" aria-hidden>
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-8 md:col-span-6 md:grid-cols-3">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Company
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link to="/work" className="text-foreground transition-colors hover:text-primary">
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/studio"
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Connect
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    {companyInfo.email}
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    Contact form
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Locations
              </p>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                {companyInfo.locations.map((loc) => (
                  <li key={loc.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {loc.label}
                    </p>
                    <p className="mt-1 text-foreground">{loc.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aarav Signboard — All rights reserved.</p>
          <p className="font-display font-medium text-foreground/80">Signage done right.</p>
        </div>
      </div>
    </footer>
  );
}
