/**
 * Project catalogue.
 *
 * Visuals: every project renders a code-preview panel by default. Projects
 * with a real `screenshot` file in `public/images/projects/` show that
 * screenshot instead (with an automatic fallback to the code preview if the
 * file is missing), so the cards never show misleading stock imagery.
 *
 * Links are always honest:
 *  - liveUrl  → a real, working live demo or client site
 *  - codeUrl  → a real public repository
 *  - neither  → the card opens a case-study modal with a "discuss" action
 */
export const projects = [
  {
    id: 1,
    title: "KickZone Sports Management System",
    type: "Personal project",
    category: "Laravel / Full-Stack",
    filters: ["Full-Stack"],
    description:
      "A Laravel sports platform covering games, schedules, news, and scores — with authentication and a dedicated admin area.",
    details:
      "KickZone is a full Laravel application with authentication, a separate admin section, and dedicated controllers for games, schedules, news, and scores — the core content types of a sports portal.",
    highlights: [
      "Auth-protected admin section",
      "Controllers for games, schedules, news, and scores",
      "MySQL-backed content management",
    ],
    tech: ["Laravel", "MySQL", "Admin panel"],
    liveUrl: null,
    codeUrl: "https://github.com/kamran1272/kickzone",
    screenshot: null,
    codeFile: "routes/web.php",
    codeLines: [
      "// admin area",
      "Route::middleware(['auth'])->prefix('admin')->group(function () {",
      "    Route::resource('games', GameController::class);",
      "    Route::resource('schedules', ScheduleController::class);",
      "    Route::resource('news', NewsController::class);",
      "});",
    ],
  },
  {
    id: 2,
    title: "Ecommerce Frontend Experience",
    type: "Personal project",
    category: "React / Frontend",
    filters: ["Frontend"],
    description:
      "A modern ecommerce interface built to make browsing, discovery, and shopping interactions feel fast and intuitive.",
    details:
      "A React storefront with product browsing, category filtering, cart state managed with React context, and a checkout flow. Built mobile-first with reusable components so new product types and pages can be added without rework.",
    highlights: [
      "Product listing, filtering, and detail views",
      "Cart state managed with React context",
      "Mobile-first responsive layouts",
    ],
    tech: ["React", "Responsive UI", "Product flows"],
    liveUrl: "https://kamran1272.github.io/my-ecommerce-app/",
    codeUrl: "https://github.com/kamran1272/my-ecommerce-app",
    screenshot: "ecommerce.png",
    codeFile: "components/ProductCard.jsx",
    codeLines: [
      "export default function ProductCard({ product }) {",
      "  const { addItem } = useCart();",
      "  return (",
      "    <article className=\"card\">",
      "      <img src={product.image} alt={product.name} />",
      "      <button onClick={() => addItem(product)}>",
      "        Add to cart",
      "      </button>",
      "    </article>",
      "  );",
      "}",
    ],
  },
  {
    id: 3,
    title: "Baloch Restaurant",
    type: "Personal project",
    category: "Restaurant / Business Website",
    filters: ["Business"],
    description:
      "A restaurant platform built around menu browsing, delivery orders, table reservations, and a polished customer-facing experience.",
    details:
      "A complete restaurant website with a menu system, online ordering and table reservation forms, and clear calls to action designed to convert visitors into orders — with a fast mobile experience.",
    highlights: [
      "Menu browsing with categories",
      "Ordering and table reservation forms",
      "Conversion-focused, mobile-first design",
    ],
    tech: ["Online ordering", "Table reservations", "Responsive UI"],
    liveUrl: "https://kamran1272.github.io/restaurant-website/",
    codeUrl: "https://github.com/kamran1272/restaurant-website",
    screenshot: "restaurant.png",
    codeFile: "lib/reservations.js",
    codeLines: [
      "async function bookTable(data) {",
      "  const res = await fetch('/api/reservations', {",
      "    method: 'POST',",
      "    body: JSON.stringify(data),",
      "  });",
      "  return res.ok ? 'confirmed' : 'unavailable';",
      "}",
    ],
  },
  {
    id: 4,
    title: "Spotless Gutter Care",
    type: "Client project",
    category: "WordPress / Local SEO",
    filters: ["Business", "SEO"],
    description:
      "A Canadian client project delivered through Upwork, focused on a clean WordPress build, local SEO targeting Kelowna, BC, and strong quote-driven service pages.",
    details:
      "Delivered for a Canadian client via Upwork. A clean WordPress build with service pages written around local search intent for Kelowna, BC — clear service content and quote forms placed to turn visitors into leads.",
    highlights: [
      "Local SEO targeting Kelowna, BC service searches",
      "Service pages structured for local search",
      "Quote forms placed to turn visitors into leads",
    ],
    tech: ["WordPress", "Local SEO", "Lead generation"],
    liveUrl: "https://spotlessguttercare.com/",
    codeUrl: null,
    screenshot: "spotless.png",
    codeFile: "local-seo.html",
    codeLines: [
      "<!-- local SEO -->",
      "<title>Gutter Cleaning in Kelowna, BC | Spotless Gutter Care</title>",
      "<meta name=\"description\" content=\"Professional gutter",
      "  cleaning & maintenance in Kelowna, BC.\" />",
      "<script type=\"application/ld+json\">",
      '{ "@type": "LocalBusiness", "areaServed": "Kelowna, BC" }',
      "</script>",
    ],
  },
  {
    id: 5,
    title: "Hospital Management System",
    type: "Full-Stack Web App",
    category: "Laravel / Full-Stack",
    filters: ["Full-Stack"],
    description:
      "A complete hospital operations platform: patient EHR, billing, pharmacy inventory, prescriptions, laboratory workflow, and ward-wise bed management.",
    details:
      "A full Laravel 10 application covering real hospital workflows end to end. Patient electronic health records with MRN, allergies, and emergency contacts; itemized billing with tax, discounts, and printable invoices; pharmacy stock tracking with low-stock and expiry alerts; prescriptions linked to doctors and medicines; a laboratory pipeline from order to result with normal/abnormal/critical flags; and a visual ward-wise bed matrix with patient assignments. Seeded with realistic clinical data and an operations dashboard tracking occupancy, pending lab work, and revenue.",
    highlights: [
      "Patient EHR: records, appointments, prescriptions, lab results, invoices",
      "Billing engine: itemized invoices, tax/discount, printable receipts",
      "Pharmacy inventory with expiry and low-stock alerts",
      "Lab workflow: ordered → in-progress → completed with critical flags",
      "Ward-wise bed management matrix with live occupancy",
    ],
    tech: ["Laravel", "MySQL", "Eloquent", "Blade", "Bootstrap"],
    liveUrl: "https://kamran1272.github.io/portfolio/hms-demo/",
    codeUrl: "https://github.com/kamran1272/hospital-management-dashboard",
    screenshot: "hospital-dashboard.png",
    codeFile: "app/Http/Controllers/HospitalController.php",
    codeLines: [
      "public function patientShow(Patient $patient)",
      "{",
      "    $patient->load([",
      "        'appointments.doctor',",
      "        'prescriptions.items',",
      "        'labTests', 'invoices', 'bed',",
      "    ]);",
      "",
      "    return view('patients.show', compact('patient'));",
      "}",
    ],
  },
  {
    id: 6,
    title: "Pharmacy Management System",
    type: "Practice project",
    category: "Laravel / Business System",
    filters: ["Full-Stack", "Business"],
    description:
      "A business operations tool for inventory, sales, authentication, and daily store management in one secure workflow.",
    details:
      "A Laravel practice system for running a pharmacy: medicine inventory, stock dispensing, sales records, and authenticated staff access — all validated server-side with a MySQL backend.",
    highlights: [
      "Inventory tracking with stock decrement on sale",
      "Server-side validation for every mutation",
      "Authenticated staff workflows",
    ],
    tech: ["Laravel", "CRUD", "Database queries"],
    liveUrl: null,
    codeUrl: null,
    screenshot: null,
    codeFile: "app/Http/Controllers/InventoryController.php",
    codeLines: [
      "public function dispense(Request $request, Medicine $medicine)",
      "{",
      "    $request->validate(['quantity' => 'required|integer|min:1']);",
      "    $medicine->decrement('stock', $request->quantity);",
      "    return back()->with('status', 'Stock updated');",
      "}",
    ],
  },
  {
    id: 7,
    title: "SEO-Focused Portfolio Refresh",
    type: "Practice project",
    category: "Website Optimization",
    filters: ["SEO"],
    description:
      "An example of improving a portfolio through better metadata, semantic structure, user clarity, and stronger calls to action.",
    details:
      "A before/after style exercise in technical SEO: semantic HTML, descriptive metadata, Open Graph tags, structured data, and clearer calls to action — the same foundations applied to client sites.",
    highlights: [
      "Semantic HTML with proper heading hierarchy",
      "Meta, Open Graph, and JSON-LD structured data",
      "Accessibility and call-to-action improvements",
    ],
    tech: ["SEO", "Content strategy", "Accessibility"],
    liveUrl: null,
    codeUrl: null,
    screenshot: null,
    codeFile: "seo-checklist.html",
    codeLines: [
      "<!-- before → after -->",
      "- <div class=\"title\">Welcome</div>",
      "+ <h1>Full-Stack Web Developer in Lahore</h1>",
      "+ <meta name=\"description\" content=\"...\" />",
      "+ <html lang=\"en\">",
      "+ <script type=\"application/ld+json\">...</script>",
    ],
  },
  {
    id: 8,
    title: "Responsive UI Components Library",
    type: "Practice project",
    category: "Frontend Systems",
    filters: ["Frontend"],
    description:
      "A reusable collection of interface patterns designed to keep dashboards and business pages consistent and easier to scale.",
    details:
      "A small design system of reusable React + Tailwind components — buttons, cards, modals, form fields — with variant props so dashboards and business pages stay visually consistent as they grow.",
    highlights: [
      "Variant-driven components (primary, secondary, ghost)",
      "Consistent spacing and typography tokens",
      "Built mobile-first with Tailwind CSS",
    ],
    tech: ["Design systems", "Tailwind CSS", "Reusable UI"],
    liveUrl: null,
    codeUrl: null,
    screenshot: null,
    codeFile: "ui/Button.jsx",
    codeLines: [
      "export function Button({ variant = 'primary', ...props }) {",
      "  return <button className={styles[variant]} {...props} />;",
      "}",
      "",
      "// variants: primary | secondary | ghost",
      "// sizes: sm | md | lg",
    ],
  },
  {
    id: 9,
    title: "Custom Business Website Builds",
    type: "Client project",
    category: "Freelance Delivery",
    filters: ["Business"],
    description:
      "Client-ready website delivery focused on clarity, speed, mobile responsiveness, and a professional online presence.",
    details:
      "Freelance website delivery for small businesses: clear messaging, fast load times, mobile-responsive layouts, and on-page SEO basics — everything a business needs to look credible online and convert visitors.",
    highlights: [
      "Performance budgets and fast mobile loads",
      "Mobile-responsive, conversion-focused layouts",
      "On-page SEO and analytics wiring included",
    ],
    tech: ["Business websites", "Performance", "UI polish"],
    liveUrl: null,
    codeUrl: null,
    screenshot: null,
    codeFile: "performance-budget.css",
    codeLines: [
      "/* performance budget */",
      "img { loading: lazy; }",
      "",
      "/* targets per build */",
      "/* LCP  < 2.0s on 4G      */",
      "/* CLS  < 0.1             */",
      "/* PageSpeed ≥ 90 mobile  */",
    ],
  },
];

export const featuredProjects = [1, 3, 4]
  .map((projectId) => projects.find((project) => project.id === projectId))
  .filter(Boolean);
