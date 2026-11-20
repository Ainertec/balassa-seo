/**
 * Resolve o caminho de um arquivo de `public/` respeitando o `base` do Vite.
 *
 * `import.meta.env.BASE_URL` já vem com a barra final configurada em
 * `vite.config.ts` (`BASE_PATH` ou `/`), então o resultado funciona tanto na
 * raiz do domínio quanto em subdiretórios (ex.: GitHub Pages em `/balassa-seo/`).
 *
 *   asset('logo.webp')  ->  '/logo.webp'  ou  '/balassa-seo/logo.webp'
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${base}${clean}`;
}
