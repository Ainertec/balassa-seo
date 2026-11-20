/**
 * Deploy estático: espelha o conteúdo de dist/ para o diretório de publicação (site/).
 *
 *   npm run build
 *   npm run deploy
 *
 * O diretório de destino pode ser alterado com a variável DEPLOY_DIR.
 */
import { cp, rm, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const target = path.resolve(root, process.env.DEPLOY_DIR ?? 'site');

async function main() {
  try {
    await access(path.join(dist, 'index.html'));
  } catch {
    console.error('dist/ não encontrado. Execute `npm run build` antes do deploy.');
    process.exitCode = 1;
    return;
  }

  if (target === root) {
    console.error('DEPLOY_DIR inválido: aponta para a raiz do projeto.');
    process.exitCode = 1;
    return;
  }

  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  await cp(dist, target, { recursive: true });

  console.log(`✓ Build publicado em ${path.relative(root, target)}/`);
}

main().catch((error) => {
  console.error('Falha no deploy:', error);
  process.exitCode = 1;
});
