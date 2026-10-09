
import { useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  Phone,
  MapPin,
  ArrowUpRight,
  Bell
} from "lucide-react";

import { school, navigation, notices, developer } from "./data/siteData.js";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <MapPin size={14} />
            {school.address}
          </span>
          <a href={`tel:${school.phone}`}>
            <Phone size={14} />
            {school.phone}
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-icon">
              <Leaf size={27} />
            </span>
            <span className="brand-copy">
              <strong>{school.name}</strong>
              <small>{school.department}</small>
            </span>
          </Link>

          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav
            className={`main-nav ${menuOpen ? "nav-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="nav-cta"
              onClick={closeMenu}
            >
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

function NoticeTicker() {
  const tickerNotices = notices.filter(
    (notice) => notice.pinned || notice.title
  );

  if (!tickerNotices.length) return null;

  return (
    <section className="notice-ticker" aria-label="Latest notices">
      <div className="ticker-label">
        <Bell size={16} />
        <span>Latest Notices</span>
      </div>

      <div className="ticker-window">
        <div className="ticker-track">
          {[...tickerNotices, ...tickerNotices].map((notice, index) => (
            <Link
              key={`${notice.id}-${index}`}
              to={`/notices/${notice.id}`}
              className="ticker-item"
            >
              <span className="ticker-dot" />
              {notice.title}
              <span className="ticker-date">{notice.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">
              <Leaf size={25} />
            </span>
            <span className="brand-copy">
              <strong>{school.name}</strong>
              <small>{school.department}</small>
            </span>
          </Link>
          <p>
            Growing knowledge, cultivating skills and preparing
            students for a greener agricultural future.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          {navigation.map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h3>Contact</h3>
          <p><MapPin size={15} /> {school.address}</p>
          <a href={`tel:${school.phone}`}>
            <Phone size={15} /> {school.phone}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {school.name}.
          All rights reserved.
        </span>
        <Link to="/developer" className="developer-credit">
          Made with care by <strong>{developer.name}</strong>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </footer>
  );
}

function PagePlaceholder({ title, description }) {
  return (
    <main className="container page-placeholder">
      <span className="eyebrow">TRIVENI SECONDARY SCHOOL</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="placeholder-note">
        <Leaf size={23} />
        <div>
          <strong>Page structure ready</strong>
          <p>
            This section will be developed in the next website files.
          </p>
        </div>
      </div>
      <Link to="/" className="primary-button">
        Return to Home
      </Link>
    </main>
  );
}

function HomePage() {
  return (
    <main className="container page-placeholder">
      <span className="eyebrow">LEARN · CULTIVATE · GROW</span>
      <h1>Growing Knowledge, Cultivating the Future</h1>
      <p>
        Welcome to the Department of Plant Science at
        {" "}{school.name}, Katari, Udayapur, Nepal.
      </p>

      <div className="hero-actions">
        <Link to="/about" className="primary-button">
          Discover Our School <ArrowUpRight size={17} />
        </Link>
        <Link to="/classes" className="secondary-button">
          Explore Classes
        </Link>
      </div>

      <div className="home-preview-grid">
        <Link to="/programs" className="preview-card">
          <Leaf size={25} />
          <h2>Agricultural Programs</h2>
          <p>Explore practical learning and school activities.</p>
          <span>Explore programs ↗</span>
        </Link>

        <Link to="/ojt" className="preview-card">
          <Bell size={25} />
          <h2>On-the-Job Training</h2>
          <p>Discover agricultural projects and field experience.</p>
          <span>Explore OJT ↗</span>
        </Link>

        <Link to="/notices" className="preview-card">
          <ArrowUpRight size={25} />
          <h2>Notices & Updates</h2>
          <p>Find announcements, schedules and important documents.</p>
          <span>View notices ↗</span>
        </Link>
      </div>
    </main>
  );
}

function ClassesPage() {
  return (
    <PagePlaceholder
      title="Classes 9–12"
      description="Choose your grade to explore subjects, course details and syllabus information."
    />
  );
}

function NotFoundPage() {
  return (
    <PagePlaceholder
      title="Page not found"
      description="The page you are looking for does not exist."
    />
  );
}

function App() {
  const location = useLocation();

  // Start every newly opened page at the top.
  // Browser back/forward navigation remains supported.
  useState(() => {
    window.scrollTo(0, 0);
    return null;
  });

  return (
    <div className="app-shell">
      <Header />
      <NoticeTicker />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/about"
          element={
            <PagePlaceholder
              title="About Our School"
              description="Learn about the school, its educational mission and the Department of Plant Science."
            />
          }
        />

        <Route
          path="/programs"
          element={
            <PagePlaceholder
              title="Our Programs"
              description="Discover school programs, student activities and agricultural learning."
            />
          }
        />

        <Route
          path="/ojt"
          element={
            <PagePlaceholder
              title="On-the-Job Training"
              description="Explore practical training, student projects, field activities and OJT reports."
            />
          }
        />

        <Route path="/classes" element={<ClassesPage />} />

        <Route
          path="/classes/:grade"
          element={<ClassesPage />}
        />

        <Route
          path="/notices"
          element={
            <PagePlaceholder
              title="Notices & Announcements"
              description="Browse school announcements, dates and downloadable documents."
            />
          }
        />

        <Route
          path="/notices/:noticeId"
          element={
            <PagePlaceholder
              title="Notice Details"
              description="Read the selected school announcement."
            />
          }
        />

        <Route
          path="/contact"
          element={
            <PagePlaceholder
              title="Contact Us"
              description="Find school contact information, administration details and location."
            />
          }
        />

        <Route
          path="/developer"
          element={
            <PagePlaceholder
              title={developer.name}
              description="Meet the designer and developer behind this website."
            />
          }
        />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
