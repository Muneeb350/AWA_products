import ContactForm from "./ContactForm";
import Link from "next/link";
import {
  Mail,
  HeadphonesIcon,
  UserCircle,
  Briefcase,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

/**
 * Contact Us page — server component.
 * Displays company info, contact form, map, and WhatsApp CTA.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-text font-medium">Contact Us</span>
      </nav>

      {/* Page header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 max-w-2xl text-base text-text-muted">
          Whether you need bulk pricing, product samples, or a custom order —
          our wholesale team is here to help. Reach out via the form below, or
          connect with us directly.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Left: Company info + Map + WhatsApp */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <CompanyInfo />
          <MapEmbed />
          <WhatsAppCTA />
        </div>

        {/* Right: Contact form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

/* ── Company Information ─────────────────── */

function CompanyInfo() {
  return (
    <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-text">Company Information</h2>
      <dl className="mt-5 space-y-4 text-sm">
        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <dt className="font-medium text-text">Address</dt>
            <dd className="mt-0.5 text-text-muted">
              11116 grader street,
              <br />
              Dallas Texas, USA. 75238
            </dd>
          </div>
        </div>

        {/* Emails */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-3">
            <dt className="font-medium text-text">Email</dt>

            {/* Primary — Support */}
            <dd className="flex items-center gap-2">
              <HeadphonesIcon className="h-3.5 w-3.5 shrink-0 text-brand-500" />
              <a
                href="mailto:support@awaproducts.com"
                className="text-brand-600 hover:text-brand-700 hover:underline"
              >
                support@awaproducts.com
              </a>
              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700">
                Primary
              </span>
            </dd>

            {/* Corporate */}
            <dd className="flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-text-muted" />
              <a
                href="mailto:Zubiacorp@awaproducts.com"
                className="text-text hover:text-brand-600 hover:underline"
              >
                Zubiacorp@awaproducts.com
              </a>
            </dd>

            {/* Direct */}
            <dd className="flex items-center gap-2">
              <UserCircle className="h-3.5 w-3.5 shrink-0 text-text-muted" />
              <a
                href="mailto:sayed@awaproducts.com"
                className="text-text hover:text-brand-600 hover:underline"
              >
                sayed@awaproducts.com
              </a>
            </dd>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <dt className="font-medium text-text">Phone</dt>
            <dd className="mt-0.5">
              <a
                href="tel:(469)779-0221"
                className="text-brand-600 hover:text-brand-700 hover:underline"
              >
                (469)779-0221
              </a>
            </dd>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <dt className="font-medium text-text">Business Hours</dt>
            <dd className="mt-0.5 text-text-muted">
              Mon – Sat: 9:00 AM – 6:00 PM (PKT)
              <br />
              Sunday: Closed
            </dd>
          </div>
        </div>
      </dl>
    </section>
  );
}

/* ── Google Maps Embed Placeholder ───────── */

function MapEmbed() {
  return (
    <section className="overflow-hidden rounded-xl border border-border shadow-sm">
      <iframe
        title="AWA Products Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4937132349023!2d-96.69162292443866!3d32.885112478454246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864ea096e981be1f%3A0xc3907c6d9d797334!2s11116%20Grader%20St%2C%20Dallas%2C%20TX%2075238%2C%20USA!5e0!3m2!1sen!2s!4v1775662826371!5m2!1sen!2s" 
        width="600" height="450" 
        style={{border:0 }}
        allowFullScreen={true}
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"/>
    </section>
  );
}

/* ── WhatsApp CTA ────────────────────────── */

function WhatsAppCTA() {
  // Replace with your actual WhatsApp business number
  const WHATSAPP_NUMBER = "4697790221";
  const message = encodeURIComponent(
    "Hi AWA Products, I'd like to inquire about wholesale pricing. Can you help?"
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-5 text-center text-white shadow-md transition hover:bg-[#20bd5a] hover:shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <div className="text-left">
        <span className="block text-lg font-bold">Chat on WhatsApp</span>
        <span className="block text-sm text-green-100">
          Talk to our sales team instantly
        </span>
      </div>
    </a>
  );
}

/* ── End of file ── */
