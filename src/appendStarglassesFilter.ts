import { genElement } from './utils'

const selectors = ['💢 All'] as string[]

document.querySelectorAll('.f4.text-bold.no-wrap.mr-3')
  .forEach(d => selectors.push(d.innerHTML))

if (selectors.length > 0) {
  const filters = document.querySelector<HTMLDivElement>('div.d-flex.flex-justify-end.flex-wrap.flex-lg-nowrap.width-full')
  const details = genElement<HTMLDetailsElement>(`<details
    data-view-component="true"
    class="details-overlay details-reset position-relative ml-2 mb-1 mb-lg-0">
    <summary role="button" class="btn">
      Starglasses
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-triangle-down ml-2 mr-n1">
        <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path>
      </svg>
    </summary>
    <div class="SelectMenu right-0">
      <div class="SelectMenu-modal">
        ${selectors.map(selector => `<div class="form-checkbox mt-0 mb-0 p-2">
          <label class="d-flex">
            <input type="checkbox" class="mx-0 js-user-list-menu-item" style="cursor: pointer;">
            <span class="Truncate ml-2 text-normal f5">
              <span class="Truncate-text">
                ${ selector }
              </span>
            </span>
          </label>
        </div>`).join('')}
      </div>
    </div>
  </details>`)

  details.querySelectorAll<HTMLInputElement>('input.mx-0.js-user-list-menu-item').forEach(input => {
    input.addEventListener('change', () => {
      // const checked = input.checked
      // const selector = input.parentElement?.querySelector<HTMLSpanElement>('span.Truncate-text')?.innerHTML
    })
  })

  filters?.append(details)
}
