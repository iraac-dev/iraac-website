import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link className="brand" href="/">
            IRAAC<span>.</span>
          </Link>
          <nav aria-label="Staff dashboard sections">
            <Link href="/admin/">Overview</Link>
            <Link href="/admin/referrals">Referral Queue</Link>
            <Link href="/admin/services">Service Directory</Link>
            <Link href="/admin/reports">Reports</Link>
          </nav>
          <p className="admin-note">
            Staff admin dashboard. Authentication, Supabase roles and audit controls will be wired in the next build pass.
          </p>
        </aside>
        <div className="admin-main">{children}</div>
      </div>
    </main>
  );
}