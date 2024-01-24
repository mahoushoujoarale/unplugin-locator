import { createPopper, flip, preventOverflow } from '@popperjs/core'

type HotKey = 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'
interface Options {
  port: number
  hotKeys: string
}

let port = 9527
let hotKeys: HotKey[] = ['altKey', 'shiftKey']
let locatorElement: HTMLElement | null = null
let popperElement: HTMLElement | null = null
const globalStyle = document.createElement('style')
globalStyle.innerHTML = '* { cursor: pointer !important; user-select: none !important; }'
let currentFile = ''
let isRendered = false
let colorIndex = 0
const colors = [
  'rgba(255, 0, 0, 0.2)',
  'rgba(255, 165, 0, 0.2)',
  'rgba(255, 255, 0, 0.2)',
  'rgba(0, 128, 0, 0.2)',
  'rgba(0, 0, 255, 0.2)',
  'rgba(75, 0, 130, 0.2)',
  'rgba(128, 0, 128, 0.2)',
]
const filenameToColorMap = new Map<string, string>()

function getColor(filename: string) {
  if (filenameToColorMap.has(filename))
    return filenameToColorMap.get(filename)!
  const color = colors[colorIndex++ % colors.length]
  filenameToColorMap.set(filename, color)
  return color
}

function createLocatorElement() {
  const component = document.createElement('unplugin-locator')

  const sheet = new CSSStyleSheet()
  sheet.replaceSync('.locator { position: absolute; border: 1px solid orange; background: rgba(100, 200, 240, 0.1); pointer-events: none; z-index: 99999; } .popper { position: absolute; color: #86909c; font-weight: 700; border-radius: 4px; pointer-events: none; background: white; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); padding: 10px; z-index: 99999; }')
  locatorElement = document.createElement('div')
  popperElement = document.createElement('div')
  locatorElement.classList.add('locator')
  popperElement.classList.add('popper')
  locatorElement.style.setProperty('display', 'none')
  popperElement.style.setProperty('display', 'none')

  const shadow = component.attachShadow({ mode: 'open' })
  shadow.adoptedStyleSheets = [sheet]
  shadow.appendChild(locatorElement)
  shadow.appendChild(popperElement)

  return component
}

function handleMouseOver(e: MouseEvent) {
  if (!(e.target instanceof HTMLElement) || !e.target.getAttribute('data-v-file') || !locatorElement || !popperElement)
    return
  currentFile = e.target.getAttribute('data-v-file') as string
  e.preventDefault()
  e.stopPropagation()

  const rect = e.target.getBoundingClientRect()
  locatorElement.style.left = `${rect.left}px`
  locatorElement.style.top = `${rect.top}px`
  locatorElement.style.width = `${e.target.offsetWidth}px`
  locatorElement.style.height = `${e.target.offsetHeight}px`
  locatorElement.style.background = getColor(currentFile.split(':')[0])
  popperElement.textContent = currentFile

  createPopper(locatorElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      preventOverflow,
      flip,
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })
}

function openLocator() {
  isRendered = true
  document.head.appendChild(globalStyle)
  locatorElement?.style.setProperty('display', null)
  popperElement?.style.setProperty('display', null)
  document.addEventListener('mouseover', handleMouseOver, { capture: true })
  document.addEventListener('click', handleClick, { capture: true })
  window.addEventListener('blur', closeLocator, { once: true })
}

function closeLocator() {
  isRendered = false
  currentFile = ''
  document.head.removeChild(globalStyle)
  locatorElement?.style.setProperty('display', 'none')
  popperElement?.style.setProperty('display', 'none')
  document.removeEventListener('mouseover', handleMouseOver, { capture: true })
  document.removeEventListener('click', handleClick, { capture: true })
}

function handleClick(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  fetch(`http://localhost:${port}/launch-editor?file=${currentFile}`)
  closeLocator()
}

function attachListener() {
  window.addEventListener('keydown', (e) => {
    if (hotKeys.every(key => e[key])) {
      e.preventDefault()
      e.stopPropagation()
      openLocator()
      document.addEventListener('mousemove', (e) => {
        e.target?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, cancelable: true }))
      }, { once: true })
    }
  }, { capture: true })
  window.addEventListener('keyup', (e) => {
    if ((hotKeys.some(key => !e[key])) && isRendered) {
      e.preventDefault()
      e.stopPropagation()
      closeLocator()
    }
  }, { capture: true })
}

export default function initClient(options: Options) {
  if (document.querySelector('unplugin-locator') !== null)
    return
  port = options.port
  hotKeys = options.hotKeys.split(',') as HotKey[]
  const component = createLocatorElement()
  document.body.appendChild(component)

  attachListener()
}
