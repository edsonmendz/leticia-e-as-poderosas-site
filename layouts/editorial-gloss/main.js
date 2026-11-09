import '../../src/shared/brand.css'
import '../../src/shared/base.css'
import './style.css'
import { products } from '../../src/shared/content.js'

const productCards = products.map((product, index) => `
  <article class="editorial-product" data-reveal>
    <a class="editorial-product__image editorial-product__image--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Ver ${product.name}">
      <span class="editorial-product__number">0${index + 1}</span>
      <span class="editorial-product__shine" aria-hidden="true"></span>
      ${product.shape === 'kit'
        ? '<span class="editorial-bottle editorial-bottle--shampoo"><i></i></span><span class="editorial-bottle editorial-bottle--conditioner"><i></i></span><span class="editorial-bottle editorial-bottle--mask"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="editorial-ampoule editorial-ampoule--one"></span><span class="editorial-ampoule editorial-ampoule--two"></span><span class="editorial-ampoule editorial-ampoule--three"></span><span class="editorial-ampoule editorial-ampoule--four"></span>'
          : '<span class="editorial-leavein"><i></i></span>'}
      <span class="editorial-product__arrow">↗</span>
    </a>
    <div class="editorial-product__meta"><span>${product.eyebrow}</span><span>${product.size}</span></div>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <div class="editorial-product__bottom"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">ENCONTRE O SEU <span>↗</span></a></div>
  </article>
`).join('')

document.querySelector('#editorial-products').innerHTML = productCards

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
