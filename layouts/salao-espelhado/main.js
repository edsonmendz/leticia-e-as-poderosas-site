import '../../src/shared/brand.css'
import '../../src/shared/base.css'
import './style.css'
import { products } from '../../src/shared/content.js'

const track = document.querySelector('.salon-track')
const panels = [...document.querySelectorAll('.chair')]
const dots = document.querySelector('.chair-dots')
const progress = document.querySelector('.mobile-progress span')
const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
let activeIndex = 0
let pointerStart = null

document.querySelector('#product-list').innerHTML = products.map((product, index) => `
  <article class="product-card product-card--${product.shape}">
    <div class="product-visual product-visual--${product.shape}" aria-hidden="true">
      <span class="product-visual__shine"></span>
      ${product.shape === 'kit'
        ? '<span class="bottle bottle--shampoo"><i></i></span><span class="bottle bottle--conditioner"><i></i></span><span class="bottle bottle--mask"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="ampoule ampoule--one"></span><span class="ampoule ampoule--two"></span><span class="ampoule ampoule--three"></span><span class="ampoule ampoule--four"></span>'
          : '<span class="leave-bottle"><i></i></span>'}
      <span class="product-visual__number">0${index + 1}</span>
    </div>
    <div class="product-card__copy">
      <p class="eyebrow">${product.eyebrow}</p>
      <h3>${product.name}</h3>
      <p class="product-card__description">${product.description}</p>
      <div class="product-card__buy"><div><strong>${product.price}</strong><span>${product.size}</span></div><a href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">↗</a></div>
    </div>
  </article>
`).join('')

panels.forEach((panel, index) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'chair-dot'
  button.setAttribute('aria-label', `Ir para ${panel.dataset.title}`)
  button.setAttribute('aria-current', index === 0 ? 'step' : 'false')
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span>`
  button.addEventListener('click', () => goTo(index))
  dots.append(button)
})

const dotButtons = [...dots.querySelectorAll('button')]

function goTo(index, behavior = 'smooth') {
  const targetIndex = Math.max(0, Math.min(panels.length - 1, index))
  panels[targetIndex].scrollIntoView({ behavior, block: 'nearest', inline: 'start' })
  setActive(targetIndex)
  closeMobileMenu()
}

function setActive(index) {
  activeIndex = Math.max(0, Math.min(panels.length - 1, index))
  dotButtons.forEach((button, dotIndex) => {
    button.setAttribute('aria-current', dotIndex === activeIndex ? 'step' : 'false')
  })
  document.querySelector('.chair-index')?.setAttribute('data-active', String(activeIndex + 1))
  progress.style.transform = `scaleX(${(activeIndex + 1) / panels.length})`
  document.querySelector('.arrow-button--prev').disabled = activeIndex === 0
  document.querySelector('.arrow-button--next').disabled = activeIndex === panels.length - 1
  document.querySelector('.scroll-hint').classList.toggle('is-hidden', activeIndex > 0)
}

function closeMobileMenu() {
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Abrir navegação')
  mobileMenu.hidden = true
}

function updateActiveFromScroll() {
  const mobile = window.matchMedia('(max-width: 760px)').matches
  const position = mobile ? track.scrollTop : track.scrollLeft
  const size = mobile ? track.clientHeight : track.clientWidth
  setActive(Math.round(position / size))
}

track.addEventListener('scroll', () => requestAnimationFrame(updateActiveFromScroll), { passive: true })
document.querySelector('.arrow-button--prev').addEventListener('click', () => goTo(activeIndex - 1))
document.querySelector('.arrow-button--next').addEventListener('click', () => goTo(activeIndex + 1))

document.querySelectorAll('[data-panel-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    goTo(Number(link.dataset.panelLink))
  })
})

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return
  if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); goTo(activeIndex + 1) }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); goTo(activeIndex - 1) }
  if (event.key === 'Home') { event.preventDefault(); goTo(0) }
  if (event.key === 'End') { event.preventDefault(); goTo(panels.length - 1) }
})

track.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse') pointerStart = { x: event.clientX, y: event.clientY, time: Date.now() }
})
track.addEventListener('pointerup', (event) => {
  if (!pointerStart) return
  const dx = event.clientX - pointerStart.x
  const dy = event.clientY - pointerStart.y
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.25 && Date.now() - pointerStart.time < 1000) goTo(activeIndex + (dx < 0 ? 1 : -1))
  pointerStart = null
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
