import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
  /** Use on light surfaces (e.g. modal) so chrome and labels read correctly. */
  variant?: "dark" | "light";
};

export function ProjectCarousel({ images, alt, variant = "dark" }: Props) {
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
        className={cn(
          "overflow-hidden rounded-xl border p-0",
          variant === "light" ? "border-[#eaecef] bg-[#fafafa]" : "border-border bg-card",
        )}
      >
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div className="relative h-[clamp(16rem,58dvh,34rem)] w-full overflow-hidden rounded-lg sm:h-[clamp(22rem,65vh,44rem)]">
                <img
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  width={1280}
                  height={800}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="block h-full w-full max-w-full object-cover object-center"
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
              className={cn(
                "absolute left-3 top-1/2 z-40 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md border transition-colors disabled:opacity-45 sm:left-4 sm:size-11",
                variant === "light"
                  ? "border-[#eaecef] bg-[#ffffff] text-[#181a20] hover:bg-[#fafafa]"
                  : "border-border bg-[#2b3139] text-[#eaecef] hover:bg-[#363e47]",
              )}
            >
              <ArrowLeft className="size-4 sm:size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              disabled={current >= images.length - 1}
              className={cn(
                "absolute right-3 top-1/2 z-40 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md border transition-colors disabled:opacity-45 sm:right-4 sm:size-11",
                variant === "light"
                  ? "border-[#eaecef] bg-[#ffffff] text-[#181a20] hover:bg-[#fafafa]"
                  : "border-border bg-[#2b3139] text-[#eaecef] hover:bg-[#363e47]",
              )}
            >
              <ArrowRight className="size-4 sm:size-5" />
            </button>
          </>
        ) : null}
      </Carousel>

      <div className="flex items-center justify-start gap-3 px-1">
        <p
          className={cn(
            "font-numeric text-xs sm:text-sm",
            variant === "light" ? "text-[#707a8a]" : "text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "font-medium",
              variant === "light" ? "text-[#181a20]" : "text-foreground",
            )}
          >
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 font-normal">/</span>
          <span>{String(images.length).padStart(2, "0")}</span>
        </p>
      </div>
    </div>
  );
}
