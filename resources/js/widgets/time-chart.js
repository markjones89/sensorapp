import { getParam, getBaseUrl } from '../helpers'

let script = document.currentScript,
    src = script.src,
    div = script.parentNode,
    appUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.MIX_APP_URL,
    baseUrl = getBaseUrl()

let width = getParam(src, 'w') || 900, height = getParam(src, 'h') || 450,
    background = getParam(src, 'bc'),
    widgetUrl = `${appUrl}/${baseUrl}widgets/time-chart?w=${width}&h=${height}`

let iframe = document.createElement('iframe')

iframe.setAttribute('src', widgetUrl)
iframe.setAttribute('allowtransparency', true)
iframe.setAttribute('width', width)
iframe.setAttribute('height', height)
iframe.setAttribute('frameborder', '0')
iframe.setAttribute('scrolling', 'no')

if (background)  {
    iframe.style.backgroundColor = background
}

div.appendChild(iframe)