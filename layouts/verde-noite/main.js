import './style.css'
import { brand, method, products } from '../../src/shared/content.js'

document.querySelector('#house-copy').textContent = `${brand.founder} é ${brand.specialty} Seu trabalho começa entendendo as necessidades de cada cabelo.`
document.querySelector('#method-directions').textContent = method.directions
document.querySelector('#emerald-steps').innerHTML = method.steps.map((step, index) => `
  <li><span>0${index + 1}</span><strong>${step}</strong><i aria-hidden="true">✳</i></li>
`).join('')

document.querySelector('#emerald-products').innerHTML = products.map((product, index) => `
  <article class="emerald-product" data-reveal>
    <a class="emerald-product__art emerald-product__art--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="emerald-product__number">0${index + 1}</span>
      ${product.shape === 'kit'
        ? '<span class="emerald-bottle emerald-bottle--one"><i></i></span><span class="emerald-bottle emerald-bottle--two"><i></i></span><span class="emerald-bottle emerald-bottle--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="emerald-ampoule emerald-ampoule--one"></span><span class="emerald-ampoule emerald-ampoule--two"></span><span class="emerald-ampoule emerald-ampoule--three"></span><span class="emerald-ampoule emerald-ampoule--four"></span>'
          : '<span class="emerald-leavein"><i></i></span>'}
      <span class="emerald-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="emerald-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="emerald-product__description">${product.description}</p>
    <p class="emerald-product__size">${product.size}</p>
    <div class="emerald-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
  </article>
`).join('')

const revealItems = document.querySelectorAll('[data-reveal]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'))
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

  revealItems.forEach((item) => revealObserver.observe(item))
}
