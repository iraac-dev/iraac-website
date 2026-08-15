import Link from "next/link";
import { dropdownItems, navItems } from "./data";

function Header() {
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="wordmark" aria-label="MobLink home">MOB<span>LINK</span><b>.</b></Link>
    <nav className="main-nav" aria-label="Primary navigation">
      {navItems.map((item) => <Link href={item.href} key={item.key}>{item.label}</Link>)}
      <details className="nav-more"><summary>More</summary><div className="nav-more-menu">{dropdownItems.map((item) => <Link href={item.href} key={item.key}>{item.label}</Link>)}</div></details>
    </nav>
    <Link href="/app/" className="nav-login" aria-label="Open the MobLink app">Open app</Link>
  </div></header>;
}

function Footer() {
  return <>
    <div className="acknowledgement"><div className="container">MobLink acknowledges the Traditional Custodians of Country across Australia and pays respect to Elders past and present.</div></div>
    <footer className="site-footer"><div className="container">
      <div className="footer-grid">
        <div><h4>MobLink</h4><p>Helping Aboriginal and Torres Strait Islander people find and connect with suitable services.</p></div>
        <div><h4>Find support</h4><ul><li><Link href="/app/search/">Browse services</Link></li><li><Link href="/app/map/">Service map</Link></li><li><Link href="/app/messages/">MobLink chat</Link></li></ul></div>
        <div><h4>Providers</h4><ul><li><Link href="/#for-providers">How leads work</Link></li><li><Link href="/admin/">Supplier workspace</Link></li><li><Link href="/admin/funding/">Funding workspace</Link></li></ul></div>
      </div>
      <div className="footer-bottom"><span>&copy; 2026 MobLink. Working prototype.</span><span>Call 000 in an emergency. MobLink does not replace emergency services.</span></div>
    </div></footer>
  </>;
}

export default function SiteShell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /></>; }
