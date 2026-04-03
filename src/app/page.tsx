import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import DataVisualization from '@/components/DataVisualization';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Credentials from '@/components/Credentials';
import Footer from '@/components/Footer';
import Interests from '@/components/Interests';
import SectionDivider from '@/components/SectionDivider';
import PageLoader from '@/components/PageLoader';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <main className="relative">
      <PageLoader />
      <Navbar />
      <Hero />
      <SectionDivider variant="gradient" />
      <About />
      <SectionDivider variant="dots" />
      <Skills />
      <DataVisualization />
      <SectionDivider variant="wave" />
      <Experience />
      <SectionDivider variant="gradient" />
      <Projects />
      <SectionDivider variant="dots" />
      <Credentials />
      <SectionDivider variant="wave" />
      <Interests />
      <SectionDivider variant="gradient" />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
