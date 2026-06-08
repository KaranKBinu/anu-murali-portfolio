import { useState, useEffect } from 'react';

/**
 * Custom hook to detect the active section as the user scrolls
 * and whether the page has been scrolled.
 *
 * @param sectionIds Array of section IDs (without the # prefix)
 * @param offset Pixel offset from top to determine section trigger
 */
export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Find which section is currently in view
      let currentActive = sectionIds[0];
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          currentActive = id;
          break;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeSection, isScrolled };
}
export default useScrollSpy;
