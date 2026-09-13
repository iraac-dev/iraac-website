"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { reportLibrary } from "./reports/report-library";

const adminLinks = [
  { href: "/admin/", label: "Overview" },
  { href: "/admin/referrals", label: "Referral Queue" },
  { href: "/admin/services", label: "Service Directory" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/funding", label: "Funding", openInNewTab: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPath = pathname === "/admin" ? "/admin/" : pathname;
  const isReportsWorkspace = currentPath.startsWith("/admin/reports");
  const isFundingWorkspace =
    currentPath === "/admin/funding" ||
    currentPath.startsWith("/admin/funding/");

  if (isFundingWorkspace) {
    return <>{children}</>;
  }

  return (
    <main className="admin-page">
      <div
        className={
          isReportsWorkspace ? "admin-shell admin-shell-reports" : "admin-shell"
        }
      >
        <aside className="admin-sidebar">
          <Link className="brand" href="/">
            IRAAC<span>.</span>
          </Link>
          <nav aria-label="Staff dashboard sections">
            {adminLinks.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== "/admin/" && currentPath.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive ? "admin-nav-link active" : "admin-nav-link"
                  }
                >
                  {link.label}
                  {link.href === "/admin/reports" && (
                    <span className="admin-nav-badge">
                      {reportLibrary.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <p className="admin-note">
            {isReportsWorkspace
              ? "Demonstration workspace. Reports contain no private recipient or participant records."
              : "Staff admin dashboard. Authentication, Supabase roles and audit controls will be wired in the next build pass."}
          </p>
        </aside>
        <div className="admin-main">{children}</div>
      </div>
    </main>
  );
}
