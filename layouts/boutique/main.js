import '../../src/shared/brand.css'
import '../../src/shared/base.css'
import './style.css'
import { products } from '../../src/shared/content.js'

const shapeArt = (shape) => {
  if (shape === 'kit') return '<span class="boutique-vessel boutique-vessel--one"><i></i></span><span class="boutique-vessel boutique-vessel--two"><i></i></span><span class="boutique-vessel boutique-vessel--three"><i></i></span>'
  if (shape === 'potion') return '<span class="boutique-ampoule boutique-ampoule--one"></span><span class="boutique-ampoule boutique-ampoule--two"></span><span class="boutique-ampoule boutique-ampoule--three"></span><span class="boutique-ampoule boutique-ampoule--four"></span>'
  return '<span class="boutique-leavein"><i></i></span>'
}

document.querySelector('#boutique-products').innerHTML = products.map((product, index) => `
  <article class="boutique-product" data-boutique-reveal>
    <div class="boutique-product__visual boutique-product__visual--${product.shape}"><span class="boutique-product__index">0${index + 1}</span><span class="boutique-product__halo"></span>${shapeArt(product.shape)}</div>
    <div class="boutique-product__body"><p class="boutique-eyebrow">${product.eyebrow}</p><h3>${product.name}</h3><p>${product.description}</p><span class="boutique-product__size">${product.size}</span><div class="boutique-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">Conhecer <span>↗</span></a></div></div>
  </article>
`).join('')

const menuToggle = document.querySelector('.boutique-menu-toggle')
const mobileMenu = document.querySelector('.boutique-mobile-menu')
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.setAttribute('aria-label', 'Abrir menu')
  mobileMenu.hidden = true
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!open))
  menuToggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu')
  mobileMenu.hidden = open
})
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))

const revealNodes = document.querySelectorAll('[data-boutique-reveal]')
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'))
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        currentObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
  revealNodes.forEach((node) => observer.observe(node))
}
