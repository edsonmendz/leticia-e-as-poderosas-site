# Fase 2 — Sítio Oficial: Síntese como Layout Único

Plano para promover o estudo Síntese a site único, corrigir a navbar, trocar as fotos de stock pelas fotos reais (Letícia / modelo negra) e adicionar as seções "A Poderosa" e "Antes & Depois". Mockup estático — sem integração de checkout (links permanecem `href` simples).

## Decisões Confirmadas

- **7 painéis** (snap vertical mantido): Recepção → A Poderosa → Antes & Depois → No salão → Power Hair → O método → Reencontro
- O painel escuro "A casa" **vira** o bloco de infos "A Poderosa" (logo oficial + foto real + credenciais)
- Assets do site antigo **baixados localmente** (`src/assets/`), sem hotlink
- Fotos do Instagram já extraídas pela cliente: mover de `dist/assets/fotos/` para `src/assets/fotos/`
- Estrutura padrão Vite na raiz; deletar os 10 layouts de estudos + galeria

## Diagnóstico do Bug da Navbar (confirmado no CSS atual)

- `.sintese-track` (`position: absolute`, **sem z-index**) não cria stacking context → filhos posicionados dos painéis (z-index 1–2) competem globalmente com a topbar fixa (z-20); `.sintese-mobile-menu` z-19 fica **abaixo** da topbar; `.sintese-progress` z-30 fica acima dela
- Topbar transparente sobre conteúdo rolado (track `inset: 0`) sem scrim → texto do header "aparece atrás" de fotos/cartões no mobile
- **Correção**: `isolation: isolate` em `.sintese-track`; escada de z-index (topbar 50, progress 45, menu 40); scrim superior por tema (claro: gradiente branco→transparente; escuro: gradiente `rgba(21,19,15,.65)`→transparente) para legibilidade em qualquer painel

## Assets Exatos (extraídos do bundle do site antigo)

**Download para `src/assets/`:**
- Logo: `https://media.base44.com/images/public/69b409696de9db2d4ffb5a85/4eb97cd41_as_poderosas-removebg-preview.png` → `logo.png`
- 4 pares antes/depois → `src/assets/antes-depois/`:
  1. `7a30e0f17_30.jpg` (antes) / `4a8002f6f_31.jpg` (depois)
  2. `7e047d141_41.jpg` / `c6c875997_40.jpg`
  3. `e8b9360f7_10.jpg` / `d28eedc5e_11.jpg`
  4. `acac694f3_PALHAO1.jpg` / `0d6446300_PALHAO2.jpg` (host supabase: `https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b409696de9db2d4ffb5a85/<file>`; demais em `https://media.base44.com/images/public/69b409696de9db2d4ffb5a85/<file>`)
- Opcionais (foto Letícia c/ produto): `f91765a9a_Leticiacomproduto.png`, `222665589_Leticia.png`

**Mover** `dist/assets/fotos/*.jpg` → `src/assets/fotos/` (16 arquivos; **excluir** `651035405_…_n.jpg` — thumbnail 150×150 inutilizável). Nenhum agente consegue ver as imagens (modelo sem input visual) — usar **manifesto de papéis** `src/assets/photos.js`:

```js
export const photos = {
  mirror: '/src/assets/fotos/708517467_…_n.jpg',   // retrato hero (maior: 3072×4096)
  poderosa: '/src/assets/fotos/505760991_…_n.jpg',  // bloco infos (1440×1920)
  reencontro: '/src/assets/fotos/506043747_…_n.jpg',
}
```

Mapeio por resolução (maiores = heros; lote 1122×1402 = feed; 768×1366 = story) e a cliente ajusta os nomes após ver o render — trocar um arquivo de papel = editar 1 linha do manifesto.

## Textos Reaproveitados do Site Antigo

- Eyebrow oficial: `As Poderosas · Power Hair`; assinatura: `By hairstylist Letícia Figueiredo`
- Instrução do comparador: "deslize para a esquerda para ver o antes e para a direita para ver o depois"
- Benefícios (se útil no método/produtos): Hidratação Profunda · Crescimento Acelerado · Proteção Total

