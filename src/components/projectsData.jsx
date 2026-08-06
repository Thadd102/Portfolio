import React from 'react';
const images = import.meta.glob('../assets/web*.jpg', { eager: true, import: 'default' });
const projectsData = [
  {
    title: 'Modern Crypto Email Flasher Website',
    description: 'Flash Transaction Generator Receipt Generator User Dashboard with Account Activation Admin Management Panel Automated Email',
    image: images ['../assets/web2.jpg'], // Replace with your image link
    tags: [],
    detailsUrl: '#',
    externalUrl: '#',
  },
  {
    title: 'Law Firm Website',
    description: 'Professional digital platform designed for a modern law, attorney, and corporate consulting firm.',
    image: images ['../assets/web3.jpg'], // Replace with your image link
    tags: [],
    detailsUrl: '#',
    externalUrl: '#',
  },
  {
    title: 'Flight Booking & Ticket Reservation Website.',
    description: '* Flight Search Engine * Real-time Flight Data API Integration (Amadeus, AviationStack, etc.) ...',
    image: images ['../assets/web4.jpg'], // Replace with your image link
    tags: ['React.js', 'Next.js', 'Vue.js', '+1'],
    detailsUrl: '#',
    externalUrl: '#',
  },
  {
    title: 'Flight Booking & Ticket Reservation Website.',
    description: '* Flight Search Engine * Real-time Flight Data API Integration (Amadeus, AviationStack, etc.) ...',
    image: images ['../assets/web1.jpg'], // Replace with your image link
    tags: ['React.js', 'Next.js', 'Vue.js', '+1'],
    detailsUrl: '#',
    externalUrl: '#',
  },
  {
    title: 'Flight Booking & Ticket Reservation Website.',
    description: '* Flight Search Engine * Real-time Flight Data API Integration (Amadeus, AviationStack, etc.) ...',
    image: images ['../assets/web6.jpg'], // Replace with your image link
    tags: ['React.js', 'Next.js', 'Vue.js', '+1'],
    detailsUrl: '#',
    externalUrl: '#',
  },
  {
    title: 'Flight Booking & Ticket Reservation Website.',
    description: '* Flight Search Engine * Real-time Flight Data API Integration (Amadeus, AviationStack, etc.) ...',
    image: images ['../assets/web7.jpg'], // Replace with your image link
    tags: ['React.js', 'Next.js', 'Vue.js', '+1'],
    detailsUrl: '#',
    externalUrl: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.heading}>
            MY PROJECTS
          </h2>
          <p className={styles.subheading}>
            Explore my latest work and side projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {projectsData.map((project, index) => (
            <div key={index} className={styles.card}>
              
              {/* Image Preview Container */}
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
              </div>

              {/* Card Body */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>

                {/* Optional Tech Stack Tags */}
                {project.tags.length > 0 && (
                  <div className={styles.tagWrapper}>
                    {project.tags.map((tag, tIndex) => (
                      <span key={tIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Actions */}
                <div className={styles.actionWrapper}>
                  <a href={project.detailsUrl} className={styles.ctaButton}>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </a>

                  <a href={project.externalUrl} className={styles.iconButton} aria-label="External Link">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

              </div>

            </div>
          ))}
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
  headerWrapper: "mb-12 text-left",
  heading: "text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase",
  subheading: "text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 mt-2",

  // Grid Layout
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",

  // Card Structure
  card: "flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b101d] overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md",
  
  // Image Box
  imageWrapper: "w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-900",
  image: "w-full h-full object-cover transform hover:scale-105 transition-transform duration-500",

  // Card Content
  cardContent: "flex flex-col flex-1 p-6",
  cardTitle: "text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2",
  cardDescription: "text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mt-3 line-clamp-3 flex-1",

  // Tech Tags
  tagWrapper: "flex flex-wrap gap-2 mt-4",
  tag: "px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60",

  // Action Buttons
  actionWrapper: "flex items-center gap-3 mt-6 pt-2",
  ctaButton: "flex items-center gap-2 px-5 py-2.5 bg-sky-500 dark:bg-[#38bdf8] hover:bg-sky-600 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer shadow-sm",
  iconButton: "flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors",
};