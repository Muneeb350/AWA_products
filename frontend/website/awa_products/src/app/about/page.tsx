"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Factory,
  Leaf,
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  Users,
  Award,
  FlaskConical,
  Rocket,
} from "lucide-react";

/* ─────────────────────────────────────────────
   About Us — AWA Products
   Parent Manufacturer · Home of Euzzy
   ───────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Section ──────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-surface to-surface-alt">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-600 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-text font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              AWA Products — The Manufacturer
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Built to Manufacture.{" "}
              <span className="text-brand-600">Built to Last.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              AWA Products is the parent manufacturer behind <strong className="text-text">Euzzy</strong> and
              a growing portfolio of innovative household and cleaning brands.
              We design, formulate, and produce at industrial scale — delivering
              precision chemistry to distributors, retailers, and institutions worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────── */}
      <StatsBar />

      {/* ── Our Story ─────────────────────── */}
      <OurStory />

      {/* ── Brand Portfolio ───────────────── */}
      <BrandPortfolio />

      {/* ── Mission & Vision ──────────────── */}
      <MissionVision />

      {/* ── Why Choose Us ─────────────────── */}
      <WhyChooseUs />

      {/* ── Industry Focus ────────────────── */}
      <IndustryFocus />

      {/* ── CTA Banner ────────────────────── */}
      <CTABanner />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stats Bar
   ───────────────────────────────────────────── */

function StatsBar() {
  const stats = [
    { value: "50+", label: "Products Manufactured" },
    { value: "500+", label: "Distribution Partners" },
    { value: "8", label: "Industry Sectors" },
    { value: "100%", label: "Quality Tested" },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600 sm:text-4xl">{value}</div>
              <div className="mt-1 text-sm font-medium text-text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Our Story
   ───────────────────────────────────────────── */

function OurStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Our Story
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              AWA Products was established with a single mandate: to build
              manufacturing infrastructure capable of producing world-class
              household and cleaning products at industrial scale. What began
              as a focused formulation operation has evolved into a full-scale
              manufacturing company with a growing brand portfolio.
            </p>
            <p>
              Our flagship brand, <strong className="text-text">Euzzy</strong>, was born inside our
              facility — developed from the ground up using high-concentration
              formulas, rigorous quality testing, and a commitment to
              performance chemistry. Every product that carries the Euzzy name
              is manufactured, tested, and dispatched directly by AWA Products.
            </p>
            <p>
              Today, our manufacturing capabilities serve over 500 distribution
              partners and continue to expand as we incubate new brands for
              new markets. The next generation of household and cleaning
              innovation starts here.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-alt">
          <img
            src="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&h=600&fit=crop"
            alt="AWA Products manufacturing facility"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Brand Portfolio
   ───────────────────────────────────────────── */

function BrandPortfolio() {
  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Our Brand Portfolio
          </h2>
          <p className="mt-3 text-base text-text-muted">
            AWA Products is the manufacturer and parent company behind these brands.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Euzzy — Live */}
          <div className="rounded-xl border border-brand-200 bg-surface p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <FlaskConical className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                Live
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-text">Euzzy</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Our flagship cleaning and hygiene brand. Surface cleaners,
              laundry care, degreasers, disinfectants, and more — manufactured
              at AWA Products for households, businesses, and institutions.
            </p>
          </div>

          {/* Upcoming Brand 1 */}
          <div className="rounded-xl border border-border bg-surface p-7 shadow-sm opacity-80">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-alt text-text-muted">
                <Rocket className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-semibold text-text-muted">
                Coming Soon
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-text">Upcoming Brand</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              A new innovative product line currently in development at
              AWA Products. Built on the same manufacturing excellence that
              powers Euzzy, targeting a new market segment.
            </p>
          </div>

          {/* Upcoming Brand 2 */}
          <div className="rounded-xl border border-border bg-surface p-7 shadow-sm opacity-70">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-alt text-text-muted">
                <Rocket className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-semibold text-text-muted">
                Coming Soon
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold text-text">Upcoming Brand</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Another innovative brand in the AWA Products pipeline. Stay
              tuned as we continue to expand our manufacturing portfolio
              into new categories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Mission & Vision
   ───────────────────────────────────────────── */

function MissionVision() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Mission &amp; Vision
        </h2>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-7 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-text">Our Mission</h3>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            To manufacture high-performance, rigorously tested cleaning and
            hygiene products that meet the demands of every environment — from
            the home to the hospital. We exist to make professional-grade
            formulations accessible at scale, under brands that people trust.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-7 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-text">Our Vision</h3>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            To become a globally recognised manufacturing group, known for
            incubating and scaling innovative cleaning and hygiene brands.
            AWA Products will be the manufacturing engine behind the next
            generation of household and institutional product leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Why Choose Us
   ───────────────────────────────────────────── */

function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Manufacturer-Direct Quality",
      description:
        "Every product is formulated, produced, and quality-tested in-house. No middlemen — you receive exactly what comes off our line, backed by our manufacturing guarantee.",
    },
    {
      icon: Factory,
      title: "Industrial-Scale Production",
      description:
        "Our facility is built for volume. Whether you need pallets or containers, AWA Products maintains consistent supply with the capacity to scale alongside your business.",
    },
    {
      icon: Leaf,
      title: "Responsible Formulation",
      description:
        "We engineer products with both performance and responsibility in mind. Our plant-based and eco-conscious lines are biodegradable, septic-safe, and free from unnecessary harsh residues.",
    },
  ];

  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Why Partner with AWA Products?
          </h2>
          <p className="mt-3 text-base text-text-muted">
            The advantages of working directly with the manufacturer.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-surface p-7 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Industry Focus
   ───────────────────────────────────────────── */

function IndustryFocus() {
  const sectors = [
    {
      icon: Building2,
      label: "Residential",
      description:
        "Everyday cleaning essentials manufactured for homes — glass cleaners, floor wash, laundry detergents, and handwash.",
    },
    {
      icon: Factory,
      label: "Industrial",
      description:
        "Heavy-duty degreasers, warehouse floor cleaners, and bulk sanitisers formulated for factories and workshops.",
    },
    {
      icon: Stethoscope,
      label: "Clinical",
      description:
        "Hospital-grade disinfectants and surface sanitisers manufactured to meet the standards of clinics and healthcare facilities.",
    },
    {
      icon: UtensilsCrossed,
      label: "Restaurant",
      description:
        "Commercial dishwash gels, kitchen degreasers, and food-safe surface cleaners engineered for hospitality businesses.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Industries We Manufacture For
        </h2>
        <p className="mt-3 text-base text-text-muted">
          Our product lines are engineered for diverse environments — from
          kitchen sinks to hospital wards.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map(({ icon: Icon, label, description }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-text">{label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA Banner
   ───────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-12 text-center shadow-lg sm:px-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Ready to Partner with the Manufacturer?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-brand-100">
          Join our network of 500+ distribution partners. Get manufacturer-direct
          pricing, consistent supply, and access to every brand we produce.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            Contact Our Team
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            View Our Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
