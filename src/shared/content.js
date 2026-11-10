export const brand = {
  name: 'Letícia e as Poderosas',
  founder: 'Letícia Figueiredo',
  specialty: 'Hairstylist e terapeuta capilar, especialista em saúde da fibra capilar.',
  audience: 'Cuidado para cabelos lisos, ondulados, cacheados e crespos, naturais ou com química.',
  salon: 'Barra da Tijuca · Rio de Janeiro',
  instagram: 'https://www.instagram.com/leticiaeaspoderosas',
  facebook: 'https://www.facebook.com/poderosasbylf',
  tiktok: 'https://www.tiktok.com/@leticiaeaspoderosas',
  youtube: 'https://www.youtube.com/@leticiaeaspoderosas',
}

export const method = {
  steps: ['Shampoo hidratante', 'Condicionador nutritivo', 'Máscara reconstrutora'],
  directions: 'Use os três produtos na mesma sessão. Aplique condicionador e máscara com os fios bem molhados; deixe a máscara agir por 15 a 20 minutos.',
}

export const loyalty = [
  { name: 'Plano Cobre', cadence: '1 Kit Power Hair a cada 3 meses', href: 'https://clkdmg.site/subscribe/plano-cobre' },
  { name: 'Plano Bronze', cadence: '2 Kits Power Hair a cada 3 meses', href: 'https://clkdmg.site/subscribe/planobronze2kits' },
]

export const productImages = {
  kit: 'https://storage.googleapis.com/disk.clkdmg.site/clients/9a90c631-c739-40e3-babf-f5d724ed6ec9/images/products/a12f0485-9f04-4773-9f9b-3c58cfdf4c2d.png',
  leaveIn: 'https://storage.googleapis.com/disk.clkdmg.site/clients/9a90c631-c739-40e3-babf-f5d724ed6ec9/images/products/9f3169b5-9f22-4069-b8c0-ece716c6cbc8.png',
  potion: 'https://storage.googleapis.com/disk.clkdmg.site/clients/9a90c631-c739-40e3-babf-f5d724ed6ec9/images/products/a12f006c-cea7-4830-af59-4ee877b9721f.png',
}

export const products = [
  {
    name: 'Kit Power Hair',
    eyebrow: 'TRATAMENTO COMPLETO · 3 PASSOS',
    description: 'Shampoo hidratante, condicionador nutritivo e máscara reconstrutora para a rotina de cuidado da fibra.',
    size: '3 produtos de 300 ml',
    price: 'R$ 447,00',
    href: 'https://clkdmg.site/pay/9d50ac24-9916-4c9b-a303-865b1286088a',
    shape: 'kit',
    image: productImages.kit,
    imageAlt: 'Kit Power Hair com shampoo, condicionador e máscara em embalagens pretas e douradas',
  },
  {
    name: 'Leave-in Power Hair',
    eyebrow: 'PROTEÇÃO & FINALIZAÇÃO',
    description: 'Finalização diária com proteção térmica, maciez, brilho e ajuda no controle do frizz.',
    size: '100 ml',
    price: 'R$ 157,01',
    href: 'https://clkdmg.site/pay/leaveinpowerhair',
    shape: 'leave-in',
    image: productImages.leaveIn,
    imageAlt: 'Frasco preto e dourado do Leave-in Power Hair',
  },
  {
    name: 'Poção Mágica da Lê',
    eyebrow: 'BRILHO EM CADA AMPOLA',
    description: 'Tratamento concentrado para maciez, sedosidade e fortalecimento cosmético dos fios.',
    size: '4 ampolas de 10 ml',
    price: 'R$ 257,00',
    href: 'https://clkdmg.site/pay/pocao-magica-da-le',
    shape: 'potion',
    image: productImages.potion,
    imageAlt: 'Caixa e frasco da Poção Mágica da Lê em embalagem preta e dourada',
  },
]

export const services = [
  'Avaliação das necessidades capilares',
  'Hidratação, nutrição e reconstrução',
  'Recuperação cosmética dos fios fragilizados',
  'Orientação para cuidar em casa',
]
