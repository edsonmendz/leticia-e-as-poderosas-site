import './style.css'
import { brand, loyalty, method, products, services } from '../../src/shared/content.js'

document.querySelector('#house-copy').textContent = `${brand.founder} é ${brand.specialty} Cada cabelo tem características e necessidades próprias.`
document.querySelector('#method-directions').textContent = method.directions
document.querySelector('#journey-steps').innerHTML = method.steps.map((step, index) => `
  <li data-reveal><span>0${index + 1}</span><strong>${step}</strong><i aria-hidden="true">↗</i></li>
`).join('')
document.querySelector('#journey-services').innerHTML = services.map((service) => `<li>${service}</li>`).join('')

document.querySelector('#journey-products').innerHTML = products.map((product, index) => `
  <article class="journey-product" data-reveal>
    <a class="journey-product__art journey-product__art--${product.shape}" href="${product.href}" target="_blank" rel="noreferrer" aria-label="Comprar ${product.name}">
      <span class="journey-product__number">0${index + 1}</span>
      ${product.shape === 'kit'
        ? '<span class="journey-bottle journey-bottle--one"><i></i></span><span class="journey-bottle journey-bottle--two"><i></i></span><span class="journey-bottle journey-bottle--three"><i></i></span>'
        : product.shape === 'potion'
          ? '<span class="journey-ampoule journey-ampoule--one"></span><span class="journey-ampoule journey-ampoule--two"></span><span class="journey-ampoule journey-ampoule--three"></span><span class="journey-ampoule journey-ampoule--four"></span>'
          : '<span class="journey-leavein"><i></i></span>'}
      <span class="journey-product__arrow" aria-hidden="true">↗</span>
    </a>
    <p class="journey-product__eyebrow">${product.eyebrow}</p>
    <h3>${product.name}</h3>
    <p class="journey-product__description">${product.description}</p>
    <p class="journey-product__size">${product.size}</p>
    <div class="journey-product__purchase"><strong>${product.price}</strong><a href="${product.href}" target="_blank" rel="noreferrer">COMPRAR <span aria-hidden="true">↗</span></a></div>
  </article>
`).join('')

document.querySelector('#journey-plans').innerHTML = loyalty.map((plan, index) => `
  <article class="journey-plan" data-reveal>
    <p class="journey-plan__number">PLANO 0${index + 1}</p>
    <h3>${plan.name}</h3>
    <p class="journey-plan__cadence">${plan.cadence}</p>
    <p class="journey-plan__recurring"><span aria-hidden="true">↻</span> Assinatura com cobrança recorrente a cada 3 meses.</p>
    <a class="journey-button journey-button--dark" href="${plan.href}" target="_blank" rel="noreferrer">CONSULTAR O PLANO <span aria-hidden="true">↗</span></a>
  </article>
`).join('')

const socials = [
  ['Instagram', brand.instagram],
  ['Facebook', brand.facebook],
  ['TikTok', brand.tiktok],
  ['YouTube', brand.youtube],
]

document.querySelector('#journey-social').innerHTML = socials.map(([name, href]) => `
  <a href="${href}" target="_blank" rel="noreferrer">${name} <span aria-hidden="true">↗</span></a>
`).join('')

const sections = document.querySelectorAll('[data-section]')
const sectionLinks = document.querySelectorAll('[data-section-link]')
const progressFill = document.querySelector('#journey-progress-fill')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          link.classList.toggle('is-active', link.dataset.sectionLink === entry.target.id)
        })
      }
    })
  }, { threshold: 0.2 })
  sections.forEach((section) => sectionObserver.observe(section))
}

const updateProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0
  const mobile = window.matchMedia('(max-width: 760px)').matches
  progressFill.style.width = mobile ? `${progress * 100}%` : '1px'
  progressFill.style.height = mobile ? '2px' : `${progress * 100}%`
}

updateProgress()
window.addEventListener('scroll', updateProgress, { passive: true })
window.addEventListener('resize', updateProgress)

const revealItems = document.querySelectorAll('[data-reveal]')
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
