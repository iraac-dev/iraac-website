"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/about/", label: "About IRAAC" },
  { href: "/programs/", label: "Our programs" },
  { href: "/reports/", label: "Community reports" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  function isCurrent(href: string) {
    return pathname === href.slice(0, -1) || pathname.startsWith(href);
  }
  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="IRAAC home"
          onClick={() => setOpen(false)}
        >
          IRAAC<span>.</span>
        </Link>
        <span className="brand-caption">
          With community.
          <br />
          For community.
        </span>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "+"}</span>
        </button>
        <nav
          id="site-navigation"
          className={`main-nav${open ? " is-open" : ""}`}
          aria-label="Primary navigation"
          onClick={() => setOpen(false)}
        >
          {links.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="header-contact"
            aria-current={isCurrent("/contact/") ? "page" : undefined}
          >
            Get in touch <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
