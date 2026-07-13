import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import NetflixProjects from './components/NetflixProjects';
import Certifications from './components/Certifications';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CursorGlow from './components/CursorGlow';
import SectionDivider from './components/SectionDivider';

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden">
      <CursorGlow />
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
        <Journey />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
