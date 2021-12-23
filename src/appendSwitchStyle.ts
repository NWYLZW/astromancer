import './styleSwitch.scss'

import { genElement } from './utils'

const styleSwitch = genElement(`<div class="switch" style="position: absolute; top: 3px; right: 0;">
  <svg aria-hidden="true" viewBox="0 0 1024 1024" version="1.1" width="20" height="20">
    <path d="M833.066667 515.626667v289.493333h-234.666667V515.626667h234.666667m30.08-64H569.173333a34.133333 34.133333 0 0 0-34.133333 34.133333v349.226667a34.133333 34.133333 0 0 0 34.133333 34.133333h293.973334a34.133333 34.133333 0 0 0 33.92-34.133333V485.76a34.133333 34.133333 0 0 0-33.92-34.133333zM833.066667 218.88v123.52h-234.666667v-123.52h234.666667m30.08-64H569.173333a34.133333 34.133333 0 0 0-34.133333 34.133333v183.253334a34.133333 34.133333 0 0 0 34.133333 34.133333h293.973334a33.92 33.92 0 0 0 33.92-34.133333V189.013333a34.133333 34.133333 0 0 0-33.92-34.133333zM424.96 218.88v289.493333H192V218.88h234.666667m29.866666-64H160.853333A34.133333 34.133333 0 0 0 128 189.013333v349.226667a34.133333 34.133333 0 0 0 33.92 34.133333h292.906667a34.133333 34.133333 0 0 0 34.133333-34.133333V189.013333a34.133333 34.133333 0 0 0-34.133333-34.133333zM424.96 682.666667v123.52H192V682.666667h234.666667m29.866666-64H160.853333A33.92 33.92 0 0 0 128 651.733333v183.253334a34.133333 34.133333 0 0 0 33.92 34.133333h292.906667a34.133333 34.133333 0 0 0 34.133333-34.133333v-183.253334a34.133333 34.133333 0 0 0-34.133333-34.133333z" p-id="2851" fill="#57606a"></path>
  </svg>
  <input type="checkbox">
  <span class="slider round"></span>
</div>`)
const styleSwitchInput = styleSwitch.querySelector('input')

if (styleSwitchInput) {
  new MutationObserver(() => {
    document.querySelectorAll('#js-pjax-container div.Layout').forEach(el => {
      if (styleSwitchInput.checked)
        el.classList.add('multiseriate')
      else
        el.classList.remove('multiseriate')
    })
  }).observe(styleSwitchInput, {
    attributes: true,
    attributeFilter: ['checked']
  })
  styleSwitchInput.setAttribute('checked', '')
}

styleSwitch.addEventListener('click', () => {
  if (styleSwitchInput) {
    styleSwitchInput.checked = !styleSwitchInput.checked
    styleSwitchInput.toggleAttribute('checked', styleSwitchInput.checked)
  }
})

document.querySelector('h2.f3-light.mb-n1')?.appendChild(styleSwitch)
