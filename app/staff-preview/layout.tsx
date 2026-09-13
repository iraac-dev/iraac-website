import Workspace from "../staff/Workspace";
export const metadata = {
  title: "IRAAC workspace preview",
  robots: { index: false, follow: false },
};
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Workspace base="/staff-preview">{children}</Workspace>;
}
