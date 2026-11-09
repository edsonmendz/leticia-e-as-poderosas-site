import './style.css'
import { brand, method, products, services } from '../../src/shared/content.js'

document.querySelector('#house-copy').textContent = `${brand.founder} é ${brand.specialty} O trabalho parte das necessidades de cada cabelo: lisos, ondulados, cacheados ou crespos, naturais ou com química.`
document.querySelector('#method-directions').textContent = method.directions
document.querySelector('#blocks-services').innerHTML = services.map((service, index) => `
  <li><span>0${index + 1}</span><strong>${service}</strong><i aria-hidden="true">↗</i></li>
`).join('')
document.querySelector('#blocks-steps').innerHTML = method.steps.map((step, index) => `
  <li><span>0${index + 1}</span><strong>${step}</strong></li>
`).join('')

document.querySelector('#blocks-products').innerHTML = products.map((product, index) => `
  <article class="blocks-product" data-reveal>
    <a class="blocks-product__art blocks-product__art--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="blocks-product__index">0${index + 1}</span>
      ${product.shape === 'kit'
        ? '<span class="blocks-bottle blocks-bottle--one"><i></i></span><span class="blocks-bottle blocks-bottle--two"><i></i></span><span class="blocks-bottle blocks-bottle--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="blocks-ampoule blocks-ampoule--one"></span><span class="blocks-ampoule blocks-ampoule--two"></span><span class="blocks-ampoule blocks-ampoule--three"></span><span class="blocks-ampoule blocks-ampoule--four"></span>'
          : '<span class="blocks-leavein"><i></i></span>'}
      <span class="blocks-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="blocks-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="blocks-product__description">${product.description}</p>
    <p class="blocks-product__size">${product.size}</p>
    <div class="blocks-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
  </article>
`).join('')

const socialChannels = [
  ['Instagram', brand.instagram],
  ['Facebook', brand.facebook],
  ['TikTok', brand.tiktok],
  ['YouTube', brand.youtube],
]

document.querySelector('#blocks-social').innerHTML = socialChannels.map(([name, href]) => `
  <a class="blocks-button blocks-button--indigo" href="${href}" target="_blank" rel="noreferrer">${name.toUpperCase()} <span aria-hidden="true">↗</span></a>
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
