import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, Zap, ArrowUpRight } from 'lucide-react';

export default function Experience() {
  const { portfolio } = usePortfolio();

  const experienceData = portfolio?.experience || [
    { title: 'Lead Web & App Developer', company: 'Tech Innovations Global', period: '2023 - Present', description: 'Spearheading multi-platform product development across web and mobile.' },
    { title: 'Senior Full Stack Developer', company: 'Digital Core Agency', period: '2022 - 2023', description: 'Engineered scalable client applications using React, Node.js, and PostgreSQL.' },
    { title: 'Graphic Designer & Frontend Developer', company: 'Pixel Craft Studio', period: '2020 - 2022', description: 'Delivered cohesive brand identities and modern UI/UX design mockups in Figma.' },
  ];

  const caseStudy = portfolio?.caseStudy || {
    title: 'Real-time Multi-Platform Collaboration Suite',
    description: 'Engineered an end-to-end real-time communication platform supporting live chat, audio/video rooms, role management, and instant notifications. Scaled to handle high-concurrency connections with sub-50ms latency across web and mobile clients.',
    tags: ['Node.js', 'Socket.io', 'React', 'PostgreSQL', 'WebRTC'],
    metrics: [
      { label: 'Latency', value: '<45ms' },
      { label: 'Active Users', value: '12,000+' },
      { label: 'Platform Uptime', value: '99.99%' }
    ],
    detailsUrl: '#contact'
  };

  return (
    <section id="experience" className="relative py-20 md:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Work Experience (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 dark:text-[#38bdf8]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-slate-900 dark:text-white">
                Experience
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {experienceData.map((exp, index) => (
                <div 
                  key={exp.id || index} 
                  className="flex flex-col sm:flex-row sm:items-start justify-between p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0c1222] hover:border-sky-500/50 hover:shadow-md transition-all group"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-[#38bdf8] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3 sm:mt-0 shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40">
                      {exp.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Case Study Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-slate-900 dark:text-white">
                Featured Case Study
              </h2>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-[#0c1222] dark:to-[#080d19] border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-sky-500 uppercase">
                  Architecture & Impact
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3 leading-snug">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {caseStudy.description}
                </p>

                {/* Metrics Grid */}
                {(caseStudy.metrics || []).length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block text-base sm:text-lg font-black text-sky-600 dark:text-[#38bdf8]">
                          {metric.value}
                        </span>
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                {(caseStudy.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {caseStudy.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-md shadow-sky-500/20 text-sm cursor-pointer"
                >
                  <span>Inquire About Similar Build</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}