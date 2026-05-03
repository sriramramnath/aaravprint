import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { companyInfo } from "@/lib/company";

import appCss from "../styles.css?url";
import favicon from "@/assets/logo.png?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-background">
      <SiteHeader />
      <div className="flex min-w-0 flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <p className="font-display text-[10rem] leading-none text-ink">404</p>
          <h2 className="mt-2 font-display text-2xl text-ink">Page not found</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The page you want is not here — try home or our work.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="micro-lift inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground transition-base hover:shadow-elevated"
            >
              ← Back home
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${companyInfo.name} — ${companyInfo.tagline}` },
      {
        name: "description",
        content: `${companyInfo.tagline}. ${companyInfo.name} — Chennai. Email: ${companyInfo.email}`,
      },
      { name: "author", content: companyInfo.name },
      { property: "og:title", content: companyInfo.name },
      { property: "og:description", content: companyInfo.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: favicon, type: "image/png" },
      { rel: "apple-touch-icon", href: favicon },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-background">
      <SiteHeader />
      <main className="min-w-0 flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  );
}
