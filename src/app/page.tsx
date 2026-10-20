import type { Metadata } from 'next';
import About from '../components/About';
import ContactSection from '../components/ContactSection';
import CoverageMap from '../components/CoverageMap';
import Hero from '../components/Hero';
import ProductPreview from '../components/ProductPreview';
import Services from '../components/Services';
import { sitio } from '../data/sitio';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const sitioWeb = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${sitio.url}/#sitio`,
  name: sitio.nombre,
  url: sitio.url,
  inLanguage: 'es-CR',
  publisher: { '@id': `${sitio.url}/#negocio` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CoverageMap />
      <ProductPreview />
      <ContactSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitioWeb) }} />
    </>
  );
}
