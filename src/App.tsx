import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import NetflixProjects from './components/NetflixProjects';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import TargetCursor from './components/TargetCursor';
import CyberOverlay from './components/CyberOverlay';
import CommandDeck from './components/CommandDeck';
import SectionDivider from './components/SectionDivider';
import { useEffect } from 'react';
import { initGlobalSounds } from './utils/sound';

export default function App() {
  useEffect(() => {
    initGlobalSounds();
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <TargetCursor targetSelector=".cursor-target" spinDuration={3} />
      <CyberOverlay />
      <CommandDeck />
      <Navbar />
      
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <NetflixProjects />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
