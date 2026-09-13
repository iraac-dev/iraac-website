import { CrmScreen } from "../../../staff/Screens";
export default async function CrmPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  return <CrmScreen path={(await params).path} />;
}
