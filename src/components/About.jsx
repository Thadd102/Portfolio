import React from 'react';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Heading */}
        <h2 className={styles.heading}>
          About Me
        </h2>

        {/* Content Paragraphs */}
        <div className={styles.contentWrapper}>
          <p className={styles.paragraph}>
            I am a <span className={styles.highlight}>Web & Software Developer</span> driven by a passion for building fast, scalable, and intuitive digital experiences. Specializing in end-to-end development, I combine clean frontend interfaces with robust backend architectures to turn complex ideas into seamless web products.
          </p>

          <p className={styles.paragraph}>
            My stack centers around modern technologies like <span className={styles.highlight}>Next.js, Supabase, and PostgreSQL</span>, with an emphasis on performance, maintainability, and clean code. Whether engineering custom tools or scaling full-stack platforms, I build solutions that deliver real value.
          </p>
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
  container: "max-w-4xl mx-auto px-6 text-center",
  
  heading: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-6 sm:mb-8",
  
  contentWrapper: "space-y-5 sm:space-y-6 max-w-4xl mx-auto",
  
  // Slightly smaller, crisp typography
  paragraph: "text-base sm:text-lg md:text-xl font-normal text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide",
  
  highlight: "font-semibold text-sky-500 dark:text-[#38bdf8]",
};