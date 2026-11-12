import mirror from './fotos/graciosa.jpg'
import poderosa from './fotos/imponente.png'
import reencontro from './fotos/firme.png'

import antes1 from './antes-depois/7a30e0f17_30.jpg'
import depois1 from './antes-depois/4a8002f6f_31.jpg'
import antes2 from './antes-depois/7e047d141_41.jpg'
import depois2 from './antes-depois/c6c875997_40.jpg'
import antes3 from './antes-depois/e8b9360f7_10.jpg'
import depois3 from './antes-depois/d28eedc5e_11.jpg'
import antes4 from './antes-depois/acac694f3_PALHAO1.jpg'
import depois4 from './antes-depois/0d6446300_PALHAO2.jpg'

const stepPhotos = Object.entries(import.meta.glob('./fotos/passo*.jpg', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  .map(([, image]) => image)

export const photos = { mirror, poderosa, reencontro }
export { stepPhotos }

export const beforeAfter = [
  { before: antes1, after: depois1 },
  { before: antes2, after: depois2 },
  { before: antes3, after: depois3 },
  { before: antes4, after: depois4 },
]
