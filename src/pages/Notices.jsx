
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowDownToLine,
  Bell,
  CalendarDays,
  FileText,
  Image as ImageIcon,
  Search,
  Share2,
  ExternalLink,
  Pin,
  X,
  ClipboardCheck,
} from "lucide-react";
import { notices, school } from "../data/siteData.js";

function formatDate(dateString) {
  if (!dateString) return "Date not specified";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getNoticeType(notice) {
  const type = String(notice.type || "").toLowerCase();

  if (type === "pdf" || /\.pdf($|\?)/i.test(notice.file || "")) {
    return "PDF";
  }

  if (
    type === "image" ||
    notice.image ||
    /\.(png|jpe?g|webp|gif)($|\?)/i.test(notice.file || "")
  ) {
    return "Image";
  }

  return "Notice";
}

function NoticeCard({ notice, index, onPreview }) {
  const type = getNoticeType(notice);

  return (
    <motion.article
      className="notice-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.3) }}
    >
      {notice.image && (
        <button
          type="button"
          className="notice-card-image"
          onClick={() => onPreview(notice)}
          aria-label={`Preview ${notice.title}`}
        >
          <img src={notice.image} alt={notice.title} loading="lazy" />
        </button>
      )}

      <div className="notice-card-content">
        <div className="notice-card-meta">
          <span className="notice-type">
            {type === "PDF" ? (
              <FileText size={15} />
            ) : type === "Image" ? (
              <ImageIcon size={15} />
            ) : (
              <Bell size={15} />
            )}
            {type}
          </span>

          {notice.pinned && (
            <span className="notice-pinned">
              <Pin size={13} />
              Important
            </span>
          )}
        </div>

        <p className="notice-date">
          <CalendarDays size={15} />
          {formatDate(notice.date)}
        </p>

        <h3>{notice.title || "Untitled notice"}</h3>

        <p className="notice-summary">
          {notice.summary ||
            notice.content ||
            "Open this notice to view the available information."}
        </p>

        <div className="notice-card-actions">
          <button
            type="button"
            className="notice-action-primary"
            onClick={() => onPreview(notice)}
          >
            View notice
            <ExternalLink size={16} />
          </button>

          {notice.file && (
            <a
              className="notice-action-download"
              href={notice.file}
              download
              target="_blank"
              rel="noreferrer"
              aria-label={`Download ${notice.title}`}
            >
              <ArrowDownToLine size={17} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function NoticePreview({ notice, onClose }) {
  if (!notice) return null;

  const type = getNoticeType(notice);
  const previewUrl = notice.file || notice.image;

  const handleShare = async () => {
    const url = `${window.location.origin}/notices/${notice.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: notice.title,
          text: notice.summary || notice.content || "",
          url,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        window.alert("Notice link copied.");
      } else {
        window.prompt("Copy this notice link:", url);
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        window.prompt("Copy this notice link:", url);
      }
    }
  };

  return (
    <div
      className="notice-preview-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="notice-preview-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-preview-title"
      >
        <div className="notice-preview-header">
          <div>
            <span className="notice-preview-eyebrow">
              <Bell size={15} />
              Official notice
            </span>
            <h2 id="notice-preview-title">{notice.title}</h2>
            <p>
              <CalendarDays size={15} />
              {formatDate(notice.date)}
            </p>
          </div>

          <button
            type="button"
            className="notice-preview-close"
            onClick={onClose}
            aria-label="Close notice"
          >
            <X size={21} />
          </button>
        </div>

        <div className="notice-preview-body">
          {notice.summary && (
            <p className="notice-preview-summary">{notice.summary}</p>
          )}

          {notice.content && (
            <div className="notice-full-content">
              {notice.content.split("\n").map((paragraph, index) =>
                paragraph.trim() ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          )}

          {type === "PDF" && previewUrl && (
            <div className="notice-pdf-preview">
              <iframe
                src={previewUrl}
                title={`PDF preview: ${notice.title}`}
                loading="lazy"
              />
              <p>
                If the PDF does not display, open it in a new tab or download
                it using the options below.
              </p>
            </div>
          )}

          {type === "Image" && previewUrl && (
            <div className="notice-image-preview">
              <img src={previewUrl} alt={notice.title} />
            </div>
          )}

          {!notice.content && !previewUrl && !notice.summary && (
            <p>More information for this notice will be published soon.</p>
          )}
        </div>

        <div className="notice-preview-footer">
          <button
            type="button"
            className="notice-action-secondary"
            onClick={handleShare}
          >
            <Share2 size={16} />
            Share
          </button>

          {previewUrl && (
            <>
              <a
                className="notice-action-secondary"
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} />
                Open file
              </a>

              <a
                className="notice-action-primary"
                href={previewUrl}
                download
                target="_blank"
                rel="noreferrer"
              >
                <ArrowDownToLine size={16} />
                Download
              </a>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function Notices() {
  const { noticeId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [previewNotice, setPreviewNotice] = useState(null);
  const [copied, setCopied] = useState(false);

  const noticeList = Array.isArray(notices) ? notices : [];

  const selectedNotice = noticeId
    ? noticeList.find((notice) => String(notice.id) === noticeId)
    : null;

  const filteredNotices = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return [...noticeList]
      .filter((notice) => {
        const matchesSearch =
          !search ||
          [notice.title, notice.summary, notice.content, notice.type]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(search));

        const type = getNoticeType(notice).toLowerCase();

        const matchesFilter =
          filter === "all" ||
          (filter === "important" && notice.pinned) ||
          (filter === "pdf" && type === "pdf") ||
          (filter === "image" && type === "image") ||
          (filter === "text" && type === "notice");

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (Boolean(a.pinned) !== Boolean(b.pinned)) {
          return a.pinned ? -1 : 1;
        }

        return String(b.date || "").localeCompare(String(a.date || ""));
      });
  }, [noticeList, searchTerm, filter]);

  const openNotice = (notice) => {
    if (notice?.id) {
      window.history.pushState({}, "", `/notices/${notice.id}`);
    }
    setPreviewNotice(notice);
  };

  const closePreview = () => {
    setPreviewNotice(null);
    setCopied(false);
  };

  const copyNoticeLink = async (notice) => {
    const url = `${window.location.origin}/notices/${notice.id}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this notice link:", url);
    }
  };

  if (noticeId) {
    if (selectedNotice) {
      return (
        <main className="notices-page">
          <section className="notice-detail-section">
            <div className="notice-container">
              <Link to="/notices" className="notice-back-link">
                <ArrowLeft size={17} />
                All notices
              </Link>

              <NoticeCard
                notice={selectedNotice}
                index={0}
                onPreview={setPreviewNotice}
              />

              <div className="notice-detail-actions">
                <button
                  type="button"
                  className="notice-action-secondary"
                  onClick={() => copyNoticeLink(selectedNotice)}
                >
                  {copied ? (
                    <ClipboardCheck size={16} />
                  ) : (
                    <Share2 size={16} />
                  )}
                  {copied ? "Link copied" : "Copy notice link"}
                </button>
              </div>
            </div>
          </section>

          <NoticePreview
            notice={previewNotice}
            onClose={closePreview}
          />
        </main>
      );
    }

    return (
      <main className="notices-page">
        <section className="notice-empty-state">
          <FileText size={40} />
          <h1>Notice not found</h1>
          <p>
            This notice may have been removed or the link may be incorrect.
          </p>
          <Link to="/notices" className="notice-action-primary">
            <ArrowLeft size={16} />
            View all notices
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="notices-page">
      <section className="notice-hero">
        <div className="notice-hero-decoration notice-hero-decoration-one" />
        <div className="notice-hero-decoration notice-hero-decoration-two" />

        <div className="notice-container notice-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="notice-hero-label">
              <Bell size={16} />
              School announcements
            </span>

            <h1>
              Notices & <span>Updates</span>
            </h1>

            <p>
              Stay informed about academic announcements, examinations,
              admissions, practical activities and important updates from{" "}
              {school.name || "our school"}.
            </p>

            <div className="notice-hero-stats">
              <div>
                <strong>{noticeList.length}</strong>
                <span>Published notices</span>
              </div>
              <div>
                <strong>
                  {noticeList.filter((notice) => notice.pinned).length}
                </strong>
                <span>Important updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="notice-list-section">
        <div className="notice-container">
          <div className="notice-list-heading">
            <div>
              <span className="notice-section-kicker">Stay connected</span>
              <h2>Latest announcements</h2>
              <p>Find and view the information you need.</p>
            </div>
          </div>

          <div className="notice-toolbar">
            <label className="notice-search">
              <Search size={19} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search notices..."
                aria-label="Search notices"
              />
            </label>

            <div
              className="notice-filters"
              role="group"
              aria-label="Filter notices"
            >
              {[
                ["all", "All notices"],
                ["important", "Important"],
                ["pdf", "PDF files"],
                ["image", "Images"],
                ["text", "Text notices"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={filter === value ? "active" : ""}
                  onClick={() => setFilter(value)}
                  aria-pressed={filter === value}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredNotices.length > 0 ? (
            <div className="notices-grid">
              {filteredNotices.map((notice, index) => (
                <NoticeCard
                  key={notice.id || notice.title || index}
                  notice={notice}
                  index={index}
                  onPreview={openNotice}
                />
              ))}
            </div>
          ) : (
            <div className="notice-empty-state">
              <Search size={36} />
              <h3>No notices found</h3>
              <p>
                Try another search term or choose a different filter.
              </p>
              <button
                type="button"
                className="notice-action-primary"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <NoticePreview notice={previewNotice} onClose={closePreview} />
    </main>
  );
}
