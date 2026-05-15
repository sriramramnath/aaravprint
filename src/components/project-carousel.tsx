import { type SyntheticEvent, useEffect, useState } from "react";
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
  /** `immersive`: full-bleed image with on-image caption (use with `title`). */
  variant?: "dark" | "light" | "immersive";
  /** Shown on the image (bottom scrim) when `variant` is `immersive`. */
  title?: string;
};

type ImageOrientation = "landscape" | "portrait";

export function ProjectCarousel({ images, alt, variant = "dark", title }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [orientations, setOrientations] = useState<Record<string, ImageOrientation>>({});
  const showArrows = images.length > 1;
  const immersive = variant === "immersive";
  const showImmersiveBar =
    immersive && images.length > 0 && (Boolean(title) || images.length > 1);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const handleImageLoad = (src: string) => (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const orientation: ImageOrientation = naturalWidth >= naturalHeight ? "landscape" : "portrait";
    setOrientations((previous) => {
      if (previous[src] === orientation) return previous;
      return { ...previous, [src]: orientation };
    });
  };

  return (
    <div className={cn(!immersive && "space-y-3 sm:space-y-4")}>
      <Carousel
        setApi={setApi}
        className={cn(
          "overflow-hidden rounded-xl border p-0",
          immersive
            ? "border-0 bg-transparent shadow-xl shadow-black/30"
            : variant === "light"
              ? "border-[#eaecef] bg-[#fafafa]"
              : "border-border bg-card",
        )}
      >
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={src} className="pl-0">
              <div
                className={cn(
                  "relative flex h-[clamp(16rem,58dvh,34rem)] w-full items-center justify-center overflow-hidden bg-black sm:h-[clamp(22rem,65vh,44rem)]",
                  immersive ? "rounded-none" : "rounded-lg",
                )}
              >
                <img
                  src={src}
                  alt={`${alt} — image ${i + 1}`}
                  width={1280}
                  height={800}
                  loading={i === 0 ? "eager" : "lazy"}
                  onLoad={handleImageLoad(src)}
                  className={cn(
                    "block max-w-full object-center",
                    immersive
                      ? orientations[src] === "portrait"
                        ? "h-full w-auto object-contain"
                        : "h-auto w-full max-h-full object-contain"
                      : "h-full w-full object-cover",
                  )}
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
                immersive
                  ? "border-white/30 bg-black/50 text-white hover:bg-black/65"
                  : variant === "light"
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
                immersive
                  ? "border-white/30 bg-black/50 text-white hover:bg-black/65"
                  : variant === "light"
                    ? "border-[#eaecef] bg-[#ffffff] text-[#181a20] hover:bg-[#fafafa]"
                    : "border-border bg-[#2b3139] text-[#eaecef] hover:bg-[#363e47]",
              )}
            >
              <ArrowRight className="size-4 sm:size-5" />
            </button>
          </>
        ) : null}

        {showImmersiveBar ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[26%] z-30 sm:top-[20%]">
            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-b-xl">
              {/* Gradient scrim only (no backdrop blur). */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0,0,0)_0%,rgb(0,0,0)_10%,rgba(0,0,0,0.88)_26%,rgba(0,0,0,0.5)_48%,rgba(0,0,0,0.2)_68%,transparent_100%)]"
                aria-hidden
              />
              <div className="relative z-10 px-5 pb-5 pt-10 sm:px-7 sm:pb-6 sm:pt-14">
                {title ? (
                  <p className="font-display text-lg font-semibold leading-snug text-balance text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-2xl">
                    {title}
                  </p>
                ) : null}
                {images.length > 1 ? (
                  <p
                    className={cn(
                      "font-numeric text-xs text-white/80 sm:text-sm",
                      title ? "mt-3" : null,
                    )}
                  >
                    <span className="font-medium text-white">
                      {String(current + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-2 font-normal">/</span>
                    <span>{String(images.length).padStart(2, "0")}</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </Carousel>

      {!immersive ? (
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
      ) : null}
    </div>
  );
}
