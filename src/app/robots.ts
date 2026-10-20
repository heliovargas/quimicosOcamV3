import type { MetadataRoute } from 'next';
import { sitio } from '../data/sitio';

/** Bots de buscadores y de asistentes de IA. Todos con acceso completo: queremos que lean y recomienden el sitio. */
const botsIA = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'YouBot',
  'MistralAI-User',
  'Diffbot',
];

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: botsIA, allow: '/' },
    ],
    sitemap: `${sitio.url}/sitemap.xml`,
    host: sitio.url,
  };
}
