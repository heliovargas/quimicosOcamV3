import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import MapboxCoverageMap from '../components/MapboxCoverageMap';
import ProductPreview from '../components/ProductPreview';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <MapboxCoverageMap />
      <ProductPreview />
      <ContactSection />
    </>
  );
}
