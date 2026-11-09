# Plano — Rodada 2: 5 layouts por paleta de cor (L6–L10)

## Objetivo
Adicionar 5 novos protótipos visuais ao projeto Vite existente, cada um definido por uma paleta de cor própria e uma estrutura nova (sem reciclar as estruturas de L1–L5). A galeria passará a comparar 10 estudos; o aprovado recebe continuidade.

## Direção de imagens (obrigatória nos 5 novos layouts)
- Preferir mulheres **morenas e negras**, com cabelos relativamente grandes: **lisos bem produzidos** ou **cacheados belos e chamativos**.
- Vestimenta (quando aparecer): estética **elegante, monocromática e discreta** — sem ofuscar a imagem nem o layout.
- Processo na implementação: escolher fotos no Unsplash que atendam aos critérios e **verificar visualmente** cada uma antes de usar; registrar `alt` preciso e respeitoso. Se nenhuma foto adequada for encontrada para um espaço, usar arte CSS neutra (silhuetas/gradientes) como placeholder.
- Não reformular as imagens de L1–L5 nesta rodada (fora de escopo).

## Paletas e estruturas

1. **L6 — Branco Absoluto** (`layouts/branco-sereno/`)
   - Fundo branco predominante; tinta grafite; acentos dourados finos; tipografia serif elegante.
   - Estrutura "Sereno": fluxo vertical centrado tipo galeria de arte, divisórias hairline, rótulos em versalete, muito espaço em branco, retratos grandes emoldurados de forma mínima.
2. **L7 — Vinho Profundo** (`layouts/vinho-imperial/`)
   - Fundo vinho profundo predominante (família #5e1224), texto creme, filetes dourados discretos.
   - Estrutura "Díptico": painéis alternados em split-screen (metade imagem / metade texto), seções full-bleed vinho, tipografia serif ampla.
3. **L8 — Verde Noite** (`layouts/verde-noite/`)
   - Verde escuro/esmeralda profundo predominante (família #123528), texto marfim, detalhes dourados pálidos.
   - Estrutura "Galeria de Arcos": coluna central de ritmo calmo, imagens em moldura de arco (motivo salão), espaçamento generoso, subtítulos serif.
4. **L9 — Índigo & Âmbar** (`layouts/indigo-ambar/`) — cores mistas
   - Blocos alternando índigo profundo e âmbar quente, com creme de apoio.
   - Estrutura "Blocos": color-blocking de seções inteiras em cor sólida, transições retas e marcantes; CTA âmbar sobre índigo e vice-versa.
5. **L10 — Terracota & Sálvia** (`layouts/terracota-salvia/`) — cores mistas
   - Terracota quente e verde-sálvia suave sobre areia/creme; formas orgânicas arredondadas; gradientes suaves.
   - Estrutura "Jornada": painel lateral fixo com progresso + conteúdo rolante à direita, seções com cantos orgânicos.

## Decisões técnicas (herdadas da rodada 1)
- Stack: Vite vanilla multi-página. Cada layout em `layouts/<nome>/` com `index.html`, `style.css`, `main.js` próprios.
- Paleta de cada layout definida **dentro do próprio `style.css`** (variáveis locais), sem editar `src/shared/brand.css`.
- Conteúdo compartilhado de `src/shared/content.js` (produtos/preços/links, método, fidelidade, serviços, redes) — nada de dados novos inventados.
- Galeria `index.html`: novos cards **ESTUDO 06–10** com os nomes das paletas; atualizar o texto de rodapé/intro.
- `vite.config.js`: 5 novas entradas de build.
- Animações: revelação no scroll (`IntersectionObserver`) + suporte a `prefers-reduced-motion`, como nas rodadas anteriores.

## Compliance (mantido de L1–L5)
- Sem "Segredinho da Lê"; sem promessa de resultado (alegações cosméticas); sem preços/horários de salão inventados; público feminino ("Poderosa"); fidelidade com transparência de assinatura recorrente.

## Etapas (implementar de uma em uma)

### Etapa 6 — L6 Branco Absoluto
- [ ] Estrutura vertical centrada com divisórias hairline e versalete
- [ ] Hero tipográfico + retrato grande minimalista
- [ ] Seções: casa, produtos (preços + checkout), método, salão/contato
- [ ] Paleta local no `style.css` (branco/grafite/dourado fino)
- [ ] Imagens conforme direção (verificação visual + fallback CSS)
- [ ] Entrada no build + card ESTUDO 06 na galeria
- [ ] Validar: build, contraste AA, responsivo (700px), movimento reduzido

### Etapa 7 — L7 Vinho Profundo
- [ ] Split-screen alternado (imagem/texto) com seções full-bleed vinho
- [ ] Tipografia creme serif ampla + filetes dourados
- [ ] Produtos com preços e links oficiais + método
- [ ] Paleta local vinho/creme/dourado
- [ ] Imagens conforme direção
- [ ] Entrada no build + card ESTUDO 07
- [ ] Validar: build, contraste AA sobre vinho, responsivo

### Etapa 8 — L8 Verde Noite
- [ ] Coluna central com molduras de arco nas imagens
- [ ] Paleta verde esmeralda profundo/marfim/dourado pálido
- [ ] Produtos, método e contato com CTAs
- [ ] Imagens conforme direção
- [ ] Entrada no build + card ESTUDO 08
- [ ] Validar: build, contraste AA sobre verde escuro, responsivo

### Etapa 9 — L9 Índigo & Âmbar
- [ ] Color-blocking: seções inteiras alternando índigo/âmbar/creme
- [ ] CTA duplo contrastante por bloco
- [ ] Produtos com checkout + método + redes
- [ ] Imagens conforme direção (roupa monocromática dialoga com blocos)
- [ ] Entrada no build + card ESTUDO 09
- [ ] Validar: build, contraste nos dois fundos, responsivo

### Etapa 10 — L10 Terracota & Sálvia
- [ ] Painel lateral fixo de progresso + conteúdo rolante
- [ ] Formas orgânicas arredondadas e gradientes suaves
- [ ] Produtos, método, fidelidade (transparência de recorrência) e salão
- [ ] Imagens conforme direção
- [ ] Entrada no build + card ESTUDO 10
- [ ] Validar: build, hierarquia, responsivo

### Encerramento da rodada 2
- [ ] Galeria comparando os 10 estudos com status
- [ ] Revisão visual manual mobile/desktop (pendente de aprovação)
- [ ] Escolha da cliente entre os 10; aprovado segue, demais depreciados

## Validação geral (a cada etapa)
- `npm run build` sem erros; `git diff --check` limpo
- Preços e links conferidos com `src/shared/content.js`
- Viewport mobile (375px) e desktop (1440px)
- Conformidade: sem "Segredinho da Lê", sem promessa de resultado, tom "Poderosa"

## Fora de escopo
- Deploy/hospedagem, fotos oficiais dos produtos, chat/WhatsApp, Bling/Guru, SEO/analytics, reformular L1–L5, conteúdo textual definitivo
