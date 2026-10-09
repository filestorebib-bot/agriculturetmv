
import { motion } from "framer-motion";
import {
  Leaf,
  Sprout,
  GraduationCap,
  Target,
  BookOpen,
  Tractor,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { school } from "../data/siteData.js";

const objectives = [
  {
    icon: Sprout,
    title: "Practical Agricultural Skills",
    description:
      "Connect classroom learning with practical agricultural activities, crop production and plant care.",
  },
  {
    icon: GraduationCap,
    title: "Student Development",
    description:
      "Encourage scientific thinking, problem-solving, teamwork and responsible decision-making.",
  },
  {
    icon: Target,
    title: "Career Opportunities",
    description:
      "Help students explore further education, agricultural enterprises and careers related to Plant Science.",
  },
  {
    icon: Leaf,
    title: "Sustainable Agriculture",
    description:
      "Introduce environmentally responsible farming, soil conservation and efficient resource use.",
  },
];

const learningAreas = [
  {
    number: "01",
    icon: BookOpen,
    title: "Theoretical Learning",
    description:
      "Understand plant growth, crop production, soil, plant health and the scientific principles behind agriculture.",
  },
  {
    number: "02",
    icon: Tractor,
    title: "Practical Learning",
    description:
      "Develop practical skills through agricultural activities, demonstrations and supervised fieldwork.",
  },
  {
    number: "03",
    icon: Sprout,
    title: "Experiential Learning",
    description:
      "Relate agricultural knowledge to real farming situations, local needs and community experiences.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container about-hero-grid">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">
              <Leaf size={15} />
              About Our Institution
            </span>

            <h1>
              Education That Helps
              <span> Agriculture Grow.</span>
            </h1>

            <p>
              Welcome to {school.name}, {school.department}.
              Explore our educational focus, practical learning
              approach and the role of agricultural education in
              building a sustainable future.
            </p>

            <div className="about-location">
              <MapPin size={17} />
              <span>{school.address}</span>
            </div>

            <Link to="/programs" className="primary-button">
              Explore Our Programs
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>

          <motion.div
            className="about-hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img
              src="/images/school-campus.jpg"
              alt="School campus"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="about-visual-card">
              <Sprout size={25} />
              <div>
                <strong>Learn by Doing</strong>
                <span>Knowledge • Skills • Practice</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container about-introduction section-spacing">
        <div className="about-section-heading">
          <span className="section-eyebrow">Who We Are</span>
          <h2>Growing Through Agricultural Education</h2>
        </div>

        <div className="about-intro-text">
          <p>
            Plant Science education connects scientific knowledge
            about plants with the practical skills required for
            agricultural production. It helps learners understand
            how crops grow, how agricultural resources are managed
            and how farming practices can be improved.
          </p>

          <p>
            At the secondary level, agricultural learning can
            encourage curiosity, practical competence and awareness
            of the importance of agriculture to livelihoods, food
            security and environmental sustainability.
          </p>

          <p className="about-note">
            This page presents the department's educational focus.
            School history, official achievements, facilities and
            institutional statistics should be added after they
            are verified by the school administration.
          </p>
        </div>
      </section>

      <section className="about-objectives section-spacing">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">
              Our Educational Focus
            </span>
            <h2>Learning with Purpose</h2>
            <p>
              Key goals that support meaningful agricultural
              education and student development.
            </p>
          </div>

          <div className="objectives-grid">
            {objectives.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="objective-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div className="objective-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container learning-section section-spacing">
        <div className="section-heading">
          <span className="section-eyebrow">
            Our Learning Approach
          </span>
          <h2>From Classroom to Field</h2>
          <p>
            Agricultural education becomes more meaningful when
            scientific concepts are connected with practical work.
          </p>
        </div>

        <div className="learning-grid">
          {learningAreas.map((item) => {
            const Icon = item.icon;

            return (
              <article className="learning-card" key={item.number}>
                <div className="learning-card-top">
                  <span>{item.number}</span>
                  <Icon size={26} />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <span className="section-eyebrow">
              Start Exploring
            </span>
            <h2>Discover Plant Science Education</h2>
            <p>
              Explore class information, practical training
              opportunities and student programs.
            </p>
          </div>

          <div className="about-cta-actions">
            <Link to="/classes" className="primary-button">
              View Classes
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/contact" className="secondary-button">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
