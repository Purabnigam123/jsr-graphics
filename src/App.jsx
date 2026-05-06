import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Counters from "./components/Counters";
import Services from "./components/Services";
import Featured from "./components/Featured";
import WhyChoose from "./components/WhyChoose";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import Preloader from "./components/Preloader";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Counters />
      <Services />
      <Featured />
      <Process />
      <WhyChoose />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </ThemeProvider>
  );
}

export default App;
