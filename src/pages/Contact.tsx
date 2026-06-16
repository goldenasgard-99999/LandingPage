import ContactForm from '../components/ContactForm';
import { Mail, Instagram, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Contact() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-neutral-50 py-16 lg:py-24 border-t border-slate-200 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Secure Your Unit</span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-6 drop-shadow-sm">Let's Find Your Dream Property</h1>
          <p className="text-sm text-slate-600 dark:text-stone-300 font-light leading-relaxed">
            Whether you are looking to invest in El Sol or City Clou, our dedicated team of property specialists is here to guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-8 border-slate-100 dark:border-neutral-900 bg-white dark:bg-[#0c0a09] shadow-xl overflow-hidden transition-colors duration-300">
          
          {/* Contact Info Sidebar - A pristine dark monolith to ground the brand layout */}
          <div className="lg:col-span-2 bg-neutral-950 p-12 text-stone-100 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800 dark:border-neutral-900 transition-colors duration-300 animate-fade-in">
            {/* Soft, beautiful circular amber glow (Option A) */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-serif mb-12 border-b border-amber-500 inline-block pb-2 text-[#FCFAF6]">Contact Information</h2>
              
              <div className="space-y-12">
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <Instagram className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#FCFAF6] mb-2">Instagram</h3>
                    <p className="text-stone-400 leading-relaxed text-[10px] uppercase tracking-widest">@goldenasgard</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <Mail className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#FCFAF6] mb-2">Email</h3>
                    <p className="text-stone-400 leading-relaxed text-[10px] uppercase tracking-widest">goldenasgard@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    <MessageCircle className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[11px] uppercase tracking-wider text-[#FCFAF6] mb-2">Messenger</h3>
                    <p className="text-stone-400 leading-relaxed text-[10px] uppercase tracking-widest">Golden Asgard Real Estates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Area - Crisp transitions to luxurious deep dark space in Dark Mode */}
          <div className="lg:col-span-3 p-12 bg-white dark:bg-[#0c0a09] flex flex-col justify-center transition-colors duration-300">
            <h2 className="text-2xl font-serif text-slate-900 dark:text-[#FCFAF6] mb-2">Send us a Message</h2>
            <p className="text-slate-500 dark:text-neutral-400 mb-10 text-[10px] uppercase tracking-widest">Fill out the form below and we will get back to you within 24 hours.</p>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
