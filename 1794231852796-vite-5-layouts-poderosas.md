# Plano — Site "Letícia e as Poderosas": 5 protótipos de layout (Vite)

## Objetivo
Criar um sistema Vite (vanilla, multi-página) com 5 protótipos **apenas visuais** de layout para o site da empresa. O modelo aprovado pela cliente receberá continuidade; os demais serão depreciados.

## Fontes de conteúdo (já analisadas)
- `BRIEFING_ESTRAT%C3%89GICO.pdf` — posicionamento, produtos, estratégia comercial, compliance
- `personalidade-robo.txt` — tom de voz, identidade da marca, público e regras comerciais
- Produtos informados pela cliente (preços atuais + links de checkout)

## Dados compartilhados entre todos os layouts
- **Marca**: Letícia Figueiredo — hairstylist e terapeuta capilar, especialista em saúde da fibra capilar. Atende **todos os tipos de cabelo** (lisos, ondulados, cacheados, crespos, naturais ou com química) — NÃO posicionar como especialista só em crespos.
- **Tom**: feminino, acolhedor, próximo; tratamento "Poderosa"; 💛 como símbolo da marca.
- **Público**: exclusivo para mulheres. Venda 100% online (checkouts). Salão: Barra da Tijuca, RJ.
- **Produtos** (preços são referências; usar linguagem de "alegações cosméticas", sem promessa de resultado):
  - **Kit Power Hair** — R$ 447,00 — tratamento completo (Shampoo 300ml + Condicionador 300ml + Máscara 300ml); rende ~3 meses; vende-se só o kit completo → https://clkdmg.site/pay/9d50ac24-9916-4c9b-a303-865b1286088a
  - **Leave-in Power Hair** — R$ 157,01 — proteção térmica/solar, antifrizz, finalização (100ml) → https://clkdmg.site/pay/leaveinpowerhair
  - **Poção Mágica da Lê** — R$ 257,00 — 4 ampolas de 10ml, brilho intenso e fortalecimento cosmético → https://clkdmg.site/pay/pocao-magica-da-le
- **Método Letícia** (diferencial): Shampoo → Condicionador → Máscara, na mesma sessão, fios bem molhados, máscara 15–20 min.
- **Fidelidade** (mencionar com transparência de assinatura recorrente): Plano Cobre (1 kit/3 meses) e Plano Bronze (2 kits/3 meses).
- **Serviços do salão** (sem inventar preços/horários): avaliação capilar, hidratação, nutrição, reconstrução, recuperação de fios danificados/química, orientação de manutenção.
- **Redes**: Instagram @leticiaeaspoderosas, Facebook /poderosasbylf, TikTok e YouTube @leticiaeaspoderosas.
- **NÃO exibir**: "Segredinho da Lê" (em desenvolvimento), preços/horários inventados do salão, promessas de resultado, diagnóstico médico.

## Decisões técnicas
- **Stack**: Vite vanilla, build multi-página (`rollupOptions.input` com 6 entradas HTML).
- **Estrutura**:
  ```
  index.html                 → galeria/link para os 5 protótipos
  src/shared/brand.css       → tokens de marca (cores, fontes, espaçamento)
  src/shared/content.js      → dados centralizados (produtos, textos, links)
  src/shared/base.css        → reset + utilitários (botões, cards)
  assets/                    → placeholders de imagem (produtos, salão, Letícia)
  layouts/salao-espelhado/   → L1 (etapa 1)
  layouts/editorial-gloss/   → L2 (etapa 2)
  layouts/power-glam/        → L3 (etapa 3)
  layouts/stories/           → L4 (etapa 4)
  layouts/boutique/          → L5 (etapa 5)
  ```
- Cada layout: pasta com `index.html` + `style.css` + `main.js` próprios, consumindo `src/shared/`.
- Imagens nesta etapa: fotografias de atmosfera via Unsplash e ilustrações CSS dos produtos; serão trocadas pelas fotos oficiais quando disponíveis.
- Fontes: Google Fonts (display serif elegante + sans limpa), definidas nos tokens.
- Paleta base: creme/branco suave, amarelo-ouro 💛 (marca), marrom escuro para texto. Cada layout pode variar (L3 usará dark + ouro).

## Os 5 estilos

1. **L1 — Salão Espelhado** (ideia original da cliente): página clara, menu horizontal discreto no topo, espelho vertical gigante no centro simulando o ambiente do salão (reflexo com gradiente/brilho animado). Navegação por **rolamento horizontal** com scroll-snap; cada seção = uma "cadeira" do salão (Recepção → Sobre → Serviços → Produtos → Método → Contato). Indicador de "cadeiras" (dots laterais).
2. **L2 — Editorial Gloss**: estilo revista de beleza. Tipografia serif gigante, muito espaço em branco, creme + dourado, seções numeradas como páginas de revista, citações com a voz da marca ("Vamos cuidar disso, Poderosa 💛"), rolagem vertical com revelações suaves.
3. **L3 — Power Glam (dark)**: contraste drástico — fundo quase preto, acentos ouro/amarelo neon, efeito spotlight, marquee (letreiro) de benefícios, cards de produto com brilho. Testa a versão glam/noturna da marca.
4. **L4 — Stories Verticais**: mobile-first, seções full-screen com scroll-snap vertical, barras de progresso estilo stories no topo, navegação por dots, CTAs grandes. Sensação de app/redes sociais.
5. **L5 — Boutique Conversiva**: landing clássica focada em conversão: header fixo, hero com CTA, cards de produto com preço e botão de checkout, seção método, fidelidade, salão, footer com redes e localização. Tema claro acolhedor. Serve de baseline "segura".

