import { MapPin, Building2, ShoppingBag, Briefcase, Trees, ChevronLeft, ChevronRight, LayoutTemplate, Waves, Dumbbell, Wine, Gamepad2, Volume2, Landmark, Maximize2, X, Sparkles } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { projects } from '../data';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Custom Image placeholder renderer that falls back gracefully with exact colors and file naming instruction
function SmartCarouselImage({ 
  filename, 
  fallbackImage,
  bgGradient, 
  colorHex, 
  title 
}: { 
  filename: string; 
  fallbackImage?: string;
  bgGradient: string; 
  colorHex: string; 
  title: string; 
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [prevFilename, setPrevFilename] = useState(filename);

  const getNormalizedSrc = (pathStr: string) => {
    let clean = pathStr;
    if (clean.startsWith('public/')) {
      clean = clean.slice(7);
    } else if (clean.startsWith('/public/')) {
      clean = clean.slice(8);
    }
    return clean.startsWith('/') ? clean : `/${clean}`;
  };

  // Synchronous State Reset on Prop Change (High-Performance React Pattern)
  if (filename !== prevFilename) {
    setPrevFilename(filename);
    setImageLoaded(false);
    setImageError(false);
    setUseFallback(false);
  }

  const activeSrc = useFallback && fallbackImage ? fallbackImage : filename;
  const currentSrc = getNormalizedSrc(activeSrc);

  const handleError = () => {
    if (fallbackImage && !useFallback) {
      setUseFallback(true);
    } else {
      setImageError(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  return (
    <div className={`relative w-full h-[280px] md:h-[380px] bg-gradient-to-tr ${bgGradient} flex flex-col items-center justify-center p-6 text-center overflow-hidden rounded-sm border border-amber-500/10`}>
      {/* Absolute overlay of custom color */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-color" 
        style={{ backgroundColor: colorHex }}
      />

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Decorative luxury geometries */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="border border-white w-[85%] h-[85%] rotate-12 transition-transform duration-1000" />
        <div className="border border-white w-[70%] h-[70%] -rotate-12" />
      </div>

      {!imageError && (
        <div 
          onClick={() => imageLoaded && setIsZoomed(true)}
          className={`absolute inset-0 w-full h-full ${imageLoaded ? 'cursor-zoom-in group/img-container' : 'cursor-default'}`}
        >
          <img
            src={currentSrc}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 group-hover/img-container:scale-105' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleError}
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Elegant Shimmer / Loading State */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/20 backdrop-blur-[2px]">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin mb-3" />
          <span className="text-[10px] text-amber-500/80 font-mono tracking-widest uppercase">
            Loading Presentation...
          </span>
        </div>
      )}

      {/* Luxury Real Estate Teaser Card when Image is Missing */}
      {imageError && (
        <div className="relative z-10 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
          {/* Brand Accent */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center border text-amber-500 mb-6 bg-amber-500/10 backdrop-blur-sm"
            style={{ borderColor: `${colorHex}40` }}
          >
            <span className="font-mono text-[9px] font-bold tracking-widest">ASGARD</span>
          </div>

          {/* Title */}
          <h4 className="text-[#FCFAF6] font-serif italic text-2xl md:text-3xl mb-3 tracking-wide drop-shadow-sm font-medium">
            {title}
          </h4>

          {/* Golden Separator */}
          <div className="w-16 h-[1px] bg-amber-500/30 my-3" />

          {/* Subtitle / Description */}
          <span className="text-amber-500/80 uppercase tracking-[0.2em] text-[9px] font-bold font-mono">
            Exclusive Community Space
          </span>

          <p className="text-xs text-stone-300 font-light mt-4 leading-relaxed max-w-xs">
            Designed to integrate elevated leisure, functional luxury, and high-end community features.
          </p>

          {/* Subtle Real Estate Disclaimer */}
          <p className="text-[9px] text-stone-500 mt-8 font-light italic max-w-xs uppercase tracking-wider">
            * Artist's perspective only. Actual designs are subject to change.
          </p>
        </div>
      )}

      {/* Lightbox / Zoom-in Full-size Viewer Overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8 bg-[#0C0A07]/98 backdrop-blur-md select-none cursor-default animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close button at top right */}
          <button 
            type="button"
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 z-[110] p-3 rounded-full bg-[#1C1812]/90 hover:bg-[#2F291E]/90 text-[#FAF9F6] hover:text-amber-400 transition-all cursor-pointer border border-amber-500/20 shadow-md hover:scale-105"
            aria-label="Close full screen view"
          >
            <X size={20} />
          </button>

          {/* Escape listener helper */}
          <div className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center">
            <img
              src={currentSrc}
              alt={title}
              className="max-w-full max-h-full object-contain cursor-zoom-out shadow-2xl rounded border border-white/5"
              onClick={(e) => {
                e.stopPropagation(); // keep clicked background closing active on background only
                setIsZoomed(false);
              }}
            />
          </div>

          {/* Bottom Luxury Title bar with the specific artist disclaimer shown precisely below the amenity name */}
          <div 
            className="mt-6 bg-[#13110E] border border-amber-500/40 px-8 py-4.5 rounded-sm max-w-xl w-full text-center shadow-2xl flex flex-col items-center justify-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[9px] uppercase tracking-[0.22em] font-mono text-amber-500 font-bold mb-0.5">Luxury Suite / Plan Presentation</p>
            <h4 className="text-[#FCFAF6] font-serif italic text-lg md:text-2xl font-normal leading-snug tracking-wide">{title}</h4>
            
            <div className="w-20 h-[1px] bg-amber-500/25 my-1.5" />
            
            <p className="text-[11px] font-serif italic text-stone-200 font-medium leading-none">
              Artist's Perspective only.
            </p>
            <p className="text-[8px] text-stone-400 uppercase tracking-[0.15em] font-light leading-relaxed mt-1">
              The developer reserves the right to modify as it sees fit without prior notice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CityClou() {
  const project = projects.find(p => p.id === 'city-clou')!;

  const [activeTowerIdx, setActiveTowerIdx] = useState(0);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);

  // --- Unit Perspectives Carousel State ---
  const [perspectiveIdx, setPerspectiveIdx] = useState(0);

  const unitPerspectives = [
    {
      type: 'livingroom',
      viewName: 'livingroom',
      filename: 'city-clou-unit-perspective-livingroom.png',
      bgGradient: 'from-amber-900/30 via-stone-900 to-neutral-950',
      colorHex: '#f59e0b', // Warm golden sand
      icon: LayoutTemplate,
      desc: ''
    },
    {
      type: 'bedroom',
      viewName: 'bedroom',
      filename: 'city-clou-unit-perspective-bedroom.png',
      bgGradient: 'from-emerald-950/40 via-teal-900/25 to-neutral-950',
      colorHex: '#10b981', // Soft emerald mint
      icon: LayoutTemplate,
      desc: ''
    },
    {
      type: 'kitchen',
      viewName: 'kitchen',
      filename: 'city-clou-unit-perspective-kitchen.png',
      bgGradient: 'from-indigo-950/50 via-neutral-900 to-neutral-50 border-indigo-500/10',
      colorHex: '#6366f1', // Architectural twilight blue
      icon: Sparkles,
      desc: ''
    },
    {
      type: 'bathroom',
      viewName: 'bathroom',
      filename: 'city-clou-unit-perspective-bathroom.png',
      bgGradient: 'from-indigo-950/50 via-neutral-900 to-neutral-50 border-indigo-500/10',
      colorHex: '#6366f1', // Architectural twilight blue
      icon: Sparkles,
      desc: ''
    }
  ];

  const nextPerspective = () => {
    setPerspectiveIdx((prev) => (prev + 1) % unitPerspectives.length);
  };

  const prevPerspective = () => {
    setPerspectiveIdx((prev) => (prev - 1 + unitPerspectives.length) % unitPerspectives.length);
  };

  const towersData = [
    {
      name: 'Tower A',
      filename: 'city-clou-tower-a.jpg',
      bgGradient: 'from-amber-950/40 via-yellow-950/20 to-neutral-950',
      colorHex: '#d97706', // Warm sunset amber
      desc: 'Featuring efficient studios and cozy 2-bedroom residences tailored for modern urban families and professionals.',
      units: [
        { type: 'Studio Units', size: '22.82 - 24.86 SQM', desc: 'Compact, streamlined layouts featuring floor-to-ceiling vistas.', filename: 'city-clou-tower-a-studio-raw.png' },
        { type: '2-Bedroom Units', size: '42.00 - 43.19 SQM', desc: 'Spacious suites designed around active modern city living.', filename: 'city-clou-tower-a-2br-raw.png' }
      ]
    },
    {
      name: 'Tower B',
      filename: 'city-clou-tower-b.jpg',
      bgGradient: 'from-sky-950/40 via-neutral-900 to-neutral-950',
      colorHex: '#0284c7', // Sky blue
      desc: 'An exquisite combination of sleek spaces, perfect 1-bedrooms, and elegant 2-bedroom apartments.',
      units: [
        { type: 'Studio Units', size: '27.38 - 31.97 SQM', desc: 'Enhanced studio floor plans balancing cozy-ness and function.', filename: 'city-clou-tower-b-studio.png' },
        { type: '1-Bedroom Units', size: '36.89 - 42.84 SQM', desc: 'Dynamic single-bedroom sanctuaries with designated dining nooks.', filename: 'city-clou-tower-b-1br.png' },
        { type: '2-Bedroom Units', size: '59.82 SQM', desc: 'Magnificent layouts prioritizing privacy, fluid motion, and daylight.', filename: 'city-clou-tower-b-2br.png' }
      ]
    },
    {
      name: 'Tower C',
      filename: 'city-clou-tower-c.jpg',
      bgGradient: 'from-teal-900/40 via-neutral-900 to-neutral-950',
      colorHex: '#0d9488', // Emerald teal
      desc: 'Premium urban towers with grand studio configurations, premium 1-bedroom units, and stellar 2-bedroom layouts.',
      units: [
        { type: 'Studio Units', size: '27.00 - 32.40 SQM', desc: 'Expansive open-layout studio floor plans for flexible styling.', filename: 'city-clou-tower-c-Studio.png' },
        { type: '1-Bedroom Units', size: '34.16 - 40.56 SQM', desc: 'Comfortable spaces perfect for executive living and rental income.', filename: 'city-clou-tower-c-1br.png' },
        { type: '2-Bedroom Units', size: '67.70 SQM', desc: 'Spacious layouts featuring dual baths and wide corner views.', filename: 'city-clou-tower-c-2br.png' }
      ]
    },
    {
      name: 'Tower D',
      filename: 'city-clou-tower-d.jpg',
      bgGradient: 'from-indigo-950/40 via-purple-950/10 to-neutral-950',
      colorHex: '#4f46e5', // Royal indigo
      desc: 'The crown gem of the business district with expansive units, multi-bedroom options, and premium flexi spaces.',
      units: [
        { type: 'Studio Units', size: '24.64 - 33.00 SQM', desc: 'Stellar starting residences overlooking Cebu’s sparkling cityscape.', filename: 'city-clou-tower-d-studio.png' },
        { type: '1-Bedroom Units', size: '42.92 SQM', desc: 'Generous executive spaces with enhanced kitchen and bath layouts.', filename: 'city-clou-tower-d-1br.png' },
        { type: '2-Bedroom Units', size: '57.34 SQM', desc: 'Spacious modern environments customized for growing households.', filename: 'city-clou-tower-d-2br.png' },
        { type: '2-Bedroom with Suite', size: '84.92 SQM', desc: 'Premium multi-generational suites with grand terraces.', filename: 'city-clou-tower-d-2br-suite.png' },
        //{ type: 'Flexi Units', size: '51.19 - 57.26 SQM', desc: 'Convertible modern layouts serving as home offices or dual keys.', filename: 'city-clou-tower-d-flexi.png' },
        { type: '3-Bedroom Suite', size: '114.52 SQM', desc: 'The absolute height of Cebu City luxury, featuring massive living areas.', filename: 'city-clou-tower-d-3br-suite.png' }
      ]
    }
  ];

  const [amenityIdx, setAmenityIdx] = useState(0);

  const officialAmenities = [
    { 
      name: 'Clou Mall & Retail Hub', 
      desc: 'A three-level curated premium retail hub featuring dining options, boutiques, and convenient stores.', 
      category: 'Retail Hub',
      filename: 'city-clou-amenity-clou-mall.png',
      colorHex: '#b45309', // Warm bronze
      bgGradient: 'from-amber-950 via-yellow-950/20 to-neutral-950',
      icon: ShoppingBag,
    },
    { 
      name: 'Pool Complex', 
      desc: 'Featuring a professional-sized Lap Pool, a safe Kiddie Pool, and an active fun splash zone for total family leisure.', 
      category: 'Aquatics',
      filename: 'city-clou-amenity-pool-2.jpg',
      colorHex: '#0284c7', // Cyan water
      bgGradient: 'from-sky-950 via-cyan-900/20 to-neutral-950',
      icon: Waves,
    },
    { 
      name: 'Gym & Fitness Area', 
      desc: 'Equipped with top-of-the-line cardio targets, weight stations, and specialized physical conditioning gears.', 
      category: 'Wellness',
      filename: 'city-clou-amenity-gym.jpg',
      colorHex: '#4b5563', // Steel grey
      bgGradient: 'from-neutral-800 via-neutral-900 to-neutral-950',
      icon: Dumbbell,
    },
    { 
      name: 'Yoga Room & Dance Studio', 
      desc: 'Tranquil mirrored spaces designed for meditation, yoga practices, group stretching, or dance rehearsals.', 
      category: 'Mindfulness',
      filename: 'city-clou-amenity-yoga.png',
      colorHex: '#0d9488', // Emerald
      bgGradient: 'from-teal-950 via-emerald-900/10 to-neutral-950',
      icon: Trees,
    },
    { 
      name: 'Three-Level Clubhouse', 
      desc: 'The architectural focal point of the development. A multi-story leisure center designed for hosting community events.', 
      category: 'Social Club',
      filename: 'city-clou-amenity-clubhouse.png',
      colorHex: '#4f46e5', // Royal indigo
      bgGradient: 'from-indigo-950 via-neutral-900 to-neutral-950',
      icon: Building2,
    },
    { 
      name: 'Lounge & Study Room', 
      desc: 'A quiet, distraction-free environment curated for remote workers, study sessions, and casual co-working gatherings.', 
      category: 'Business',
      filename: 'img-city-clou-amenity-11-babc5c9321c7407039cc90c12874bccda1f303c8b626178c9148ac0adccb578b.png',
      colorHex: '#64748b', // Cool slate
      bgGradient: 'from-neutral-900 via-neutral-800 to-neutral-950',
      icon: Briefcase,
    },
    { 
      name: 'Karaoke Rooms', 
      desc: 'Private soundproofed entertainment suites designed for gatherings, weekend karaoke, or intimate celebrations.', 
      category: 'Social',
      filename: 'city-clou-amenity-karaoke-2.png',
      colorHex: '#e11d48', // Vibrant crimson
      bgGradient: 'from-rose-950 via-neutral-900 to-neutral-950',
      icon: Volume2,
    },
    { 
      name: 'Function Hall', 
      desc: 'Large, custom-configurable banquet and event halls ready to accommodate personal celebrations or corporate seminars.', 
      category: 'Conference',
      filename: 'img-city-clou-amenity-12-bd3e6e26954d11d4b1e75a5dd59190a8fe07b18d315e36e8605e1ff8b3927ee8.png',
      colorHex: '#7c3aed', // Pure violet
      bgGradient: 'from-violet-950 via-neutral-900 to-neutral-950',
      icon: Landmark,
    },
    { 
      name: 'Indoor Playroom & Playground', 
      desc: 'Colorful and secure sensory playrooms for toddler developmental programs and outdoor slides for children’s play.', 
      category: 'Family Recreation',
      filename: 'city-clou-amenity-indoor-playroom.png',
      colorHex: '#ea580c', // Bright orange
      bgGradient: 'from-orange-950 via-red-950/20 to-neutral-950',
      icon: Gamepad2,
    },
    { 
      name: 'Meditation & Pocket Gardens', 
      desc: 'Landscaped rooftop paths, pocket forests, and water features that allow for mental relaxation and fresh air.', 
      category: 'Nature',
      filename: 'city-clou-amenity-pocket-garden.jpg',
      colorHex: '#16a34a', // Leaf green
      bgGradient: 'from-emerald-950 via-green-900/10 to-neutral-950',
      icon: Trees,
    }
  ];

  const nextTower = () => {
    setActiveTowerIdx((prev) => (prev + 1) % towersData.length);
  };

  const prevTower = () => {
    setActiveTowerIdx((prev) => (prev - 1 + towersData.length) % towersData.length);
  };

  const nextUnit = () => {
    const currentUnits = towersData[activeTowerIdx].units;
    setActiveUnitIdx((prev) => (prev + 1) % currentUnits.length);
  };

  const prevUnit = () => {
    const currentUnits = towersData[activeTowerIdx].units;
    setActiveUnitIdx((prev) => (prev - 1 + currentUnits.length) % currentUnits.length);
  };

  const nextAmenity = () => {
    setAmenityIdx((prev) => (prev + 1) % officialAmenities.length);
  };

  const prevAmenity = () => {
    setAmenityIdx((prev) => (prev - 1 + officialAmenities.length) % officialAmenities.length);
  };

  const [overviewIdx, setOverviewIdx] = useState(0);

  const overviewTowersSlides = [
    {
      title: "Master Architectural Design (Towers A to E)",
      url: "/city-clou-all-towers.webp",
      desc: "Designed seamlessly with five towers: Tower A to D (Residential) and Tower E (The Enterprise Tower - Commercial & Office spaces) rising above Cebu City Center."
    },
    {
      title: "Tower A Profile",
      url: "/city-clou-tower-a.webp",
      desc: "Warm sunset aesthetics tailored around active urban lifestyles, commercial hubs, and flexible studio and two-bedroom options."
    },
    {
      title: "Tower B Profile",
      url: "/city-clou-tower-b.webp",
      desc: "Stunning modern formats balancing cozy studio configurations with spacious single-bedroom sanctuaries and elegant family suites."
    },
    {
      title: "Tower C Profile",
      url: "/city-clou-tower-c.webp",
      desc: "Commanding views of Cebu City, featuring broad open-concept design plans and high yield executive rentals."
    },
    {
      title: "Tower D Profile",
      url: "/city-clou-tower-d.webp",
      desc: "The absolute crown jewel of the community with top-tier multi-room suites and hybrid home offices."
    },
    {
      title: "Tower E Profile",
      url: "/city-clou-tower-e.webp",
      desc: "Office Space."
    }
  ];

  const nextOverview = () => {
    setOverviewIdx((prev) => (prev + 1) % overviewTowersSlides.length);
  };

  const prevOverview = () => {
    setOverviewIdx((prev) => (prev - 1 + overviewTowersSlides.length) % overviewTowersSlides.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-50 transition-colors duration-300">
      {/* Hero - Cinematic Theme-Adaptive Design */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-slate-50 dark:bg-neutral-950 px-6 sm:px-12 py-20 overflow-hidden border-b border-slate-200 dark:border-neutral-900 transition-colors duration-300">
        {/* Background Grid Accent with adaptive line opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(156,134,97,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(156,134,97,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Cinematic Backdrop & Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.5 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover saturate-100 brightness-100 transition-all duration-1000 dark:brightness-50 dark:saturate-75"
            referrerPolicy="no-referrer"
          />
          {/* Fades beautifully into the page's current theme background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-slate-50/40 to-slate-50 dark:from-neutral-950/10 dark:via-neutral-950/40 dark:to-neutral-950 pointer-events-none" />
          <div className="absolute -left-1/4 -top-1/4 w-[60%] h-[60%] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -right-1/4 -bottom-1/4 w-[60%] h-[60%] bg-amber-500/2 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        </div>
        
        {/* Decorative thin frame for extreme elegance */}
        <div className="absolute inset-8 border border-slate-200/20 dark:border-neutral-800/35 pointer-events-none hidden md:block">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-500/30" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-500/30" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-500/30" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-500/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-amber-600 dark:text-amber-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.4em] mb-4 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block backdrop-blur-md">
            Mixed Use
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-slate-950 dark:text-[#FCFAF6] leading-none mb-6 drop-shadow-md">{project.name}</h1>
          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
            <MapPin className="text-amber-500 w-4 h-4" /> {project.location}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section className="bg-white dark:bg-[#0c0a09] p-12 shadow-sm border border-slate-200 dark:border-neutral-900 transition-colors duration-300">
              <h2 className="text-3xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-6 border-b-2 border-amber-500 inline-block pb-2">A Vibrant Mixed-Use Community</h2>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-light mb-6">
                City Clou is Golden Topper’s first foray into the vibrant Cebu City skyline. Located along D. Jakosalem St., Brgy. Zapatera, it is Cebu's premier mixed-use development, seamlessly integrating residential, office, and commercial spaces.
              </p>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-light">
                Comprising four residential towers, a dedicated office tower, and a three-level commercial retail hub, City Clou is designed to bring elevated living, working, and leisure to the Queen City of the South.
              </p>
            </section>

          <section className="bg-white dark:bg-[#0c0a09] p-12 border border-slate-200 dark:border-neutral-900 shadow-sm relative overflow-hidden space-y-8 transition-colors duration-300">
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2 border-l-4 border-amber-500 pl-4">
                  Community Business District Amenities
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  A sanctuary within the city. Experience Cebu City's premier lifestyle hub, showcasing world-class spaces crafted to provide a complete, balanced community. Click through index dots or use the primary directory grid at the bottom.
                </p>
              </div>

                {/* Main Elegant Carousel */}
              <div className="relative group overflow-hidden border-[4px] border-slate-50 bg-slate-100 rounded-sm shadow-inner">
                <SmartCarouselImage 
                  filename={officialAmenities[amenityIdx].filename}
                  title={officialAmenities[amenityIdx].name}
                  bgGradient={officialAmenities[amenityIdx].bgGradient}
                  colorHex={officialAmenities[amenityIdx].colorHex}
                />
                
                {/* Left/Right controls */}
                <button 
                  type="button"
                  onClick={prevAmenity}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs border border-[#FCFAF6]/10 flex items-center justify-center text-[#FCFAF6] transition-all z-20 group-hover:scale-105 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 pointer-events-none" />
                </button>
                <button 
                  type="button"
                  onClick={nextAmenity}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs border border-[#FCFAF6]/10 flex items-center justify-center text-[#FCFAF6] transition-all z-20 group-hover:scale-105 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* Clickable Micro-Dot Indicators (Symmetric Alignment) */}
              <div className="flex justify-center gap-2 pt-2 pb-4">
                {officialAmenities.map((_, dotIdx) => (
                  <button 
                    key={dotIdx}
                    onClick={() => setAmenityIdx(dotIdx)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      amenityIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to amenity ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Complete Clickable Interactive Amenities Directory Grid */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block">
                  Leisure & Business Directory: Click an option to view details
                </span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {officialAmenities.map((amenity, idx) => {
                    const IconComp = amenity.icon;
                    const isActive = idx === amenityIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setAmenityIdx(idx)}
                        className={`p-3.5 border text-left flex flex-col justify-between gap-3 font-sans transition-all duration-300 rounded cursor-pointer ${
                          isActive 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-500/20 shadow-md scale-[1.02]' 
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[8px] uppercase tracking-widest font-extrabold ${isActive ? 'text-slate-950/80' : 'text-slate-400'}`}>
                            {amenity.category}
                          </span>
                          {IconComp && <IconComp size={12} className={isActive ? 'text-slate-950' : 'text-slate-400'} />}
                        </div>
                        <span className="font-bold text-[10px] leading-tight uppercase tracking-wider block">
                          {amenity.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="bg-white p-12 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-serif text-slate-900 mb-2 border-l-4 border-amber-500 pl-4">Tower Configurations & Unit Sizes</h3>
              <p className="text-sm text-slate-500 relative mb-8 font-light">
                City Clou comprises multiple premium residential towers. Select a tower from the interactive directory below to start browsing its distinctive layout units, sizing configurations, and available inventory dimensions.
              </p>

              {/* Towers Overview Experience Carousel (Towers A to E) */}
              <div className="mb-10 space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">Tower Overview Exhibit: Towers A to E Complex View</span>
                <div className="relative group overflow-hidden border-4 border-slate-50 bg-slate-100 rounded-sm shadow-md">
                  <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden bg-slate-950">
                    <img
                      src={overviewTowersSlides[overviewIdx].url}
                      alt={overviewTowersSlides[overviewIdx].title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Clean overlay to maintain image depth hover */}
                    <div className="absolute inset-0 bg-black/5 hover:bg-transparent pointer-events-none transition-colors duration-300" />
                  </div>

                  {/* Left / Right Navigators */}
                  <button 
                    type="button"
                    onClick={prevOverview}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-xs border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer hover:scale-105"
                    aria-label="Previous overview tower"
                  >
                    <ChevronLeft className="w-5 h-5 pointer-events-none" />
                  </button>
                  <button 
                    type="button"
                    onClick={nextOverview}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-xs border border-white/10 flex items-center justify-center text-white transition-all z-20 cursor-pointer hover:scale-105"
                    aria-label="Next overview tower"
                  >
                    <ChevronRight className="w-5 h-5 pointer-events-none" />
                  </button>


                </div>

                {/* Symmetric Dots */}
                <div className="flex justify-center gap-2 pt-1 mb-4">
                  {overviewTowersSlides.map((_, dotIdx) => (
                    <button 
                      key={dotIdx}
                      onClick={() => setOverviewIdx(dotIdx)}
                      className={`h-2 transition-all cursor-pointer rounded-full ${
                        overviewIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Go to overview slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>

                {/* Left Border Callout */}
                <div className="mt-4 border-l-2 border-amber-500 pl-4 py-1 animate-fade-in">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 mb-1">
                    {overviewTowersSlides[overviewIdx].title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-300 italic leading-relaxed">
                    {overviewTowersSlides[overviewIdx].desc}
                  </p>
                </div>
              </div>

              {/* Elevated Tower Navigation Directory Grid (Positioned at top for exceptional UX layout) */}
              <div className="space-y-4 mb-8">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Tower Investment Directory (Click to Select Tower)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {towersData.map((tower, idx) => {
                    const isActive = activeTowerIdx === idx;
                    // Gather high level config label
                    const labels = tower.units.map(u => u.type.split(' ')[0]).join(' & ');
                    return (
                      <button
                        key={tower.name}
                        onClick={() => {
                          setActiveTowerIdx(idx);
                          setActiveUnitIdx(0);
                          setOverviewIdx(idx + 1);
                        }}
                        className={`text-left p-4 border flex flex-col justify-between gap-3 transition-all rounded hover:shadow-xs cursor-pointer ${
                          isActive 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-500/20 scale-[1.02]' 
                            : 'bg-slate-50 border-slate-150 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? 'text-slate-950/80' : 'text-slate-400'}`}>RESIDENTIAL</span>
                          <Building2 size={12} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                        </div>
                        <div>
                          <span className="text-[12px] font-extrabold uppercase tracking-widest block">{tower.name}</span>
                          <span className={`text-[8px] font-mono tracking-wide block mt-0.5 truncate ${isActive ? 'text-slate-950/75' : 'text-slate-400'}`}>{labels}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Decorative separator */}
              <div className="border-t border-slate-100 dark:border-slate-850 my-6" />

              {/* Tower Interactive Carousel representing selected units inside current tower */}
              <div className="relative group overflow-hidden mb-4 border border-slate-100 rounded-sm">
                <SmartCarouselImage 
                  filename={towersData[activeTowerIdx].units[activeUnitIdx]?.filename || towersData[activeTowerIdx].filename}
                  fallbackImage={`/${towersData[activeTowerIdx].filename}`}
                  title={`${towersData[activeTowerIdx].name} - ${towersData[activeTowerIdx].units[activeUnitIdx]?.type}`}
                  bgGradient={towersData[activeTowerIdx].bgGradient}
                  colorHex={towersData[activeTowerIdx].colorHex}
                />

                {/* Left arrow (operating on current tower's units list) */}
                <button
                  type="button"
                  onClick={prevUnit}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow border border-slate-200 flex items-center justify-center text-slate-800 hover:text-amber-600 transition-all z-20 cursor-pointer"
                  aria-label="Previous unit layout"
                >
                  <ChevronLeft className="w-5 h-5 pointer-events-none" />
                </button>

                {/* Right arrow (operating on current tower's units list) */}
                <button
                  type="button"
                  onClick={nextUnit}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow border border-slate-200 flex items-center justify-center text-slate-800 hover:text-amber-600 transition-all z-20 cursor-pointer"
                  aria-label="Next unit layout"
                >
                  <ChevronRight className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* Clickable Micro-Dot Indicators (Symmetric Alignment for active unit slides) */}
              <div className="flex justify-center gap-2 pb-6">
                {towersData[activeTowerIdx].units.map((_, dotIdx) => (
                  <button 
                    key={dotIdx}
                    onClick={() => setActiveUnitIdx(dotIdx)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      activeUnitIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to Unit ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Selected Tower Content and Clickable Unit Rows */}
              <div className="space-y-6">
                <p className="text-xs text-slate-500 font-light border-l-2 border-slate-200 dark:border-slate-800 pl-4 italic mb-8">
                  {towersData[activeTowerIdx].desc}
                </p>
                <div className="space-y-4">
                  {towersData[activeTowerIdx].units.map((unit, uIdx) => {
                    const isActiveUnitRow = uIdx === activeUnitIdx;
                    return (
                      <button 
                        key={uIdx} 
                        onClick={() => setActiveUnitIdx(uIdx)}
                        className={`w-full text-left p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 rounded cursor-pointer ${
                          isActiveUnitRow 
                            ? 'bg-amber-500 border-amber-500 text-slate-950 ring-2 ring-amber-500/20 scale-[1.01]' 
                            : 'border-slate-100 bg-slate-50/50 text-slate-800 hover:bg-slate-100/70 hover:border-slate-200'
                        }`}
                      >
                        <div>
                          <h4 className={`font-bold text-[12px] uppercase tracking-wider ${isActiveUnitRow ? 'text-slate-950' : 'text-slate-950/90'}`}>{unit.type}</h4>
                          <p className={`text-[11px] font-light mt-1 max-w-sm ${isActiveUnitRow ? 'text-slate-900/85' : 'text-slate-500'}`}>{unit.desc}</p>
                        </div>
                        <div className={`shrink-0 bg-transparent px-4 py-2 font-mono text-[11px] font-bold tracking-widest text-center border ${
                          isActiveUnitRow ? 'text-slate-950 border-slate-950/40' : 'text-amber-600 border-amber-500/30'
                        }`}>
                          ± {unit.size}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Unit Perspective Interactive Carousel Section */}
            <section className="bg-white p-12 shadow-sm border border-slate-200 space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2 border-l-4 border-amber-500 pl-4">Unit Perspective</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  A visual glimpse into your future home. Experience the elegant interiors, high-quality finishes, and spacious layouts of our premium residences. Click through the index dots to view different configurations.
                </p>
              </div>

              {/* Unit Perspective Carousel Slider */}
              <div className="relative border-4 border-slate-50 shadow-md group overflow-hidden bg-slate-950">
                <SmartCarouselImage 
                  filename={unitPerspectives[perspectiveIdx].filename}
                  bgGradient={unitPerspectives[perspectiveIdx].bgGradient}
                  colorHex={unitPerspectives[perspectiveIdx].colorHex}
                  title={unitPerspectives[perspectiveIdx].type}
                />

                {/* Left/Right Overlaid Navigation */}
                <button 
                  onClick={prevPerspective} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Previous Perspective"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextPerspective} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Next Perspective"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Clickable Micro-Dot Indicators (Symmetric Alignment) */}
              <div className="flex justify-center gap-2 pt-2">
                {unitPerspectives.map((_, dotIdx) => (
                  <button 
                    key={dotIdx}
                    onClick={() => setPerspectiveIdx(dotIdx)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      perspectiveIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to perspective ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </section>

            <section className="bg-white p-12 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                <MapPin className="text-slate-900" /> Strategic Location
              </h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed font-light relative z-10">
                Located right at 0549 Dionisio Jakosalem Street, Barangay Zapatera, City Clou boasts unparalleled accessibility to Cebu Business Park, Fuente Osmeña Circle, and major universities.
              </p>
              <div className="bg-slate-200 p-2 aspect-video relative overflow-hidden border border-slate-300 relative z-10">
                 {/* Embedded Google Map iframe pointing approx to Cebu City center */}
                <iframe 
                  src="https://maps.google.com/maps?q=City%20Clou,%200549%20Dionisio%20Jakosalem%20St,%20Cebu%20City,%206000%20Cebu&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </div>

          {/* Sidebar / Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-[#0c0a09] border-t-8 border-slate-900 dark:border-amber-500 border-l border-r border-b border-slate-200 dark:border-neutral-900 p-8 shadow-sm transition-all duration-300">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-2">Interested?</h3>
              <p className="text-slate-500 dark:text-neutral-400 mb-8 text-[10px] uppercase tracking-widest leading-relaxed">Send us a message and our property specialist will assist you with pricing and availability.</p>
              
              <div className="grid grid-cols-1 gap-3 mb-6 pb-6 border-b border-slate-150 dark:border-neutral-900">
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Price Range</p>
                  <p className="text-sm font-semibold text-slate-900">{project.priceRange}</p>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-100">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Turnover</p>
                  <p className="text-sm font-semibold text-slate-900">{project.turnover}</p>
                </div>
              </div>

              <ContactForm projectName={project.name} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
