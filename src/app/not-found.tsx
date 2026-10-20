import type { Metadata } from 'next';
import { PackageSearch } from 'lucide-react';
import { Button, Container } from '../components/ui';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center pt-24 pb-16">
      <div className="max-w-md rounded-panel bg-white p-10 text-center shadow-card ring-1 ring-slate-200/80">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <PackageSearch size={26} aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-slate-900">Página no encontrada</h1>
        <p className="mt-2 text-[15px] text-slate-600">La página que buscas no existe o fue movida.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">Ir al inicio</Button>
          <Button to="/catalogo" variant="outline">
            Ver catálogo
          </Button>
        </div>
      </div>
    </Container>
  );
}
