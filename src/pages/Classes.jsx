
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Leaf,
  Sprout,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { classes, school } from "../data/siteData.js";

function getSubjectName(subject) {
  if (typeof subject === "string") return subject;
  return subject?.name || subject?.title || "Subject";
}

function getSubjectDescription(subject) {
  if (typeof subject === "string") {
    return "Detailed subject information and syllabus can be added by the department.";
  }

  return (
    subject?.description ||
    "Detailed subject information and syllabus can be added by the department."
  );
}

function ClassCard({ item, index }) {
  return (
    <motion.article
      className="class-card"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
    >
      <div className="class-card-top">
        <span className="class-number">
          {String(item.grade).padStart(2, "0")}
        </span>

        <div className="class-card-icon">
          <GraduationCap size={25} />
        </div>
      </div>

      <span className="class-card-eyebrow">
        <Leaf size={14} />
        Plant Science Education
      </span>

      <h2>{item.title}</h2>
      <p>{item.description}</p>

      <div className="class-card-meta">
        <BookOpen size={16} />
        {item.subjects?.length || 0} subjects currently listed
      </div>

      <Link
        to={`/classes/${item.grade}`}
        className="class-card-link"
      >
        Explore Class
        <ArrowUpRight size={17} />
      </Link>
    </motion.article>
  );
}

function SubjectCard({ subject, index, onSelect }) {
  return (
    <motion.button
      type="button"
      className="subject-card"
      onClick={() => onSelect(subject)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
    >
      <span className="subject-card-icon">
        <BookOpen size={21} />
      </span>

      <span className="subject-card-text">
        <strong>{getSubjectName(subject)}</strong>
        <span>View subject details and syllabus</span>
      </span>

      <ChevronRight size={19} />
    </motion.button>
  );
}

function ClassDetail({ item }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = item.subjects || [];

  return (
    <main className="class-detail-page">
      <section className="class-detail-hero">
        <div className="container">
          <Link to="/classes" className="class-back-link">
            <ArrowLeft size={17} />
            All Classes
          </Link>

          <span className="section-eyebrow">
            <GraduationCap size={16} />
            {school.department}
          </span>

          <h1>{item.title}</h1>
          <p>{item.description}</p>

          <div className="class-detail-badges">
            <span>
              <BookOpen size={16} />
              {subjects.length} subjects listed
            </span>
            <span>
              <Sprout size={16} />
              Academic learning
            </span>
          </div>
        </div>
      </section>

      <section className="container class-subject-section">
        <div className="class-subject-heading">
          <div>
            <span className="section-eyebrow">
              Subject Directory
            </span>
            <h2>Subjects and Syllabus</h2>
            <p>
              Select a subject to see its description and
              available syllabus information.
            </p>
          </div>
        </div>

        {subjects.length > 0 ? (
          <div className="class-subject-layout">
            <div className="subject-list">
              {subjects.map((subject, index) => (
                <SubjectCard
                  key={
                    typeof subject === "string"
                      ? subject
                      : subject.id || subject.name || index
                  }
                  subject={subject}
                  index={index}
                  onSelect={setSelectedSubject}
                />
              ))}
            </div>

            <aside className="subject-detail-panel">
              {selectedSubject ? (
                <>
                  <span className="section-eyebrow">
                    Selected Subject
                  </span>

                  <h3>{getSubjectName(selectedSubject)}</h3>

                  <p>
                    {getSubjectDescription(selectedSubject)}
                  </p>

                  {typeof selectedSubject === "object" &&
                    selectedSubject.syllabus && (
                      <div className="subject-syllabus">
                        <h4>Syllabus</h4>
                        <p>{selectedSubject.syllabus}</p>
                      </div>
                    )}

                  {typeof selectedSubject === "object" &&
                    selectedSubject.pdf && (
                      <a
                        href={selectedSubject.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-button"
                      >
                        Open Syllabus
                        <ArrowUpRight size={16} />
                      </a>
                    )}

                  <button
                    type="button"
                    className="subject-clear-button"
                    onClick={() => setSelectedSubject(null)}
                  >
                    Close details
                  </button>
                </>
              ) : (
                <div className="subject-detail-empty">
                  <BookOpen size={32} />
                  <h3>Explore a Subject</h3>
                  <p>
                    Choose a subject from the list to view its
                    description and any available syllabus.
                  </p>
                </div>
              )}
            </aside>
          </div>
        ) : (
          <div className="class-empty-state">
            <BookOpen size={42} />

            <h3>Subject information will be added soon</h3>

            <p>
              The subject list and official syllabus for this
              class have not yet been entered. Add verified
              subject names and syllabus information to the
              classes data in{" "}
              <code>src/data/siteData.js</code>.
            </p>

            <Link to="/contact" className="primary-button">
              Contact the Department
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </section>

      <section className="class-learning-note">
        <div className="container class-learning-note-inner">
          <div className="class-note-icon">
            <CheckCircle2 size={25} />
          </div>

          <div>
            <h3>Official syllabus and learning resources</h3>
            <p>
              Use the syllabus and materials approved by the
              school and the relevant education authority.
              This website will display the resources added
              by the department.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Classes() {
  const { grade } = useParams();

  if (grade) {
    const selectedClass = classes.find(
      (item) => String(item.grade) === String(grade)
    );

    if (!selectedClass) {
      return (
        <main className="container class-empty-state">
          <h1>Class not found</h1>
          <p>Please select one of the available class levels.</p>
          <Link to="/classes" className="primary-button">
            View All Classes
          </Link>
        </main>
      );
    }

    return <ClassDetail item={selectedClass} />;
  }

  return (
    <main className="classes-page">
      <section className="classes-hero">
        <div className="container classes-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-eyebrow">
              <Leaf size={16} />
              Academic Information
            </span>

            <h1>
              Explore Your
              <span> Class & Subjects</span>
            </h1>

            <p>
              Find class-level information, subject descriptions
              and available syllabus resources for Classes 9,
              10, 11 and 12 in the Department of Plant Science.
            </p>

            <a href="#class-directory" className="primary-button">
              Browse Classes
              <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <div className="classes-hero-art" aria-hidden="true">
            <div className="classes-hero-circle">
              <GraduationCap size={70} strokeWidth={1.3} />
            </div>
            <Sprout className="classes-hero-sprout" size={38} />
          </div>
        </div>
      </section>

      <section
        id="class-directory"
        className="container class-directory-section"
      >
        <div className="section-heading">
          <span className="section-eyebrow">
            Class Directory
          </span>

          <h2>Choose Your Class</h2>

          <p>
            Select your class to explore the subjects and
            syllabus information currently available.
          </p>
        </div>

        <div className="classes-grid">
          {classes.map((item, index) => (
            <ClassCard
              key={item.grade}
              item={item}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="classes-bottom-cta">
        <div className="container classes-bottom-cta-inner">
          <div>
            <span className="section-eyebrow">
              Practical Learning
            </span>

            <h2>Connect Knowledge with Practice</h2>

            <p>
              Explore agricultural programs and On-the-Job
              Training opportunities.
            </p>
          </div>

          <div className="classes-cta-actions">
            <Link to="/programs" className="primary-button">
              View Programs
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/ojt" className="secondary-button">
              Explore OJT
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
