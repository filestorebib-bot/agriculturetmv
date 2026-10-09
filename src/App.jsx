
import { useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Leaf,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

import {
  school,
  navigation,
  notices,
  developer,
  homeContent,
} from "./data/siteData.js";

import ScrollToTop from "./components/ScrollToTop.jsx";

import About from "./pages/About.jsx";
import Programs from "./pages/Programs.jsx";
import OJT from "./pages/OJT.jsx";
import Classes from "./pages/Classes.jsx";
import Notices from "./pages/Notices.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Developer from "./pages/Developer.jsx";

const navFallback = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "OJT", path: "/ojt" },
  {
    label: "Classes",
    path: "/classes",
    children: [
      { label: "Class 9", path: "/classes/9" },
      { label: "Class 10", path: "/classes/10" },
      { label: "Class 11", path: "/classes/11" },
      { label: "Class 12", path: "/classes/12" },
    ],
  },
  { label: "Notices", path: "/notices" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

function normalizeNavigation(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return navFallback;
  }

  return items.map((item) => {
    const label = item.label || item.name || item.title || "";
    const rawPath =
      item.path || item.href || item.to || item.url || "";

    const path =
      rawPath === "home"
        ? "/"
        : rawPath.startsWith("/")
          ? rawPath
          : `/${rawPath}`;

    const children = Array.isArray(item.children)
      ? item.children.map((child) => ({
          label: child.label || child.name || child.title || "",
          path: (child.path || child.href || child.to || "").startsWith("/")
            ? child.path || child.href || child.to
            : `/${child.path || child.href || child.to || ""}`,
        }))
      : undefined;

    return { label, path, children };
  });
}

