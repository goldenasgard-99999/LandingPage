import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, PhilippinePeso, ShieldCheck, Award, Star } from 'lucide-react';
import { projects } from '../data';
import { motion } from 'motion/react';
import { useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-50 transition-colors duration-300">
      {/* Hero Section - Elevated Seamless Theme-Adaptive Design */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-neutral-950 px-6 sm:px-12 py-20 overflow-hidden border-b border-slate-200 dark:border-neutral-900 transition-colors duration-300">
        {/* Background Grid Accent with adaptive line opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(156,134,97,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(156,134,97,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Cinematic Backdrop & Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.5 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            src="home-img.png" 
            alt="Luxury Real Estate Developer Cebu" 
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

        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={fadeInUp} 
            className="text-amber-600 dark:text-amber-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.4em] mb-4 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full backdrop-blur-md animate-fade-in"
          >
            Accredited Sales Agent For Golden Topper
          </motion.span>
          
          <motion.h1 
            variants={fadeInUp} 
            className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-slate-950 dark:text-[#FCFAF6] leading-[1.1] mb-6 tracking-tight drop-shadow-md text-nowrap-none"
          >
            Your Gateway to Prime <br className="hidden md:block"/> Real Estate in Cebu
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-slate-700 dark:text-neutral-300 text-xs sm:text-sm mb-10 max-w-xl mx-auto leading-relaxed font-light drop-shadow-sm"
          >
            Invest in award-winning pre-selling properties. Shape modern master-planned cities in Cebu with the ultimate developer excellence.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp} 
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            <Link 
              to="/project/el-sol" 
              className="group relative bg-slate-950 dark:bg-amber-500 text-slate-50 dark:text-slate-950 px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-400 transition-all duration-300 font-mono flex items-center justify-center gap-2 border border-slate-950 dark:border-amber-500 shadow-md"
            >
              Explore El Sol
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/project/city-clou" 
              className="group relative bg-transparent text-amber-600 dark:text-amber-400 px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 transition-all duration-300 font-mono flex items-center justify-center gap-2 border border-amber-500/30"
            >
              Discover City Clou
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-white dark:bg-[#0c0a09] border-b border-slate-200 dark:border-neutral-900 overflow-hidden transition-colors duration-300">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border border-slate-200 dark:border-neutral-800 flex items-center justify-center bg-slate-900 dark:bg-amber-500/10 rounded-sm">
                  <ShieldCheck className="text-white dark:text-amber-500 h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#FCFAF6] mb-1">Golden Topper</h2>
                  <p className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase tracking-widest italic animate-pulse">Accredited Sales Agent</p>
                </div>
              </div>
              <h3 className="text-4xl font-serif text-slate-900 dark:text-[#FCFAF6] italic mb-6 leading-tight">"Better Cities, Better Lives"</h3>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-10 max-w-lg">
                As a fast-emerging global real estate developer, Golden Topper is dedicated to creating better cities and better lives in the Philippines. Our commitment to excellence was recognized when we were awarded the <strong className="font-bold text-slate-900 dark:text-amber-500">Best Developer in Cebu 2022</strong>.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-amber-500 pl-4 py-1">
                  <Award className="text-amber-500 h-5 w-5 mb-2" />
                  <h4 className="font-semibold text-slate-900 dark:text-[#FCFAF6] text-sm mb-1 uppercase tracking-wider">Award Winning</h4>
                  <p className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase">Design & Development</p>
                </div>
                <div className="border-l-2 border-amber-500 pl-4 py-1">
                  <Star className="text-amber-500 h-5 w-5 mb-2" />
                  <h4 className="font-semibold text-slate-900 dark:text-[#FCFAF6] text-sm mb-1 uppercase tracking-wider">Premium Quality</h4>
                  <p className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase">Uncompromising Standards</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeInUp} 
              className="relative order-1 lg:order-2 h-full min-h-[400px] border-8 border-slate-50 dark:border-neutral-800 bg-slate-200 dark:bg-neutral-800 shadow-xl overflow-hidden p-6"
            >
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-multiply z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" 
                alt="Modern Architecture" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105 hover:grayscale-0 dark:brightness-75"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="bg-white dark:bg-[#080706] transition-colors duration-300">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeInUp}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-4">Featured Projects</h2>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto uppercase tracking-widest">Secure your unit today in Cebu's most highly anticipated developments</p>
          </div>
        </motion.div>
        
        {/* We use a full-bleed grid pattern to match the geometric aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-slate-200 dark:border-neutral-900 overflow-hidden">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              className={`flex flex-col xl:flex-row group border-b border-slate-200 dark:border-neutral-900 ${index % 2 !== 0 ? 'md:border-l border-slate-200 dark:border-neutral-900' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className={`p-10 flex-1 flex flex-col justify-center order-2 ${index % 2 !== 0 ? 'xl:order-2' : 'xl:order-1'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-serif text-slate-900 dark:text-[#FCFAF6]">{project.name}</h3>
                  <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-tighter ${index % 2 === 0 ? 'bg-slate-100 text-slate-900 dark:bg-neutral-800 dark:text-amber-400' : 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'}`}>
                    Pre-Selling
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 mb-6 uppercase tracking-wider">{project.location}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className={`border-l-2 pl-3 ${index % 2 === 0 ? 'border-amber-500' : 'border-slate-900 dark:border-amber-500/50'}`}>
                    <p className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 font-bold mb-1">Starting At</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-neutral-200">{project.priceRange}</p>
                  </div>
                  <div className={`border-l-2 pl-3 ${index % 2 === 0 ? 'border-amber-500' : 'border-slate-900 dark:border-amber-500/50'}`}>
                    <p className="text-[10px] uppercase text-slate-400 dark:text-neutral-500 font-bold mb-1">Turnover</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-neutral-200">{project.turnover}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-neutral-300 mb-8 min-h-[40px] leading-relaxed">{project.shortDescription}</p>
                
                <Link 
                  to={`/project/${project.id}`}
                  className={`w-max text-[10px] font-bold uppercase border-b-2 pb-1 ${index % 2 === 0 ? 'border-amber-500 text-slate-900 dark:text-amber-400 hover:text-amber-500' : 'border-slate-900 dark:border-neutral-400 text-slate-900 dark:text-neutral-100 hover:text-slate-600'} transition-colors`}
                >
                  Know More
                </Link>
              </div>
              <div className={`relative xl:w-2/5 aspect-[4/3] xl:aspect-auto overflow-hidden order-1 ${index % 2 !== 0 ? 'xl:order-1' : 'xl:order-2'}`}>
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0"></div>
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 dark:brightness-90"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
