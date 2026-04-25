import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { Project } from "@/data/projects";
import { formatInr } from "@/lib/utils";

type Props = {
  project: Project;
  trigger: ReactNode;
};

export function QuoteDialog({ project, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Quote request received", {
      description: `We'll be in touch about ${project.name} within one business day.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl border-border bg-card p-0">
        <div className="bg-ink p-8 text-ink-foreground">
          <p className="text-xs uppercase tracking-[0.3em] text-highlight">
            Request a quote
          </p>
          <DialogHeader className="mt-3 space-y-1 text-left">
            <DialogTitle className="font-display text-3xl text-ink-foreground">
              {project.name}
            </DialogTitle>
            <DialogDescription className="text-ink-foreground/70">
              Jobs in this range often start around{" "}
              <span className="text-highlight">
                {formatInr(project.startingPrice)}
              </span>
              . Tell us size, place of install, and timeline — we will reply with a clear estimate.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="q-name">Name</Label>
              <Input id="q-name" required placeholder="Jane Cooper" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company">Company</Label>
              <Input id="q-company" required placeholder="Acme Inc." />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="q-email">Work email</Label>
            <Input id="q-email" type="email" required placeholder="jane@acme.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="q-budget">Budget (approx.)</Label>
            <Input
              id="q-budget"
              type="text"
              defaultValue={`${formatInr(project.startingPrice)}+`}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="q-brief">Project brief</Label>
            <Textarea
              id="q-brief"
              rows={4}
              required
              placeholder="A few sentences about goals, timeline, and audience."
            />
          </div>
          <button
            type="submit"
            className="micro-lift w-full rounded-full bg-highlight py-3.5 text-sm font-medium text-highlight-foreground transition-base hover:shadow-glow"
          >
            Send quote request →
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
