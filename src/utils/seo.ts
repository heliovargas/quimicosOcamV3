export function updateMetaTags(
  title: string,
  description: string,
  keywords: string,
  url: string,
  imageUrl?: string
) {
  document.title = title;

  updateOrCreateMetaTag('name', 'description', description);
  updateOrCreateMetaTag('name', 'keywords', keywords);

  updateOrCreateMetaTag('property', 'og:title', title);
  updateOrCreateMetaTag('property', 'og:description', description);
  updateOrCreateMetaTag('property', 'og:url', url);

  if (imageUrl) {
    updateOrCreateMetaTag('property', 'og:image', imageUrl);
  }

  updateOrCreateMetaTag('name', 'twitter:title', title);
  updateOrCreateMetaTag('name', 'twitter:description', description);

  if (imageUrl) {
    updateOrCreateMetaTag('name', 'twitter:image', imageUrl);
  }

  updateOrCreateLinkTag('canonical', url);
}

function updateOrCreateMetaTag(
  attribute: 'name' | 'property',
  value: string,
  content: string
) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

function updateOrCreateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;

  if (element) {
    element.href = href;
  } else {
    element = document.createElement('link');
    element.rel = rel;
    element.href = href;
    document.head.appendChild(element);
  }
}

export function resetMetaTags() {
  document.title = 'Químicos OCAM - Productos de Limpieza y Desinfección | Zona Norte Costa Rica';

  const defaultDescription = 'Líderes en productos de limpieza y desinfección en San Carlos, Zona Norte de Costa Rica. Más de 20 años ofreciendo productos químicos certificados por el Ministerio de Salud. Calidad garantizada para empresas, comercios y hogares.';
  const defaultKeywords = 'productos de limpieza costa rica, productos de limpieza san carlos, químicos limpieza zona norte, desinfectantes costa rica, limpieza industrial costa rica, productos limpieza alajuela, químicos OCAM, limpieza profesional costa rica';

  updateOrCreateMetaTag('name', 'description', defaultDescription);
  updateOrCreateMetaTag('name', 'keywords', defaultKeywords);
  updateOrCreateLinkTag('canonical', 'https://quimicosocam.com');
}
