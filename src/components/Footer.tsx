import { Mail, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-6">
               <img src="/Golden-Asgard-Logo.png" alt="Golden Asgard" className="h-10 w-auto object-contain shrink-0" />
               <span className="text-sm font-bold tracking-[0.15em] uppercase text-amber-500 drop-shadow-sm">
                 Golden Asgard
               </span>
            </Link>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
              Your trusted partner in premium real estate investments in Cebu. Accredited sales agent for Golden Topper Philippines.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-slate-900 mb-6 tracking-[0.2em] uppercase">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[10px] text-slate-600 hover:text-amber-500 uppercase tracking-widest font-semibold transition-colors">Home</Link></li>
              <li><Link to="/project/el-sol" className="text-[10px] text-slate-600 hover:text-amber-500 uppercase tracking-widest font-semibold transition-colors">El Sol Cebu</Link></li>
              <li><Link to="/project/city-clou" className="text-[10px] text-slate-600 hover:text-amber-500 uppercase tracking-widest font-semibold transition-colors">City Clou Cebu</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-slate-900 mb-6 tracking-[0.2em] uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Instagram size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">@goldenasgard</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">goldenasgard@gmail.com</span>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle size={14} className="text-amber-500 shrink-0" />
                <span className="text-[10px] text-slate-600 uppercase tracking-wider">Golden Asgard</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 mb-6 tracking-[0.2em] uppercase">Disclaimer</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
              This is a demonstration landing page. Golden Asgard is portrayed as an official partner for showcase purposes only. Prices and availability are subject to change.
            </p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-widest font-bold text-slate-400">
          <p>© {new Date().getFullYear()} Golden Asgard. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Partnered with Golden Topper</p>
        </div>
      </div>
    </footer>
  );
}
