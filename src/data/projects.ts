// Product photography — auto-load all files from each category folder.
const productImageModules = import.meta.glob("../assets/products/**/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const productImagesByFolder = Object.entries(productImageModules).reduce(
  (acc, [path, src]) => {
    const match = path.match(/\/assets\/products\/([^/]+)\//);
    const folder = match?.[1];
    if (!folder) return acc;
    acc[folder] ??= [];
    acc[folder].push(src);
    return acc;
  },
  {} as Record<string, string[]>,
);

const getProductImages = (folder: string) =>
  (productImagesByFolder[folder] ?? []).slice().sort((a, b) => a.localeCompare(b));

export type Project = {
  slug: string;
  name: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  scope: string[];
  metrics: { label: string; value: string }[];
  startingPrice: number;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "led-board",
    name: "LED board",
    client: "Aarav Signboard",
    category: "Illuminated signage",
    year: "2024",
    tagline: "Bright, efficient LED name boards and shop fascias.",
    description:
      "We fabricate and install LED signboards for retail, restaurants, and offices. Colour-accurate printing, even glow, and weather-ready builds that stay sharp after dark and in monsoon season.",
    scope: ["Design support", "LED module layout", "Fabrication", "On-site install"],
    metrics: [
      { label: "Custom sizes", value: "Yes" },
      { label: "Energy-efficient LED", value: "Yes" },
      { label: "Warranty", value: "Ask us" },
    ],
    startingPrice: 8000,
    images: getProductImages("Led Board"),
  },
  {
    slug: "backlit-board",
    name: "Backlit board (first quality)",
    client: "Aarav Signboard",
    category: "Illuminated signage",
    year: "2024",
    tagline: "Even backlighting and crisp graphics for premium facades.",
    description:
      "Backlit flex and board solutions that make logos pop at night. We match brand colours, align mounting, and use first-quality materials for a smooth, flatter look.",
    scope: ["Backlit flex", "Frame & trim", "Power layout", "Installation"],
    metrics: [
      { label: "Indoor & outdoor", value: "Both" },
      { label: "Colour proofing", value: "Yes" },
      { label: "Typical lead time", value: "3–7 d" },
    ],
    startingPrice: 12000,
    images: getProductImages("Backlit Board first quality Board"),
  },
  {
    slug: "acp-board",
    name: "ACP board",
    client: "Aarav Signboard",
    category: "Facade & branding",
    year: "2024",
    tagline: "Durable ACP panels with clean joints and long-lasting print.",
    description:
      "Aluminium composite panel signage for showrooms, clinics, and buildings. Rigid, modern finish with UV printing or vinyl — sized to your architect’s or brand guidelines.",
    scope: ["ACP supply", "CNC / routing", "Vinyl or UV print", "Fixing & sealing"],
    metrics: [
      { label: "Panel thicknesses", value: "3–4 mm" },
      { label: "Large formats", value: "Yes" },
      { label: "Site survey", value: "On request" },
    ],
    startingPrice: 15000,
    images: getProductImages("Acp Board"),
  },
  {
    slug: "canopy-board",
    name: "Canopy board",
    client: "Aarav Signboard",
    category: "Outdoor signage",
    year: "2024",
    tagline: "Visible branding above entrances and driveways.",
    description:
      "Canopy signage that survives sun and rain: structured mounting, legible type, and finishes matched to your storefront. Ideal for retail, fuel stations, and hospitality.",
    scope: ["Canopy design", "Metal / flex", "Illumination opt.", "Install"],
    metrics: [
      { label: "Weather-rated", value: "Yes" },
      { label: "Night visibility", value: "Optional" },
      { label: "Service area", value: "Local" },
    ],
    startingPrice: 18000,
    images: getProductImages("Canopy Board"),
  },
  {
    slug: "brass-ss-name-plate",
    name: "Brass & SS name plate",
    client: "Aarav Signboard",
    category: "Premium plates",
    year: "2024",
    tagline: "Engraved and etched name plates in brass and stainless steel.",
    description:
      "Elegant name boards for homes, offices, and institutions. We work with etching, cut-through letters, and protective clear coats for a lasting metallic finish.",
    scope: ["Brass / SS", "Etch & paint fill", "Mounting hardware", "Polishing"],
    metrics: [
      { label: "Metals", value: "Brass · SS" },
      { label: "Custom shapes", value: "Yes" },
      { label: "Min. size", value: "A5+" },
    ],
    startingPrice: 3500,
    images: getProductImages("Brass &ss Plate name board"),
  },
  {
    slug: "brass-name-plate",
    name: "Brass name plate",
    client: "Aarav Signboard",
    category: "Premium plates",
    year: "2024",
    tagline: "Classic brass plates with crisp lettering and depth.",
    description:
      "Traditional brass name plates for doors, desk plaques, and memorials. Options include deep etch, two-tone fill, and subtle brushed or mirror polish.",
    scope: ["Design layout", "Etching", "Colour fill", "Mounting"],
    metrics: [
      { label: "Indoor & outdoor", value: "Both" },
      { label: "Rush jobs", value: "Sometimes" },
      { label: "Artwork proof", value: "Shared" },
    ],
    startingPrice: 2500,
    images: getProductImages("Brass name Plate"),
  },
  {
    slug: "lolipop-board",
    name: "Lollipop (flange) board",
    client: "Aarav Signboard",
    category: "Shopfront",
    year: "2024",
    tagline: "Perpendicular boards that catch foot traffic on the high street.",
    description:
      "Flange or ‘lollipop’ boards that project from the wall — perfect when passers-by walk parallel to the shop. Sturdy frame, high-impact print, and compliant mounting.",
    scope: ["Metal / acrylic frame", "Double-sided print", "Bracketing", "Install"],
    metrics: [
      { label: "Double-sided", value: "Yes" },
      { label: "Projecting depth", value: "Custom" },
      { label: "Regulations", value: "We advise" },
    ],
    startingPrice: 6000,
    images: getProductImages("Lolipop Board"),
  },
  {
    slug: "wood-stand-board",
    name: "Wood stand board",
    client: "Aarav Signboard",
    category: "Retail & events",
    year: "2024",
    tagline: "Portable wooden A-frames and easel-style boards.",
    description:
      "Solid-looking wood standees for daily specials, wayfinding, and pop-ups. We print on board or apply vinyl to timber-style bases — stable and easy to move.",
    scope: ["Wood / composite stand", "Print or chalk area", "Brand artwork", "Finish"],
    metrics: [
      { label: "Reusable", value: "Yes" },
      { label: "Indoor / semi-out", value: "Yes" },
      { label: "Quick turn", value: "Often" },
    ],
    startingPrice: 4000,
    images: getProductImages("Wood stand Board"),
  },
  {
    slug: "photo-frame",
    name: "Photo frame boards",
    client: "Aarav Signboard",
    category: "Display",
    year: "2024",
    tagline: "Framed lightboxes and poster-style displays for interiors.",
    description:
      "Slim and snap frames for menus, price lists, and gallery-style displays. Swappable graphics, clean borders, and wall-safe mounting for offices and stores.",
    scope: ["Frame profiles", "Backlit or non-lit", "Print media", "Mounting"],
    metrics: [
      { label: "Swappable art", value: "Yes" },
      { label: "LED option", value: "Yes" },
      { label: "Sizes", value: "A4–A0" },
    ],
    startingPrice: 4500,
    images: getProductImages("Photo frame"),
  },
  {
    slug: "rollup-stand",
    name: "Rollup stand",
    client: "Aarav Signboard",
    category: "Events & trade shows",
    year: "2024",
    tagline: "Lightweight roll-up banners in premium cassette stands.",
    description:
      "Event-ready standees with wrinkle-resistant prints, padded bags, and smooth retractors. We align artwork to safe zones so logos never get trimmed at the edges.",
    scope: ["Stand hardware", "Anti-curl print", "Carry case", "Artwork check"],
    metrics: [
      { label: "85 × 200 cm", value: "Std" },
      { label: "Same-day", value: "Rush" },
      { label: "Bulk discount", value: "Yes" },
    ],
    startingPrice: 3500,
    images: getProductImages("Rollup stand"),
  },
  {
    slug: "prom-table",
    name: "Promo table (prom table)",
    client: "Aarav Signboard",
    category: "Events",
    year: "2024",
    tagline: "Branded counter tables for sampling and exhibitions.",
    description:
      "Collapsible promo tables with full-wrap branding for launches and retail activations. Sturdy top, easy setup, and graphics that line up on every edge.",
    scope: ["Table frame", "Stretch / panel print", "Storage bag", "Setup guide"],
    metrics: [
      { label: "Portable", value: "Yes" },
      { label: "Branded skirt", value: "Opt." },
      { label: "Repeat use", value: "Yes" },
    ],
    startingPrice: 8000,
    images: getProductImages("Promtable"),
  },
  {
    slug: "back-drops",
    name: "Backdrop board",
    client: "Aarav Signboard",
    category: "Events & stage",
    year: "2024",
    tagline: "Seam-considerate backdrops for stage, photo, and press walls.",
    description:
      "Large-format flex backdrops for events and studios. We plan panel joins, grommets, and stand-off mounting so your logo reads well on camera and in person.",
    scope: ["Wide flex print", "Pipe & drape opt.", "Pipe pockets", "Install"],
    metrics: [
      { label: "Custom width", value: "Yes" },
      { label: "Matte finish", value: "Opt." },
      { label: "Re-roll storage", value: "Tip" },
    ],
    startingPrice: 5000,
    images: getProductImages("Back Drops Board"),
  },
  {
    slug: "shield-pasting",
    name: "Shield & pasting sticker",
    client: "Aarav Signboard",
    category: "Vinyl & wraps",
    year: "2024",
    tagline: "High-tack vehicle and surface vinyl with clean pasting.",
    description:
      "Branding and safety markings on glass, body panels, and equipment. We use outdoor-grade films, precise cutting, and bubble-free application on curves and flat areas.",
    scope: ["Vinyl cut & print", "Lamination", "Wet or dry install", "Removal tips"],
    metrics: [
      { label: "UV laminate", value: "Yes" },
      { label: "Complex curves", value: "Yes" },
      { label: "Fleet jobs", value: "Yes" },
    ],
    startingPrice: 3000,
    images: getProductImages("Shield Pasting sticker"),
  },
  {
    slug: "bus-sticker",
    name: "Bus sticker pasting",
    client: "Aarav Signboard",
    category: "Fleet & transit",
    year: "2024",
    tagline: "Large-format bus wraps and window branding.",
    description:
      "Perforated and opaque films sized for public transport. We work from vehicle templates, align registration marks, and plan seams around doors and frames.",
    scope: ["Template check", "Perforated opt.", "Panel install", "Edge seal"],
    metrics: [
      { label: "Regulatory", value: "Check local" },
      { label: "One-way vision", value: "Yes" },
      { label: "Fleet discount", value: "Yes" },
    ],
    startingPrice: 15000,
    images: getProductImages("Bus sticker pasting"),
  },
  {
    slug: "inner-cutting",
    name: "Inner cutting (letter & shape cutting)",
    client: "Aarav Signboard",
    category: "Fabrication",
    year: "2024",
    tagline: "CNC and plotter cutting for letters, stencils, and layers.",
    description:
      "Accurate inner cuts for acrylic, board, and vinyl stacks — great for layered logos, window frosting patterns, and packaging prototypes.",
    scope: ["Vector file check", "Router / plotter", "Weed & mask", "Kit packing"],
    metrics: [
      { label: "Tight radii", value: "Yes" },
      { label: "Stack cutting", value: "Yes" },
      { label: "Sample cuts", value: "On request" },
    ],
    startingPrice: 2000,
    images: getProductImages("Inner cutting"),
  },
  {
    slug: "hoarding-works",
    name: "Hoarding works",
    client: "Aarav Signboard",
    category: "Construction & sites",
    year: "2024",
    tagline: "Site hoardings and mesh banners for long outdoor runs.",
    description:
      "High-visibility site branding on flex and mesh. Wind-load friendly options, repeat panels for long fences, and clear sponsor hierarchy on construction sites.",
    scope: ["Mesh / flex", "Eyelet spacing", "Rope & tie-down", "Install team"],
    metrics: [
      { label: "Long runs", value: "Yes" },
      { label: "Mesh wind relief", value: "Yes" },
      { label: "Site measure", value: "Yes" },
    ],
    startingPrice: 10000,
    images: getProductImages("hoarding works"),
  },
  {
    slug: "garden-umbrella",
    name: "Garden umbrella branding",
    client: "Aarav Signboard",
    category: "Outdoor promo",
    year: "2024",
    tagline: "Printed umbrellas for cafés, poolsides, and outdoor events.",
    description:
      "Dye-sublimation or panel prints on garden umbrellas. Strong colour on panels, aligned repeats, and finish that handles sun and light rain.",
    scope: ["Panel layout", "Fabric print", "Frame assembly", "Carry cover"],
    metrics: [
      { label: "Panel match", value: "Checked" },
      { label: "Col sizes", value: "Std" },
      { label: "MOQ", value: "1+" },
    ],
    startingPrice: 5000,
    images: getProductImages("Garden umbrella"),
  },
  {
    slug: "ms-frame-arch",
    name: "MS frame arch",
    client: "Aarav Signboard",
    category: "Structures",
    year: "2024",
    tagline: "MS welded arches for entry gates and event entrances.",
    description:
      "Mild-steel arch frames for branding spans — powder coat, wrapped flex, or cut lettering. We coordinate welding, primer, and safe on-site erection with your civil team.",
    scope: ["Shop drawings", "Fabrication", "Primer & paint", "Erection support"],
    metrics: [
      { label: "Custom span", value: "Yes" },
      { label: "Powder coat", value: "Opt." },
      { label: "Stability", value: "Engineered" },
    ],
    startingPrice: 25000,
    images: getProductImages("Ms frame arch Board"),
  },
  {
    slug: "water-booth",
    name: "Water booth (branded kiosks)",
    client: "Aarav Signboard",
    category: "Kiosks",
    year: "2024",
    tagline: "Branded water booths and compact stall fascias.",
    description:
      "Full-wrap and fascia prints for small-format booths. Easy-to-clean surfaces, high-contrast branding for queues, and modular panels when you need to refit later.",
    scope: ["Booth wrap", "Counter graphic", "Panel alignment", "Trim"],
    metrics: [
      { label: "Hygienic finish", value: "Opt." },
      { label: "Modular", value: "Yes" },
      { label: "Rebrand", value: "Yes" },
    ],
    startingPrice: 12000,
    images: getProductImages("Water booth"),
  },
  {
    slug: "assorted",
    name: "More from our shop floor",
    client: "Aarav Signboard",
    category: "General print & signage",
    year: "2024",
    tagline: "A mix of daily jobs — if you can describe it, we can quote it.",
    description:
      "This gallery is a catch-all for the variety of work we do every week: one-off boards, last-minute event pieces, and custom combinations not listed as a single category. Send photos and sizes — we’ll recommend materials.",
    scope: ["Consultation", "Material mix", "Priority scheduling", "Pickup / install"],
    metrics: [
      { label: "Custom briefs", value: "Welcome" },
      { label: "WhatsApp quotes", value: "Yes" },
      { label: "Turnaround", value: "Varies" },
    ],
    startingPrice: 1000,
    images: getProductImages("others"),
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const heroImage = getProductImages("Led Board")[0] ?? "";

/** Home page hero visual (hoarding works). */
export const homeHeroImage = getProductImages("hoarding works")[0] ?? heroImage;

/** All product line names — contact form, about capabilities. */
export const productServiceLabels = projects.map((p) => p.name);
