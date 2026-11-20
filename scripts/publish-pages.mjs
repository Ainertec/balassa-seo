/**
 * Publicação manual no branch `gh-pages`.
 *
 *   npm run build       (com BASE_PATH=/<repo>/)
 *   npm run publish:pages
 *
 * O script:
 *  1. valida que dist/index.html existe;
 *  2. cria um worktree temporário do branch `gh-pages` (cria o branch órfão se não existir);
 *  3. substitui todo o conteúdo por dist/, adiciona .nojekyll e faz o commit;
 *  4. envia para origin e remove o worktree temporário.
 *
 * Opções (variáveis de ambiente):
 *   PAGES_BRANCH  branch de publicação (padrão: gh-pages)
 *   PAGES_REMOTE  remoto (padrão: origin)
 */
import { execFileSync } from 'node:child_process';
import { access, cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const worktree = path.join(root, '.pages-worktree');
const branch = process.env.PAGES_BRANCH ?? 'gh-pages';
const remote = process.env.PAGES_REMOTE ?? 'origin';

const git = (args, options = {}) =>
  execFileSync('git', args, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, GIT_ADVICE: '0' },
    ...options,
  });

const gitQuiet = (args, options = {}) =>
  execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    ...options,
  }).trim();

const branchExists = (name) => {
  try {
    gitQuiet(['rev-parse', '--verify', '--quiet', `refs/heads/${name}`]);
    return true;
  } catch {
    return false;
  }
};

const remoteBranchExists = (name) => {
  try {
    gitQuiet(['rev-parse', '--verify', '--quiet', `refs/remotes/${remote}/${name}`]);
    return true;
  } catch {
    return false;
  }
};

async function main() {
  try {
    await access(path.join(dist, 'index.html'));
  } catch {
    console.error('dist/ não encontrado. Rode o build antes de publicar.');
    process.exitCode = 1;
    return;
  }

  // Aviso quando o build está na raiz e o site do Pages fica em subpasta.
  const repoUrl = gitQuiet(['remote', 'get-url', remote]);
  const repoName = /github\.com[:/]+([^/]+)\/([^/.]+)/.exec(repoUrl)?.[2];
  const html = await readFile(path.join(dist, 'index.html'), 'utf8');
  if (repoName && html.includes('href="/assets/') && !html.includes(`/${repoName}/assets/`)) {
    console.warn(
      `⚠ O build está na raiz ("/"). Se o Pages servir em /${repoName}/, ` +
        'reconstrua com BASE_PATH antes de publicar (veja o README).',
    );
  }

  await rm(worktree, { recursive: true, force: true });

  if (branchExists(branch)) {
    git(['worktree', 'add', worktree, branch]);
  } else if (remoteBranchExists(branch)) {
    // Branch existe só no remoto: publica a partir dele para manter o histórico e
    // permitir um push fast-forward.
    console.log(`→ usando ${remote}/${branch} como base`);
    git(['worktree', 'add', worktree, `refs/remotes/${remote}/${branch}`]);
    git(['checkout', '-B', branch], { cwd: worktree });
  } else {
    console.log(`→ criando branch órfão ${branch}`);
    git(['worktree', 'add', '--detach', worktree]);
    git(['checkout', '--orphan', branch], { cwd: worktree });
  }

  // Limpa o conteúdo versionado anterior (mantém .git)
  for (const entry of await readdir(worktree)) {
    if (entry === '.git') continue;
    await rm(path.join(worktree, entry), { recursive: true, force: true });
  }

  await cp(dist, worktree, { recursive: true });
  await writeFile(path.join(worktree, '.nojekyll'), '');
  await writeFile(
    path.join(worktree, 'README.md'),
    '# Publicação\n\nEste branch contém apenas o build de produção gerado por `npm run publish:pages`. ' +
      'O código-fonte está no branch `main`.\n',
  );

  git(['-c', 'core.safecrlf=false', 'add', '--all', '--force'], { cwd: worktree });
  const status = gitQuiet(['status', '--porcelain'], { cwd: worktree });
  if (!status) {
    git(['worktree', 'remove', '--force', worktree]);
    console.log('✓ Nada mudou desde a última publicação — nenhum commit criado.');
    return;
  }

  git(['commit', '-m', `deploy: build ${new Date().toISOString()}`], { cwd: worktree });

  if (!remoteBranchExists(branch)) {
    git(['push', '-u', remote, branch], { cwd: worktree });
  } else {
    git(['push', remote, `HEAD:${branch}`], { cwd: worktree });
  }

  git(['worktree', 'remove', '--force', worktree]);
  console.log(`✓ Publicado em ${remote}/${branch}`);
}

main().catch(async (error) => {
  console.error('Falha ao publicar:', error.message);
  try {
    execFileSync('git', ['worktree', 'remove', '--force', worktree], { cwd: root });
  } catch {
    await rm(worktree, { recursive: true, force: true });
  }
  process.exitCode = 1;
});
