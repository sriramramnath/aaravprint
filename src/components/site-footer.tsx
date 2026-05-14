import { Link } from "@tanstack/react-router";
import { companyInfo } from "@/lib/company";
import logoSrc from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-editorial py-20">
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
              <p className="font-display text-lg text-ink-foreground/90">
                {companyInfo.name}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-ink-foreground/75">
                {companyInfo.tagline}
              </p>
              <a
                href={`mailto:${companyInfo.email}`}
                className="micro-link w-fit text-sm text-highlight"
              >
                {companyInfo.email}
              </a>
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.3em] text-highlight">
              — Let&apos;s make something
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[0.95] md:text-6xl">
              Have a project in
              <br />
              <span className="italic text-highlight">mind?</span>
            </h2>
            <Link
              to="/contact"
              className="cta-energy mt-8 inline-flex items-center gap-3 px-7 py-4 text-sm transition-base"
            >
              Start the conversation
              <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="grid gap-8 md:col-span-6 md:grid-cols-3">
            <div>
              <p className="font-display text-sm uppercase tracking-widest text-ink-foreground/50">
                Company
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/work" className="micro-link hover:text-highlight">Work</Link></li>
                <li><Link to="/studio" className="micro-link hover:text-highlight">About</Link></li>
                <li><Link to="/contact" className="micro-link hover:text-highlight">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm uppercase tracking-widest text-ink-foreground/50">
                Connect
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="micro-link hover:text-highlight"
                  >
                    {companyInfo.email}
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="micro-link hover:text-highlight">
                    Contact form
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm uppercase tracking-widest text-ink-foreground/50">
                Locations
              </p>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink-foreground/80">
                {companyInfo.locations.map((loc) => (
                  <li key={loc.label}>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-ink-foreground/50">
                      {loc.label}
                    </p>
                    <p className="mt-1">{loc.address}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aarav Signboard — All rights reserved.</p>
          <p className="font-display italic">Signage done right.</p>
        </div>
      </div>
    </footer>
  );
}
