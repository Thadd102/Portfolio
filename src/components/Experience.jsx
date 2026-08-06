import React from 'react';

const experienceData = [
  { title: 'Lead Web Developer', period: '2020 - 2022' },
  { title: 'Full Stack Developer', period: '2022 - 2026' },
  { title: 'Backend Developer', period: '2022 - 2026' },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.gridWrapper}>
          
          {/* Left Column: Experience */}
          <div>
            <h2 className={styles.columnHeading}>
              Experience
            </h2>
            <div className={styles.cardList}>
              {experienceData.map((exp, index) => (
                <div key={index} className={styles.card}>
                  <h3 className={styles.cardTitle}>{exp.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardPeriod}>{exp.period}</span>
                    <svg
                      className={styles.arrowIcon}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Case Study */}
          <div>
            <h2 className={styles.columnHeading}>
              Case Study
            </h2>
            <div className={styles.caseStudyWrapper}>
              <h3 className={styles.caseStudyTitle}>
                Real-time Chat Application with Node.js
              </h3>
              <p className={styles.caseStudyDescription}>
                Built a real-time chat application for a startup using Node.js and
                Socket.io that supports live messaging with multiple users.
              </p>
              <div>
                <button className={styles.ctaButton}>
                  View Details
                </button>
              </div>
            </div>
          </div>

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
  gridWrapper: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16",
  
  // Section Headings (Adapts to Light & Dark)
  columnHeading: "text-2xl sm:text-3xl font-black tracking-wider uppercase mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white",
  
  // Experience List Cards
  cardList: "flex flex-col gap-4",
  card: "flex items-center justify-between p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all cursor-pointer group",
  cardTitle: "text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100",
  cardMeta: "flex items-center gap-3 text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors",
  cardPeriod: "text-sm font-medium tracking-wide",
  arrowIcon: "w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform",
  
  // Case Study Styles
  caseStudyWrapper: "flex flex-col gap-4",
  caseStudyTitle: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug",
  caseStudyDescription: "text-base sm:text-lg font-normal text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg",
  
  // Button Style
  ctaButton: "mt-2 px-6 py-3 bg-sky-500 dark:bg-[#38bdf8] hover:bg-sky-600 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold rounded-full transition-colors duration-200 cursor-pointer shadow-sm",
};