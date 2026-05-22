import { useState, useEffect } from "react";


function Carousel({ capability }) {
  const [slide, setSlide] = useState(0);
  const totalSlides = 1 + capability.examples.length; // 1 intro + N example slides

  const next = () => setSlide((slide + 1) % totalSlides);
  const prev = () => setSlide((slide - 1 + totalSlides) % totalSlides);

  return (
<div id={capability.id} className="mb-24 scroll-mt-28">
      {/* Header row */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
            {capability.tag}
          </p>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight">
            {capability.title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition flex items-center justify-center"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition flex items-center justify-center"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide content */}
      <article className="rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-50">
        {slide === 0 ? (
          // INTRO SLIDE: image + description
          <div className="grid md:grid-cols-2">
            <img
              src={capability.introImage}
              alt={capability.title}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            />
           <div className="p-10 md:p-14 flex flex-col justify-center">
  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
    Overview
  </p>
  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
    {capability.desc}
  </p>

  {capability.links && capability.links.length > 0 && (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
      {capability.links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-800 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-800 transition"
        >
          {link.label} ↗
        </a>
      ))}

{capability.skills && capability.skills.length > 0 && (
  <div className="mt-6 flex flex-wrap gap-2">
    {capability.skills.map((s, i) => (
      <span
        key={i}
        className="text-xs px-3 py-1 rounded-full border border-neutral-300 text-neutral-700 bg-white"
      >
        {s}
      </span>
    ))}
  </div>
)}
    </div>
  )}
</div>
          </div>
       ) : (
  // EXAMPLE SLIDES: 1 or 2 images
  (() => {
    const imgs = capability.examples[slide - 1].images;
    return (
      <div className={`grid ${imgs.length === 2 ? "md:grid-cols-2" : "grid-cols-1"} h-full`}>
        {imgs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${capability.title} example ${slide} — ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    );
  })()
)}
      </article>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === slide
                ? "w-8 bg-neutral-800"
                : "w-2 bg-neutral-300 hover:bg-neutral-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function InspirationBox() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const inspirations = [
    {
      quote: "Mystery is at the heart of creativity. That, and surprise.",
      author: "Julia Cameron",
    },
    {
      quote: "The best way to predict the future is to create it.",
      author: "Abraham Lincoln",
    },
    {
      quote: "You cannot get through a single day without having an impact on the world around you. What you do makes a difference, and you have to decide what kind of difference you want to make.",
      author: "Jane Goodall",
    },
  ];

  const next = () => setIdx((idx + 1) % inspirations.length);

  // Reusable gradient sparkle icon
  const SparkleIcon = ({ size = 48 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbecd6" />
          <stop offset="25%" stopColor="#f6dcb1" />
          <stop offset="50%" stopColor="#e8dfe2" />
          <stop offset="75%" stopColor="#8cb2df" />
          <stop offset="100%" stopColor="#a480dc" />
        </linearGradient>
      </defs>
      {/* 4-point sparkle/star */}
      <path
        d="M50 5 Q52 35 60 42 Q70 48 95 50 Q70 52 60 58 Q52 65 50 95 Q48 65 40 58 Q30 52 5 50 Q30 48 40 42 Q48 35 50 5 Z"
        fill="url(#sparkleGradient)"
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  );

  return (
    <div className="fixed left-0 right-0 bottom-[100px] z-50 pointer-events-none max-w-[100vw]">
      <div className="max-w-6xl mx-auto px-6 flex justify-end">
        <div className="pointer-events-auto">
          {!open ? (
            // FLOATING SPARKLE
            <button
              onClick={() => setOpen(true)}
              className="group relative animate-float"
              aria-label="Open inspiration box"
            >
              {/* Soft glow halo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbecd6] via-[#f6dcb1] via-[#8cb2df] to-[#a480dc] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity rounded-full scale-110" />

              {/* The sparkle */}
              <div className="relative hover:scale-110 transition-transform duration-300 drop-shadow-xl">
                <SparkleIcon size={72} />
              </div>

              {/* Tooltip */}
              <span className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-4 py-2 rounded-full bg-white shadow-lg text-xs text-neutral-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Your Inspiration Box
              </span>
            </button>
          ) : (
            // EXPANDED PANEL
            <div className="relative animate-float">
              {/* Soft outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fbecd6] via-[#8cb2df] to-[#a480dc] blur-3xl opacity-60 rounded-3xl" />

              <div className="relative w-80 md:w-96 rounded-3xl overflow-hidden shadow-2xl border border-white/70 backdrop-blur-xl bg-gradient-to-br from-[#fbecd6] via-[#e8dfe2] to-[#a480dc]/40">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <SparkleIcon size={24} />
                    <p className="font-script text-2xl text-neutral-800">
                      Your Inspiration Box
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-neutral-700 flex items-center justify-center transition text-lg"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Quote */}
                <div className="px-6 py-10">
                  <p className="text-2xl font-script text-neutral-400 leading-none mb-3">"</p>
                  <p className="text-lg font-light italic text-neutral-800 leading-relaxed">
                    {inspirations[idx].quote}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-neutral-600">
                    — {inspirations[idx].author}
                  </p>
                </div>

                {/* Pagination + Next */}
                <div className="px-6 pb-5 flex justify-between items-center">
                  <div className="flex gap-1.5">
                    {inspirations.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === idx ? "w-6 bg-neutral-700" : "w-1.5 bg-neutral-400"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="text-xs uppercase tracking-[0.15em] text-neutral-700 hover:text-neutral-900 transition flex items-center gap-1"
                  >
                    Next <SparkleIcon size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function App() {

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const skills = [
    "ADDIE", "SAM", "Articulate Rise", "Adobe Creative Suite",
    "Mural / Miro", "Adult Learning Theory", "Bloom's Taxonomy",
    "Thinkific", "Moodle", "ELMO", "OpenLearning",
  ];

const capabilities = [
  {
    id: "needs-analysis",
    title: "Needs Analysis & Design Workshops",
    tag: "01 — Discovery",
    desc: "Collaborative sessions with SMEs and business owners to uncover real learning needs, align on outcomes, and shape the program from the inside out.",
	introImage: "/discovery-intro.jpg",
skills: ["Needs Analysis", "Stakeholder Interviews", "Onboarding Design", "Design Workshops"],
	links: [
	   ,
	  ],
   examples: [
    { images: ["/discovery-1a.jpg", "/discovery-1b.jpg"] },        // pair  
    { images: ["/discovery-2a.jpg", "/discovery-2b.jpg"] },        // pair  
    ],
  },
  {
    id: "online-learning-production",
    title: "End-to-End Online Learning Production",
    tag: "02 — Build",
    desc: "From design to delivery — we manage the end-to-end development of branded learning that feels native to your organisation.",
    introImage: "/build-intro.jpg",
	skills: ["Education design", "Course outlines", "Instructional Design", "Scripting", "Visual Design", "Media Production", "Articulate Rise", "Adobe Creative Suite", "Thinkific", "ELMO HR & Learning"],
	links: [
	    { label: "Annie's Centre's ASD Assessment and Diagnosis course on Thinkific", url: "https://anniescentre.thinkific.com/" },
	  ],
    examples: [
     { images: ["/build1a.jpg", "/build1b.jpg"] },        // pair
     { images: ["/build3a.jpg", "/build3b.jpg"] },        // pair
    ],
  },
  {
    id: "instructional-design",
    title: "High-Quality Instructional Design",
    tag: "03 — Craft",
    desc: "Grounded in the latest adult learning and evidence-based theories, we select the learning approaches that serve your learners and your organisation best. This is what makes learning impactful.",
    introImage: "/craft-intro_.jpg",
links: [,
	  ],
	skills: ["Case studies", "Scenario-based learning", "Formative & summative assessment", "Reflective Practice", "Workshops", "Just-In-Time video", "Demo videos", "Role-play videos", "Mentimeter", "Padlet"],
    examples: [
 	{ images: ["/craft-1a.jpg", "/craft-1b.jpg"] },        // pair
 	{ images: ["/craft-2a.jpg", "/craft-2b.jpg"] },        // pair

    ],
  },
  {
    id: "workshop-delivery",
    title: "Workshop Design & Delivery",
    tag: "04 — Facilitate",
    desc: "Engaging, outcome-driven workshops designed and delivered for diverse audiences across virtual and in-person formats.",
    introImage: "/facilitate-intro.jpg",
links: [{label: "Smile Partners Practice Management workshop series", url: "#"},{label: "Macquarie Business School Certificate of Financial Markets & Corporate Education", url: "#"}
	  ],
	skills: ["Workshop design outlines", "Facilitator Coaching", "Instructional design", "MS PowerPoint & Teams", "Zoom", "Mentimeter", "Padlet"],
    examples: [
 	{ images: ["/facilitate-1a.jpg", "/facilitate-1b.jpg"] },        // pair
 	
    ],
  },
];

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors duration-300">
     {/* NAV */}
<nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-neutral-200">
  <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

    {/* Logo (fades in on scroll) */}
    <a
      href="#top"
      className={`flex items-center gap-3 transition-opacity duration-500 ${
        scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <img src="/gamut-logo.png" alt="Gamut Design" className="h-10 md:h-12 w-auto" />
    </a>

    {/* Desktop links */}
    <div className="hidden md:flex items-center gap-6 text-sm">
      <a href="#about" className="hover:opacity-70">About</a>

      <div className="relative group">
        <a href="#work" className="hover:opacity-70 inline-flex items-center gap-1">
          Work
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <div className="absolute left-0 top-full h-3 w-full" />
        <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-neutral-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <ul className="py-3">
            <li><a href="#needs-analysis" className="block px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">Needs Analysis</a></li>
            <li><a href="#online-learning-production" className="block px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">Online Learning Production</a></li>
            <li><a href="#instructional-design" className="block px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">Instructional Design</a></li>
            <li><a href="#workshop-delivery" className="block px-5 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50">Workshop Design & Delivery</a></li>
          </ul>
        </div>
      </div>

      <a href="#contact" className="hover:opacity-70">Contact</a>
    </div>

    {/* Mobile hamburger */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
      aria-label="Toggle menu"
    >
      <span className={`block w-6 h-px bg-neutral-800 transition-transform ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
      <span className={`block w-6 h-px bg-neutral-800 transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
      <span className={`block w-6 h-px bg-neutral-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
    </button>
  </div>

  {/* Mobile menu dropdown */}
  <div
    className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-neutral-200 ${
      menuOpen ? "max-h-96" : "max-h-0"
    }`}
  >
    <ul className="px-6 py-4 space-y-3 text-base">
      <li><a href="#about" onClick={() => setMenuOpen(false)} className="block py-2">About</a></li>
      <li className="pt-2 pb-1 text-xs uppercase tracking-[0.2em] text-neutral-500">Work</li>
      <li><a href="#needs-analysis" onClick={() => setMenuOpen(false)} className="block py-1.5 pl-3 text-neutral-700">— Needs Analysis</a></li>
      <li><a href="#online-learning-production" onClick={() => setMenuOpen(false)} className="block py-1.5 pl-3 text-neutral-700">— Online Learning Production</a></li>
      <li><a href="#instructional-design" onClick={() => setMenuOpen(false)} className="block py-1.5 pl-3 text-neutral-700">— Instructional Design</a></li>
      <li><a href="#workshop-delivery" onClick={() => setMenuOpen(false)} className="block py-1.5 pl-3 text-neutral-700">— Workshop Design & Delivery</a></li>
      <li className="pt-2"><a href="#contact" onClick={() => setMenuOpen(false)} className="block py-2">Contact</a></li>
    </ul>
  </div>
</nav>

 {/* HERO */}
<section id="top" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Logo side */}
    <div className="flex justify-center md:justify-start">
      <img
        src="/gamut-logo.png"
        alt="Gamut Design"
        className="w-full max-w-sm h-auto"
      />
    </div>

    {/* Text side */}
    <div>
      <h1 className="text-5xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-8">
        Your <span className="italic">learning and development</span> business partner
      </h1>
      <p className="mt-6 text-lg md:text-lg font-light text-neutral-800 leading-relaxed">
        We specialise in building online, blended, and face-to-face learning experiences that grow your people and your business.
      </p>
    </div>
  </div>
</section>


    {/* MANIFESTO */}

{/* Full-width peach with gradient fades */}
<div className="relative bg-[#FFF2E9] overflow-hidden">
  {/* Top fade — white blending down into peach */}
  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white to-transparent pointer-events-none" />
  {/* Bottom fade — peach blending down into white */}
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pointer-events-none" />


<section id="about" className="max-w-6xl mx-auto px-6 py-24 border-t border-neutral-200">
  <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
Our approach
  </h2>
<div className="max-w-2xl">
 
   <p className="mt-6 text-lg md:text-lg font-light text-neutral-800 leading-relaxed"> Developing quality learning takes more than good intentions in our information-heavy, fast-paced world.
  </p>

  <p className="mt-6 text-lg md:text-lg text-neutral-1200 leading-relaxed">
   So, what does it take?
  </p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
  {/* 01 */}
  <div>
    <div className="mb-5 text-neutral-700">
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="18" r="6" />
        <path d="M12 40c0-6.6 5.4-12 12-12s12 5.4 12 12" />
        <path d="M8 24c2-1 4-1 6 0M40 24c-2-1-4-1-6 0" />
      </svg>
    </div>
    <p className="font-mono text-xs text-neutral-500 mb-3">01 Understanding your learners </p>
    <p className="text-base md:text-lg font-light text-neutral-800 leading-relaxed">
      Understanding your learners and how they learn best. We use the latest evidence-based approaches to design learning that sticks.
    </p>
  </div>

  {/* 02 */}
  <div>
    <div className="mb-5 text-neutral-700">
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="14" height="28" />
        <rect x="26" y="6" width="14" height="36" />
        <path d="M12 22h6M12 28h6M12 34h6M30 14h6M30 22h6M30 30h6" />
      </svg>
    </div>
    <p className="font-mono text-xs text-neutral-500 mb-3">02 Understanding your organisation </p>
    <p className="text-base md:text-lg font-light text-neutral-800 leading-relaxed">
      Understanding your organisation: your culture, your learners, your brand, and your business direction.
    </p>
  </div>

  {/* 03 */}
  <div>
    <div className="mb-5 text-neutral-700">
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="5" />
        <circle cx="34" cy="14" r="5" />
        <circle cx="24" cy="34" r="5" />
        <path d="M18 16l12 0M16 18l6 12M32 18l-6 12" />
      </svg>
    </div>
    <p className="font-mono text-xs text-neutral-500 mb-3">03 Embedding learning </p>
    <p className="text-base md:text-lg font-light text-neutral-800 leading-relaxed">
      Embedding learning into your operational workflows making learning consistent, continuous, and seamless.
    </p>
  </div>

  {/* 04 */}
  <div>
    <div className="mb-5 text-neutral-700">
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 40s-12-7-12-18a8 8 0 0 1 12-7 8 8 0 0 1 12 7c0 11-12 18-12 18z" />
        <path d="M38 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
      </svg>
    </div>
    <p className="font-mono text-xs text-neutral-500 mb-3">04 Designing for impact </p>
    <p className="text-base md:text-lg font-light text-neutral-800 leading-relaxed">
      Maintaining high standards for human-centric design. Ensuring high-quality experiences are crafted with care, intention and accessibility in mind.
    </p>
  </div>

</div>

{/* Bracket */}
<div className="mt-12 flex justify-center">
  <svg
    viewBox="0 0 1000 50"
    className="w-full max-w-5xl text-neutral-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
  >
    <path d="M 10 5 Q 10 30, 35 30 L 485 30 Q 500 30, 500 48 Q 500 30, 515 30 L 965 30 Q 990 30, 990 5" />
  </svg>
</div>

{/* AI Conclusion */}
<div className="mt-10 text-center max-w-4xl mx-auto">
  <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-snug text-neutral-900">
    Using <span className="font-script text-3xl md:text-4xl lg:text-5xl text-neutral-800">smart AI workflows</span> to maximise these quality outcomes — with minimal effort.
  </p>
</div>
</section>

</div>

      {/* WORK */}
<section id="work" className="max-w-6xl mx-auto px-6 py-32 border-t border-neutral-200">
  <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
Our work </h2>

  {/* Value proposition */}

  <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl">We create solutions that slot straight into your organisational workflows and environment, ensuring continuity of learning. <br /><br /></p>
<h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-10">

</h3>

{capabilities.map((cap, i) => (
  <Carousel key={i} capability={cap} />
))}

</section>
   <section id="contact" className="max-w-6xl mx-auto px-6 py-24 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-8">Contact</h2>
  <div className="grid md:grid-cols-3 gap-12 items-start">
    <img
      src="/sarah.jpg"
      alt="Sarah Halawani"
      className="w-full rounded-2xl object-cover aspect-square"
    />
    <div className="md:col-span-2 text-xl md:text-2xl font-light leading-relaxed">
      Sarah is a skilled learning specialist with experience in designing, building and supporting programs for a range of organisation types including commercial, not-for-profit, clinical, academic, and small business environments.
      <br /><br />
      She has an in-depth understanding of adult learning principles and is passionate about inspiring individuals to play to their strengths, become lifelong learners and fulfill their human potential.
    </div>
  </div>
</section>
   <section className="max-w-6xl mx-auto px-6 py-16 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-4xl md:text-6xl font-light tracking-tight mb-10">
          Let's design something <span className="italic">meaningful</span>.
        </p>
        <a
          href="mailto:halawani.sarah@gmail.com"
          className="inline-block px-8 py-4 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition"
        >
          Get in touch →
        </a>
      </section>



      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 flex justify-between">
        <span>© {new Date().getFullYear()} Sarah Halawani</span>
<span>ABN 33 674 905 074</span>	
        <span>...because humans resonate with humans</span>
      </footer>
    
       </div>
  );
}