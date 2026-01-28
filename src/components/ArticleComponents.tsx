"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60]" style={{ backgroundColor: '#1c1c1c' }}>
      <div
        className="h-full transition-all duration-150"
        style={{ width: `${progress}%`, backgroundColor: '#b8860b' }}
      />
    </div>
  );
}

export function ShareButton({ platform, url, title }: { platform: string; url: string; title: string }) {
  const shareUrls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  };

  const icons: Record<string, string> = {
    twitter: "𝕏",
    linkedin: "in",
    email: "✉",
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
      style={{ border: '1px solid #2a2a2a', color: '#a1a1aa' }}
      title={`Share on ${platform}`}
    >
      <span className="text-sm">{icons[platform]}</span>
    </a>
  );
}

export function ShareQuoteButton({ quote, author, baseUrl }: { quote: string; author: string; baseUrl: string }) {
  const handleShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" — ${author}, The Order of Change`)}&url=${encodeURIComponent(baseUrl)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="mt-6 font-mono text-[10px] uppercase tracking-wider px-4 py-2 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
      style={{ border: '1px solid #2a2a2a', color: '#a1a1aa' }}
    >
      Share Quote →
    </button>
  );
}

export function StickyShareBar({ title, isScrolled }: { title: string; isScrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);

    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 transition-all duration-300"
      style={{
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? 'translateY(-50%)' : 'translateY(-50%) translateX(-20px)',
        pointerEvents: scrolled ? 'auto' : 'none',
      }}
    >
      <ShareButton platform="twitter" url={shareUrl} title={title} />
      <ShareButton platform="linkedin" url={shareUrl} title={title} />
      <ShareButton platform="email" url={shareUrl} title={title} />
    </div>
  );
}

export function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider mr-2" style={{ color: '#52525b' }}>Share</span>
      <ShareButton platform="twitter" url={shareUrl} title={title} />
      <ShareButton platform="linkedin" url={shareUrl} title={title} />
      <ShareButton platform="email" url={shareUrl} title={title} />
    </div>
  );
}

export function ScrollNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ border: '1px solid #b8860b', backgroundColor: 'rgba(184,134,11,0.1)' }}>
              <span className="font-mono text-sm font-bold" style={{ color: '#b8860b' }}>OC</span>
            </div>
            <span className="font-display text-xl tracking-wide hidden sm:block">
              The Order of Change
            </span>
          </a>

          <a
            href="/subscribe"
            className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 transition-all duration-300 hover:bg-[#b8860b] hover:text-[#0a0a0a]"
            style={{ border: '1px solid #b8860b', color: '#b8860b' }}
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}
