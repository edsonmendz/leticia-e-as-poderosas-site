import './style.css'
import { brand, method, products, services } from './shared/content.js'
import { photos, beforeAfter, stepPhotos } from './assets/photos.js'

const track = document.querySelector('.sintese-track')
const panels = [...document.querySelectorAll('.sintese-panel')]
const dots = document.querySelector('.sintese-dots')
const progress = document.querySelector('.sintese-progress span')
const menuToggle = document.querySelector('.sintese-menu-toggle')
const mobileMenu = document.querySelector('.sintese-mobile-menu')
const app = document.querySelector('.sintese-app')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let activeIndex = 0

document.querySelector('#sintese-mirror-img').src = photos.mirror
document.querySelector('#sintese-poderosa-img').src = photos.poderosa
document.querySelector('#sintese-reencontro-img').src = photos.reencontro
document.querySelector('#sintese-salon-note').textContent = brand.salon.toUpperCase()

document.querySelector('#sintese-founder').textContent = `${brand.founder} é ${brand.specialty.charAt(0).toLowerCase()}${brand.specialty.slice(1)} Seu trabalho começa entendendo o que cada fio precisa — sem fórmula única, sem pressa.`
document.querySelector('#sintese-audience').textContent = brand.audience
document.querySelector('#sintese-signature').textContent = `By hairstylist ${brand.founder}`
document.querySelector('#sintese-instagram').href = brand.instagram
document.querySelector('#sintese-address').textContent = brand.salon
document.querySelector('#sintese-equipe').href = brand.instagram

const socials = [
  ['Instagram', brand.instagram],
  ['Facebook', brand.facebook],
  ['TikTok', brand.tiktok],
  ['YouTube', brand.youtube],
]
document.querySelector('#sintese-social').innerHTML = socials.map(([name, href]) => `
  <a href="${href}" target="_blank" rel="noreferrer">${name} <span aria-hidden="true">↗</span></a>
`).join('')

document.querySelector('#sintese-services').innerHTML = services.map((service, index) => `
  <article><span>0${index + 1}</span><p>${service}</p></article>
`).join('')

document.querySelector('#sintese-products').innerHTML = products.map((product, index) => `
  <article class="sintese-product">
    <a class="sintese-product__art" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="sintese-product__number">0${index + 1}</span>
      <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" />
      <span class="sintese-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="sintese-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="sintese-product__description">${product.description}</p>
    <p class="sintese-product__size">${product.size}</p>
    <div class="sintese-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
  </article>
`).join('')

const stepNotes = ['COMECE COM A LIMPEZA', 'FIOS BEM MOLHADOS', '15 A 20 MINUTOS']
document.querySelector('#sintese-steps').innerHTML = method.steps.map((step, index) => `
  <li><span>0${index + 1}</span><div><small>${stepNotes[index] || ''}</small><strong>${step}</strong></div></li>
`).join('')
document.querySelector('#sintese-directions').textContent = method.directions
const kit = products.find((product) => product.shape === 'kit') || products[0]
document.querySelector('#sintese-kit').href = kit.href

const passoImage = document.querySelector('#sintese-passo-image')
const passoCurrent = document.querySelector('#sintese-passo-current')
const passoDots = document.querySelector('.sintese-passos__dots')
let passoIndex = 0

function showPasso(index) {
  passoIndex = (index + stepPhotos.length) % stepPhotos.length
  const number = String(passoIndex + 1).padStart(2, '0')
  passoImage.src = stepPhotos[passoIndex]
  passoImage.alt = `Imagem do passo ${passoIndex + 1} do ritual Power Hair`
  passoCurrent.textContent = number
  passoDots.querySelectorAll('button').forEach((button, dotIndex) => {
    button.setAttribute('aria-current', dotIndex === passoIndex ? 'step' : 'false')
  })
}

passoDots.innerHTML = stepPhotos.map((_, index) => `
  <button type="button" aria-label="Ver passo ${index + 1}" aria-current="${index === 0 ? 'step' : 'false'}"></button>
`).join('')
passoDots.querySelectorAll('button').forEach((button, index) => {
  button.addEventListener('click', () => showPasso(index))
})
document.querySelector('.sintese-passos__prev').addEventListener('click', () => showPasso(passoIndex - 1))
document.querySelector('.sintese-passos__next').addEventListener('click', () => showPasso(passoIndex + 1))
showPasso(0)

