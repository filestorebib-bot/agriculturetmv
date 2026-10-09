
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Images,
  Share2,
  Sprout,
  Tractor,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ojtPrograms, school } from "../data/siteData.js";

const learningBenefits = [
  {
    icon: Tractor,
    title: "Practical Experience",
    description:
      "Connect agricultural theory with supervised field and farm activities.",
  },
  {
    icon: ClipboardList,
    title: "Record Keeping",
    description:
      "Learn to document activities, observations, work completed and outcomes.",
  },
  {
    icon: GraduationCap,
    title: "Career Preparation",
    description:
      "Develop useful skills, responsibility and confidence for future study and work.",
  },
];

function OJTCard({ program, index }) {
  const [expanded, setExpanded] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  const gallery = [
    ...(program.image ? [program.image] : []),
    ...(program.gallery || []),
  ].filter((image, i, images) => images.indexOf(image) === i);

  const currentImage = gallery[photoIndex];

  function previousPhoto() {
    setPhotoIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  }

  function nextPhoto() {
    setPhotoIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  }

  async function shareOJT() {
    const url = `${window.location.origin}/ojt#${program.id}`;
    const data = {
      title: program.title,
      text: `${program.title} — ${school.name}, ${school.department}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${data.text}\n${url}`
        );
        setShareMessage("Link copied successfully.");
      } else {
        window.prompt("Copy this OJT link:", url);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareMessage("Sharing was unsuccessful. Please try again.");
      }
    }
  }

  return (
    <motion.article
      id={program.id}
      className="ojt-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="ojt-card-image">
        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${program.title} training activity`}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="ojt-image-fallback">
            <Sprout size={48} />
            <span>Training photos coming soon</span>
          </div>
        )}

        <span className="ojt-grade-label">
          {program.title}
        </span>

        {gallery.length > 1 && (
          <div className="ojt-gallery-controls">
            <button
              type="button"
              onClick={previousPhoto}
              aria-label="Previous training photo"
            >
              <ChevronLeft size={19} />
            </button>

            <span>
              {photoIndex + 1} / {gallery.length}
            </span>

            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next training photo"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}

        {gallery.length > 1 && (
          <span className="ojt-photo-count">
            <Images size={14} />
            {gallery.length} photos
          </span>
        )}
      </div>

      <div className="ojt-card-content">
        <span className="ojt-card-eyebrow">
          <BookOpen size={15} />
          Practical Agricultural Learning
        </span>

        <h2>{program.title}</h2>

        <p>{program.description}</p>

        {program.duration && (
          <div className="ojt-duration">
            <CalendarDays size={16} />
            <span>Duration: {program.duration}</span>
          </div>
        )}

        {expanded && (
          <motion.div
            className="ojt-expanded-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <h3>What students may learn</h3>

            <ul>
              <li>
                <CheckCircle2 size={16} />
                Observe and participate in relevant agricultural activities.
              </li>
              <li>
                <CheckCircle2 size={16} />
                Follow instructions and appropriate safety practices.
              </li>
              <li>
                <CheckCircle2 size={16} />
                Maintain activity records and practical observations.
              </li>
              <li>
                <CheckCircle2 size={16} />
                Reflect on skills learned and challenges encountered.
              </li>
            </ul>

            <p className="ojt-verification-note">
              Specific tasks, duration, assessment requirements
              and placement arrangements must follow the school's
              approved OJT guidelines.
            </p>
          </motion.div>
        )}

        <div className="ojt-card-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? "Show Less" : "View Details"}
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className="ojt-share-button"
            onClick={shareOJT}
            aria-label={`Share ${program.title}`}
          >
            <Share2 size={17} />
            Share
          </button>
        </div>

        {shareMessage && (
          <p className="ojt-share-message" role="status">
            {shareMessage}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function OJT() {
  return (
    <main className="ojt-page">
      <section className="ojt-hero">
        <div className="container ojt-hero-grid">
          <motion.div
            className="ojt-hero-content"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-eyebrow">
              <Sprout size={16} />
              Learn by Doing
            </span>

            <h1>
              On-the-Job
              <span> Training</span>
            </h1>

            <p>
              Practical learning helps Plant Science students
              connect classroom knowledge with real agricultural
              activities. Explore the OJT sections for Classes
              10, 11 and 12.
            </p>

            <a href="#ojt-levels" className="primary-button">
              Explore Training
              <ArrowUpRight size={17} />
            </a>

            <div className="ojt-hero-location">
              <GraduationCap size={18} />
              {school.department}
            </div>
          </motion.div>

          <div className="ojt-hero-art" aria-hidden="true">
            <div className="ojt-art-circle">
              <Tractor size={76} strokeWidth={1.2} />
            </div>
            <span className="ojt-art-leaf">
              <Sprout size={31} />
            </span>
            <span className="ojt-art-caption">
              Knowledge into Practice
            </span>
          </div>
        </div>
      </section>

      <section id="ojt-levels" className="container ojt-levels-section">
        <div className="section-heading">
          <span className="section-eyebrow">
            <ClipboardList size={15} />
            Training by Class
          </span>

          <h2>Explore OJT Opportunities</h2>

          <p>
            Select a class to explore its training overview,
            activities and available photographs.
          </p>
        </div>

        {ojtPrograms.length > 0 ? (
          <div className="ojt-cards-grid">
            {ojtPrograms.map((program, index) => (
              <OJTCard
                key={program.id}
                program={program}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="ojt-empty-state">
            <Sprout size={42} />
            <h2>OJT information coming soon</h2>
            <p>
              Training details will be published after confirmation
              by the department.
            </p>
          </div>
        )}
      </section>

      <section className="ojt-benefits-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">
              Learning Outcomes
            </span>

            <h2>Skills Beyond the Classroom</h2>

            <p>
              OJT can help students build practical skills and
              prepare for further study and agricultural work.
            </p>
          </div>

          <div className="ojt-benefits-grid">
            {learningBenefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  className="ojt-benefit-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <div className="ojt-benefit-icon">
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

      <section className="ojt-cta-section">
        <div className="container ojt-cta-inner">
          <div>
            <span className="section-eyebrow">
              Keep Learning
            </span>

            <h2>Explore Classes and Programs</h2>

            <p>
              Continue exploring academic information and
              agricultural learning opportunities.
            </p>
          </div>

          <div className="ojt-cta-actions">
            <Link to="/classes" className="primary-button">
              View Classes
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/programs" className="secondary-button">
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
