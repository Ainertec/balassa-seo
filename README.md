# Balassa — SEO & Growth

Site institucional (PWA) da Balassa, reconstruído em **React + TypeScript + Vite**
a partir do HTML original. Paleta enxuta e sofisticada: preto, branco, bege e dourado.

## Stack

- React 19 + TypeScript
- Vite 7
- `vite-plugin-pwa` (Workbox): manifest, service worker, precache e modo offline
- CSS próprio com design tokens (sem framework de estilos)
- Fontes: Cormorant Garamond (display) + Inter (texto), carregadas sem bloquear a renderização

## Estrutura

```
public/
  logo.webp                 # marca (ícone "B") — hero, header, footer, ícones da PWA
  banner.webp               # wordmark "Balassa / SEO & Growth" — vitrine da seção Excelência
  favicon.svg
  .nojekyll                 # impede o Jekyll de filtrar arquivos no GitHub Pages
  icons/icon-192.png        # gerados por `npm run icons`
  icons/icon-512.png
  icons/icon-maskable-512.png
  apple-touch-icon-180.png
  assets/og-image.jpg       # imagem de compartilhamento (Open Graph)
  manifest.webmanifest      # fallback estático (o build gera o manifest definitivo)
  robots.txt
.github/workflows/
  deploy-pages.yml          # build + deploy automático no GitHub Pages
scripts/
  generate-icons.mjs        # logo/banner -> ícones da PWA + og-image
  deploy.mjs                # copia dist/ para o diretório de publicação
src/
  App.tsx
  main.tsx
  components/               # UI (Button, Header, Footer, InstallBanner, ícones...)
  components/sections/      # Hero, Services, Method, Excellence, Faq, Contact, CtaBanner
  data/content.ts           # todo o conteúdo textual e dados de SEO/contato
  hooks/                    # useCountUp, useActiveSection, useInstallPrompt, useServiceWorker, useRevealAnimation
  lib/assets.ts             # `asset()` — resolve arquivos de public/ com o `base` do Vite
  styles/                   # tokens, base, componentes, layout e seções
  types.ts
legacy/index.html           # HTML original preservado como referência
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run icons` | Regenera ícones da PWA e `og-image.jpg` a partir de `logo.webp` / `banner.webp` |
| `npm run dev` | Servidor de desenvolvimento (`http://localhost:5173`) |
| `npm run build` | Typecheck + build de produção em `dist/` (com service worker) |
| `npm run preview` | Serve o build em `http://localhost:4173` (necessário para testar a PWA) |
| `npm run typecheck` | Apenas verificação de tipos |
| `npm run deploy` | Copia `dist/` para `site/` (ou `DEPLOY_DIR`) |
| `npm run publish:pages` | Publica `dist/` no branch `gh-pages` do `origin` (worktree temporário) |

> A PWA (instalação e offline) só é registrada em produção: use `npm run build` + `npm run preview`.

## PWA

- Manifest com `standalone`, tema `#0E0E0E`, ícones `any` e `maskable`, atalhos para **Diagnóstico** e **Serviços**.
- Service worker gerado no build: precache do app shell e das imagens, `CacheFirst` para imagens e fontes.
- Botão **Instalar** no header (evento `beforeinstallprompt`) e aviso discreto de instalação; no iOS exibe as instruções de "Adicionar à Tela de Início".
- Aviso de nova versão disponível com atualização em um clique (`registerType: autoUpdate`).

## Estilos

CSS próprio com design tokens compartilhados (`src/styles/tokens.css`) e módulos por responsabilidade:
`base.css` (reset/tipografia), `components.css` (botões, headings, formulário, avisos),
`layout.css` (header, footer) e `sections.css` (hero, pilares, método, excelência, FAQ, contato, CTA).

Convenções adotadas:

- nomenclatura BEM (`bloco__elemento--modificador`);
- nenhum seletor de descendente por tag (`classe tag`) — sempre classes explícitas, o que mantém o CSS
  previsível em produção e evita colisões;
- tons de dourado apenas como acento; preto/branco/bege carregam a maior parte da composição;
- grids internos usam `minmax(0, 1fr)` (nunca `1fr` puro) para que conteúdo largo — como um botão com
  texto longo — não force a coluna a crescer além da tela;
- header mobile em `flex`: marca à esquerda, hambúrguer + CTA à direita (a logo de destaque é a do
  hero, e é ela que fica centralizada no mobile).

### Responsividade

Validado via Chrome DevTools Protocol em 320, 360, 390, 414, 768, 1024 e 1440 px, sem overflow
horizontal (`scrollWidth` igual à largura da viewport).

## Personalização

- **Conteúdo** (textos, métricas, FAQ, contato): `src/data/content.ts`.
- **Cores, tipografia e espaçamentos**: `src/styles/tokens.css`.
- **Domínio, telefone e e-mail** também aparecem em `index.html` (canonical, Open Graph e JSON-LD) — atualize para o domínio real antes de publicar.
- **Imagem Open Graph**: `public/assets/og-image.jpg`, regenerada via `npm run icons`.

