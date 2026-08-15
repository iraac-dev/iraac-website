"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPath = pathname === "/admin" ? "/admin/" : pathname;

  const links = [
    { href: "/admin/", label: "Overview" },
    { href: "/admin/call-centre", label: "Call Centre" },
    { href: "/admin/referrals", label: "Leads" },
    { href: "/admin/services", label: "Service Directory" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/funding", label: "Funding" },
  ];

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link className="brand" href="/">
            MOBLINK<span>.</span>
          </Link>
          <nav aria-label="Staff dashboard sections">
            {links.map((link) => {
              const isActive =
                currentPath === link.href || (link.href !== "/admin/" && currentPath.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "admin-nav-link active" : "admin-nav-link"}
                >
                  {link.label}
                  {link.href === "/admin/reports" && <span className="admin-nav-badge">1</span>}
                </Link>
              );
            })}
          </nav>
          <p className="admin-note">
            MobLink-wide network demo. Authentication, provider-specific access, live notifications and audit controls still need production wiring.
          </p>
        </aside>
        <div className="admin-main">{children}</div>
      </div>
    </main>
  );
}