function getNoticePath(notice) {
  return `/notices/${encodeURIComponent(
    String(notice.id ?? notice.noticeId ?? notice.slug ?? "")
  )}`;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);

  const navItems = normalizeNavigation(navigation);
  const schoolName = school?.name || "Triveni Secondary School";
  const department =
    school?.department || "Department of Plant Science";

  function closeMenu() {
    setMenuOpen(false);
    setClassesOpen(false);
  }

  return (
    <>
      <div className="site-topbar">
        <div className="site-container site-topbar-inner">
          <div className="site-topbar-item">
            <MapPin size={14} />
            <span>
              {school?.address ||
                "Katari-4, Udayapur, Koshi Province, Nepal"}
            </span>
          </div>

          <a
            className="site-topbar-item"
            href={`tel:${String(
              school?.phone || "035-450-154"
            ).replace(/[^\d+]/g, "")}`}
          >
            <Phone size={14} />
            <span>{school?.phone || "035-450-154"}</span>
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="site-container site-header-inner">
          <Link
            to="/"
            className="site-brand"
            aria-label={`${schoolName} home`}
            onClick={closeMenu}
          >
            <span className="site-brand-icon">
              <Leaf size={27} />
            </span>

            <span className="site-brand-copy">
              <strong>{schoolName}</strong>
              <small>{department}</small>
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav
            className={`site-nav${menuOpen ? " site-nav-open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => {
              if (!item.label || !item.path) return null;

              const isClasses =
                item.children?.length ||
                /class/i.test(item.label);

              if (isClasses) {
                const classChildren =
                  item.children?.length
                    ? item.children
                    : [
                        { label: "Class 9", path: "/classes/9" },
                        { label: "Class 10", path: "/classes/10" },
                        { label: "Class 11", path: "/classes/11" },
                        { label: "Class 12", path: "/classes/12" },
                      ];

                return (
                  <div
                    className="site-nav-dropdown"
                    key={`${item.path}-${index}`}
                  >
                    <button
                      type="button"
                      className="site-nav-link site-nav-dropdown-trigger"
                      aria-expanded={classesOpen}
                      onClick={() => setClassesOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown size={15} />
                    </button>

                    <div
                      className={`site-nav-dropdown-menu${
                        classesOpen ? " site-nav-dropdown-menu-open" : ""
                      }`}
                    >
                      <NavLink
                        to="/classes"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `site-nav-dropdown-item${isActive ? " active" : ""}`
                        }
                      >
                        All Classes
                      </NavLink>

                      {classChildren.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `site-nav-dropdown-item${isActive ? " active" : ""}`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={`${item.path}-${index}`}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `site-nav-link${isActive ? " active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}

            <Link
              to="/contact"
              className="site-nav-cta"
              onClick={closeMenu}
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

function NoticeTicker() {
  const latestNotices = Array.isArray(notices)
    ? notices.filter((notice) => notice && notice.title).slice(0, 5)
    : [];

  if (latestNotices.length === 0) return null;

  return (
    <div className="notice-ticker">
      <div className="site-container notice-ticker-inner">
        <div className="notice-ticker-label">
          <Bell size={16} />
          <span>Latest Notices</span>
        </div>

        <div className="notice-ticker-content">
          {latestNotices.map((notice, index) => (
            <Link
              key={notice.id ?? notice.noticeId ?? index}
              to={getNoticePath(notice)}
              className="notice-ticker-link"
            >
              <span className="notice-ticker-dot" />
              {notice.title}
            </Link>
          ))}
        </div>

        <Link to="/notices" className="notice-ticker-all">
          View all <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function HomePage() {
  const hero = homeContent || {};

  const heroTitle =
    hero.title ||
    "Growing Knowledge. Cultivating the Future.";

  const heroDescription =
    hero.description ||
    "Discover plant science, practical agricultural education, and opportunities to build a more productive and sustainable future.";

  const heroImage =
    hero.image ||
    hero.heroImage ||
    "/images/home/hero.jpg";

  const programItems = Array.isArray(hero.highlights)
    ? hero.highlights
    : [
        {
          title: "Agricultural Education",
          description:
            "Build a foundation in plant science and agricultural knowledge.",
        },
        {
          title: "Practical Learning",
          description:
            "Connect classroom concepts with practical experience.",
        },
        {
          title: "Future Opportunities",
          description:
            "Explore further education and careers in agriculture.",
        },
      ];

  const featuredNotices = Array.isArray(notices)
    ? notices.filter((notice) => notice && notice.title).slice(0, 3)
    : [];

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-image">
          <img
            src={heroImage}
            alt="Agricultural education and plant science"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="home-hero-overlay" />

        <div className="site-container home-hero-content">
          <span className="home-hero-eyebrow">
            <Leaf size={16} />
            Department of Plant Science
          </span>

          <h1>{heroTitle}</h1>

          <p>{heroDescription}</p>

          <div className="home-hero-actions">
            <Link to="/programs" className="home-primary-button">
              Explore Programs
              <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="home-secondary-button">
              Discover Our Department
            </Link>
          </div>

          <div className="home-hero-location">
            <MapPin size={16} />
            <span>
              {school?.address ||
                "Katari-4, Udayapur, Koshi Province, Nepal"}
            </span>
          </div>
        </div>
      </section>

      <section className="home-intro-section">
        <div className="site-container">
          <div className="home-section-heading">
            <span className="home-section-eyebrow">Learn and Grow</span>
            <h2>Education rooted in agriculture</h2>
            <p>
              Explore learning opportunities that connect plant science,
              practical skills, and agricultural development.
            </p>
          </div>

          <div className="home-highlights-grid">
            {programItems.map((item, index) => (
              <article
                className="home-highlight-card"
                key={item.id ?? item.title ?? index}
              >
                <span className="home-highlight-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="home-highlight-icon">
                  <Leaf size={24} />
                </div>

                <h3>{item.title || item.name || "Learning Opportunity"}</h3>

                <p>
                  {item.description ||
                    "Discover more about our learning opportunities."}
                </p>

                <Link to="/programs" className="home-card-link">
                  Learn more <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-ojt-section">
        <div className="site-container home-ojt-inner">
          <div className="home-ojt-copy">
            <span className="home-section-eyebrow">Learn by Doing</span>
            <h2>Practical learning beyond the classroom</h2>
            <p>
              Explore the school's on-the-job training information and learn
              how practical experiences can support agricultural education.
            </p>

            <Link to="/ojt" className="home-primary-button">
              Explore OJT
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="home-ojt-art">
            <div className="home-ojt-art-circle">
              <Leaf size={86} strokeWidth={1.2} />
            </div>
            <span className="home-ojt-art-label">
              Knowledge · Skills · Growth
            </span>
          </div>
        </div>
      </section>

      <section className="home-notices-section">
        <div className="site-container">
          <div className="home-notices-heading">
            <div>
              <span className="home-section-eyebrow">Stay Informed</span>
              <h2>Latest notices</h2>
            </div>

            <Link to="/notices" className="home-card-link">
              All notices <ArrowRight size={16} />
            </Link>
          </div>

          {featuredNotices.length > 0 ? (
            <div className="home-notices-grid">
              {featuredNotices.map((notice, index) => (
                <Link
                  className="home-notice-card"
                  key={notice.id ?? notice.noticeId ?? index}
                  to={getNoticePath(notice)}
                >
                  <span className="home-notice-icon">
                    <Bell size={19} />
                  </span>

                  <div>
                    <span className="home-notice-date">
                      {notice.date || notice.publishedAt || "School notice"}
                    </span>
                    <h3>{notice.title}</h3>
                    <span className="home-notice-read">
                      Read notice <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="home-empty-notices">
              School notices will appear here when published.
            </p>
          )}
        </div>
      </section>

      <section className="home-final-cta">
        <div className="site-container home-final-cta-inner">
          <div>
            <span className="home-section-eyebrow">Get Connected</span>
            <h2>Have a question about our department?</h2>
            <p>
              Contact the school for verified information about programs,
              classes, admissions, and practical learning.
            </p>
          </div>

          <Link to="/contact" className="home-primary-button">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function NoticeDetailRedirect() {
  const { noticeId } = useParams();

  const notice = Array.isArray(notices)
    ? notices.find(
        (item) =>
          String(item.id ?? item.noticeId ?? item.slug ?? "") ===
          String(noticeId)
      )
    : null;

  if (!notice) {
    return <Navigate to="/notices" replace />;
  }

  return <Notices />;
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for may have moved or may not exist.
        </p>

        <Link to="/" className="home-primary-button">
          Return to Home <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const developerName = developer?.name || "Bibash Lamichhane";
  const developerUrl =
    developer?.profileUrl || developer?.url || "";

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Link to="/" className="site-brand site-footer-logo">
              <span className="site-brand-icon">
                <Leaf size={26} />
              </span>

              <span className="site-brand-copy">
                <strong>{school?.name || "Triveni Secondary School"}</strong>
                <small>
                  {school?.department || "Department of Plant Science"}
                </small>
              </span>
            </Link>

            <p>
              Supporting agricultural education through knowledge,
              practical learning, and a commitment to future growth.
            </p>
          </div>

          <div className="site-footer-links">
            <h3>Explore</h3>
            <Link to="/about">About Us</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/ojt">OJT</Link>
            <Link to="/classes">Classes</Link>
            <Link to="/gallery">Gallery</Link>
          </div>

          <div className="site-footer-links">
            <h3>Information</h3>
            <Link to="/notices">Notices</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/developer">Website Developer</Link>
          </div>

          <div className="site-footer-contact">
            <h3>Contact</h3>
            <p>
              <MapPin size={16} />
              <span>
                {school?.address ||
                  "Katari-4, Udayapur, Koshi Province, Nepal"}
              </span>
            </p>

            <a
              href={`tel:${String(
                school?.phone || "035-450-154"
              ).replace(/[^\d+]/g, "")}`}
            >
              <Phone size={16} />
              {school?.phone || "035-450-154"}
            </a>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>
            © {year} {school?.name || "Triveni Secondary School"}.
            All rights reserved.
          </p>

          <p>
            Website by{" "}
            {developerUrl ? (
              <a href={developerUrl} target="_blank" rel="noreferrer">
                {developerName}
              </a>
            ) : (
              <Link to="/developer">{developerName}</Link>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <NoticeTicker />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/ojt" element={<OJT />} />

        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:grade" element={<Classes />} />

        <Route path="/notices" element={<Notices />} />
        <Route path="/notices/:noticeId" element={<NoticeDetailRedirect />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/developer" element={<Developer />} />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}
