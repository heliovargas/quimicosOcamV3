import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import CoverageMap from '../components/CoverageMap';
import ProductPreview from '../components/ProductPreview';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CoverageMap />
      <ProductPreview />
      <ContactSection />
    </>
  );
}
