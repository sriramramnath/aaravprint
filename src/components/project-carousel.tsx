import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
  alt: string;
};

export function ProjectCarousel({ images, alt }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const showArrows = images.length > 1;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <Carousel
        setApi={setApi}
        className="overflow-hidden rounded-2xl border border-border bg-ink/95 p-1.5 sm:rounded-3xl sm:p-0"
      >
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div className="relative flex h-[clamp(16rem,58dvh,34rem)] w-full items-center justify-center overflow-hidden rounded-xl bg-ink sm:h-[clamp(22rem,65vh,44rem)] sm:rounded-2xl">
                <img
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  width={1280}
                  height={800}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="block h-full w-full max-w-full object-contain object-center p-1 sm:p-3"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              disabled={current === 0}
              className="absolute left-3 top-1/2 z-40 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white text-ink shadow-lg ring-1 ring-black/10 transition-colors hover:border-highlight hover:bg-highlight hover:text-highlight-foreground disabled:opacity-45 sm:left-4 sm:size-12"
            >
              <ArrowLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              disabled={current >= images.length - 1}
              className="absolute right-3 top-1/2 z-40 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white text-ink shadow-lg ring-1 ring-black/10 transition-colors hover:border-highlight hover:bg-highlight hover:text-highlight-foreground disabled:opacity-45 sm:right-4 sm:size-12"
            >
              <ArrowRight className="size-4 sm:size-5" />
            </button>
          </>
        ) : null}
      </Carousel>

      <div className="flex items-center justify-start gap-3 px-1">
        <p className="font-display text-xs tabular-nums text-muted-foreground sm:text-sm">
          <span className="text-ink">{String(current + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {String(images.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
