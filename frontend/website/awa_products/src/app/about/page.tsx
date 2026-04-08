"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Leaf,
  Building2,
  Factory,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  Users,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────
   About Us — AWA Products
   Household & Cleaning Supplies Brand
   ───────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Section ──────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-surface to-surface-alt">
        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-600 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-text font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              About AWA Products
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
              Pioneering Hygiene &amp; Household Excellence
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted sm:text-xl">
              From kitchen degreasers to hospital-grade disinfectants, AWA
              Products formulates, packages, and delivers professional cleaning
              solutions trusted by households, businesses, and institutions
              across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────── */}
      <StatsBar />

      {/* ── Our Story ─────────────────────── */}
      <OurStory />

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
    { value: "50+", label: "Products" },
    { value: "500+", label: "Retail Partners" },
    { value: "8", label: "Industry Sectors" },
    { value: "100%", label: "Quality Tested" },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-extrabold text-brand-600 sm:text-4xl">
                {value}
              </div>
              <div className="mt-1 text-sm font-medium text-text-muted">
                {label}
              </div>
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
        {/* Text */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Our Story
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
            <p>
              AWA Products was founded in 2007 with a simple belief: every home,
              workplace, and public space deserves access to professional grade
              cleaning products at fair prices. What started as a small
              distribution operation has grown into a trusted brand
              serving retailers, institutions, and households nationwide.
            </p>
            <p>
              Our product range spans surface cleaners, laundry care, kitchen
              degreasers, disinfectants, air fresheners, and specialty
              formulations for industrial and clinical environments. Every
              product is developed with high concentration formulas, rigorous
              quality testing, and a commitment to safety.
            </p>
            <p>
              Today, AWA Products supplies to over 500 retail partners and
              continues to expand, driven by the same mission that started it
              all: making professional hygiene accessible to everyone.
            </p>
          </div>
        </div>

        {/* Image placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-alt">
          <img
            src="https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&h=600&fit=crop"
            alt="AWA Products facility"
            className="h-full w-full object-cover"
          />
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
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Mission &amp; Vision
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {/* Mission */}
          <div className="rounded-xl border border-border bg-surface p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-text">Our Mission</h3>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              To provide high-quality, affordable cleaning and hygiene solutions
              to every household, business, and institution. We are committed to
              formulating products that deliver exceptional performance while
              prioritising the safety of our customers and the environment.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-xl border border-border bg-surface p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-text">Our Vision</h3>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              To become most trusted household and industrial
              cleaning brand recognised for innovation, reliability, and a
              relentless focus on customer satisfaction. We envision a future
              where professional-grade hygiene is accessible to all.
            </p>
          </div>
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
      title: "Premium Quality",
      description:
        "High-concentration cleaning formulas that outperform standard products. Every batch undergoes rigorous quality testing before dispatch.",
    },
    {
      icon: Truck,
      title: "Wholesale Ready",
      description:
        "Optimised packaging and pricing for bulk suppliers, distributors, and retailers. Minimum order quantities designed for business buyers.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description:
        "Committed to safe and sustainable ingredients. Our plant-based line is biodegradable, septic-safe, and free from harsh chemical residues.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Why Choose AWA Products?
        </h2>
        <p className="mt-3 text-base text-text-muted">
          Three pillars that set us apart from the competition.
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
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          </div>
        ))}
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
        "Everyday cleaning essentials for homes — glass cleaners, floor wash, laundry detergents, and handwash.",
    },
    {
      icon: Factory,
      label: "Industrial",
      description:
        "Heavy-duty degreasers, warehouse floor cleaners, and bulk sanitisers for factories and workshops.",
    },
    {
      icon: Stethoscope,
      label: "Clinical",
      description:
        "Hospital-grade disinfectants and surface sanitisers for clinics, dental offices, and healthcare facilities.",
    },
    {
      icon: UtensilsCrossed,
      label: "Restaurant",
      description:
        "Commercial dishwash gels, kitchen degreasers, and food-safe surface cleaners for hospitality businesses.",
    },
  ];

  return (
    <section className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Industries We Serve
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Our product range is engineered for diverse environments — from
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
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
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
          Ready to Stock AWA Products?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-brand-100">
          Join 500+ retailers who trust us for quality cleaning supplies at
          wholesale prices. Get in touch today for a custom quote.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            Contact Us
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
