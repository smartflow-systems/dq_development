import React, { useState, useCallback, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  Menu, X, Phone, ChevronDown, CheckCircle, ChevronLeft, ChevronRight,
  Home, Hammer, Layers, Triangle, GitMerge, Square, Wrench, Building,
  Star, MessageCircle, Eye, FileText, Mail, Instagram, User
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  { icon: Home, title: 'Home Extensions', desc: 'Rear, side and double-storey extensions to increase your living space and add value to your property.' },
  { icon: Hammer, title: 'Property Renovations', desc: 'Full and partial renovation projects, breathing new life into existing residential properties.' },
  { icon: Layers, title: 'Brickwork', desc: 'Quality brickwork and blockwork for new builds, extensions and repair projects.' },
  { icon: Triangle, title: 'Roofing', desc: 'New roof construction, re-roofing and structural roof work carried out to a high standard.' },
  { icon: GitMerge, title: 'Structural Alterations', desc: 'Structural changes including wall removals, steel beam installation and load-bearing modifications.' },
  { icon: Square, title: 'Bi-Fold Door Installation', desc: 'Precision installation of bi-fold doors to create seamless connections between indoor and outdoor spaces.' },
  { icon: Wrench, title: 'General Building Work', desc: 'A wide range of building tasks for residential properties, from groundworks to finishing.' },
  { icon: Building, title: 'Property Development', desc: 'Full property development services, managing projects from initial works through to completion.' },
];

const GALLERY = [
  {
    src: '/images/3C513492-4EFB-48E3-A67D-0A6C46B177AE.jpeg',
    label: 'Roof Construction',
    alt: 'Roof construction in progress showing timber roof trusses and scaffolding',
  },
  {
    src: '/images/D5856254-97CC-488A-A884-33DCACC1787E.jpeg',
    label: 'Extension Build in Progress',
    alt: 'Residential extension build showing brickwork, structural opening and groundworks in progress',
  },
];

const WHY = [
  { icon: Star, title: 'Quality-Focused Workmanship', desc: 'Every project is completed with a focus on quality, using sound methods and good materials.' },
  { icon: MessageCircle, title: 'Clear Communication', desc: 'You are kept informed throughout the project so you always know what is happening and why.' },
  { icon: Eye, title: 'Attention to Detail', desc: 'We take care with every element of the work, from the groundworks to the finishing touches.' },
  { icon: Layers, title: 'Project Support from Start to Finish', desc: 'We are involved and engaged throughout the build, not just at the start or the end.' },
  { icon: FileText, title: 'Free Initial Quotation', desc: 'Contact us to discuss your project and receive a free, no-obligation initial quotation.' },
];

const WORK_TYPES = [
  'Home Extension', 'Property Renovation', 'Brickwork', 'Roofing',
  'Structural Alterations', 'Bi-Fold Door Installation', 'General Building Work',
  'Property Development', 'Other',
];

