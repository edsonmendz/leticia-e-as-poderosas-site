import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        gallery: 'index.html',
        salonMirror: 'layouts/salao-espelhado/index.html',
        editorialGloss: 'layouts/editorial-gloss/index.html',
        powerGlam: 'layouts/power-glam/index.html',
        verticalStories: 'layouts/stories/index.html',
        boutique: 'layouts/boutique/index.html',
        brancoSereno: 'layouts/branco-sereno/index.html',
        vinhoImperial: 'layouts/vinho-imperial/index.html',
        verdeNoite: 'layouts/verde-noite/index.html',
        indigoAmbar: 'layouts/indigo-ambar/index.html',
        terracotaSalvia: 'layouts/terracota-salvia/index.html',
        sintese: 'layouts/sintese/index.html',
      },
    },
  },
})
