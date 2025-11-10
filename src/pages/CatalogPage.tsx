import { useEffect } from 'react';
import Catalog from '../components/Catalog';

export default function CatalogPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-24">
      <Catalog />
    </div>
  );
}
