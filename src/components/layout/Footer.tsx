import Link from "next/link";
import { Wordmark } from "./Logo";
import { brand, footerLinks, legalNotice, links } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 text-[17px] font-semibold text-navy tracking-tight">{brand.tagline}</p>
            <p className="mt-2 text-[14px] text-ink-2">{brand.legalName}</p>
            {links.contactEmail && (
              <p className="mt-1 text-[14px] text-ink-2">
                <a className="hover:text-navy underline-offset-4 hover:underline" href={`mailto:${links.contactEmail}`}>
                  {links.contactEmail}
                </a>
              </p>
            )}
          </div>
          <nav aria-label="網站連結">
            <p className="text-[12.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 mb-3">網站</p>
            <ul className="space-y-2.5">
              {footerLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[14.5px] text-ink-2 hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="法律文件">
            <p className="text-[12.5px] font-semibold tracking-[0.1em] uppercase text-ink-3 mb-3">法律</p>
            <ul className="space-y-2.5">
              {footerLinks.slice(4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[14.5px] text-ink-2 hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-line pt-6 text-[12.5px] leading-relaxed text-ink-3">
          <p>{legalNotice}</p>
          <p className="mt-3">
            © {year} {brand.legalName}（{brand.name}）. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
