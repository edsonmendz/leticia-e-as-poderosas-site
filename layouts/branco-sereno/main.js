import './style.css'
import { brand, method, products, services } from '../../src/shared/content.js'

document.querySelector('#house-copy').textContent = `${brand.founder} é ${brand.specialty.toLowerCase()} ${brand.audience}`
document.querySelector('#method-directions').textContent = method.directions
document.querySelector('#method-steps').innerHTML = method.steps.map((step, index) => `
  <li><span>0${index + 1}</span><strong>${step}</strong></li>
`).join('')
document.querySelector('#serene-services').innerHTML = services.map((service) => `<li>${service}</li>`).join('')

document.querySelector('#serene-products').innerHTML = products.map((product, index) => `
  <article class="serene-product" data-reveal>
    <a class="serene-product__art serene-product__art--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="serene-product__number">0${index + 1}</span>
      ${product.shape === 'kit'
        ? '<span class="serene-bottle serene-bottle--one"><i></i></span><span class="serene-bottle serene-bottle--two"><i></i></span><span class="serene-bottle serene-bottle--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="serene-ampoule serene-ampoule--one"></span><span class="serene-ampoule serene-ampoule--two"></span><span class="serene-ampoule serene-ampoule--three"></span><span class="serene-ampoule serene-ampoule--four"></span>'
          : '<span class="serene-leavein"><i></i></span>'}
      <span class="serene-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="serene-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="serene-product__description">${product.description}</p>
    <p class="serene-product__size">${product.size}</p>
    <div class="serene-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
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
