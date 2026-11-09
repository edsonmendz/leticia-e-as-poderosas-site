import '../../src/shared/brand.css'
import './style.css'

const feed = document.querySelector('.story-feed')
const pages = [...document.querySelectorAll('.story-page')]
const progress = document.querySelector('.story-progress')
const dots = document.querySelector('.story-dots')
const nextButton = document.querySelector('.story-next')
let activeIndex = 0

pages.forEach((page, index) => {
  const segment = document.createElement('span')
  segment.className = 'story-progress__segment'
  segment.setAttribute('aria-hidden', 'true')
  progress.append(segment)

  const dot = document.createElement('button')
  dot.type = 'button'
  dot.setAttribute('aria-label', `Ir para story ${index + 1}: ${page.getAttribute('aria-label')}`)
  dot.setAttribute('aria-current', index === 0 ? 'step' : 'false')
  dot.addEventListener('click', () => goTo(index))
  dots.append(dot)
})

const segments = [...progress.children]
const dotButtons = [...dots.children]

function goTo(index) {
  const nextIndex = Math.max(0, Math.min(pages.length - 1, index))
  pages[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' })
  setActive(nextIndex)
}

function setActive(index) {
  activeIndex = index
  segments.forEach((segment, segmentIndex) => {
    segment.dataset.state = segmentIndex < index ? 'seen' : segmentIndex === index ? 'active' : 'upcoming'
  })
  dotButtons.forEach((dot, dotIndex) => dot.setAttribute('aria-current', dotIndex === index ? 'step' : 'false'))
  nextButton.disabled = index === pages.length - 1
  nextButton.setAttribute('aria-label', index === pages.length - 1 ? 'Último story' : 'Próximo story')
  nextButton.innerHTML = index === pages.length - 1 ? '✓' : '↓'
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setActive(pages.indexOf(entry.target))
  })
}, { root: feed, threshold: 0.35 })
pages.forEach((page) => observer.observe(page))

feed.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goTo(activeIndex + 1) }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goTo(activeIndex - 1) }
  if (event.key === 'Home') { event.preventDefault(); goTo(0) }
  if (event.key === 'End') { event.preventDefault(); goTo(pages.length - 1) }
})
nextButton.addEventListener('click', () => goTo(activeIndex + 1))
