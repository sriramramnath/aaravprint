import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { companyInfo } from "@/lib/company";

import appCss from "../styles.css?url";
import favicon from "@/assets/logo.png?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center px-4 py-24">
      <div className="max-w-md text-center">
        <p className="font-display text-[10rem] leading-none font-bold text-primary opacity-90">
          404
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Page not found</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This page does not exist. Go to home or our work.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="cta-energy inline-flex items-center gap-2 px-6 py-3 font-display text-sm tracking-wide transition-base"
          >
            ← Back home
          </Link>
        </div>
      </div>
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
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="bottom-right" />
    </div>
  );
}
