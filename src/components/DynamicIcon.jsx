import React from 'react';
import * as Icons from 'lucide-react';

export default function DynamicIcon({ name, className = 'w-5 h-5', fallback = 'Sparkles' }) {
  if (!name) return <Icons.Sparkles className={className} />;

  const lower = name.toLowerCase().trim();

  // Social Brand SVGs (since Lucide v1 doesn't include trademark brand icons)
  if (lower === 'github' || lower === 'git') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (lower === 'linkedin') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }

  if (lower === 'twitter' || lower === 'x' || lower === 'twitter/x') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }

  if (lower === 'whatsapp') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
      </svg>
    );
  }

  if (lower === 'instagram') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }

  if (lower === 'facebook') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    );
  }

  if (lower === 'dribbble') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
      </svg>
    );
  }

  if (lower === 'behance') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.228 11.722c1.472-.347 2.378-1.464 2.378-2.932 0-2.31-1.782-3.49-4.333-3.49H0v13.4h6.582c2.81 0 4.747-1.385 4.747-3.957 0-1.572-.992-2.723-3.101-3.021zM2.87 7.42h3.022c1.24 0 2.025.592 2.025 1.701 0 1.05-.785 1.642-2.025 1.642H2.87V7.42zm3.332 9.16H2.87v-3.82h3.332c1.41 0 2.29.691 2.29 1.89 0 1.22-.88 1.93-2.29 1.93zm11.956-6.68c-3.35 0-5.46 2.45-5.46 5.68 0 3.32 2.09 5.72 5.6 5.72 2.5 0 4.19-1.22 4.96-3.32h-2.52c-.44.89-1.28 1.34-2.42 1.34-1.63 0-2.61-1.07-2.72-2.65h7.79c.07-.37.1-.73.1-1.09 0-3.36-2.08-5.68-5.33-5.68zm-2.56 4.3c.18-1.28 1.04-2.2 2.5-2.2 1.44 0 2.27.92 2.42 2.2h-4.92zM14.54 5.92h5.7v1.64h-5.7z"/>
      </svg>
    );
  }

  // Format into PascalCase for standard Lucide icons
  const formattedName = name
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  const Component = Icons[formattedName] || Icons[fallback] || Icons.Sparkles;
  return <Component className={className} />;
}