const LOGO_DARK = '/images/F1FA7E51-4863-474C-BA25-2BEE07DFC9A7.jpeg';
const LOGO_LIGHT = '/images/C8371CCD-9635-41DC-A302-62F43BA0C060.jpeg';
const HERO_BG = '/images/D5856254-97CC-488A-A884-33DCACC1787E.jpeg';
const ABOUT_IMG = '/images/3C513492-4EFB-48E3-A67D-0A6C46B177AE.jpeg';

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <img src={LOGO_DARK} alt="DQ Developments Ltd" className="h-10 w-10 object-contain rounded" />
            <span className="hidden sm:block font-bold text-white text-sm leading-tight">
              DQ Developments<br /><span className="text-[#D10A17] font-semibold text-xs tracking-widest">LTD</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-[#B8B8B8] hover:text-white text-sm font-medium transition-colors tracking-wide">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:07988340727" className="flex items-center gap-2 text-[#B8B8B8] hover:text-white text-sm transition-colors">
              <Phone size={15} /><span>07988 340727</span>
            </a>
            <a href="#contact" className="bg-[#D10A17] hover:bg-[#b80913] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors">Get a Free Quote</a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden bg-[#0f0f0f] border-t border-[#2B2B2B] overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-4 pt-2 pb-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[#B8B8B8] hover:text-white py-3 text-base font-medium border-b border-[#2B2B2B] last:border-0 transition-colors">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 bg-[#D10A17] text-white text-center font-semibold py-3 rounded">Get a Free Quote</a>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="DQ Developments extension build" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/70 to-[#050505]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <div className="inline-flex items-center gap-2 bg-[#D10A17]/20 border border-[#D10A17]/40 text-[#D10A17] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          Building &amp; Property Development
        </div>

        <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Building Excellence<br />
          <span className="text-[#D10A17]">From Foundation</span><br />
          to Finish
        </h1>

        <p className="text-[#B8B8B8] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Professional building and property development services delivered with care, clear communication and quality workmanship.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-[#D10A17] hover:bg-[#b80913] text-white font-semibold px-8 py-4 rounded text-base transition-all duration-200">Get a Free Quote</a>
          <a href="#projects" className="border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded text-base transition-all duration-200 hover:bg-white/10">View Our Projects</a>
        </div>

        <a href="tel:07988340727" className="inline-flex items-center gap-2 text-[#B8B8B8] hover:text-white mt-8 text-sm transition-colors">
          <Phone size={16} className="text-[#D10A17]" />
          <span>07988 340727</span>
        </a>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#B8B8B8] hover:text-white transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-[#D10A17]/20 rounded-lg blur-sm" />
            <img src={ABOUT_IMG} alt="DQ Developments roof construction in progress" className="relative w-full h-80 md:h-[460px] object-cover rounded-lg" loading="lazy" />
            <div className="absolute bottom-4 left-4 bg-[#050505]/90 border border-[#2B2B2B] rounded-lg px-4 py-3">
              <img src={LOGO_LIGHT} alt="DQ Developments Ltd" className="h-10 object-contain" />
            </div>
          </div>

          <div>
            <p className="text-[#D10A17] font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
            <h2 className="font-bold text-white text-3xl sm:text-4xl leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Trusted Building and Development Specialists
            </h2>
            <p className="text-[#B8B8B8] text-base leading-relaxed mb-8">
              DQ Developments Ltd provides professional building and property development services for residential projects. Led by Anthony Digle, the company focuses on dependable service, attention to detail and quality workmanship from the early stages of a project through to completion.
            </p>
            <ul className="flex flex-col gap-3">
              {['Quality workmanship on every project', 'Clear communication throughout', 'Attention to detail from start to finish', 'Residential building and development specialists'].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#D10A17] flex-shrink-0 mt-0.5" />
                  <span className="text-[#F5F5F5] text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-block mt-8 bg-[#D10A17] hover:bg-[#b80913] text-white font-semibold px-7 py-3.5 rounded text-sm transition-colors">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D10A17] font-semibold text-sm uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="font-bold text-white text-3xl sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-[#1A1A1A] border border-[#2B2B2B] hover:border-[#D10A17]/50 rounded-lg p-6 transition-all duration-300">
              <div className="w-11 h-11 bg-[#D10A17]/10 border border-[#D10A17]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D10A17]/20 transition-colors">
                <Icon size={20} className="text-[#D10A17]" />
              </div>
              <h3 className="font-semibold text-white text-base mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
              <p className="text-[#B8B8B8] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex(i => i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length), []);
  const next = useCallback(() => setLightboxIndex(i => i === null ? null : (i + 1) % GALLERY.length), []);

  useEffect(() => {
    if (lightboxIndex !== null) lightboxRef.current?.focus();
  }, [lightboxIndex]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }, [close, prev, next]);

  return (
    <section id="projects" className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D10A17] font-semibold text-sm uppercase tracking-widest mb-3">Recent Work</p>
          <h2 className="font-bold text-white text-3xl sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Project Gallery</h2>
          <p className="text-[#B8B8B8] mt-3 text-sm max-w-xl mx-auto">A selection of recent building and development projects. Click any image to view full size.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {GALLERY.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setLightboxIndex(i)}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              aria-label={`View ${img.label} in full size`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-semibold text-sm">{img.label}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-center text-[#B8B8B8]/60 text-xs mt-6">More project photos coming soon.</p>
      </div>

      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog" aria-modal="true" aria-label="Project image lightbox"
          className="fixed inset-0 z-50 bg-[#050505]/95 flex items-center justify-center p-4 outline-none"
          onClick={close} onKeyDown={onKey} tabIndex={-1}
        >
          <button className="absolute top-4 right-4 text-white hover:text-[#D10A17] transition-colors p-2" onClick={close} aria-label="Close lightbox"><X size={28} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D10A17] p-2" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous image"><ChevronLeft size={36} /></button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#D10A17] p-2" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={36} /></button>
          <div className="max-w-5xl max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img src={GALLERY[lightboxIndex].src} alt={GALLERY[lightboxIndex].alt} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            <p className="text-center text-[#B8B8B8] text-sm mt-3">{GALLERY[lightboxIndex].label}</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Why Choose ──────────────────────────────────────────────────────────────

function WhyChoose() {
  return (
    <section className="bg-[#1A1A1A] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D10A17] font-semibold text-sm uppercase tracking-widest mb-3">Why DQ</p>
          <h2 className="font-bold text-white text-3xl sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Why Choose DQ Developments</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#050505] border border-[#2B2B2B] rounded-lg p-6 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#D10A17]/10 border border-[#D10A17]/20 rounded-lg flex items-center justify-center">
                <Icon size={18} className="text-[#D10A17]" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
                <p className="text-[#B8B8B8] text-sm leading-relaxed">{desc}</p>
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

  const inputCls = 'w-full bg-[#2B2B2B] border border-[#3a3a3a] hover:border-[#4a4a4a] focus:border-[#D10A17] text-white placeholder-[#555] rounded px-4 py-3 text-sm outline-none transition-colors';
  const labelCls = 'block text-[#B8B8B8] text-xs font-medium mb-1.5';

  return (
    <section id="contact" className="bg-[#050505] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D10A17] font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
          <h2 className="font-bold text-white text-3xl sm:text-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>Let's Discuss Your Next Project</h2>
          <p className="text-[#B8B8B8] mt-3 text-sm max-w-xl mx-auto">Fill in the form below or contact Anthony directly using the details on this page.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#D10A17]/10 border border-[#D10A17]/20 rounded-lg flex items-center justify-center"><User size={18} className="text-[#D10A17]" /></div>
                <div>
                  <p className="text-white font-semibold text-sm">Anthony Digle</p>
                  <p className="text-[#B8B8B8] text-xs">DQ Developments Ltd</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <a href="tel:07988340727" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#2B2B2B] rounded-lg flex items-center justify-center group-hover:bg-[#D10A17]/20 transition-colors"><Phone size={16} className="text-[#D10A17]" /></div>
                  <div><p className="text-[#B8B8B8] text-xs">Phone</p><p className="text-white text-sm font-medium group-hover:text-[#D10A17] transition-colors">07988 340727</p></div>
                </a>
                <a href="mailto:dpdevelpments.ltd@yahoo.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#2B2B2B] rounded-lg flex items-center justify-center group-hover:bg-[#D10A17]/20 transition-colors"><Mail size={16} className="text-[#D10A17]" /></div>
                  <div><p className="text-[#B8B8B8] text-xs">Email</p><p className="text-white text-sm font-medium group-hover:text-[#D10A17] transition-colors break-all">dpdevelpments.ltd@yahoo.com</p></div>
                </a>
                <a href="https://www.instagram.com/dq_development" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#2B2B2B] rounded-lg flex items-center justify-center group-hover:bg-[#D10A17]/20 transition-colors"><Instagram size={16} className="text-[#D10A17]" /></div>
                  <div><p className="text-[#B8B8B8] text-xs">Instagram</p><p className="text-white text-sm font-medium group-hover:text-[#D10A17] transition-colors">@dq_development</p></div>
                </a>
              </div>
            </div>

            <div className="bg-[#D10A17]/10 border border-[#D10A17]/30 rounded-lg p-5">
              <p className="text-white text-sm font-semibold mb-1">Prefer to call?</p>
              <p className="text-[#B8B8B8] text-xs leading-relaxed mb-3">Speak directly with Anthony to discuss your project.</p>
              <a href="tel:07988340727" className="flex items-center gap-2 text-[#D10A17] font-semibold text-sm hover:text-white transition-colors"><Phone size={15} />07988 340727</a>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#1A1A1A] border border-[#2B2B2B] rounded-lg p-6 md:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 bg-[#D10A17]/10 border border-[#D10A17]/30 rounded-full flex items-center justify-center mb-4"><Mail size={24} className="text-[#D10A17]" /></div>
                <h3 className="font-bold text-white text-xl mb-2">Form Submitted</h3>
                <p className="text-[#B8B8B8] text-sm max-w-sm leading-relaxed mb-1">
                  <strong className="text-[#D10A17]">Demo form only</strong> — please call or email DQ Developments directly.
                </p>
                <div className="flex gap-4 mt-5">
                  <a href="tel:07988340727" className="text-white text-sm underline hover:text-[#D10A17] transition-colors">07988 340727</a>
                  <a href="mailto:dpdevelpments.ltd@yahoo.com" className="text-white text-sm underline hover:text-[#D10A17] transition-colors">Send Email</a>
                </div>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-[#B8B8B8] text-xs hover:text-white underline transition-colors">Submit another enquiry</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelCls}>Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={onChange} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelCls}>Phone Number *</label>
                    <input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="Your phone number" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Email Address</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="workType" className={labelCls}>Type of Work *</label>
                  <select id="workType" name="workType" required value={form.workType} onChange={onChange} className={inputCls + ' appearance-none'}>
                    <option value="" disabled>Select type of work</option>
                    {WORK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="details" className={labelCls}>Project Details</label>
                  <textarea id="details" name="details" rows={4} value={form.details} onChange={onChange} placeholder="Tell us about your project..." className={inputCls + ' resize-none'} />
                </div>
                <button type="submit" className="bg-[#D10A17] hover:bg-[#b80913] text-white font-semibold py-3.5 px-8 rounded text-sm transition-colors self-start">Send Enquiry</button>
                <p className="text-[#555] text-xs">* Required fields. This is a demo form — contact DQ Developments directly by phone or email.</p>
              </form>
            )}
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
    <footer className="bg-[#0a0a0a] border-t border-[#1A1A1A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_DARK} alt="DQ Developments Ltd" className="h-10 w-10 object-contain rounded" />
              <div>
                <p className="text-white font-bold text-sm">DQ Developments Ltd</p>
                <p className="text-[#D10A17] text-xs tracking-widest font-semibold">BUILDING &amp; DEVELOPMENT</p>
              </div>
            </div>
            <p className="text-[#B8B8B8] text-xs leading-relaxed max-w-xs">Professional building and property development services for residential projects across the UK.</p>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Quick Links</p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(l => <a key={l.href} href={l.href} className="text-[#B8B8B8] hover:text-white text-sm transition-colors">{l.label}</a>)}
            </nav>
          </div>

          <div>
            <p className="text-white font-semibold text-sm mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="tel:07988340727" className="flex items-center gap-2 text-[#B8B8B8] hover:text-white text-sm transition-colors">
                <Phone size={14} className="text-[#D10A17] flex-shrink-0" />07988 340727
              </a>
              <a href="mailto:dpdevelpments.ltd@yahoo.com" className="flex items-center gap-2 text-[#B8B8B8] hover:text-white text-sm transition-colors break-all">
                <Mail size={14} className="text-[#D10A17] flex-shrink-0" />dpdevelpments.ltd@yahoo.com
              </a>
              <a href="https://www.instagram.com/dq_development" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#B8B8B8] hover:text-white text-sm transition-colors">
                <Instagram size={14} className="text-[#D10A17] flex-shrink-0" />@dq_development
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555] text-xs">&copy; {year} DQ Developments Ltd. All rights reserved.</p>
          <a href="#" className="text-[#555] hover:text-[#B8B8B8] text-xs transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Mobile Call Button ───────────────────────────────────────────────────────

function MobileCallButton() {
  return (
    <a
      href="tel:07988340727"
      className="fixed bottom-5 right-5 z-40 md:hidden flex items-center gap-2 bg-[#D10A17] hover:bg-[#b80913] text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-all"
      aria-label="Call DQ Developments on 07988 340727"
    >
      <Phone size={18} /><span>Call Now</span>
    </a>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
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
