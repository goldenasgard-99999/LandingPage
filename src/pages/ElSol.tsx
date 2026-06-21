import { MapPin, Waves, Dumbbell, Gamepad2, Wine, PlaneTakeoff, ChevronLeft, ChevronRight, LayoutTemplate, Trees, Volume2, Landmark, ShieldAlert, Sparkles, Flame, Coffee, Maximize2, X, Sun } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { projects } from '../data';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Custom Image placeholder renderer that fallback gracefully with exact colors and file naming instruction
function SmartCarouselImage({ 
  filename, 
  bgGradient, 
  colorHex, 
  title 
}: { 
  filename: string; 
  bgGradient: string; 
  colorHex: string; 
  title: string; 
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [filename]);

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
            src={`/${filename}`}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 group-hover/img-container:scale-105' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
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
              src={`/${filename}`}
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

export default function ElSol() {
  const project = projects.find(p => p.id === 'el-sol')!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Amenities Carousel State ---
  const [amenityIdx, setAmenityIdx] = useState(0);

  const resortAmenities = [
    {
      name: 'Adult & Kiddie Pool',
      category: 'Aquatic Leisure',
      filename: 'el-sol-amenity-swimmingpool.png',
      bgGradient: 'from-blue-900/40 via-cyan-900/25 to-neutral-950',
      colorHex: '#0ea5e9', // Deep ocean water cyan
      icon: Waves,
      desc: 'Beautifully landscaped pools designed with natural volcanic stone detailing and tropical flora borderings, evoking a premium island shoreline vacation.'
    },
    {
      name: 'Gym with Yoga Room',
      category: 'Health & Wellness',
      filename: 'el-sol-amenity-gym.png',
      bgGradient: 'from-zinc-850 via-neutral-900 to-amber-950/20',
      colorHex: '#52525b', // Polished granite iron
      icon: Dumbbell,
      desc: 'An expansive space equipped with executive-class cardiovascular apparatuses, modern strength machines, and a quiet mirrored hardwood chamber for Zen yoga flow.'
    },
    {
      name: 'Lounge and Bar',
      category: 'Social Lounge',
      filename: 'el-sol-amenity-lounge2.png',
      bgGradient: 'from-amber-950 via-yellow-950/30 to-neutral-950',
      colorHex: '#d97706', // Sunset amber glow
      icon: Wine,
      desc: 'Elegant indoor and outdoor sunset-view hospitality lounges. Perfect for hosting residential meetups, client greetings, or unwinding with draft mocktails.'
    },
    {
      name: 'Children’s Playroom',
      category: 'Family Recreation',
      filename: 'el-sol-amenity-childrensplayroom.png',
      bgGradient: 'from-rose-950 via-pink-900/20 to-neutral-950',
      colorHex: '#f43f5e', // Creative coral rose
      icon: Gamepad2,
      desc: 'A safe, dynamic developmental playroom decorated in creative pastel colors, loaded with soft playground gears, educational booklets, and media interactive stations.'
    },
    {
      name: 'Outdoor BBQ Area',
      category: 'Outdoor Escape',
      filename: 'el-sol-amenity-bbq.png',
      bgGradient: 'from-emerald-950 via-teal-900/30 to-neutral-950',
      colorHex: '#10b981', // Nature jade green
      icon: Trees,
      desc: 'An intimate architectural view standing high under the sleek wood-and-steel pergola of the premium BBQ patio. Surrounded by high-end built-in grilling elements and cozy table settings, low timber steps transition directly down to the lower deck’s glittering resort pool and ocean horizon beyond.'
    },
    {
      name: 'Recreational Court',
      category: 'Sports & Athletic',
      filename: 'el-sol-amenity-recreationalcourt.png',
      bgGradient: 'from-violet-950 via-indigo-900/20 to-neutral-950',
      colorHex: '#6366f1', // Active tennis blue
      icon: Dumbbell,
      desc: 'A premium-coated multi-use field perfect for standard half-court basketball matches, badminton trials, and early morning team stretching sessions.'
    },
    {
      name: 'Sauna Rooms',
      category: 'Wellness Spa',
      filename: 'el-sol-amenity-sauna.png',
      bgGradient: 'from-amber-900/40 via-orange-950/20 to-neutral-950',
      colorHex: '#ca8a04', // Glowing sauna cedar wood
      icon: Flame,
      desc: 'An intimate, human-level perspective inside the luxury Female Sauna Room that strictly corresponds with the fully enclosed SDP layout. Stepping in on solid concrete entryway flooring, it transitions to a premium, stepped-up teakwood deck with a corner column heater on the left wall and tiered L-shaped cedar benches for seating against solid, opaque cedar paneled walls with absolutely no glass panes or transparent partitions.'
    },
    {
      name: 'Function Rooms',
      category: 'Events & Galas',
      filename: 'el-sol-amenity-functionroom.png',
      bgGradient: 'from-purple-950 via-neutral-900 to-neutral-950',
      colorHex: '#7c3aed', // Grand violet
      icon: Landmark,
      desc: 'Spacious high-ceiling corporate halls and social ballrooms complete with smart audiovisual arrays, modular soundproof panels, and dedicated caterer logistics kitchens.'
    },
    {
      name: 'KTV Rooms',
      category: 'Entertainment',
      filename: 'el-sol-amenity-ktv.png',
      bgGradient: 'from-pink-950 via-purple-950/10 to-neutral-950',
      colorHex: '#db2777', // Deep magenta
      icon: Volume2,
      desc: 'Soundproof luxury acoustic chambers outfitted with active ambient LED backlighting, dynamic surround sound subwoofers, and broad localized song directories.'
    },
    {
      name: 'Leisure Terrace',
      category: 'Outdoor Escape',
      filename: 'el-sol-amenity-leisureterrace.png',
      bgGradient: 'from-amber-950/30 via-neutral-900 to-neutral-950',
      colorHex: '#d97706', // Sunny amber
      icon: Sun,
      desc: 'An exquisite open-air sanctuary designed precisely around the three circular outdoor daybeds that line the modern stone balcony deck. Here, residents can bask in the sea breezes of Punta Engaño and relax in premium, private, shade-canopied lounger spheres.'
    }
  ];

  const nextAmenity = () => {
    setAmenityIdx((prev) => (prev + 1) % resortAmenities.length);
  };

  const prevAmenity = () => {
    setAmenityIdx((prev) => (prev - 1 + resortAmenities.length) % resortAmenities.length);
  };

  // --- Units Carousel State ---
  const [unitIdx, setUnitIdx] = useState(0);

  const unitConfigs = [
    {
      type: 'Studio Units',
      size: '19.62 - 21.22 SQM',
      filename: 'el-sol-tower-studio.png',
      bgGradient: 'from-teal-950 via-emerald-950/25 to-neutral-950',
      colorHex: '#10b981', // Soft emerald mint
      icon: LayoutTemplate,
      desc: 'Sleek premium studio layouts incorporating smart dual-purpose sliding partitions. Ideally crafted for high-turnover rentals, young professionals, and seaside weekenders.'
    },
    {
      type: '1-Bedroom Units',
      size: '32.24 - 38.49 SQM',
      filename: 'el-sol-tower-1br.png',
      bgGradient: 'from-amber-900/30 via-neutral-900 to-neutral-950',
      colorHex: '#f59e0b', // Warm golden sand
      icon: LayoutTemplate,
      desc: 'Extremely fluid standard bedroom layout mapping clear barriers between private suites and public living/dining zones, with sweeping high-framing custom terraces.'
    },
    {
      type: '1-Bedroom Loft Units',
      size: '40.36 - 44.10 SQM',
      filename: 'el-sol-tower-1br-loft.png',
      bgGradient: 'from-indigo-950/50 via-neutral-900 to-neutral-950',
      colorHex: '#6366f1', // Architectural twilight blue
      icon: Sparkles,
      desc: 'Elite double-height ceilings defining an avant-garde vertical perspective, bringing massive daylight inside-out and placing master bedroom suites beautifully in the high loft.'
    },
    {
      type: '1-Bedroom Suite Units',
      size: '40.65 SQM',
      filename: 'el-sol-tower-1br-suite.png',
      bgGradient: 'from-rose-950/40 via-red-950/20 to-neutral-950',
      colorHex: '#f43f5e', // Crimson royale orchid
      icon: Sparkles,
      desc: 'The pinnacle of luxury single suites featuring personalized walk-in closets, dynamic dual-entry washrooms, and wider coastal panoramic balcony profiles.'
    },
    {
      type: '2-Bedroom Units',
      size: '60.93 SQM',
      filename: 'el-sol-tower-2br.png',
      bgGradient: 'from-amber-950 via-neutral-900 to-neutral-950',
      colorHex: '#b45309', // Deep bronze gold
      icon: LayoutTemplate,
      desc: 'Expansive family formats with multiple complete washrooms, unified chef’s galley kitchens, and panoramic corner view double-door glass balconies.'
    }
  ];

  const nextUnit = () => {
    setUnitIdx((prev) => (prev + 1) % unitConfigs.length);
  };

  const prevUnit = () => {
    setUnitIdx((prev) => (prev - 1 + unitConfigs.length) % unitConfigs.length);
  };

  // --- Unit Perspectives Carousel State ---
  const [perspectiveIdx, setPerspectiveIdx] = useState(0);

  const unitPerspectives = [
    {
      type: 'bedroom',
      viewName: 'bedroom',
      filename: 'el-sol-unit-perspective-bedroom.png',
      bgGradient: 'from-emerald-950/40 via-teal-900/25 to-neutral-950',
      colorHex: '#10b981', // Soft emerald mint
      icon: LayoutTemplate,
      desc: 'An elegant, realistic perspective of the Studio Unit interior. Witness how the warm daylight spills over polished timber plank flooring and highlights the custom-crafted, dual-purpose custom sliding dividers.'
    },
    {
      type: 'livingroom',
      viewName: 'livingroom',
      filename: 'el-sol-unit-perspective-livingroom.png',
      bgGradient: 'from-amber-900/30 via-stone-900 to-neutral-950',
      colorHex: '#f59e0b', // Warm golden sand
      icon: LayoutTemplate,
      desc: 'A stunning render of the 1-Bedroom living room and dining zone. Premium stone countertops, bespoke ceiling molding, and floor-to-ceiling glass doors open up directly to the cozy viewing deck.'
    },
    {
      type: 'bathroom',
      viewName: 'bathroom',
      filename: 'el-sol-unit-perspective-bathroom.png',
      bgGradient: 'from-indigo-950/50 via-neutral-900 to-neutral-950',
      colorHex: '#6366f1', // Architectural twilight blue
      icon: Sparkles,
      desc: 'An avant-garde vertical perspective highlighting the premium double-height glass window arrays. Golden sunrise rays wash through the lofty void space, showcasing the custom staircase leading up to the master bedroom tier.'
    }
  ];

  const nextPerspective = () => {
    setPerspectiveIdx((prev) => (prev + 1) % unitPerspectives.length);
  };

  const prevPerspective = () => {
    setPerspectiveIdx((prev) => (prev - 1 + unitPerspectives.length) % unitPerspectives.length);
  };

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
            Resort Style
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
              <h2 className="text-3xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-6 border-b-2 border-amber-500 inline-block pb-2">Your Sunny Escape Awaits</h2>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-light mb-6">
                Golden Topper introduces El Sol, a leisure residential development located inside the Seagrove Estate in Punta Engaño, Mactan, Lapu-Lapu City, Cebu.
              </p>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-light">
                Experience the perfect blend of modern comfort and island aesthetic at El Sol. Designed for those who seek a resort lifestyle every day, this sanctuary offers unparalleled luxury in the vibrant island of Mactan. Wake up to breathtaking views and world-class amenities designed just for you.
              </p>
            </section>

            {/* Resort Amenities Interactive Carousel Section */}
            <section className="bg-white dark:bg-[#0c0a09] p-12 shadow-sm border border-slate-200 dark:border-neutral-900 space-y-8 transition-colors duration-300">
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2 border-l-4 border-amber-500 pl-4">Resort-Inspired Amenities</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Whether you prefer refreshing dips in the pool, energetic matches, or serene wellness chambers, El Sol offers a complete resort lifestyle. Click through index dots or use the primary directory grid at the bottom.
                </p>
              </div>

              {/* Main Interactive Carousel Slide */}
              <div className="relative border-4 border-slate-50 shadow-md group overflow-hidden bg-slate-950">
                <SmartCarouselImage 
                  filename={resortAmenities[amenityIdx].filename}
                  bgGradient={resortAmenities[amenityIdx].bgGradient}
                  colorHex={resortAmenities[amenityIdx].colorHex}
                  title={resortAmenities[amenityIdx].name}
                />

                {/* Left/Right Overlaid Navigation */}
                <button 
                  onClick={prevAmenity} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextAmenity} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Clickable Micro-Dot Indicators (Symmetric Alignment) */}
              <div className="flex justify-center gap-2 pt-2">
                {resortAmenities.map((_, dotIdx) => (
                  <button 
                    key={dotIdx}
                    onClick={() => setAmenityIdx(dotIdx)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      amenityIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Clickable Interactive Amenities Directory Grid */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Resort Facilities Directory (Click to Jump Slide)</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {resortAmenities.map((am, amIdx) => {
                    const IconComp = am.icon;
                    const isActive = amIdx === amenityIdx;
                    return (
                      <button 
                        key={amIdx} 
                        onClick={() => setAmenityIdx(amIdx)}
                        className={`text-left p-3.5 border flex flex-col justify-between gap-3 transition-all rounded hover:shadow-sm cursor-pointer ${
                          isActive 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-500/20 scale-[1.02]' 
                            : 'bg-slate-50 border-slate-100 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-[7px] font-bold uppercase ${isActive ? 'text-slate-950/80' : 'text-amber-600'}`}>{am.category}</span>
                          {IconComp && <IconComp size={12} className={isActive ? 'text-slate-950' : 'text-slate-400'} />}
                        </div>
                        <span className="text-[10px] font-bold leading-tight uppercase tracking-wider block">{am.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Unit Configurations & Sizes Interactive Carousel Section */}
            <section className="bg-white p-12 shadow-sm border border-slate-200 space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-slate-900 mb-2 border-l-4 border-amber-500 pl-4">Unit Configurations & Sizes</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Discover your perfect slice of tropical paradise. From compact single studios to double-ceiling spaces and master suites, browse our diverse sizes below.
                </p>
              </div>

              {/* Unit Carousel Slider */}
              <div className="relative border-4 border-slate-50 shadow-md group overflow-hidden bg-slate-950">
                <SmartCarouselImage 
                  filename={unitConfigs[unitIdx].filename}
                  bgGradient={unitConfigs[unitIdx].bgGradient}
                  colorHex={unitConfigs[unitIdx].colorHex}
                  title={unitConfigs[unitIdx].type}
                />

                {/* Left/Right Overlaid Navigation */}
                <button 
                  onClick={prevUnit} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Previous Unit"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={nextUnit} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-amber-500 hover:text-white p-3 shadow-lg transition-all rounded-full flex items-center justify-center text-slate-800 z-20 cursor-pointer"
                  aria-label="Next Unit"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Active Unit Description Box */}
              <div className="bg-slate-50 p-6 border-l-4 border-amber-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h4 className="text-[13px] uppercase tracking-widest font-bold text-slate-900 flex items-center gap-2 mb-1.5">
                    {(() => {
                      const IconComp = unitConfigs[unitIdx].icon;
                      return IconComp ? <IconComp size={16} className="text-amber-500" /> : null;
                    })()}
                    {unitConfigs[unitIdx].type}
                  </h4>
                  <p className="text-xs text-slate-500 font-light max-w-xl leading-relaxed">{unitConfigs[unitIdx].desc}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  SIZE: <span className="text-amber-600 font-bold">{unitConfigs[unitIdx].size}</span>
                </div>
              </div>

              {/* Clickable Micro-Dot Indicators (Symmetric Alignment) */}
              <div className="flex justify-center gap-2 pt-2">
                {unitConfigs.map((_, dotIdx) => (
                  <button 
                    key={dotIdx}
                    onClick={() => setUnitIdx(dotIdx)}
                    className={`h-2 transition-all cursor-pointer rounded-full ${
                      unitIdx === dotIdx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to unit configuration ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Clickable Interactive Units Directory Grid */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Floor Plan Portfolio Directory (Click to Jump Unit Layout)</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {unitConfigs.map((cfg, cfgInd) => {
                    const IconComp = cfg.icon;
                    const isActive = cfgInd === unitIdx;
                    return (
                      <button
                        key={cfgInd}
                        onClick={() => setUnitIdx(cfgInd)}
                        className={`text-left p-3.5 border flex flex-col justify-between gap-3 transition-all rounded hover:shadow-sm cursor-pointer ${
                          isActive 
                            ? 'bg-amber-500 text-slate-950 border-amber-500 ring-2 ring-amber-500/20 scale-[1.02]' 
                            : 'bg-slate-50 border-slate-100 hover:bg-slate-100 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-[7px] font-bold uppercase ${isActive ? 'text-slate-950/80' : 'text-slate-500'}`}>± {cfg.size.split(' ')[0]} SQM</span>
                          {IconComp && <IconComp size={12} className={isActive ? 'text-slate-950' : 'text-slate-400'} />}
                        </div>
                        <span className="text-[10px] font-bold leading-tight uppercase tracking-wider block">{cfg.type}</span>
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 opacity-50 transform translate-x-16 -translate-y-16 rotate-45"></div>
              <h3 className="text-2xl font-serif text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                <PlaneTakeoff className="text-amber-500" /> Location & Accessibility
              </h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed font-light relative z-10">
                Strategically located within the Seagrove Estate in Punta Engaño, Mactan, El Sol puts you minutes away from the Mactan-Cebu International Airport, pristine beaches, and premier signature resorts.
              </p>
              <div className="bg-slate-200 p-2 aspect-video relative overflow-hidden border border-slate-300 relative z-10">
                {/* Embedded Google Map iframe pointing approx to El Sol Cebu */}
                <iframe 
                  src="https://maps.google.com/maps?q=El%20Sol%20Cebu,%20Punta%20Enga%C3%B1o,%20Lapu-Lapu,%20Cebu&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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

