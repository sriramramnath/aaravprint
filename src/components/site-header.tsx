import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { companyInfo } from "@/lib/company";
import logoSrc from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Logo asset is a square canvas with the mark centered — wide `contain` boxing
 * left a large dead band before the wordmark; crop tightly with `cover`.
 */
/** Half of prior h-9 / w-11 / sm:w-12 / md:h-10 / md:w-14 so the mark reads smaller in the bar. */
const BRAND_LOGO_FRAME =
  "flex h-[1.125rem] w-[1.375rem] shrink-0 overflow-hidden sm:w-6 md:h-5 md:w-7";
const BRAND_LOGO_IMG =
  "h-full w-full max-w-none object-cover object-center select-none [content-visibility:auto]";

const linkEasing = "cubic-bezier(0.22, 1, 0.36, 1)";
const linkStaggerS = 0.052;
const linkStartDelayS = 0.1;

/** Thin space keeps words visually tight (narrower than a normal word space). */
const brandLine = companyInfo.name.split(/\s+/).filter(Boolean).join("\u2009");

/** Three lines, right-aligned (longest → shortest). */
function HamburgerIcon() {
  return (
    <span
      className="flex w-6 flex-col items-end justify-center gap-[5px] [touch-action:manipulation]"
      aria-hidden
    >
      <span className="h-0.5 w-6 max-w-full rounded-sm bg-foreground" />
      <span className="h-0.5 w-4 max-w-full rounded-sm bg-foreground" />
      <span className="h-0.5 w-2.5 max-w-full rounded-sm bg-foreground" />
    </span>
  );
}

export function SiteHeader() {
  const { location } = useRouterState();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-base",
        scrolled
          ? "border-b border-border/60 bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-editorial relative flex h-[4.5rem] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 md:gap-6 md:px-8">
        <Link
          to="/"
          className={cn(
            "group relative flex min-w-0 items-center gap-0.5 md:gap-1",
            "max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:max-w-[calc(100%-3.5rem)] max-md:-translate-x-1/2 max-md:-translate-y-1/2",
          )}
          onClick={() => setMobileOpen(false)}
        >
          <span
            aria-hidden
            className={cn(BRAND_LOGO_FRAME, "transition-opacity group-hover:opacity-90")}
          >
            <img
              src={logoSrc}
              alt=""
              width={512}
              height={512}
              className={BRAND_LOGO_IMG}
              decoding="async"
            />
          </span>
          <span className="font-display whitespace-nowrap text-center text-base tracking-tight text-foreground max-md:inline-block max-md:min-w-0 sm:text-lg md:text-left md:text-xl">
            {brandLine}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "micro-lift relative rounded-full px-4 py-2 text-sm font-medium transition-base",
                  active ? "text-[#1A1A1A]" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-highlight" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2">
          <Link
            to="/contact"
            className="cta-energy hidden items-center gap-2 px-5 py-2.5 font-display text-sm tracking-wide transition-base md:inline-flex"
          >
            Get a quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile: full-screen menu */}
          <div className="md:hidden">
            <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
              <DialogPrimitive.Trigger asChild>
                <button
                  type="button"
                  className="micro-lift flex h-12 min-w-12 items-center justify-end rounded-lg px-1 transition-transform duration-200 [touch-action:manipulation] active:scale-95 active:opacity-80"
                  aria-label="Open menu"
                >
                  <HamburgerIcon />
                </button>
              </DialogPrimitive.Trigger>
              <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                  className={cn(
                    "fixed inset-0 z-[100] bg-cream",
                    "data-[state=open]:anim-mobile-menu-overlay-open data-[state=closed]:anim-mobile-menu-overlay-closed",
                    "motion-reduce:animate-none motion-reduce:opacity-100",
                  )}
                />
                <DialogPrimitive.Content
                  aria-describedby={undefined}
                  className={cn(
                    "fixed inset-0 z-[100] flex max-h-[100dvh] flex-col overflow-hidden bg-cream outline-none [will-change:transform,opacity]",
                    "data-[state=open]:anim-mobile-menu-content-open data-[state=closed]:anim-mobile-menu-content-closed",
                    "motion-reduce:animate-none motion-reduce:opacity-100",
                  )}
                >
                  <DialogPrimitive.Title className="sr-only">Main menu</DialogPrimitive.Title>

                  {/* Bar: logo + close (logo matches collapsed header) */}
                  <div
                    className={cn(
                      "flex shrink-0 items-center justify-between border-b border-border px-4 py-4 sm:px-6",
                      "anim-mobile-menu-topbar motion-reduce:animate-none",
                    )}
                  >
                    <Link
                      to="/"
                      className="shrink-0"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span aria-hidden className={BRAND_LOGO_FRAME}>
                        <img src={logoSrc} alt="" width={512} height={512} className={BRAND_LOGO_IMG} decoding="async" />
                      </span>
                    </Link>
                    <DialogPrimitive.Close
                      className="micro-lift flex h-12 w-12 items-center justify-center rounded-full [touch-action:manipulation] active:bg-foreground/5"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5 text-foreground" strokeWidth={2.25} />
                    </DialogPrimitive.Close>
                  </div>

                  {/* Scrollable links with dividers */}
                  <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
                    {links.map((link, i) => {
                      const active =
                        link.to === "/"
                          ? location.pathname === "/"
                          : location.pathname.startsWith(link.to);
                      const delayMs = (linkStartDelayS + i * linkStaggerS) * 1000;
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          style={
                            {
                              animation: `mobile-menu-link-in 0.45s ${linkEasing} ${delayMs}ms both`,
                            } as CSSProperties
                          }
                          className={cn(
                            "micro-lift block min-h-14 w-full border-b border-border px-5 py-4 font-display text-lg font-medium leading-snug tracking-wide text-foreground [will-change:transform,opacity] [touch-action:manipulation] active:bg-foreground/[0.04] sm:min-h-16 sm:px-6 sm:py-5 sm:text-xl",
                            "motion-reduce:animate-none motion-reduce:opacity-100",
                            active && "bg-highlight/15",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Bottom CTAs (thumb-friendly) */}
                  <div
                    className={cn(
                      "shrink-0 space-y-3 border-t border-border bg-cream p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 [will-change:transform,opacity] sm:px-6",
                      "anim-mobile-menu-footer motion-reduce:animate-none",
                    )}
                  >
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="cta-energy flex min-h-12 w-full items-center justify-center gap-2 px-5 py-3 font-display text-base tracking-wide [touch-action:manipulation]"
                    >
                      Get a quote
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="micro-lift flex min-h-12 w-full items-center justify-center rounded-2xl border border-secondary/40 bg-cream px-4 text-center font-display text-sm font-medium leading-tight text-foreground [touch-action:manipulation] active:bg-muted/50 sm:text-base"
                    >
                      Email us
                    </a>
                  </div>
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
          </div>
        </div>
      </div>
    </header>
  );
}
