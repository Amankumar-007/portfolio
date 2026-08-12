// Import Lenis for smooth scrolling and GSAP/ScrollTrigger for animations
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Determine if device is mobile (width <= 900px)
let isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

// Define scroll settings for mobile and desktop
const getScrollSettings = (mobile) => ({
  duration: mobile ? 1.0 : 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: mobile ? 1.5 : 2,
  infinite: false,
});

let scrollSettings = getScrollSettings(isMobile);

// Initialize Lenis with selected scroll settings
let lenis = null;

if (typeof window !== 'undefined') {
  lenis = new Lenis(scrollSettings);

  // Update ScrollTrigger on Lenis scroll events
  lenis.on("scroll", ScrollTrigger.update);

  // Integrate Lenis with GSAP's ticker for smooth animation
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Run Lenis animation frame (RAF) with GSAP ticker
  });

  // Disable GSAP lag smoothing to prevent animation delays
  gsap.ticker.lagSmoothing(0);

  // Handle window resize to update scroll settings
  const handleResize = () => {
    const wasMobile = isMobile; // Store previous mobile state
    isMobile = window.innerWidth <= 900; // Update mobile state

    // Reinitialize Lenis only if mobile state changes
    if (wasMobile !== isMobile) {
      if (lenis) lenis.destroy(); // Destroy existing Lenis instance

      scrollSettings = getScrollSettings(isMobile);
      // Create new Lenis instance with updated settings
      lenis = new Lenis(scrollSettings);
      lenis.on("scroll", ScrollTrigger.update); // Rebind ScrollTrigger update
    }
  };

  // Add resize event listener to handle mobile/desktop transitions
  window.addEventListener("resize", handleResize);
}
