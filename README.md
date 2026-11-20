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
  icons/icon-192.png        # gerados por `npm run icons`
  icons/icon-512.png
  icons/icon-maskable-512.png
  apple-touch-icon-180.png
  assets/og-image.jpg       # imagem de compartilhamento (Open Graph)
  manifest.webmanifest      # fallback estático (o build gera o manifest definitivo)
  robots.txt
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

Deploy estático. Use o caminho base `/` na raiz do domínio ou defina `BASE_PATH` para publicar em subdiretório:

```bash
BASE_PATH=/minha-subpasta/ npm run build
```

Em seguida publique o conteúdo de `dist/` (ou rode `npm run deploy` para espelhar em `site/`).
Ao usar o segundo comando, `site/` é limpo e recriado com o novo build.

### Checklist antes de publicar

1. `npm run icons` (se logo/banner mudarem).
2. Atualizar domínio, telefone e e-mail em `index.html` e `src/data/content.ts`.
3. `npm run build` e `npm run preview` para testar a PWA localmente.
4. Publicar `dist/` (ou `site/` após `npm run deploy`).

