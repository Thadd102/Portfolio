import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import DynamicIcon from './DynamicIcon';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const { portfolio, submitMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    serviceCategory: 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const profile = portfolio?.profile || {
    email: "thadd101.dev@gmail.com",
    phone: "+1 (234) 567-8900",
    location: "Remote / Worldwide",
    badgeText: "Available for work"
  };

  const socials = (portfolio?.socials || []).filter(s => s.isActive);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const res = await submitMessage(formData);
    if (res.success) {
      setStatus({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        subject: '',
        serviceCategory: 'Web Development',
        message: '',
      });
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 7000);
    } else {
      setStatus({ loading: false, success: false, error: res.error || 'Failed to send message.' });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Start A Conversation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Let's Connect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3">
            Have a project in mind, need design direction, or looking to engineer a custom web or mobile application? Let's talk!
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info & Socials (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Reach out directly via email, phone, or any of the social channels below. I respond to all inquiries within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <a 
                  href={`mailto:${profile.email}`} 
                  className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-500 dark:text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                    <span className="block text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href={`tel:${profile.phone}`} 
                  className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                    <span className="block text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {profile.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                    <span className="block text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {socials.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                    Connect On Socials:
                  </span>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {socials.map((soc) => (
                      <a
                        key={soc.id}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-[#38bdf8] hover:border-sky-500/50 hover:scale-110 active:scale-95 transition-all shadow-sm"
                        aria-label={soc.platform}
                        title={soc.platform}
                      >
                        <DynamicIcon name={soc.icon || soc.platform} className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col gap-5">
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Send a Message
              </h3>

              {/* Alerts */}
              {status.success && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm font-semibold flex items-center gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080d19] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080d19] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Subject & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project inquiry / Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080d19] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080d19] text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 transition-colors text-sm cursor-pointer"
                  >
                    <option value="Graphic Design">Graphic & UI/UX Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Backend Engineering">Backend Engineering</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project, timeline, and goals..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#080d19] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full py-4 mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 text-base"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}