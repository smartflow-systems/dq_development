import React, { useState, useCallback, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  Menu, X, Phone, ChevronDown, CheckCircle, ChevronLeft, ChevronRight,
  Home, Hammer, Layers, Triangle, GitMerge, Square, Wrench, Building,
  Star, MessageCircle, Eye, Mail, Instagram, User, ArrowRight
} from 'lucide-react';

// ─── Image paths ─────────────────────────────────────────────────────────────
// All images live in public/images/ with readable filenames.
// Original UUID filenames are preserved alongside for reference in git history.

const IMG = {
  logoDark:  '/images/logo-dark-bg.jpg',
  logoLight: '/images/logo-light-bg.jpg',
  hero:      '/images/extension-bifold-doors-completed.jpg',
  about:     '/images/roof-frame-construction.jpg',
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type GalleryImage = {
  src:   string;
  label: string;
  alt:   string;
  wide:  boolean;
  /** Intrinsic pixel width of the image file (for browser layout hints). */
  w: number;
  /** Intrinsic pixel height of the image file (for browser layout hints). */
  h: number;
};

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

const SERVICES = [
  { icon: Home,      title: 'Home Extensions',          desc: 'Rear, side and double-storey extensions to add space and value.' },
  { icon: Hammer,    title: 'Property Renovations',     desc: 'Full and partial renovations for existing residential properties.' },
  { icon: Layers,    title: 'Brickwork',                desc: 'Quality brickwork and blockwork for new builds and extensions.' },
  { icon: Triangle,  title: 'Roofing',                  desc: 'New roof construction and structural roof work to a high standard.' },
  { icon: GitMerge,  title: 'Structural Alterations',   desc: 'Wall removals, steel beam installation and load-bearing changes.' },
  { icon: Square,    title: 'Bi-Fold Door Installation', desc: 'Precision door fitting for seamless indoor to outdoor flow.' },
  { icon: Wrench,    title: 'General Building Work',    desc: 'A wide range of residential building tasks from groundworks to finishing.' },
  { icon: Building,  title: 'Property Development',     desc: 'Full development services from initial works through to completion.' },
];

// ─── Gallery ─────────────────────────────────────────────────────────────────
// Adding a new photo:
//   1. Drop the file into public/images/ with a readable filename
//      e.g.  public/images/extension-dusk-exterior.jpg
//   2. Add an entry to the array below using the template:
//      {
//        src:   '/images/<filename>',
//        label: 'Short display label',
//        alt:   'Factual alt text describing the photo contents',
//        wide:  true,   // true → full-width card (sm:col-span-2, aspect-[21/9])
//                       // false → half-width card (aspect-[4/3])
//        w:     <intrinsic width in px>,
//        h:     <intrinsic height in px>,
//      }
//
// Dusk exterior (placeholder — add when photo is available):
//   {
//     src:   '/images/extension-dusk-exterior.jpg',
//     label: 'Completed Extension at Dusk',
//     alt:   'Completed rear extension photographed at dusk showing exterior lighting, bi-fold doors and landscaped garden',
//     wide:  true, w: 0, h: 0,
//   },

const GALLERY: GalleryImage[] = [
  {
    src:   '/images/extension-bifold-doors-completed.jpg',
    label: 'Completed Rear Extension with Bi-Fold Doors',
    alt:   'Completed rear house extension with grey bi-fold doors, tiled pitched roof and Velux skylights',
    wide:  true, w: 951, h: 734,
  },
  {
    src:   '/images/roof-frame-construction.jpg',
    label: 'Roof Frame Construction',
    alt:   'New roof frame construction showing timber trusses and rafter structure on a residential extension with scaffolding',
    wide:  false, w: 673, h: 748,
  },
  {
    src:   '/images/extension-build-in-progress.jpg',
    label: 'Extension Build in Progress',
    alt:   'Residential front extension under construction showing new brickwork, window openings and groundworks in progress',
    wide:  false, w: 925, h: 959,
  },
];

const WHY = [
  { icon: Star,           title: 'Quality-Focused Workmanship',        desc: 'Every project completed with sound methods and good materials.' },
  { icon: MessageCircle,  title: 'Clear Communication',                 desc: 'You are kept informed throughout so you always know what is happening.' },
  { icon: Eye,            title: 'Attention to Detail',                 desc: 'Care taken with every element, from groundworks to finishing touches.' },
  { icon: CheckCircle,    title: 'Project Support from Start to Finish', desc: 'Fully involved and engaged throughout the entire build.' },
];

const WORK_TYPES = [
  'Home Extension', 'Property Renovation', 'Brickwork', 'Roofing',
  'Structural Alterations', 'Bi-Fold Door Installation', 'General Building Work',
  'Property Development', 'Other',
];

// ─── Shared style tokens ──────────────────────────────────────────────────────

const glass       = 'bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.35)]';
const glassStrong = 'bg-gradient-to-b from-white/[0.10] to-white/[0.05] backdrop-blur-xl border border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_16px_48px_rgba(0,0,0,0.45)]';
const redGlow     = 'shadow-[0_0_30px_rgba(227,6,19,0.25)]';
const cardHover   = 'hover:-translate-y-1 hover:border-[#E30613]/40 hover:shadow-[0_12px_40px_rgba(227,6,19,0.12)]';

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          : 'bg-black/10 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0" aria-label="DQ Developments home">
            <img src={IMG.logoDark} width={1254} height={1254} alt="DQ Developments Ltd" className="h-9 w-9 object-contain rounded-lg" />
            <div className="hidden sm:block leading-tight">
              <p className="text-[#F5F5F5] font-bold text-sm tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>DQ Developments</p>
              <p className="text-[#E30613] text-[10px] font-semibold tracking-[0.2em] uppercase">Ltd</p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="text-[#B7B7B7] hover:text-[#F5F5F5] text-sm font-medium transition-colors duration-200 tracking-wide">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:07988340727"
              className="flex items-center gap-1.5 text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors">
              <Phone size={14} className="text-[#E30613]" />
              <span>07988 340727</span>
            </a>
            <a href="#contact"
              className={`bg-[#E30613] hover:bg-[#c9040f] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 ${redGlow}`}>
              Get a Free Quote
            </a>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden text-[#F5F5F5] p-2 -mr-1"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#0F0F10]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 pb-4 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-[#B7B7B7] hover:text-[#F5F5F5] py-3 text-base font-medium border-b border-white/[0.06] last:border-0 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className={`mt-3 bg-[#E30613] text-white text-center font-semibold py-3 rounded-lg ${redGlow}`}>
            Get a Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMG.hero} width={951} height={734}
          alt="Completed rear house extension with bi-fold doors and tiled pitched roof by DQ Developments Ltd"
          className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/85 via-[#050505]/60 to-[#050505]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
        <div aria-hidden="true" className="orb w-96 h-96 bg-[#E30613]/20 -top-24 -right-24" />
        <div aria-hidden="true" className="orb w-72 h-72 bg-white/[0.05] bottom-8 -left-20" style={{ animationDelay: '-7s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex items-center">
        <div className={`${glassStrong} rounded-2xl p-8 md:p-12 max-w-2xl`}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-[#E30613]/15 border border-[#E30613]/30 text-[#E30613] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.15em] mb-6">
            Building &amp; Property Development
          </div>

          <h1 className="font-extrabold text-[#F5F5F5] text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            Building Excellence<br />
            <span className="text-[#E30613]">From Foundation</span><br />
            to Finish
          </h1>

          <p className="text-[#B7B7B7] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            Professional building and property development services delivered with care, clear communication and quality workmanship.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href="#contact"
              className={`flex items-center justify-center gap-2 bg-[#E30613] hover:bg-[#c9040f] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 ${redGlow}`}>
              Get a Free Quote <ArrowRight size={15} />
            </a>
            <a href="#projects"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/[0.06] hover:bg-white/[0.1] text-[#F5F5F5] font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200">
              View Our Projects
            </a>
          </div>

          {/* Phone badge */}
          <div className="flex flex-wrap items-center gap-3">
          <a href="tel:07988340727"
            className="inline-flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 hover:bg-white/[0.1] transition-colors"
            aria-label="Call DQ Developments on 07988 340727">
            <div className="w-8 h-8 bg-[#E30613]/15 border border-[#E30613]/25 rounded-lg flex items-center justify-center">
              <Phone size={14} className="text-[#E30613]" />
            </div>
            <div>
              <p className="text-[#B7B7B7] text-[10px] font-medium uppercase tracking-wider">Call Anthony</p>
              <p className="text-[#F5F5F5] text-sm font-semibold">07988 340727</p>
            </div>
          </a>
          <a href="https://wa.me/447988340727?text=Hi%20Anthony%2C%20I%27d%20like%20to%20discuss%20a%20building%20project." target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/25 rounded-xl px-4 py-3 hover:bg-[#25D366]/20 transition-colors"
            aria-label="Message DQ Developments on WhatsApp">
            <MessageCircle size={16} className="text-[#25D366]" />
            <span className="text-[#F5F5F5] text-sm font-semibold">WhatsApp</span>
          </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#B7B7B7] hover:text-[#F5F5F5] transition-colors animate-bounce"
        aria-label="Scroll to About">
        <ChevronDown size={26} />
      </a>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] py-20 md:py-28">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div aria-hidden="true" className="orb w-80 h-80 bg-[#E30613]/10 top-1/3 -left-28" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-[#E30613]/10 blur-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img src={IMG.about} width={673} height={748}
                alt="Residential extension roof frame under construction showing new timber trusses and rafter structure with scaffolding"
                className="w-full h-80 md:h-[480px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
            </div>
            {/* Logo badge */}
            <div className={`absolute bottom-5 left-5 ${glass} rounded-xl px-4 py-3`}>
              <img src={IMG.logoLight} width={1254} height={1254} alt="DQ Developments Ltd" className="h-9 object-contain" />
            </div>
          </div>

          {/* Content card */}
          <div className={`${glass} rounded-2xl p-8 md:p-10`}>
            <p className="text-[#E30613] font-semibold text-xs uppercase tracking-[0.2em] mb-3">About Us</p>
            <h2 className="font-bold text-[#F5F5F5] text-2xl sm:text-3xl leading-tight mb-5"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Professional Building and Development Specialists
            </h2>
            <p className="text-[#B7B7B7] text-sm leading-relaxed mb-7">
              DQ Developments Ltd provides professional building and property development services for residential projects. Led by Anthony Digle, the company focuses on dependable service, attention to detail and quality workmanship from the early stages of a project through to completion.
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {[
                'Quality workmanship on every project',
                'Clear communication throughout',
                'Attention to detail from start to finish',
                'Residential building and development specialists',
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} className="text-[#E30613]" />
                  </div>
                  <span className="text-[#F5F5F5] text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a href="#contact"
              className={`inline-flex items-center gap-2 bg-[#E30613] hover:bg-[#c9040f] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 ${redGlow}`}>
              Get in Touch <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0F0F10] py-20 md:py-28">
      <div aria-hidden="true" className="orb w-96 h-96 bg-[#E30613]/[0.07] -top-32 right-1/4" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-[#E30613] font-semibold text-xs uppercase tracking-[0.2em] mb-3">What We Do</p>
          <h2 className="font-bold text-[#F5F5F5] text-2xl sm:text-3xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}>Our Services</h2>
          <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#E30613] to-transparent" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className={`group relative overflow-hidden ${glass} rounded-xl p-5 transition-all duration-300 cursor-default ${cardHover}`}>
              <div aria-hidden="true" className="absolute -top-7 -right-7 w-14 h-14 rotate-45 rounded-lg bg-[#E30613]/[0.06] border border-[#E30613]/10 group-hover:bg-[#E30613]/[0.14] transition-colors duration-300" />
              <div className="w-10 h-10 bg-[#E30613]/10 border border-[#E30613]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#E30613]/20 transition-colors">
                <Icon size={18} className="text-[#E30613]" />
              </div>
              <h3 className="font-semibold text-[#F5F5F5] text-sm mb-1.5"
                style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
              <p className="text-[#B7B7B7] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const lbRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIdx(null), []);
  const prev  = useCallback(() => setIdx(i => i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length), []);
  const next  = useCallback(() => setIdx(i => i === null ? null : (i + 1) % GALLERY.length), []);

  useEffect(() => {
    if (idx !== null) lbRef.current?.focus();
  }, [idx]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Tab') {
      // Trap focus inside the lightbox dialog
      const nodes = lbRef.current?.querySelectorAll<HTMLElement>('button');
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === lbRef.current) { e.preventDefault(); last.focus(); }
      } else if (active === last || active === lbRef.current) {
        e.preventDefault(); first.focus();
      }
    }
  }, [close, prev, next]);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#050505] py-20 md:py-28">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div aria-hidden="true" className="orb w-80 h-80 bg-[#E30613]/[0.08] bottom-0 -right-24" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-[#E30613] font-semibold text-xs uppercase tracking-[0.2em] mb-3">Recent Work</p>
          <h2 className="font-bold text-[#F5F5F5] text-2xl sm:text-3xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}>Project Gallery</h2>
          <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#E30613] to-transparent" />
          <p className="text-[#B7B7B7] mt-3 text-sm max-w-lg mx-auto">
            A selection of recent building and development projects. Click any image to view in full.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {GALLERY.map((img, i) => (
            <button key={img.src}
              onClick={() => setIdx(i)}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] ${img.wide ? 'sm:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
              aria-label={`View ${img.label} in full size`}>
              <img src={img.src} alt={img.alt} width={img.w} height={img.h}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy" />
              {/* Always-on subtle bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-[#050505]/10 to-transparent" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className={`inline-block ${glass} rounded-lg px-3 py-1.5 text-[#F5F5F5] text-xs font-semibold tracking-wide`}>
                  {img.label}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#E30613]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {idx !== null && (
        <div ref={lbRef}
          role="dialog" aria-modal="true" aria-label="Project image lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none"
          style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          onClick={close} onKeyDown={onKey} tabIndex={-1}>

          <button className="absolute top-5 right-5 text-[#B7B7B7] hover:text-[#F5F5F5] transition-colors p-2 bg-white/[0.06] border border-white/10 rounded-xl"
            onClick={close} aria-label="Close lightbox"><X size={20} /></button>
          <button className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B7B7B7] hover:text-[#F5F5F5] p-3 bg-white/[0.06] border border-white/10 rounded-xl transition-colors"
            onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous image"><ChevronLeft size={22} /></button>
          <button className="absolute right-5 top-1/2 -translate-y-1/2 text-[#B7B7B7] hover:text-[#F5F5F5] p-3 bg-white/[0.06] border border-white/10 rounded-xl transition-colors"
            onClick={e => { e.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={22} /></button>

          <div className="max-w-5xl max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img src={GALLERY[idx].src} alt={GALLERY[idx].alt} width={GALLERY[idx].w} height={GALLERY[idx].h}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-white/10" />
            <p className="text-center text-[#B7B7B7] text-sm mt-4 font-medium">{GALLERY[idx].label}</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Why Choose ──────────────────────────────────────────────────────────────

function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#0F0F10] py-20 md:py-28">
      <div aria-hidden="true" className="orb w-96 h-96 bg-[#E30613]/[0.06] top-0 -left-32" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-[#E30613] font-semibold text-xs uppercase tracking-[0.2em] mb-3">Why DQ</p>
          <h2 className="font-bold text-[#F5F5F5] text-2xl sm:text-3xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}>Why Choose DQ Developments</h2>
          <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#E30613] to-transparent" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY.map(({ icon: Icon, title, desc }, i) => (
            <div key={title}
              className={`relative ${glass} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${cardHover}`}>
              <span aria-hidden="true" className="absolute top-4 right-5 text-white/[0.07] font-extrabold text-4xl select-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}>{String(i + 1).padStart(2, '0')}</span>
              <div className="w-11 h-11 bg-[#E30613]/10 border border-[#E30613]/20 rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-[#E30613]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F5F5] text-sm mb-1.5"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                <p className="text-[#B7B7B7] text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', workType: '', details: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const fieldCls = 'w-full bg-white/[0.06] border border-white/[0.10] hover:border-white/20 focus:border-[#E30613]/60 text-[#F5F5F5] placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors';
  const labelCls = 'block text-[#B7B7B7] text-xs font-medium mb-1.5 tracking-wide';

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] py-20 md:py-28">
      <div aria-hidden="true" className="orb w-96 h-96 bg-[#E30613]/[0.09] -bottom-32 -left-28" />
      <div aria-hidden="true" className="orb w-72 h-72 bg-white/[0.04] top-10 -right-20" style={{ animationDelay: '-5s' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-[#E30613] font-semibold text-xs uppercase tracking-[0.2em] mb-3">Get in Touch</p>
          <h2 className="font-bold text-[#F5F5F5] text-2xl sm:text-3xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}>Let's Discuss Your Next Project</h2>
          <div aria-hidden="true" className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#E30613] to-transparent" />
        </div>

        <div className={`${glass} rounded-2xl overflow-hidden`}>
          <div className="grid lg:grid-cols-5">

            {/* Contact details panel */}
            <div className="lg:col-span-2 bg-white/[0.04] border-b lg:border-b-0 lg:border-r border-white/[0.08] p-8 md:p-10 flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#E30613]/10 border border-[#E30613]/20 rounded-xl flex items-center justify-center">
                    <User size={18} className="text-[#E30613]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5F5] font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Anthony Digle</p>
                    <p className="text-[#B7B7B7] text-xs">DQ Developments Ltd</p>
                  </div>
                </div>

                {/* Phone — visually prominent */}
                <a href="tel:07988340727"
                  className="flex items-center gap-4 bg-[#E30613]/10 border border-[#E30613]/25 rounded-xl px-5 py-4 mb-5 hover:bg-[#E30613]/15 transition-colors group">
                  <div className="w-10 h-10 bg-[#E30613]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#E30613]" />
                  </div>
                  <div>
                    <p className="text-[#B7B7B7] text-[10px] uppercase tracking-wider mb-0.5">Call Anthony</p>
                    <p className="text-[#F5F5F5] font-bold text-lg group-hover:text-[#E30613] transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>07988 340727</p>
                  </div>
                </a>

                <a href="https://wa.me/447988340727?text=Hi%20Anthony%2C%20I%27d%20like%20to%20discuss%20a%20building%20project." target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/25 rounded-xl px-5 py-4 mb-5 hover:bg-[#25D366]/15 transition-colors group"
                  aria-label="Message DQ Developments on WhatsApp">
                  <div className="w-10 h-10 bg-[#25D366]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[#B7B7B7] text-[10px] uppercase tracking-wider mb-0.5">WhatsApp Anthony</p>
                    <p className="text-[#F5F5F5] font-bold text-lg group-hover:text-[#25D366] transition-colors"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>07988 340727</p>
                  </div>
                </a>

                <div className="flex flex-col gap-4">
                  <a href="mailto:dpdevelpments.ltd@yahoo.com"
                    className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-white/[0.05] border border-white/10 rounded-lg flex items-center justify-center group-hover:border-[#E30613]/30 transition-colors flex-shrink-0">
                      <Mail size={15} className="text-[#E30613]" />
                    </div>
                    <div>
                      <p className="text-[#B7B7B7] text-[10px] uppercase tracking-wider">Email</p>
                      <p className="text-[#F5F5F5] text-sm group-hover:text-[#E30613] transition-colors break-all">dpdevelpments.ltd@yahoo.com</p>
                    </div>
                  </a>

                  <a href="https://www.instagram.com/dq_development" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-white/[0.05] border border-white/10 rounded-lg flex items-center justify-center group-hover:border-[#E30613]/30 transition-colors flex-shrink-0">
                      <Instagram size={15} className="text-[#E30613]" />
                    </div>
                    <div>
                      <p className="text-[#B7B7B7] text-[10px] uppercase tracking-wider">Instagram</p>
                      <p className="text-[#F5F5F5] text-sm group-hover:text-[#E30613] transition-colors">@dq_development</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06]" />

              <div className="text-[#B7B7B7] text-xs leading-relaxed">
                Contact Anthony directly by phone or email to discuss your project requirements.
              </div>
            </div>

            {/* Form panel */}
            <div className="lg:col-span-3 p-8 md:p-10">
              {submitted ? (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center">
                  <div className={`w-16 h-16 bg-[#E30613]/10 border border-[#E30613]/25 rounded-2xl flex items-center justify-center mb-5 ${redGlow}`}>
                    <Mail size={26} className="text-[#E30613]" />
                  </div>
                  <h3 className="font-bold text-[#F5F5F5] text-xl mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>Form Submitted</h3>
                  <p className="text-[#B7B7B7] text-sm max-w-sm leading-relaxed mb-5">
                    <strong className="text-[#E30613]">Demo form only</strong> — please call or email DQ Developments directly to discuss your project.
                  </p>
                  <div className="flex gap-4">
                    <a href="tel:07988340727" className="text-[#F5F5F5] text-sm hover:text-[#E30613] transition-colors underline">07988 340727</a>
                    <a href="mailto:dpdevelpments.ltd@yahoo.com" className="text-[#F5F5F5] text-sm hover:text-[#E30613] transition-colors underline">Send Email</a>
                  </div>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#B7B7B7] text-xs hover:text-[#F5F5F5] transition-colors">
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelCls}>Full Name *</label>
                      <input id="name" name="name" type="text" required
                        value={form.name} onChange={onChange} placeholder="Your name" className={fieldCls} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Phone Number *</label>
                      <input id="phone" name="phone" type="tel" required
                        value={form.phone} onChange={onChange} placeholder="Your phone number" className={fieldCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email Address</label>
                    <input id="email" name="email" type="email"
                      value={form.email} onChange={onChange} placeholder="your@email.com" className={fieldCls} />
                  </div>
                  <div>
                    <label htmlFor="workType" className={labelCls}>Type of Work *</label>
                    <select id="workType" name="workType" required
                      value={form.workType} onChange={onChange} className={fieldCls + ' appearance-none'}>
                      <option value="" disabled>Select type of work</option>
                      {WORK_TYPES.map(t => <option key={t} value={t} className="bg-[#0F0F10]">{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="details" className={labelCls}>Project Details</label>
                    <textarea id="details" name="details" rows={4}
                      value={form.details} onChange={onChange} placeholder="Tell us about your project..."
                      className={fieldCls + ' resize-none'} />
                  </div>
                  <div className="flex items-center gap-4">
                    <button type="submit"
                      className={`bg-[#E30613] hover:bg-[#c9040f] text-white font-semibold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 ${redGlow}`}>
                      Send Enquiry
                    </button>
                    <p className="text-white/25 text-xs">* Required fields</p>
                  </div>
                  <p className="text-white/20 text-[11px]">Demo form only — contact DQ Developments directly by phone or email.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0F0F10] border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={IMG.logoDark} width={1254} height={1254} alt="DQ Developments Ltd" className="h-9 w-9 object-contain rounded-lg" />
              <div>
                <p className="text-[#F5F5F5] font-bold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>DQ Developments Ltd</p>
                <p className="text-[#E30613] text-[10px] tracking-[0.2em] font-semibold uppercase">Building &amp; Development</p>
              </div>
            </div>
            <p className="text-[#B7B7B7] text-xs leading-relaxed max-w-xs">
              Professional building and property development services for residential projects.
            </p>
          </div>

          <div>
            <p className="text-[#F5F5F5] font-semibold text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Quick Links</p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href}
                  className="text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors">{l.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[#F5F5F5] font-semibold text-sm mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/447988340727?text=Hi%20Anthony%2C%20I%27d%20like%20to%20discuss%20a%20building%20project." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors">
                <MessageCircle size={13} className="text-[#25D366] flex-shrink-0" />WhatsApp
              </a>
              <a href="tel:07988340727" className="flex items-center gap-2 text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors">
                <Phone size={13} className="text-[#E30613] flex-shrink-0" />07988 340727
              </a>
              <a href="mailto:dpdevelpments.ltd@yahoo.com" className="flex items-center gap-2 text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors break-all">
                <Mail size={13} className="text-[#E30613] flex-shrink-0" />dpdevelpments.ltd@yahoo.com
              </a>
              <a href="https://www.instagram.com/dq_development" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#B7B7B7] hover:text-[#F5F5F5] text-sm transition-colors">
                <Instagram size={13} className="text-[#E30613] flex-shrink-0" />@dq_development
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">&copy; {year} DQ Developments Ltd. All rights reserved.</p>
          <a href="#" className="text-white/20 hover:text-[#B7B7B7] text-xs transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Mobile call button ───────────────────────────────────────────────────────

function MobileCallButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40 md:hidden flex items-center gap-2.5">
      <a href="https://wa.me/447988340727?text=Hi%20Anthony%2C%20I%27d%20like%20to%20discuss%20a%20building%20project." target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#1fb959] text-white rounded-full transition-all active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.3)]"
        aria-label="Message DQ Developments on WhatsApp">
        <MessageCircle size={20} />
      </a>
      <a href="tel:07988340727"
        className={`flex items-center gap-2 bg-[#E30613] hover:bg-[#c9040f] text-white font-semibold text-sm px-4 py-3 rounded-full transition-all active:scale-95 ${redGlow}`}
        aria-label="Call DQ Developments on 07988 340727">
        <Phone size={16} /><span>Call Now</span>
      </a>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChoose />
        <Contact />
      </main>
      <Footer />
      <MobileCallButton />
    </div>
  );
}
