import './style.css'
import { brand, method, products } from '../../src/shared/content.js'

document.querySelector('#house-copy').textContent = `${brand.founder} é ${brand.specialty} Seu trabalho começa entendendo as necessidades de cada cabelo: lisos, ondulados, cacheados ou crespos, naturais ou com química.`
document.querySelector('#method-directions').textContent = method.directions
document.querySelector('#wine-steps').innerHTML = method.steps.map((step, index) => `
  <li><span>0${index + 1}</span><strong>${step}</strong><i aria-hidden="true">✳</i></li>
`).join('')

document.querySelector('#wine-products').innerHTML = products.map((product, index) => `
  <article class="wine-product" data-reveal>
    <a class="wine-product__art wine-product__art--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="wine-product__index">0${index + 1}</span>
      ${product.shape === 'kit'
        ? '<span class="wine-bottle wine-bottle--one"><i></i></span><span class="wine-bottle wine-bottle--two"><i></i></span><span class="wine-bottle wine-bottle--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="wine-ampoule wine-ampoule--one"></span><span class="wine-ampoule wine-ampoule--two"></span><span class="wine-ampoule wine-ampoule--three"></span><span class="wine-ampoule wine-ampoule--four"></span>'
          : '<span class="wine-leavein"><i></i></span>'}
      <span class="wine-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="wine-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="wine-product__description">${product.description}</p>
    <p class="wine-product__size">${product.size}</p>
    <div class="wine-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
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
