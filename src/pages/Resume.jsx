import React from 'react';
import { Link } from 'react-router-dom'; // or standard <a> if not using react-router

const skillsData = [
  {
    title: 'Frontend Development',
    desc: 'React, Next.js, TypeScript, Tailwind CSS',
    icon: (
      <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/20',
  },
  {
    title: 'Backend Development',
    desc: 'Node.js, Python, PostgreSQL, REST APIs',
    icon: (
      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
  },
  {
    title: 'Full Stack Applications',
    desc: 'MERN Stack, Supabase, Cloud Deployment',
    icon: (
      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
  },
  {
    title: 'Software Architecture',
    desc: 'Scalable systems, clean code, CI/CD',
    icon: (
      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
  },
];

const experienceList = [
  {
    title: 'Lead Web Developer',
    company: 'Tech Company',
    period: '2023 - Present',
    desc: 'Leading frontend development, architecture decisions, and mentoring junior developers.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Software Agency',
    period: '2022 - 2023',
    desc: 'Built scalable web applications using React, Node.js, and PostgreSQL.',
  },
  {
    title: 'Backend Developer',
    company: 'Startup',
    period: '2021 - 2022',
    desc: 'Designed and implemented REST APIs, database schemas, and server infrastructure.',
  },
];

const educationList = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University',
    period: '2020 - 2024',
  },
];

export default function Resume() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Back Link */}
        <Link to="/" className={styles.backLink}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>My Resume</h1>
          <p className={styles.subtitle}>
            A summary of my skills, experience, and education. Download the full PDF for more details.
          </p>

          <button className={styles.downloadBtn} disabled>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume Not Available
          </button>
        </header>

        {/* Skills Cards Grid */}
        <div className={styles.skillsGrid}>
          {skillsData.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
              <div className={`${styles.iconContainer} ${skill.iconBg}`}>
                {skill.icon}
              </div>
              <h3 className={styles.skillTitle}>{skill.title}</h3>
              <p className={styles.skillDesc}>{skill.desc}</p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconBg}>
              <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>

          <div className={styles.timelineList}>
            {experienceList.map((exp, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <h3 className={styles.itemTitle}>{exp.title}</h3>
                <span className={styles.itemSubtitle}>{exp.company} • {exp.period}</span>
                <p className={styles.itemDesc}>{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIconBg}>
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h2 className={styles.sectionTitle}>Education</h2>
          </div>

          <div className={styles.timelineList}>
            {educationList.map((edu, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDotPurple} />
                <h3 className={styles.itemTitle}>{edu.degree}</h3>
                <span className={styles.itemSubtitle}>{edu.institution} • {edu.period}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// ==========================================
// STYLES OBJECT (Dual Theme Support)
// ==========================================
const styles = {
  pageWrapper: "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white py-12 px-6 md:px-16 transition-colors duration-300",
  container: "max-w-5xl mx-auto flex flex-col gap-10",

  // Back Button
  backLink: "inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors w-fit",

  // Header
  header: "flex flex-col items-start gap-4",
  title: "text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white",
  subtitle: "text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed",
  downloadBtn: "inline-flex items-center gap-2 px-6 py-3 bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold rounded-full border border-slate-300 dark:border-slate-700/60 cursor-not-allowed opacity-90",

  // Skills Grid
  skillsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
  skillCard: "flex flex-col p-6 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-all",
  iconContainer: "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
  skillTitle: "text-base font-bold text-slate-900 dark:text-slate-100 mb-1",
  skillDesc: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed",

  // Timeline Container Card
  sectionCard: "p-8 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-none flex flex-col gap-8",
  sectionHeader: "flex items-center gap-3",
  sectionIconBg: "w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center",
  sectionTitle: "text-2xl font-bold text-slate-900 dark:text-white",

  // Timeline Content
  timelineList: "flex flex-col gap-8 pl-2 border-l border-slate-200 dark:border-slate-800 ml-4",
  timelineItem: "relative pl-6 flex flex-col gap-1",
  timelineDot: "absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-slate-50 dark:ring-slate-950",
  timelineDotPurple: "absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-slate-50 dark:ring-slate-950",
  itemTitle: "text-lg font-bold text-slate-900 dark:text-slate-100",
  itemSubtitle: "text-sm text-sky-600 dark:text-sky-400 font-medium mb-1",
  itemDesc: "text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl",
};