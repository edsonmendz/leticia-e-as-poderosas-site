import './style.css'
import { brand, method, products, services } from '../../src/shared/content.js'

const track = document.querySelector('.sintese-track')
const panels = [...document.querySelectorAll('.sintese-panel')]
const dots = document.querySelector('.sintese-dots')
const progress = document.querySelector('.sintese-progress span')
const menuToggle = document.querySelector('.sintese-menu-toggle')
const mobileMenu = document.querySelector('.sintese-mobile-menu')
const app = document.querySelector('.sintese-app')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let activeIndex = 0

document.querySelector('#sintese-founder').textContent = `${brand.founder} é ${brand.specialty.charAt(0).toLowerCase()}${brand.specialty.slice(1)} Seu trabalho começa entendendo o que cada fio precisa — sem fórmula única, sem pressa.`
document.querySelector('#sintese-audience').textContent = brand.audience
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
setActive(0)
