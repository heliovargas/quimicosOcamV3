import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './globals.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import { empresa } from '../data/empresa';
import { sitio } from '../data/sitio';

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: sitio.titulo, template: `%s | ${sitio.nombre}` },
  description: sitio.descripcion,
  keywords: [...sitio.keywords],
  authors: [{ name: sitio.razonSocial, url: sitio.url }],
  creator: sitio.razonSocial,
  publisher: sitio.razonSocial,
  applicationName: sitio.nombre,
  category: 'business',
  manifest: '/manifest.json',
  icons: { icon: '/ocam.png', apple: '/ocam.png' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    siteName: sitio.nombre,
    url: sitio.url,
    title: sitio.tituloOg,
    description: sitio.descripcionOg,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Químicos OCAM, productos de limpieza y desinfección' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: sitio.tituloOg,
    description: sitio.descripcionOg,
    images: ['/og.png'],
  },
  other: {
    'geo.region': 'CR-A',
    'geo.placename': 'Cerro Cortez, Alajuela, Costa Rica',
    'geo.position': `${sitio.ubicacion.lat};${sitio.ubicacion.lng}`,
    ICBM: `${sitio.ubicacion.lat}, ${sitio.ubicacion.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: '#2E5C9A',
  width: 'device-width',
  initialScale: 1,
};

/** Datos del negocio para Google y los asistentes de IA. Horarios y datos reales, sin calificaciones inventadas. */
const negocio = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${sitio.url}/#negocio`,
  name: sitio.razonSocial,
  alternateName: [sitio.nombre, 'OCAM Productos de Limpieza'],
  url: sitio.url,
  logo: `${sitio.url}${sitio.logo.src}`,
  image: `${sitio.url}${sitio.logo.src}`,
  description:
    'Fabricante y distribuidor de productos de limpieza y desinfección en la Zona Norte de Costa Rica desde 1998. Líneas doméstica, lecherías, automotriz y piscinas, registradas en el Ministerio de Salud.',
  foundingDate: '1998',
  telephone: '+506-6195-1073',
  email: empresa.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '800 metros este del Servicentro Cerro Cortez',
    addressLocality: 'Cerro Cortez, San Carlos',
    addressRegion: 'Alajuela',
    postalCode: '21004',
    addressCountry: 'CR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: sitio.ubicacion.lat, longitude: sitio.ubicacion.lng },
  hasMap: `https://www.google.com/maps?q=${sitio.ubicacion.lat},${sitio.ubicacion.lng}`,
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '12:00' },
  ],
  priceRange: '$$',
  currenciesAccepted: 'CRC',
  areaServed: [
    { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: sitio.ubicacion.lat, longitude: sitio.ubicacion.lng }, geoRadius: '100000' },
    ...['Alajuela', 'Guanacaste', 'Puntarenas', 'Heredia', 'Limón'].map((name) => ({ '@type': 'AdministrativeArea', name })),
  ],
  knowsAbout: [
    'productos de limpieza',
    'desinfectantes',
    'químicos para lecherías',
    'químicos para piscinas',
    'limpieza automotriz',
    'limpieza del hogar',
    'limpieza industrial',
  ],
  sameAs: Object.values(empresa.redes),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+506-6195-1073',
    contactType: 'sales',
    availableLanguage: 'es',
    areaServed: 'CR',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(negocio) }} />
      </body>
    </html>
  );
}
