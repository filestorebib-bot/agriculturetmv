
import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}) {
  return (
    <motion.div
      className={`section-heading section-heading--${align}${
        light ? " section-heading--light" : ""
      }`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}

      {title && <h2 className="section-heading__title">{title}</h2>}

      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </motion.div>
  );
}
