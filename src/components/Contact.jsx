import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., EmailJS, Formspree, or custom API)
    console.log('Form Submitted:', formData);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.heading}>
            LET'S CONNECT
          </h2>
          <div className={styles.headerLine} />
        </div>

        {/* Content Layout */}
        <div className={styles.gridWrapper}>
          
          {/* Left Column: Get In Touch */}
          <div className={styles.infoWrapper}>
            <h3 className={styles.title}>Get In Touch</h3>
            <p className={styles.description}>
              Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities and ideas.
            </p>

            <div className={styles.socialSection}>
              <span className={styles.socialLabel}>FIND ME ON</span>
              <div className={styles.socialIconsWrapper}>
                
                {/* Email */}
                <a href="mailto:your.email@example.com" className={styles.socialIcon} aria-label="Email">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>

                {/* Facebook / Social */}
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                {/* Phone / Call */}
                <a href="tel:+1234567890" className={styles.socialIcon} aria-label="Phone">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name Input */}
              <div className={styles.inputBox}>
                <svg className={styles.inputIcon} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              {/* Email Input */}
              <div className={styles.inputBox}>
                <span className={styles.atSymbol}>@</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

            </div>

            {/* Subject Input */}
            <div className={styles.inputBox}>
              <svg className={styles.inputIcon} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>

            {/* Message Textarea */}
            <div className={styles.textareaBox}>
              <svg className={styles.textareaIcon} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className={styles.textareaField}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn}>
              <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// STYLES OBJECT (React Native Style Pattern)
// ==========================================
const styles = {
  section: "relative py-16 md:py-24 bg-transparent transition-colors duration-300",
  container: "max-w-7xl mx-auto px-6 md:px-12",

  // Header Styles
  headerWrapper: "flex items-center gap-6 mb-12",
  heading: "text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase whitespace-nowrap",
  headerLine: "h-[1px] w-full bg-slate-200 dark:bg-slate-800 hidden sm:block",

  // Layout Grid
  gridWrapper: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start",

  // Info Column
  infoWrapper: "lg:col-span-5 flex flex-col gap-4",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100",
  description: "text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-md",

  // Social Section
  socialSection: "mt-6 flex flex-col gap-3",
  socialLabel: "text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase",
  socialIconsWrapper: "flex items-center gap-3",
  socialIcon: "flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500 dark:hover:border-[#38bdf8] transition-all duration-200 shadow-sm",

  // Form Styles
  formWrapper: "lg:col-span-7 flex flex-col gap-4",
  
  // Input Containers with Icons
  inputBox: "relative flex items-center rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1222] focus-within:border-sky-500 dark:focus-within:border-sky-500 transition-colors",
  inputIcon: "absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none",
  atSymbol: "absolute left-4 text-base font-medium text-slate-400 dark:text-slate-500 pointer-events-none select-none",
  inputField: "w-full py-3.5 pl-12 pr-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base outline-none",

  // Textarea Container
  textareaBox: "relative flex rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c1222] focus-within:border-sky-500 dark:focus-within:border-sky-500 transition-colors",
  textareaIcon: "absolute left-4 top-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none",
  textareaField: "w-full py-3.5 pl-12 pr-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base outline-none resize-none",

  // Submit Button
  submitBtn: "w-full py-4 mt-2 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl transition-colors duration-200 cursor-pointer shadow-md text-base",
};