document.querySelector('#sintese-compares').innerHTML = beforeAfter.map(({ before, after }, index) => `
  <article class="sintese-compare">
    <div class="sintese-compare__frame" role="slider" tabindex="0" data-compare
      aria-label="Comparação ${index + 1} de ${beforeAfter.length}: antes e depois do atendimento"
      aria-orientation="horizontal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"
      aria-describedby="sintese-compare-hint">
      <img class="sintese-compare__img sintese-compare__img--antes" src="${before}" alt="Cabelo antes do tratamento" loading="lazy" />
      <img class="sintese-compare__img sintese-compare__img--depois" src="${after}" alt="Cabelo após o tratamento" loading="lazy" />
      <span class="sintese-compare__label sintese-compare__label--antes" aria-hidden="true">ANTES</span>
      <span class="sintese-compare__label sintese-compare__label--depois" aria-hidden="true">DEPOIS</span>
      <span class="sintese-compare__hit" aria-hidden="true"></span>
      <span class="sintese-compare__handle" aria-hidden="true"><span class="sintese-compare__knob">‹ ›</span></span>
    </div>
  </article>
`).join('')
const compareHint = document.createElement('p')
compareHint.id = 'sintese-compare-hint'
compareHint.className = 'sintese-visually-hidden'
compareHint.textContent = 'Setas para a esquerda e para a direita movem a comparação.'
document.body.append(compareHint)

document.querySelectorAll('[data-compare]').forEach((frame) => {
  const setPos = (value) => {
    const pos = Math.max(0, Math.min(100, value))
    frame.style.setProperty('--pos', `${pos}%`)
    frame.setAttribute('aria-valuenow', String(Math.round(pos)))
  }
  const posFromEvent = (event) => {
    const rect = frame.getBoundingClientRect()
    return ((event.clientX - rect.left) / rect.width) * 100
  }
  frame.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' && !event.target.closest('.sintese-compare__hit')) return
    frame.setPointerCapture(event.pointerId)
    setPos(posFromEvent(event))
  })
  frame.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' || frame.hasPointerCapture(event.pointerId)) setPos(posFromEvent(event))
  })
  frame.addEventListener('keydown', (event) => {
    const current = Number(frame.getAttribute('aria-valuenow')) || 50
    if (event.key === 'ArrowLeft') { event.preventDefault(); setPos(current - 5) }
    if (event.key === 'ArrowRight') { event.preventDefault(); setPos(current + 5) }
  })
})

panels.forEach((panel, index) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'sintese-dot'
  button.setAttribute('aria-label', `Ir para ${panel.dataset.title}`)
  button.setAttribute('aria-current', index === 0 ? 'step' : 'false')
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span>`
  button.addEventListener('click', () => goTo(index))
  dots.append(button)
})

const dotButtons = [...dots.querySelectorAll('button')]

function goTo(index) {
  const targetIndex = Math.max(0, Math.min(panels.length - 1, index))
  track.scrollTo({ top: panels[targetIndex].offsetTop, behavior: reduceMotion ? 'auto' : 'smooth' })
  setActive(targetIndex)
  closeMobileMenu()
}

function setActive(index) {
  activeIndex = Math.max(0, Math.min(panels.length - 1, index))
  app.dataset.headerTheme = panels[activeIndex].dataset.headerTheme
  dotButtons.forEach((button, dotIndex) => {
    button.setAttribute('aria-current', dotIndex === activeIndex ? 'step' : 'false')
  })
  progress.style.transform = `scaleX(${(activeIndex + 1) / panels.length})`
  document.querySelector('.sintese-arrow--prev').disabled = activeIndex === 0
  document.querySelector('.sintese-arrow--next').disabled = activeIndex === panels.length - 1
  document.querySelector('.sintese-hint').classList.toggle('is-hidden', activeIndex > 0)
}

function closeMobileMenu() {
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Abrir navegação')
  mobileMenu.hidden = true
}

function updateActiveFromScroll() {
  const middle = track.scrollTop + track.clientHeight / 2
  let index = 0
  panels.forEach((panel, panelIndex) => {
    if (panel.offsetTop <= middle) index = panelIndex
  })
  setActive(index)
}

track.addEventListener('scroll', () => requestAnimationFrame(updateActiveFromScroll), { passive: true })
document.querySelector('.sintese-arrow--prev').addEventListener('click', () => goTo(activeIndex - 1))
document.querySelector('.sintese-arrow--next').addEventListener('click', () => goTo(activeIndex + 1))

document.querySelectorAll('[data-panel-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    goTo(Number(link.dataset.panelLink))
  })
})

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return
  if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goTo(activeIndex + 1) }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goTo(activeIndex - 1) }
  if (event.key === 'Home') { event.preventDefault(); goTo(0) }
  if (event.key === 'End') { event.preventDefault(); goTo(panels.length - 1) }
})

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir navegação' : 'Fechar navegação')
  mobileMenu.hidden = isOpen
})
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault()
  goTo(Number(link.dataset.panelLink))
}))

window.addEventListener('resize', updateActiveFromScroll)
const initialIndex = panels.findIndex((panel) => panel.id === location.hash.slice(1))
if (initialIndex > 0) {
  track.scrollTo({ top: panels[initialIndex].offsetTop, behavior: 'auto' })
  setActive(initialIndex)
} else {
  setActive(0)
}