## Deploy

Deploy estático. O Vite usa `/` como base (raiz do domínio) ou o valor de `BASE_PATH` (subdiretório).
Todos os assets de `public/` são resolvidos com o helper `asset()` (`src/lib/assets.ts`), que lê
`import.meta.env.BASE_URL` — por isso o mesmo build funciona tanto na raiz quanto em subpasta.

### GitHub Pages (automático)

O workflow `.github/workflows/deploy-pages.yml` roda a cada push em `main`:

1. `npm ci` + `npm run build` com `BASE_PATH=/<nome-do-repo>/`;
2. publica `dist/` com `actions/deploy-pages`.

Se existir um `public/CNAME` (domínio próprio), o workflow usa a raiz (`/`) automaticamente.

Configuração única no repositório: **Settings → Pages → Source: GitHub Actions**.

Site resultante: `https://<usuario>.github.io/<repo>/` (ou o domínio do CNAME).

### Build manual com `BASE_PATH`

A variável precisa ser definida **antes** do comando, respeitando a sintaxe de cada shell:

```powershell
# PowerShell (Windows)
$env:BASE_PATH='/balassa-seo/'
npm run build
Remove-Item Env:BASE_PATH
```

```cmd
:: CMD
set BASE_PATH=/balassa-seo/&& npm run build
```

```bash
# bash / zsh / macOS / Linux / Git Bash
BASE_PATH=/balassa-seo/ npm run build
```

> `BASE_PATH=/balassa-seo/ npm run build` **não funciona** no PowerShell: ele não aceita atribuição
> inline e tentaria executar `BASE_PATH` como programa.
>
> Se `npm run ...` falhar com *"npm.ps1 não pode ser carregado porque a execução de scripts foi
> desabilitada"*, use `npm.cmd run build` ou libere os scripts uma vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Testar o build em subpasta localmente

O `vite preview` serve o `dist/` na raiz (`--base` muda apenas o fallback de SPA), então para
simular o GitHub Pages publique o `dist/` sob um prefixo. Com o `npm run preview` rodando:

```powershell
# após um build com BASE_PATH=/balassa-seo/
# o preview em http://localhost:4173/ já valida os caminhos /balassa-seo/...
```

Se preferir espelhar a estrutura real, copie `dist/` para `site/balassa-seo/` (`npm run deploy`
com `DEPLOY_DIR`) e sirva `site/` com qualquer servidor estático.

### Publicação manual no branch `gh-pages`

Alternativa ao workflow, sem usar Actions. Basta um comando após o build:

```powershell
# PowerShell — build com o prefixo do repositório
$env:BASE_PATH='/balassa-seo/'
npm run build
Remove-Item Env:BASE_PATH

npm run publish:pages
```

`npm run publish:pages` (`scripts/publish-pages.mjs`):

- cria um worktree temporário (`.pages-worktree/`, já no `.gitignore`);
- usa o branch `gh-pages` existente, sincroniza com `origin/gh-pages` se ele só existir no
  remoto, ou cria um branch órfão na primeira vez;
- substitui todo o conteúdo por `dist/`, acrescenta `.nojekyll` e faz o commit;
- envia para `origin` e remove o worktree (sem sujar seu `main`).

Configuração única: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/ (root)`**.

Variáveis: `PAGES_BRANCH` (padrão `gh-pages`) e `PAGES_REMOTE` (padrão `origin`).

### Alternativa: upload manual pela interface do GitHub

1. Rode o build com `BASE_PATH=/<repo>/` (bloco acima).
2. Abra o branch `gh-pages` no GitHub → **Add file → Upload files**.
3. Arraste **todo o conteúdo** de `dist/` (a pasta `assets`, `icons`, `index.html`, `logo.webp`,
   `manifest.webmanifest`, `sw.js`, `workbox-*.js`, `robots.txt` e `.nojekyll`) — não a pasta
   `dist` em si.
4. Commit em `gh-pages` e confira em **Settings → Pages**.

Limitações do upload pela interface: arquivos ocultos como `.nojekyll` podem não ser aceitos pelo
arrastar-e-soltar; nesse caso crie-o via **Add file → Create new file** com o nome `.nojekyll`
(conteúdo vazio). O `npm run publish:pages` faz tudo isso automaticamente.

### Publicação manual (qualquer branch)

```bash
npm run build      # com BASE_PATH correto
npm run deploy     # espelha dist/ em site/
```

Publique o conteúdo de `site/` no branch de sua preferência e aponte **Settings → Pages → Source:
Deploy from a branch** para ele. `site/` é limpo e recriado a cada `npm run deploy`.

### Checklist antes de publicar

1. `npm run icons` (se logo/banner mudarem).
2. Atualizar domínio, telefone e e-mail em `index.html` e `src/data/content.ts`.
3. `npm run build` e `npm run preview` para testar a PWA localmente.
4. Publicar `dist/` (ou `site/` após `npm run deploy`), ou deixar o workflow fazer isso.

