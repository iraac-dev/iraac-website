"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
  type ComponentProps,
} from "react";
import {
  crmReducer,
  initialState,
  type CrmState,
  type CrmAction,
} from "./crm-data";
import "./staff.css";
const Context = createContext<{
  state: CrmState;
  dispatch: Dispatch<CrmAction>;
  base: string;
} | null>(null);
export function useCrm() {
  const value = useContext(Context);
  if (!value) throw new Error("IRAAC workspace provider missing");
  return value;
}
export function StaffLink({ href, ...props }: ComponentProps<typeof Link>) {
  const value = useContext(Context);
  const base = value?.base || "/admin";
  return (
    <Link
      {...props}
      href={
        typeof href === "string" ? href.replace(/^\/admin(?=\/|$)/, base) : href
      }
    />
  );
}
export default function Workspace({
  children,
  base = "/admin",
}: {
  children: ReactNode;
  base?: string;
}) {
  const [state, dispatch] = useReducer(crmReducer, initialState);
  const path = usePathname().replace(/\/$/, "");
  return (
    <Context.Provider value={{ state, dispatch, base }}>
      <div className="iraac-staff">
        <aside className="staff-sidebar">
          <Link href="/" className="staff-brand">
            IRAAC<span>.</span>
          </Link>
          <p className="staff-sidebar-label">Community workspace</p>
          <nav aria-label="Staff dashboard sections">
            {[
              ["", "Overview", "01"],
              ["/crm", "CRM", "02"],
              ["/reports", "Reports", "03"],
              ["/profile", "Organisation profile", "04"],
            ].map(([href, label, num]) => (
              <Link
                key={href}
                href={`${base}${href}/`}
                aria-current={
                  (href ? path.startsWith(base + href) : path === base)
                    ? "page"
                    : undefined
                }
              >
                <span>{num}</span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="staff-sidebar-foot">
            <strong>
              With community.
              <br />
              For community.
            </strong>
            <Link href="/">← Public website</Link>
          </div>
        </aside>
        <main className="staff-main" id="staff-content">
          <div className="staff-preview-notice">
            <span>
              <strong>Interactive preview</strong> · Fictional records only.
              Changes last until this page is reloaded. No live surveys,
              bookings or messages are connected.
            </span>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all example records and discard your preview changes?",
                  )
                )
                  dispatch({ type: "reset" });
              }}
            >
              Reset examples
            </button>
          </div>
          {children}
        </main>
      </div>
    </Context.Provider>
  );
}
