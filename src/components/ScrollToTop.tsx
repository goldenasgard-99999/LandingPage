import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Scroll to top instantly when the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle smooth scroll-to-top when clicking a link that points to the active page
  useEffect(() => {
    const handleSameRouteClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Extract target path without query query parameters or hash segments
      const targetPath = href.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;

      if (targetPath === currentPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('click', handleSameRouteClick);
    return () => window.removeEventListener('click', handleSameRouteClick);
  }, []);

  return null;
}
