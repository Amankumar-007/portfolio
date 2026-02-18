'use client'
import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

const CardNav = ({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  // ... (Height calculation remains the same)
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  // ... (GSAP Timeline logic remains the same)
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        setIsExpanded(false);
      }
    });
    tl.to(navEl, { height: calculateHeight, duration: 0.6, ease: 'power2.inOut' });
    tl.to(cardsRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.2)', stagger: 0.1 }, '-=0.3');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    // Add class to body when on case-study page
    if (pathname === '/case-study') {
      document.body.classList.add('case-study-page');
    } else {
      document.body.classList.remove('case-study-page');
      document.body.classList.remove('scrolled');
    }

    return () => {
      document.body.classList.remove('case-study-page');
      document.body.classList.remove('scrolled');
    };
  }, [pathname]);

  useLayoutEffect(() => {
    // Handle scroll detection for case-study page
    if (pathname !== '/case-study') return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded || tl.reversed()) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.reverse();
    }
  };

  const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };

  const handleNavigation = (path) => {
    router.push(path);
    setIsHamburgerOpen(false);
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <span
              className="logo-text-aman"
              onClick={() => handleNavigation("/")}
              style={{ cursor: 'pointer' }}
            >
              AMAN
            </span>
            <span
              className="logo-text-kumar"
              onClick={() => handleNavigation("/")}
              style={{ cursor: 'pointer' }}
            >
              kumar.
            </span>
          </div>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get Started
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{
                background: item.bgImage
                  ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${item.bgImage}')`
                  : item.bgGradient || item.bgColor,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: item.textColor
              }}
              onClick={() => {
                const path = item.path || `/${item.label.toLowerCase()}`;
                handleNavigation(path);
              }}
              role="button"
              tabIndex={0}
            >
              <div className="nav-card-header">
                <div className="nav-card-label">{item.label}</div>
                {/* NEW: This Big Arrow indicates the whole card is clickable */}
                <div className="card-action-icon">
                  <GoArrowUpRight />
                </div>
              </div>

              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.label === "Case Studies" ? "/case-study" : lnk.href}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (lnk.label === "Case Studies") {
                        e.preventDefault();
                        handleNavigation("/case-study");
                      } else if (lnk.label === "Journey") {
                        e.preventDefault();
                        handleNavigation("/roadmap");
                      } else if (lnk.label === "Careers") {
                        e.preventDefault();
                        handleNavigation("/career");
                      } else if (lnk.label === "Featured") {
                        e.preventDefault();
                        handleNavigation("/projects/featured");
                      } else if (lnk.label === "Email") {
                        e.preventDefault();
                        window.location.href = "mailto:amanr3388@gmail.com";
                      } else if (lnk.label === "GitHub") {
                        e.preventDefault();
                        window.open("https://github.com/Amankumar-007", "_blank");
                      } else if (lnk.label === "LinkedIn") {
                        e.preventDefault();
                        window.open("https://www.linkedin.com/in/amankumarweb/", "_blank");
                      }
                    }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;