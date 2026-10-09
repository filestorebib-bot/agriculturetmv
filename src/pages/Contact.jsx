
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Leaf,
} from "lucide-react";
import { school, contact } from "../data/siteData.js";

const schoolAddress =
  school.address || "Katari-4, Udayapur, Koshi Province, Nepal";

const schoolPhone = contact?.phone || school.phone || "035-450-154";
const schoolEmail = contact?.email || school.email || "";
const schoolHours = contact?.hours || "";
const mapQuery = encodeURIComponent(
  `${school.name || "Triveni Secondary School"}, ${schoolAddress}`
);

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setFeedback("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Please enter a subject.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback("");

    if (!validateForm()) return;

    if (!schoolEmail) {
      setFeedback(
        "The school's email address has not been configured yet. Please contact the school by phone."
      );
      return;
    }

    const subject = encodeURIComponent(form.subject.trim());

    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\n` +
        `Email: ${form.email.trim()}\n\n` +
        `Message:\n${form.message.trim()}`
    );

    window.location.href = `mailto:${schoolEmail}?subject=${subject}&body=${body}`;

    setFeedback(
      "Your email application should open with your message prepared. Please send it from your email application."
    );
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Visit our school",
      value: schoolAddress,
      description: "Find us in Katari, Udayapur, Nepal.",
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      action: "Get directions",
    },
    {
      icon: Phone,
      title: "Call the school",
      value: schoolPhone,
      description: "Contact the school office for enquiries.",
      href: `tel:${String(schoolPhone).replace(/[^\d+]/g, "")}`,
      action: "Call now",
    },
    ...(schoolEmail
      ? [
          {
            icon: Mail,
            title: "Email us",
            value: schoolEmail,
            description: "Send your questions or suggestions.",
            href: `mailto:${schoolEmail}`,
            action: "Send email",
          },
        ]
      : []),
    ...(schoolHours
      ? [
          {
            icon: Clock,
            title: "Office hours",
            value: schoolHours,
            description: "Contact us during the school's official hours.",
            href: "",
            action: "",
          },
        ]
      : []),
  ];

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-orb contact-hero-orb-one" />
        <div className="contact-hero-orb contact-hero-orb-two" />

        <div className="contact-container contact-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="contact-eyebrow">
              <MessageCircle size={16} />
              We would love to hear from you
            </span>

            <h1>
              Let's start a <span>conversation.</span>
            </h1>

            <p>
              Have a question about admissions, plant science education,
              practical learning, or school activities? Contact our school
              for more information.
            </p>

            <a href="#contact-details" className="contact-hero-button">
              Contact the school
              <Send size={17} />
            </a>
          </motion.div>
        </div>
      </section>

      <section
        className="contact-details-section"
        id="contact-details"
      >
        <div className="contact-container">
          <div className="contact-section-heading">
            <span className="contact-section-kicker">Get in touch</span>
            <h2>We're here to help</h2>
            <p>
              Choose the most convenient way to reach Triveni Secondary
              School, Department of Plant Science.
            </p>
          </div>

          <div className="contact-info-grid">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="contact-info-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                >
                  <div className="contact-info-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{item.title}</h3>
                  <p className="contact-info-value">{item.value}</p>
                  <p className="contact-info-description">
                    {item.description}
                  </p>

                  {item.href && (
                    <a
                      className="contact-info-link"
                      href={item.href}
                      target={
                        item.href.startsWith("https://") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("https://")
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      {item.action}
                      <ExternalLink size={15} />
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-container contact-main-grid">
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4 }}
          >
            <div className="contact-form-heading">
              <span className="contact-section-kicker">
                Send us a message
              </span>
              <h2>How can we help you?</h2>
              <p>
                Complete the form below. Your email application will open
                with the message prepared for you to send.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <span
                      className="contact-field-error"
                      id="contact-name-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <span
                      className="contact-field-error"
                      id="contact-email-error"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to ask about?"
                  value={form.subject}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                />
                {errors.subject && (
                  <span
                    className="contact-field-error"
                    id="contact-subject-error"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={updateField}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {errors.message && (
                  <span
                    className="contact-field-error"
                    id="contact-message-error"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {feedback && (
                <p className="contact-feedback" role="status">
                  {feedback}
                </p>
              )}

              <button type="submit" className="contact-submit-button">
                Prepare email
                <Send size={17} />
              </button>

              <p className="contact-form-note">
                <Mail size={14} />
                This form uses your device's email application. It does not
                send or store messages directly on this website.
              </p>
            </form>
          </motion.div>

          <aside className="contact-side-panel">
            <div className="contact-side-leaf">
              <Leaf size={29} />
            </div>

            <span className="contact-section-kicker">
              Plant science education
            </span>

            <h2>Growing knowledge. Cultivating the future.</h2>

            <p>
              Connect with the Department of Plant Science for information
              about academic programs, practical learning and school
              activities.
            </p>

            <div className="contact-side-divider" />

            <div className="contact-side-detail">
              <MapPin size={19} />
              <div>
                <strong>Our location</strong>
                <span>{schoolAddress}</span>
              </div>
            </div>

            <div className="contact-side-detail">
              <Phone size={19} />
              <div>
                <strong>School telephone</strong>
                <a href={`tel:${String(schoolPhone).replace(/[^\d+]/g, "")}`}>
                  {schoolPhone}
                </a>
              </div>
            </div>

            {schoolEmail && (
              <div className="contact-side-detail">
                <Mail size={19} />
                <div>
                  <strong>Email address</strong>
                  <a href={`mailto:${schoolEmail}`}>{schoolEmail}</a>
                </div>
              </div>
            )}

            <div className="contact-side-note">
              <CheckCircle2 size={18} />
              <span>
                Please use the official school contact details for
                confirmation of admissions, schedules and other important
                information.
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-map-section">
        <div className="contact-container">
          <div className="contact-map-heading">
            <div>
              <span className="contact-section-kicker">Find us</span>
              <h2>Visit our school</h2>
              <p>{schoolAddress}</p>
            </div>

            <a
              className="contact-map-button"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
            >
              Open Google Maps
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="contact-map-frame">
            <iframe
              title="Map showing the school location"
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <p className="contact-map-disclaimer">
            The map uses a location search for the school address. Please
            confirm the exact school entrance and directions before
            travelling.
          </p>
        </div>
      </section>
    </main>
  );
}
