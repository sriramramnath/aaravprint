import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
  alt: string;
};

export function ProjectCarousel({ images, alt }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="overflow-hidden rounded-3xl bg-ink">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  width={1280}
                  height={800}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 size-12 border-0 bg-cream/90 text-ink hover:bg-highlight hover:text-highlight-foreground" />
        <CarouselNext className="right-4 size-12 border-0 bg-cream/90 text-ink hover:bg-highlight hover:text-highlight-foreground" />
      </Carousel>

      <div className="flex items-center justify-between">
        <p className="font-display text-sm tabular-nums text-muted-foreground">
          <span className="text-ink">{String(current + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          {String(images.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-base ${
                current === i ? "w-10 bg-ink" : "w-4 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
