import { Link } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-4" onClick={closeMenu}>
               <img src="/Golden-Asgard-Logo.png" alt="Golden Asgard" className="h-10 w-auto object-contain shrink-0" />
               <span className="text-sm font-bold tracking-[0.15em] uppercase text-amber-500 drop-shadow-sm hidden sm:block md:hidden lg:block">
                 Golden Asgard
               </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
            <Link to="/" className="hover:text-amber-500 transition-colors py-2">Home</Link>
            <Link to="/project/el-sol" className="hover:text-amber-500 transition-colors py-2">El Sol</Link>
            <Link to="/project/city-clou" className="hover:text-amber-500 transition-colors py-2">City Clou</Link>
            <Link to="/contact" className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors">Inquire Now</Link>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={closeMenu} className="block px-3 py-3 text-[11px] font-semibold uppercase tracking-widest text-slate-700 hover:text-amber-500 hover:bg-slate-50">Home</Link>
            <Link to="/project/el-sol" onClick={closeMenu} className="block px-3 py-3 text-[11px] font-semibold uppercase tracking-widest text-slate-700 hover:text-amber-500 hover:bg-slate-50">El Sol Cebu</Link>
            <Link to="/project/city-clou" onClick={closeMenu} className="block px-3 py-3 text-[11px] font-semibold uppercase tracking-widest text-slate-700 hover:text-amber-500 hover:bg-slate-50">City Clou Cebu</Link>
            <Link to="/contact" onClick={closeMenu} className="block px-3 py-3 text-[11px] font-semibold uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 mt-4 text-center">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
