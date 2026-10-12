import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import DynamicIcon from '../components/DynamicIcon';
import { ArrowLeft, Printer, Mail, Phone, MapPin, Globe, Download, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function Resume() {
  const { portfolio } = usePortfolio();

  const profile = portfolio?.profile || {
    name: 'THADD 101',
    title: 'Graphic Designer • Web & App Developer',
    email: 'thadd101.dev@gmail.com',
    phone: '+1 (234) 567-8900',
    location: 'Remote / Worldwide',
    bio1: 'Multi-disciplinary digital creator with deep expertise across modern graphic design, full-stack web development, and mobile application engineering.'
  };

  const experience = portfolio?.experience || [
    { title: 'Lead Web & App Developer', company: 'Tech Innovations Global', period: '2023 - Present', description: 'Spearheading multi-platform product development across web and mobile.' },
    { title: 'Senior Full Stack Developer', company: 'Digital Core Agency', period: '2022 - 2023', description: 'Engineered scalable client applications using React, Node.js, and PostgreSQL.' },
    { title: 'Graphic Designer & Frontend Developer', company: 'Pixel Craft Studio', period: '2020 - 2022', description: 'Delivered cohesive brand identities and modern UI/UX design mockups in Figma.' },
  ];

  const education = portfolio?.education || [
    { degree: 'Bachelor of Science in Computer Science', institution: 'State University of Technology', period: '2020 - 2024', description: 'Specialized in Software Engineering and Distributed Systems.' },
    { degree: 'Professional Certificate in UI/UX & Digital Design', institution: 'Interaction Design Institute', period: '2021', description: 'User experience research, design systems, and rapid prototyping.' }
  ];

  const skills = portfolio?.skills || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white py-12 px-6 md:px-16 transition-colors duration-300 print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Top Navigation & Print controls (Hidden when printing) */}
        <div className="flex items-center justify-between print:hidden">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-sky-500 dark:text-slate-400 dark:hover:text-[#38bdf8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Main Printable Resume Paper */}
        <div className="bg-white dark:bg-[#0c1222] p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl print:shadow-none print:border-none print:p-0 space-y-10">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-lg font-bold text-sky-600 dark:text-[#38bdf8] mt-1">
                {profile.title}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-3 leading-relaxed">
                {profile.bio1}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 shrink-0">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500" />
                {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                {profile.location}
              </span>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-500" />
              Core Competencies & Skills
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{s.name}</span>
                  <span className="text-[11px] font-bold text-sky-500">{s.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-500" />
              Work Experience
            </h2>

            <div className="space-y-6 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-white dark:ring-[#0c1222]" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{exp.period}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">{exp.company}</span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              Education & Certifications
            </h2>

            <div className="space-y-6 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-purple-500 ring-4 ring-white dark:ring-[#0c1222]" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{edu.period}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{edu.institution}</span>
                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}