## Tarefas (ordem)

1. **Mover fotos** `dist/assets/fotos` → `src/assets/fotos/` (excluir 150×150); criar `src/assets/photos.js`; baixar logo + 8 imagens antes/depois + 2 opcionais via curl
2. **Reestruturar raiz**: `layouts/sintese/index.html` → `index.html` (raiz, sobrescreve galeria; `script src="/src/main.js"`); `layouts/sintese/main.js` → `src/main.js`; `layouts/sintese/style.css` → `src/style.css`; `vite.config.js` vira `defineConfig({})` (input padrão); deletar `layouts/` inteiro; manter `src/shared/content.js`, `personalidade-robo.txt`, `BRIEFING_ESTRATÉGICO.pdf`, `.kilo/`
3. **Navbar**: aplicar correção de stacking + scrim (diagnóstico acima); menu mobile acima da topbar; validar tema claro/escuro nos 7 painéis
4. **Header com logo**: trocar wordmark tipográfico pelo `logo.png` (height ~40px desktop / 30px mobile, `object-fit: contain`), manter CTA
5. **Painel A Poderosa** (ex-A casa, escuro): foto real da Letícia (manifesto `poderosa`), logo, `brand.founder/specialty/audience`, Instagram
6. **Painel Antes & Depois** (novo, fundo areia): título "Antes & Depois" com filete dourado; slider comparador **vanilla** (sem deps): par de imagens, `clip-path: inset()` controlado por ponteiro (mouse+touch), handle central, labels ANTES/DEPOIS, acessível (role="slider", teclas ←/→); 2 pares no desktop (grid 2×2 com 4), 1 visível por vez no mobile (carrossel simples ou pilha); microcopy da instrução real
7. **Recepção/Reencontro**: trocar Unsplash pelas fotos do manifesto (`mirror`, `reencontro`); remover todas as referências `images.unsplash.com` restantes
8. **Atualizar navegação**: 7 dots, indexes "0X — 07", progresso /7, topnav "A Poderosa · Antes & Depois · Power Hair · O Método" (No salão sai da topnav, acessível via dots), `data-header-theme`: claro·escuro·claro·claro·claro·claro·escuro
9. **Limpeza**: `grep -r "unsplash\|base44\|supabase"` em src/index → zero hotlinks; `dist/` regenerado

## Riscos

- **Papel das fotos pode não agradar de primeira** (ninguém consegue vê-las) — mitigado pelo manifesto de 1 linha por papel
- Antes/depois têm proporções mistas — normalizar container `aspect-ratio: 4/5; object-fit: cover`
- Slider dentro de painel com scroll-snap: touch drag no slider não deve rolar o painel → `touch-action: none` no handle/área do slider, `pan-y` no restante
- Apenas 1 painel novo excede altura no mobile → manter padrão `proximity` já validado… não: mobile atual usa `mandatory` com painéis que cabem; antes/depois mobile deve caber (1 comparador + texto), senão voltar `proximity` só nele

## Validação

1. `npm run build` + `git diff --check`
2. `curl` rotas: `/` 200 (não há mais `/layouts/`)
3. Headless Chrome `--dump-dom` em `/` : 7 dots, logo `<img>`, 8 `<img>` antes/depois com alt, zero `unsplash` no DOM final
4. Screenshots 1440×1100 e 375×812 por painel (fragmentos `#poderosa` etc.) em `/tmp/kilo/fase2/`
5. Navbar: dev server no celular (192.168.1.36:5173) — header nunca coberto nem cobrindo conteúdo; menu abre/fecha nos 7 painéis
6. Slider: arrastar (mouse), teclado ←/→, rótulos ANTES/DEPOIS visíveis

## Fora de Escopo

- Integração de checkout/analytics (mockup estático; links `clkdmg` já em `content.js` permanecem)
- Deploy/domínio
- Vídeos (apenas frames/capas estáticas)
