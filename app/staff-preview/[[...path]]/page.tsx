import { notFound } from "next/navigation";
import { Overview, CrmScreen, OrganisationProfile } from "../../staff/Screens";
import ReportsPage from "../../admin/reports/page";
import ReportPage from "../../admin/reports/[slug]/page";
export default async function PreviewPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const path = (await params).path || [];
  if (!path.length) return <Overview />;
  if (path[0] === "crm") return <CrmScreen path={path.slice(1)} />;
  if (path[0] === "profile" && path.length === 1)
    return <OrganisationProfile />;
  if (path[0] === "reports" && path.length === 1) return <ReportsPage />;
  if (path[0] === "reports" && path.length === 2)
    return <ReportPage params={Promise.resolve({ slug: path[1] })} />;
  notFound();
}
