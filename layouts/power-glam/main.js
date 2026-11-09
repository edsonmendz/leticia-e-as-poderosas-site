import '../../src/shared/brand.css'
import '../../src/shared/base.css'
import './style.css'
import { products } from '../../src/shared/content.js'

const productHTML = products.map((product, index) => `
  <article class="glam-product" data-glam-reveal>
    <a class="glam-product__stage glam-product__stage--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="glam-product__spot" aria-hidden="true"></span><span class="glam-product__index">0${index + 1} / 03</span>
      ${product.shape === 'kit'
        ? '<span class="glam-vessel glam-vessel--one"><i></i></span><span class="glam-vessel glam-vessel--two"><i></i></span><span class="glam-vessel glam-vessel--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="glam-ampoule glam-ampoule--one"></span><span class="glam-ampoule glam-ampoule--two"></span><span class="glam-ampoule glam-ampoule--three"></span><span class="glam-ampoule glam-ampoule--four"></span>'
          : '<span class="glam-leavein"><i></i></span>'}
      <span class="glam-product__arrow">↗</span>
    </a>
    <div class="glam-product__copy"><p class="glam-kicker">${product.eyebrow}</p><h3>${product.name}</h3><p>${product.description}</p><div class="glam-product__details"><strong>${product.price}</strong><span>${product.size}</span></div><a class="glam-product__buy" href="${product.href}" target="_blank" rel="noreferrer">ADQUIRIR ONLINE <span>↗</span></a></div>
  </article>
`).join('')

document.querySelector('#glam-products').innerHTML = productHTML

const menuToggle = document.querySelector('.glam-menu-toggle')
const mobileMenu = document.querySelector('.glam-mobile-menu')
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

const revealNodes = document.querySelectorAll('[data-glam-reveal]')
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
  }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' })
  revealNodes.forEach((node) => observer.observe(node))
}
