
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Leaf,
  Mail,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { developer, school } from "../data/siteData.js";

const skills = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building responsive, accessible, and user-friendly websites.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Creating clean visual designs that communicate information clearly.",
  },
  {
    icon: HeartHandshake,
    title: "Community Impact",
    description:
      "Using digital tools to support education and meaningful initiatives.",
  },
];

export default function Developer() {
  const developerName = developer?.name || "Bibash Lamichhane";
  const profileUrl = developer?.profileUrl || developer?.url || "";
  const email = developer?.email || "";

  return (
    <main className="developer-page">
      <section className="developer-hero">
        <div className="developer-hero-glow developer-glow-one" />
        <div className="developer-hero-glow developer-glow-two" />

        <div className="developer-container">
          <motion.div
            className="developer-breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <span>/</span>
            <span>Website Developer</span>
          </motion.div>

          <motion.div
            className="developer-profile-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="developer-avatar">
              <Code2 size={44} strokeWidth={1.5} />
              <span className="developer-avatar-leaf">
                <Leaf size={19} />
              </span>
            </div>

            <div className="developer-profile-content">
              <span className="developer-eyebrow">
                <Sparkles size={15} />
                Website Design & Development
              </span>

              <h1>{developerName}</h1>

              <p className="developer-role">
                Website Developer & Digital Designer
              </p>

              <p className="developer-intro">
                Dedicated to creating a modern, accessible, and informative
                digital experience for {school?.name || "Triveni Secondary School"}
                {" "}— Department of Plant Science.
              </p>

              <div className="developer-actions">
                {profileUrl && (
                  <a
                    className="developer-primary-button"
                    href={profileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Profile
                    <ArrowUpRight size={17} />
                  </a>
                )}

                {email && (
                  <a
                    className="developer-secondary-button"
                    href={`mailto:${email}`}
                  >
                    <Mail size={17} />
                    Contact Developer
                  </a>
                )}

                <Link
                  className="developer-secondary-button"
                  to="/contact"
                >
                  Contact School
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>

            <div className="developer-card-decoration">
              <Laptop size={90} strokeWidth={0.8} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="developer-content-section">
        <div className="developer-container">
          <motion.div
            className="developer-section-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="developer-eyebrow">What I Focus On</span>
            <h2>Technology with a purpose.</h2>
            <p>
              Combining design, development, and clear communication to make
              useful digital experiences for educational institutions.
            </p>
          </motion.div>

          <div className="developer-skills-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.article
                  className="developer-skill-card"
                  key={skill.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="developer-skill-icon">
                    <Icon size={23} />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            className="developer-project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="developer-project-icon">
              <GraduationCap size={29} />
            </div>

            <div className="developer-project-copy">
              <span className="developer-eyebrow">Featured Project</span>
              <h2>{school?.name || "Triveni Secondary School"}</h2>
              <p>
                A digital platform for sharing school information, academic
                programs, notices, practical learning, and contact details.
              </p>
            </div>

            <ShieldCheck
              className="developer-project-mark"
              size={31}
              strokeWidth={1.5}
            />
          </motion.div>

          <div className="developer-bottom-cta">
            <h2>Explore the school website</h2>
            <p>
              Discover the academic programs, practical learning opportunities,
              and latest school information.
            </p>
            <Link to="/" className="developer-primary-button">
              Explore Website
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
