
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Images,
  Leaf,
  Share2,
  Sprout,
} from "lucide-react";
import { programs, school } from "../data/siteData.js";

function ProgramCard({ program, index }) {
  const [expanded, setExpanded] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  const gallery = [
    ...(program.image ? [program.image] : []),
    ...(program.gallery || []),
  ].filter((image, index, images) => images.indexOf(image) === index);

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

  async function shareProgram() {
    const shareUrl = `${window.location.origin}/programs#${program.id}`;
    const shareData = {
      title: program.title,
      text: `${program.title} — ${school.name}, ${school.department}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareUrl}`
        );
        setShareMessage("Program link copied!");
      } else {
        window.prompt("Copy this program link:", shareUrl);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareMessage("Unable to share. Please try again.");
      }
    }
  }

  return (
    <motion.article
      id={program.id}
      className="program-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div className="program-image-wrap">
        {currentImage ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${program.title} activity`}
            className="program-image"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="program-image-fallback">
            <Sprout size={52} />
            <span>Program photo coming soon</span>
          </div>
        )}

        <span className="program-category">
          {program.category || "Plant Science"}
        </span>

        {gallery.length > 1 && (
          <div className="gallery-controls">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={previousPhoto}
            >
              <ChevronLeft size={19} />
            </button>

            <span>
              {photoIndex + 1} / {gallery.length}
            </span>

            <button
              type="button"
              aria-label="Next photo"
              onClick={nextPhoto}
            >
              <ChevronRight size={19} />
            </button>
          </div>
        )}

        {gallery.length > 1 && (
          <span className="program-photo-count">
            <Images size={14} />
            {gallery.length} photos
          </span>
        )}
      </div>

      <div className="program-card-body">
        <div className="program-card-heading">
          <div>
            <span className="program-overline">
              <Leaf size={14} />
              Plant Science Program
            </span>

            <h2>{program.title}</h2>
          </div>

          <span className="program-index">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="program-description">
          {program.description}
        </p>

        {expanded && (
          <motion.div
            className="program-extra-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <h3>About this program</h3>

            <p>
              {program.description} Students can use this section
              to learn about the program's objectives, practical
              activities and learning outcomes.
            </p>

            {program.date && (
              <p className="program-date">
                <CalendarDays size={16} />
                {program.date}
              </p>
            )}

            <p className="program-editor-note">
              Detailed activities, dates and outcomes should be
              updated with verified information from the school.
            </p>
          </motion.div>
        )}

        <div className="program-card-actions">
          <button
            type="button"
            className="program-read-more"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
          >
            {expanded ? "Show Less" : "Read More"}
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className="program-share-button"
            onClick={shareProgram}
          >
            <Share2 size={16} />
            Share
          </button>
        </div>

        {shareMessage && (
          <p className="program-share-message" role="status">
            {shareMessage}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Programs() {
  return (
    <main className="programs-page">
      <section className="programs-hero">
        <div className="container programs-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-eyebrow">
              <Sprout size={16} />
              Learn • Practice • Grow
            </span>

            <h1>
              Our Agricultural
              <span> Programs</span>
            </h1>

            <p>
              Discover practical learning activities, crop
              production and agricultural awareness initiatives
              through the Department of Plant Science at{" "}
              {school.name}.
            </p>

            <a href="#program-list" className="primary-button">
              Explore Programs
              <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <div className="programs-hero-decoration" aria-hidden="true">
            <div className="programs-decoration-circle">
              <Sprout size={76} strokeWidth={1.2} />
            </div>
            <span className="decoration-leaf decoration-leaf-one">
              <Leaf size={27} />
            </span>
            <span className="decoration-leaf decoration-leaf-two">
              <Leaf size={20} />
            </span>
          </div>
        </div>
      </section>

      <section
        id="program-list"
        className="container programs-list-section"
      >
        <div className="section-heading">
          <span className="section-eyebrow">
            <Leaf size={15} />
            Explore Activities
          </span>

          <h2>Learning Beyond the Classroom</h2>

          <p>
            Explore the programs listed below. Each card can
            display activity photographs and additional details
            when those are added to the website data.
          </p>
        </div>

        {programs.length > 0 ? (
          <div className="programs-grid">
            {programs.map((program, index) => (
              <ProgramCard
                key={program.id}
                program={program}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="programs-empty">
            <Sprout size={38} />
            <h2>Programs will be added soon</h2>
            <p>
              Please check again for Plant Science activities
              and agricultural learning opportunities.
            </p>
          </div>
        )}
      </section>

      <section className="programs-bottom-cta">
        <div className="container programs-bottom-cta-inner">
          <div>
            <span className="section-eyebrow">
              Explore More
            </span>
            <h2>Practical Learning Starts Here</h2>
            <p>
              Explore our classes or learn about On-the-Job
              Training opportunities.
            </p>
          </div>

          <div className="programs-cta-actions">
            <a href="/classes" className="primary-button">
              View Classes
              <ArrowUpRight size={17} />
            </a>

            <a href="/ojt" className="secondary-button">
              Explore OJT
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
