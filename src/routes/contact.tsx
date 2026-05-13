import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { productServiceLabels } from "@/data/projects";
import { companyInfo } from "@/lib/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aarav Signboard" },
      {
        name: "description",
        content: `${companyInfo.tagline} Contact ${companyInfo.name} in Chennai.`,
      },
      { property: "og:title", content: "Contact — Aarav Signboard" },
      {
        property: "og:description",
        content: "Request a quote or ask about materials and lead times.",
      },
    ],
  }),
  component: ContactPage,
});

const serviceOptions: readonly string[] = productServiceLabels;

const budgets = ["< ₹5,000", "₹5,000–₹25,000", "₹25,000–₹1,00,000", "₹1,00,000+"] as const;

const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(companyInfo.email)}`;

const inputTouchClass = "h-11 min-h-11 text-base sm:text-sm [touch-action:manipulation]";

const chipClass =
  "min-h-11 min-w-0 max-w-full touch-manipulation [touch-action:manipulation] rounded-full px-3 py-2.5 text-left text-[13px] leading-snug sm:py-2 sm:text-sm active:scale-[0.99] sm:max-w-none";

const budgetClass =
  "min-h-11 min-w-0 flex-1 touch-manipulation rounded-full border px-3 py-2.5 text-center text-sm active:scale-[0.99] sm:flex-none sm:px-4";

function ContactPage() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(() => new Set());
  const [budget, setBudget] = useState<string>(budgets[1]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedOrdered, unselectedOrdered } = useMemo(() => {
    const selected: string[] = [];
    const unselected: string[] = [];
    for (const s of serviceOptions) {
      if (selectedProducts.has(s)) selected.push(s);
      else unselected.push(s);
    }
    return { selectedOrdered: selected, unselectedOrdered: unselected };
  }, [selectedProducts]);

  const toggleProduct = (label: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedProducts.size === 0) {
      toast.error("Select at least one product", {
        description:
          "Use the list below to choose what you need — selected items appear at the top.",
      });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const services = Array.from(selectedProducts).join("\n");
    const budgetValue = String(fd.get("budget") ?? budget);

    setIsSubmitting(true);
    try {
      const res = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Website contact — ${companyInfo.name}`,
          _replyto: email,
          _template: "table",
          name,
          company,
          email,
          phone: phone || "—",
          services,
          budget: budgetValue,
          message,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Request failed");
      }

      await res.json().catch(() => ({}));

      toast.success("Message sent", {
        description: `We will reply to ${email} in working hours. ${selectedProducts.size} product line(s) included.`,
      });

      form.reset();
      setBudget(budgets[1]);
      setSelectedProducts(new Set());
    } catch (err) {
      console.error(err);
      toast.error("Could not send the form", {
        description: `Email us directly: ${companyInfo.email} — or try again in a moment.`,
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="container-editorial py-10 sm:py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
        <h1 className="mt-3 max-w-5xl font-display text-[clamp(2.25rem,10vw,7.5rem)] leading-[0.95] text-ink text-balance sm:mt-4">
          Tell us what you <em className="italic text-primary">need printed</em>.
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground sm:mt-4 sm:text-lg">
          {companyInfo.tagline}
        </p>
        <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
          Rough size, where it will go, and when you need it help us quote quickly. Photos and
          references are always welcome.
        </p>
      </section>

      <section className="container-editorial px-3 pb-12 sm:px-4 sm:pb-20 md:pb-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <aside className="order-1 space-y-8 md:order-2 md:col-span-5 md:space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Email</p>
              <a
                href={`mailto:${companyInfo.email}`}
                className="micro-link mt-2 block min-h-11 break-all font-display text-lg leading-tight text-ink underline-offset-4 sm:mt-3 sm:text-2xl md:text-3xl"
              >
                {companyInfo.email}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Company fabrication
              </p>
              <p className="mt-2 font-display text-base leading-relaxed text-ink sm:mt-3 sm:text-lg">
                {companyInfo.locations[0]?.address}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:mt-4">
                {companyInfo.locations[1]?.label}
              </p>
              <p className="mt-1 font-display text-base leading-relaxed text-ink sm:mt-2 sm:text-lg">
                {companyInfo.locations[1]?.address}
              </p>
            </div>

            <div className="micro-card rounded-2xl bg-ink p-6 text-ink-foreground sm:rounded-3xl sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-highlight">Rush jobs</p>
              <p className="mt-2 font-display text-xl sm:mt-3 sm:text-2xl">
                Tell us your <span className="italic text-highlight">deadline</span> in the first
                line.
              </p>
              <p className="mt-2 text-sm text-ink-foreground/70 sm:mt-3">
                We will say honestly if we can meet it or suggest a realistic date.
              </p>
            </div>
          </aside>

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="micro-card order-2 space-y-6 rounded-2xl bg-card p-5 shadow-soft sm:space-y-8 sm:rounded-3xl sm:p-8 md:order-1 md:col-span-7 md:p-12"
          >
            <input type="hidden" name="budget" value={budget} />
            <input type="hidden" name="services" value={Array.from(selectedProducts).join("\n")} />

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="space-y-1.5 sm:min-w-0">
                <Label htmlFor="c-name">Your name</Label>
                <Input
                  id="c-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputTouchClass}
                />
              </div>
              <div className="space-y-1.5 sm:min-w-0">
                <Label htmlFor="c-company">Company</Label>
                <Input
                  id="c-company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="Company"
                  className={inputTouchClass}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="space-y-1.5 sm:min-w-0">
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder={companyInfo.email}
                  className={inputTouchClass}
                />
              </div>
              <div className="space-y-1.5 sm:min-w-0">
                <Label htmlFor="c-phone">Phone (optional)</Label>
                <Input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+91 ..."
                  className={inputTouchClass}
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label>What do you need?</Label>
              <p className="text-xs text-muted-foreground [text-wrap:pretty]">
                Select all that apply. Chosen lines stay at the top; tap again to deselect.
              </p>
              <div className="max-h-[min(60dvh,22rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border/80 bg-muted/20 p-3 [-webkit-overflow-scrolling:touch] sm:max-h-[min(50vh,28rem)]">
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-foreground">
                      Selected ({selectedOrdered.length})
                    </p>
                    {selectedOrdered.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Nothing selected yet — add from the list below.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {selectedOrdered.map((s) => (
                          <button
                            type="button"
                            key={`sel-${s}`}
                            onClick={() => toggleProduct(s)}
                            className={`micro-lift ${chipClass} border border-border bg-primary text-primary-foreground hover:bg-primary-fixed sm:inline-flex sm:w-auto`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border/60 pt-4">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      Other product lines
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {unselectedOrdered.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggleProduct(s)}
                          className={`micro-lift ${chipClass} border border-border bg-background text-muted-foreground hover:border-muted-foreground/50 hover:text-white sm:inline-flex sm:w-auto`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label>Estimated budget</Label>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {budgets.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={
                      budget === b
                        ? `micro-lift ${budgetClass} border-highlight bg-highlight text-highlight-foreground`
                        : `micro-lift ${budgetClass} border-border bg-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-white`
                    }
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-message">Project brief</Label>
              <Textarea
                id="c-message"
                name="message"
                rows={5}
                required
                placeholder="Size, place, deadline, and anything else we should know."
                className="min-h-[7.5rem] text-base [touch-action:manipulation] sm:min-h-[9rem] sm:text-sm"
              />
            </div>

            <p className="text-center text-xs text-muted-foreground [text-wrap:pretty] sm:text-left">
              Submissions are sent to {companyInfo.email}
              {". "}
              <span className="text-muted-foreground/90">
                If this is the first time, you may get one activation link from the form service —
                after that, messages arrive in the inbox.
              </span>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="micro-lift h-12 w-full touch-manipulation rounded-full bg-primary font-display text-sm font-medium tracking-wide text-primary-foreground transition-base hover:bg-primary-fixed hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message →"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
