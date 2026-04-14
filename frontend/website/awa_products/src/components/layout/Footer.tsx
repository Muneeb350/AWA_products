import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand / Logo */}
          <div>
            <Image
              src="/images/logo.png"
              alt="AWA Products Logo"
              width={150}
              height={50}
              style={{ width: 'auto', height: 'auto' }}
              className="mb-3 object-contain"
              priority
            />
            <h4 className="text-lg font-bold text-brand-700">AWA Products</h4>
            <p className="mt-2 text-sm text-text-muted">
              Your trusted partner for premium household &amp; cleaning products.
              <br />
              Delivering quality surface cleaners, disinfectants, laundry care,
              and more — straight to your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold text-text">Quick Links</h5>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/" className="hover:text-brand-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-sm font-semibold text-text">Categories</h5>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li>Surface Cleaners</li>
              <li>Laundry Care</li>
              <li>Kitchen Essentials</li>
              <li>Disinfectants</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h5 className="text-sm font-semibold text-text">Contact Us</h5>
            <address className="mt-3 space-y-3 text-sm not-italic text-text-muted">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                <a
                  href="mailto:support@awaproducts.com"
                  className="text-brand-600 hover:text-brand-700 hover:underline"
                >
                  support@awaproducts.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                <a
                  href="mailto:Zubiacorp@awaproducts.com"
                  className="hover:text-brand-600 hover:underline"
                >
                  Zubiacorp@awaproducts.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                <a
                  href="mailto:sayed@awaproducts.com"
                  className="hover:text-brand-600 hover:underline"
                >
                  sayed@awaproducts.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                <a
                  href="tel:+14697790221"
                  className="hover:text-brand-600 hover:underline"
                >
                  (469) 779-0221
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-border pt-6 text-center text-l text-text-muted">
          &copy; {new Date().getFullYear()} AWA Products. All rights reserved.{" "}
          | Designed by Usman &amp; Muneeb
        </div>
      </div>
    </footer>
  );
}