## Etapas (implementar de um em um)

### Etapa 0 — Base do projeto
- [x] Criar projeto Vite vanilla e limpar o boilerplate (estrutura equivalente ao scaffold)
- [x] Configurar `vite.config.js` multi-página para as páginas existentes; novas entradas entram junto com cada layout implementado
- [x] Criar `src/shared/brand.css` (tokens: cores 💛/creme/marrom e fontes)
- [x] Criar `src/shared/content.js` (produtos, preços/links, salão, método, redes e fidelidade)
- [x] Criar `src/shared/base.css` (reset, botões e utilitários)
- [x] Usar fotografias de atmosfera e ilustrações CSS como placeholders visuais (fotos oficiais ainda pendentes)
- [x] Criar `index.html` como galeria; L1 disponível e os demais estilos indicados como etapas futuras
- [x] Validar `npm run build` e iniciar `npm run dev` sem erros

### Etapa 1 — L1 Salão Espelhado (ideia da cliente)
- [x] Estrutura horizontal: container scroll-snap-x com 6 seções ("cadeiras")
- [x] Menu horizontal discreto fixo no topo (âncoras por seção)
- [x] Espelho vertical grande no hero (moldura, reflexo animado e texto sobreposto)
- [x] Dots laterais indicando a "cadeira" atual + controles de estação anterior/próxima
- [x] Navegação por teclado (setas, PageUp/PageDown, Home/End) e gesto de arraste/swipe entre painéis
- [x] Responsivo: no mobile, converter rolagem para vertical mantendo o espelho
- [x] Validar build, legibilidade, preços e links de checkout

### Etapa 2 — L2 Editorial Gloss
- [x] Grid editorial (12 colunas) com manchetes serif grandes
- [x] Seções numeradas estilo revista + pull quotes com voz da marca
- [x] Animações de revelação no scroll (`IntersectionObserver`), respeitando redução de movimento
- [x] Cards de produto em formato "editorial de beleza"
- [x] Validar build, responsividade CSS e links de checkout compartilhados com L1

### Etapa 3 — L3 Power Glam (dark)
- [x] Tema dark + ouro com efeitos de spotlight/glow
- [x] Marquee de benefícios cosméticos e frases institucionais
- [x] Cards de produto com brilho, preços destacados e links oficiais
- [x] Menu com estilo "night salon" e navegação mobile
- [x] Validar build; cores de texto e CTA com contraste AA sobre fundos sólidos; animações em CSS/IntersectionObserver e suporte a movimento reduzido

### Etapa 4 — L4 Stories Verticais
- [x] Seções full-screen com scroll-snap vertical + barras de progresso
- [x] Navegação por dots + swipe/rolagem touch
- [x] CTAs para checkout oficial em cada produto
- [x] Layout mobile-first (desktop com moldura de celular no centro)
- [x] Validar build, regras de snap e breakpoints responsivos; links de checkout
- [ ] Revisar em dispositivo/navegador mobile real antes de aprovar a direção visual

### Etapa 5 — L5 Boutique Conversiva
- [x] Header fixo + hero com CTA duplo (produtos / salão)
- [x] Cards de produto clássicos com preço + botão checkout
- [x] Seções: método, fidelidade, salão, redes, localização
- [x] Footer completo com links oficiais
- [x] Validar build, hierarquia de conteúdo, CTAs, links e breakpoints responsivos
- [ ] Revisar visualmente em viewport mobile e desktop reais antes de aprovar

### Encerramento da fase visual
- [x] Atualizar galeria `index.html` com links para os 5 layouts
- [x] Registrar checklist de comparação: clareza, identidade 💛, conversão, originalidade e experiência mobile
- [x] Apresentar os 5 protótipos para escolha; a seleção do layout aprovado permanece pendente

## Validação geral (a cada etapa)
- `npm run dev` — sem erros no console
- Conferir preços/links contra os dados oficiais (nada inventado)
- [ ] Fazer revisão visual em viewport mobile (375px) e desktop (1440px)
- Verificar conformidade: sem "Segredinho da Lê", sem promessa de resultado, sem preços de salão inventados, público feminino ("Poderosa")

## Fora de escopo (fase visual)
- Deploy/hospedagem, integração com chatbot/WhatsApp, Bling/Guru, fotos reais dos produtos, SEO/analytics, conteúdo definitivo de texto (usar copy provisória fiel ao tom da marca)
