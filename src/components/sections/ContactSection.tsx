'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, CheckCircle } from 'lucide-react';
import {
  SOCIALS,
  CONTACT_SECTION_LABEL,
  CONTACT_TITLE_FIRST,
  CONTACT_TITLE_HIGHLIGHT,
  CONTACT_SUBHEADING,
  CONTACT_INFO_TITLE,
  CONTACT_INFO_TEXT,
  CONTACT_LOCATION,
  CONTACT_PHONE_INFO,
  PORTFOLIO_NAME
} from '@/constants';
import { SectionHeader } from '@/components/ui';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        {/* Header */}
        <SectionHeader
          label={CONTACT_SECTION_LABEL}
          titleFirst={CONTACT_TITLE_FIRST}
          titleHighlight={CONTACT_TITLE_HIGHLIGHT}
          subheading={CONTACT_SUBHEADING}
          subheadingClassName={styles.subheading}
        />

        <div className={styles.grid}>
          {/* Left: Info */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={`glass-card ${styles.infoCard}`}>
              <h3 className={styles.infoTitle}>{CONTACT_INFO_TITLE}</h3>
              <p className={styles.infoText}>
                {CONTACT_INFO_TEXT}
              </p>

              <div className={styles.details}>
                <div className={styles.detail}>
                  <MapPin size={16} color="#00d4ff" />
                  <span>{CONTACT_LOCATION}</span>
                </div>
                <div className={styles.detail}>
                  <Phone size={16} color="#7c3aed" />
                  <span>{CONTACT_PHONE_INFO}</span>
                </div>
              </div>

              <div className={styles.divider} />

              {/* Social links */}
              <div className={styles.socials}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    id={`contact-${s.label.toLowerCase()}`}
                    className={styles.social}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className={styles.socialIcon}
                      style={{ background: `color-mix(in srgb, ${s.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${s.color} 18%, transparent)` }}
                    >
                      <s.icon size={18} color={s.color} />
                    </div>
                    <div>
                      <p className={styles.socialLabel}>{s.label}</p>
                      <p className={styles.socialValue}>{s.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`glass-card ${styles.formCard}`}>
              {submitted ? (
                <motion.div
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={48} color="#00d4ff" />
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                  <button
                    className="btn-outline"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                  <h3 className={styles.formTitle}>Send a Message</h3>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name" className={styles.label}>Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className={styles.input}
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className={styles.label}>Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={styles.input}
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-subject" className={styles.label}>Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      className={styles.input}
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me more..."
                      className={`${styles.input} ${styles.textarea}`}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn-primary ${styles.submitBtn}`}
                    id="contact-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>
          Crafted with passion by <span className="gradient-text">{PORTFOLIO_NAME}</span> · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

export default ContactSection;
