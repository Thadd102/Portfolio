import React from 'react';
import { Monitor, Cpu, Server, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    id: '01',
    title: 'WEB DEVELOPMENT',
    description: 'Building modern, responsive websites with cutting-edge technologies and beautiful user interfaces.',
    tags: ['JavaScript', 'React', 'Next.js'],
    icon: Monitor,
    theme: {
      leftBorder: 'border-l-blue-500',
      iconBg: 'bg-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      badgeBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
    },
  },
  {
    id: '02',
    title: 'SOFTWARE DEVELOPMENT',
    description: 'Creating powerful, scalable applications with clean architecture and robust backend systems.',
    tags: ['Node.js', 'Python', 'TypeScript'],
    icon: Cpu,
    theme: {
      leftBorder: 'border-l-purple-500',
      iconBg: 'bg-purple-500',
      text: 'text-purple-600 dark:text-purple-400',
      badgeBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400',
    },
  },
  {
    id: '03',
    title: 'FULL STACK DEVELOPMENT',
    description: 'End-to-end development of web applications, from database design to deployment and monitoring.',
    tags: ['MERN', 'REST API', 'SQL'],
    icon: Server,
    theme: {
      leftBorder: 'border-l-emerald-500',
      iconBg: 'bg-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
    },
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Heading with Divider HR */}
        <div className="mb-12">
          <h2 className={styles.heading}>WHAT I'M OFFERING</h2>
          <hr className={styles.divider} />
        </div>

        {/* Services Cards Grid */}
        <div className={styles.grid}>
          {servicesData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className={`${styles.card} ${item.theme.leftBorder}`}
              >
                {/* Top Row: Icon Box & Card Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3.5 rounded-2xl ${item.theme.iconBg} text-white shadow-md shadow-slate-200 dark:shadow-none`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={styles.cardNumber}>
                    {item.id}
                  </span>
                </div>

                {/* Content */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide ${item.theme.badgeBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Arrow */}
                <div className="flex justify-end pt-2">
                  <button className={`p-2 transition-transform duration-200 group-hover:translate-x-1.5 ${item.theme.text}`}>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// STYLES OBJECT (React Native Style Pattern)
// ==========================================
const styles = {
  section: "py-20 md:py-28 transition-colors duration-300",
  container: "max-w-7xl mx-auto px-6 md:px-12",
  
  heading: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-wider uppercase",
  divider: "border-0 h-[1px] bg-slate-200 dark:bg-slate-800/80 mt-4",

  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  
  card: "group relative flex flex-col justify-between p-8 rounded-3xl bg-white border-l-4 border-y border-r border-slate-100 shadow-xl shadow-slate-200/50 dark:bg-[#0c1322] dark:border-y-slate-800/40 dark:border-r-slate-800/40 dark:shadow-none hover:-translate-y-1.5 transition-all duration-300",
  cardNumber: "text-4xl font-black text-slate-100 dark:text-slate-800/80 select-none",
  
  cardTitle: "text-xl font-extrabold text-slate-900 dark:text-white tracking-wide mb-3",
  cardDesc: "text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 min-h-[64px]",
};