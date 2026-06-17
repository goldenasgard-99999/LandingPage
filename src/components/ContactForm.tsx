//import React, { useState, useEffect } from 'react';
import React,{ useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  projectName?: string;
}

export default function ContactForm({ projectName = '' }: ContactFormProps) {
  const getInitialProject = () => {
    if (!projectName) return 'Both';
    const lower = projectName.toLowerCase();
    if (lower.includes('sol')) return 'El Sol';
    if (lower.includes('clou')) return 'City Clou';
    return 'Both';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: getInitialProject(),
    message: projectName ? `I am interested in learning more about ${projectName}. Please contact me.` : '',
  });
  
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
const turnstileRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const initTurnstile = () => {
    const turnstile = (window as any).turnstile;
    if (!turnstile || !turnstileRef.current) return false;

    // prevent double render
    if (turnstileRef.current.childNodes.length > 0) return true;

    turnstile.render(turnstileRef.current, {
      sitekey: "0x4AAAAAADmfOqZ57GZ93dde",
      theme: "dark",
      callback: (token: string) => {
        setTurnstileToken(token);
      },
    });

    return true;
  };

  // try immediately
  if (initTurnstile()) return;

  // retry until script loads
  const interval = setInterval(() => {
    if (initTurnstile()) {
      clearInterval(interval);
    }
  }, 300);

  return () => clearInterval(interval);
}, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!turnstileToken) {
  console.warn("Turnstile not ready yet");
  return;
}
    
    const response = await fetch(
      "https://api.goldenasgard.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Submission error:", error);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="bg-slate-950 text-white p-8 rounded-sm border border-amber-500/30 text-center relative max-w-md mx-auto my-6 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="w-12 h-12 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center mx-auto mb-2 animate-bounce">
            <span className="text-amber-500 font-serif italic text-lg">★</span>
          </div>
          <h3 className="text-2xl font-serif italic text-amber-400">Request Received</h3>
          <p className="text-xs text-slate-350 leading-relaxed font-light">
            Thank you for your interest in our premium developments. A dedicated Golden Asgard Private Advisor will contact you within 24 hours to guide you through floorplans, pricing, and viewings.
          </p>
          <div className="pt-2">
            <span className="text-[9px] font-mono tracking-widest text-amber-500/60 uppercase">EXCLUSIVE ADVISORY SERVICE</span>
          </div>
        </div>
      </div>
    );
  }  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row 1: Full Name & Email Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 col-span-1">
          <label htmlFor="name" className="text-[9px] uppercase text-amber-600 dark:text-amber-400 font-bold tracking-widest font-mono">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-slate-200 dark:border-neutral-800 focus:ring-2 focus:ring-amber-500/15 bg-white dark:bg-neutral-950 p-3 text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-stone-600 font-light rounded-sm"
            placeholder="e.g. Sergio Aguero"
          />
        </div>
        
        <div className="flex flex-col gap-1.5 col-span-1">
          <label htmlFor="email" className="text-[9px] uppercase text-amber-600 dark:text-amber-400 font-bold tracking-widest font-mono">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-slate-200 dark:border-neutral-800 focus:ring-2 focus:ring-amber-500/15 bg-white dark:bg-neutral-950 p-3 text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-stone-600 font-light rounded-sm"
            placeholder="sergio@example.com"
          />
        </div>
      </div>

      {/* Row 2: Project Selection Dropdown & Mobile Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 col-span-1">
          <label htmlFor="project" className="text-[9px] uppercase text-amber-600 dark:text-amber-400 font-bold tracking-widest font-mono">Investment Unit Interest</label>
          <div className="relative">
            <select
              id="project"
              name="project"
              required
              value={formData.project}
              onChange={handleChange}
              className="w-full border border-slate-200 dark:border-neutral-800 focus:ring-2 focus:ring-amber-500/15 bg-white dark:bg-neutral-950 p-3 text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all appearance-none pr-10 cursor-pointer text-slate-800 dark:text-neutral-100 font-light h-[42px] rounded-sm"
            >
              <option value="El Sol">El Sol (Cebu Resort Luxury)</option>
              <option value="City Clou">City Clou (Business District Hub)</option>
              <option value="Both">Both Developments (Full Portfolio Review)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 col-span-1">
          <label htmlFor="phone" className="text-[9px] uppercase text-amber-600 dark:text-amber-400 font-bold tracking-widest font-mono">Secure Callback Mobile</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border border-slate-200 dark:border-neutral-800 focus:ring-2 focus:ring-amber-500/15 bg-white dark:bg-neutral-950 p-3 text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-neutral-100 placeholder:text-slate-400 dark:placeholder:text-stone-600 font-light rounded-sm"
            placeholder="+63 917 123 4567"
          />
        </div>
      </div>

      {/* Row 3: Message Textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[9px] uppercase text-amber-600 dark:text-amber-400 font-bold tracking-widest font-mono">Special Inquiries or Preferred Unit Setup</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="border border-slate-200 dark:border-neutral-800 focus:ring-2 focus:ring-amber-500/15 bg-white dark:bg-neutral-950 p-3 text-xs focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all resize-none text-slate-800 dark:text-neutral-100 placeholder:text-slate-350 dark:placeholder:text-stone-600 font-light rounded-sm leading-relaxed"
          placeholder="Please specify if you desire specific features (e.g., high floors, seaward balconies, specific slot requests, or investment target goals)."
        ></textarea>
      </div>
 <div ref={turnstileRef}></div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[10px] font-bold uppercase py-4 tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:text-stone-550 rounded-sm border border-amber-500 cursor-pointer shadow-lg hover:shadow-amber-500/15"
      >
        <span className="font-mono tracking-[0.25em]">{loading ? 'TRANSMITTING REQUEST...' : 'REQUEST PORTFOLIO DISCLOSURE'}</span>
        {!loading && <Send size={12} className="text-neutral-950" />}
      </button>
 
      
    </form>
  );
}
