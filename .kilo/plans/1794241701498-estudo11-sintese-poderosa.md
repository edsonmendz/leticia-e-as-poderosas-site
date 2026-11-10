# Plano — ESTUDO 11 "Síntese Poderosa" (o melhor de cada estudo)

## Objetivo
Criar `layouts/sintese/` unindo os pontos aprovados em cada estudo: base estética do **branco-sereno**, navegação rígida em painéis full-screen (adaptada do **salao-espelhado**), painel escuro do **power-glam**, coloração terracota do **terracota-salvia** em produtos/método, fechamento minimalista do **stories** e redes/contato do **boutique**.

## Decisões confirmadas com a cliente
1. **Navegação**: painéis verticais full-screen com scroll-snap; dots laterais numerados, setas ↓↑, teclado, links da topbar por painel, barra de progresso mobile.
2. **Produtos**: usar as **fotos oficiais** (`product.image` / `product.imageAlt` de `src/shared/content.js`).
3. **Terracota**: painéis de produtos e método inteiros em terracota & sálvia (ritmo branco → escuro → quente → branco).
4. **Fidelidade**: não incluir (permanece em boutique/terracota).
5. **Galeria**: card destacado **ESTUDO 11 — Síntese** (borda/flag "o melhor de cada"), mantendo os 10 anteriores.

## Estrutura — 6 painéis

Base estética (branco-sereno): papel `#fff`, tinta `#292721`, dourado `#765d2d`, hairline `#dedbd4`; Playfair Display + DM Sans; rótulos em versalete.

| # | Painel | Estética | Conteúdo |
|---|--------|----------|----------|
| 01 | Recepção | Branco + topbar e cena de espelho do salão-espelhado (mirror-frame/photo/reflection, plantas, piso) reestilizadas em branco/grafite/dourado | Eyebrow + H1 do tom sereno + link "Entre, Poderosa"; foto do retrato já usada no branco-sereno (1524504388940) |
| 02 | A casa | Escuro power-glam: foto full-bleed + spotlight/sombreamento, texto creme mínimo | `brand.founder` + `brand.specialty` + `brand.audience`; link Instagram |
| 03 | No salão | Branco, grade concisa numerada (modelo da 3ª tela do salão) | 4 itens de `services`; eyebrow BARRA DA TIJUCA |
| 04 | Produtos | Terracota & sálvia: fundo areia `#fcf8ef`, acentos `#b66750`/`#53614f`, cartões orgânicos | 3 produtos com **foto oficial**, preço, tamanho, CTA checkout; disclaimer cosmético |
| 05 | O método | Terracota & sálvia (pode fundo mais quente/gradiente como terracota-salvia) | Tutorial 3 passos com microcopy por passo (estilo boutique/salão: "COMECE COM A LIMPEZA", "FIOS BEM MOLHADOS", "15 A 20 MINUTOS") + `method.directions` + CTA kit |
| 06 | Reencontro | Foto do salão ocupando o painel com shade (stories) + overlay branco mínimo | Endereço (`brand.salon`), 4 botões de redes (`brand.instagram/facebook/tiktok/youtube`), CTA "Fale com a equipe"; link de volta à recepção |

Foto do salão nos painéis 02/06: `photo-1521590832167-7bcbfaa6381f` (mesma do editorial-gloss/stories).

## Navegação (adaptar `layouts/salao-espelhado/main.js` para vertical)
- Container `.sintese-track` com `scroll-snap-type: y mandatory` (desktop); painéis `min-height: 100svh; scroll-snap-align: start`.
- Mobile: `scroll-snap-type: y proximity` e painéis de produtos/método com `overflow-y: auto` interno para não travar conteúdo longo.
- Mecânicas a portar do salão: `goTo(index)`/`setActive`, dots numerados laterais, botões ‹ › (virar ↓ ↑), teclado (↑/↓/PageUp/PageDown/Home/End), `data-panel-link` na topbar e links internos, barra de progresso mobile, menu-toggle mobile.
- Remover a lógica horizontal/matchMedia do salão (aqui é sempre vertical).
- `prefers-reduced-motion`: `behavior: 'auto'` no goTo e transições desligadas.

## Arquivos a criar/alterar
1. **Criar** `layouts/sintese/index.html` — topbar + 6 painéis + dots/setas/progress/menu mobile.
2. **Criar** `layouts/sintese/main.js` — navegação vertical + render de produtos (com `product.image`/`imageAlt`), serviços, método e redes a partir de `content.js`.
3. **Criar** `layouts/sintese/style.css` — paleta local (branco-sereno como `:root`; blocos escuro/terracota com classes utilitárias próprias), sem editar `src/shared/brand.css`.
4. **Alterar** `vite.config.js` — input `sintese: 'layouts/sintese/index.html'`.
5. **Alterar** `index.html` (galeria) — card ESTUDO 11 "Síntese" com destaque (ex.: outline dourado + flag "O MELHOR DE CADA"); intro/rodapé para "Onze direções/estudos · 01–11".

## Fontes de reuso (copiar e adaptar, citando seletores)
- Navegação completa: `layouts/salao-espelhado/main.js`; topbar/menu: `.topbar*`, `.menu-toggle`, `.mobile-menu`.
- Espelho: `.mirror-scene`, `.mirror-frame`, `.mirror-photo`, `.mirror-reflection`, `.scene-plant*`, `.mirror-floor` em `layouts/salao-espelhado/style.css`.
- Painel escuro: `.glam-hero__image`, `.glam-hero__spotlight` em `layouts/power-glam/style.css`.
- Tokens/hairlines/método/reencontro: `layouts/branco-sereno/style.css`.
- Terracota + cartões orgânicos: `layouts/terracota-salvia/style.css` (`--journey-*`, border-radius orgânicos).
- Redes: `.social-links` em `layouts/boutique/index.html`.

## Compliance (inviolável)
- Sem "Segredinho da Lê"; sem promessa de resultado; disclaimers de benefício cosmético; tom "Poderosa"; preços/links/contatos **somente** de `src/shared/content.js`; `alt` fiel usando `product.imageAlt`.

## Validação
1. `npm run build` sem erros e `git diff --check` limpo.
2. Rotas 200: `/`, `/layouts/sintese/`, e um estudo anterior (ex.: `/layouts/branco-sereno/`).
3. Screenshots headless 1440 e 375px: painéis sem overflow horizontal; produtos com foto oficial carregada; textos legíveis.
4. Contraste AA verificado: creme sobre shade escuro (≥4.5:1), `#100806` sobre terracota `#b66750` (≈4.8:1), grafite sobre branco; ajustar shade/tokens se falhar.
5. Teclado (Tab/↑/↓) e `prefers-reduced-motion` funcionando; snap não captura conteúdo longo no mobile.
6. Teste manual no celular via `npm run dev -- --host 0.0.0.0` (rede local).

## Fora de escopo
- Deploy, planos de fidelidade, reformular os estudos 01–10, novas fotos de produtos/salão, conteúdo textual definitivo.
