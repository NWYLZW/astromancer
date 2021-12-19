import './index.scss'

const genElement = (html: string) => {
  const template = document.createElement('div')
  template.innerHTML = html
  return template.firstChild as HTMLElement
}

let curDraggedDiv: HTMLDivElement | null = null

document.querySelectorAll('div.col-12.d-block.width-full.py-4.border-bottom.color-border-muted')
  .forEach(div => {
    div.setAttribute('draggable', 'true')
    ;(<HTMLDivElement>div).addEventListener('dragover', _ => {
      curDraggedDiv = <HTMLDivElement> div
    })
  })

document.querySelectorAll('div.Box > a.d-block.Box-row.Box-row--hover-gray.mt-0.color-fg-default.no-underline')
  .forEach(ele => {
    const a = <HTMLAnchorElement>ele
    a.addEventListener('dragover', event => {
      event.preventDefault()
    })
    a.addEventListener('dragenter', event => {
      event.preventDefault()
    })
    a.addEventListener('drop', async _ => {
      if (!curDraggedDiv) return

      const { href } = curDraggedDiv.querySelector('div.d-inline-block.mb-1 > h3 > a') as HTMLAnchorElement
      const formDiv = genElement(await fetch(`https://github.com${
        href.replace(`${location.protocol}//${location.host}`, '')
      }/lists`).then(r => r.text())) as HTMLDivElement

      const form = formDiv.querySelector('form.js-user-list-menu-form') as HTMLFormElement
      const targetList = a.querySelector('h3.f4.text-bold') as HTMLHeadingElement
      form.querySelectorAll('div.form-checkbox').forEach(div => {
        const input = div.querySelector('input.js-user-list-menu-item') as HTMLInputElement
        const label = div.querySelector('span.Truncate-text') as HTMLSpanElement
        if (label.innerText === targetList.innerText) {
          input.checked = true
        }
        // console.log(label.innerText, input.checked)
      })
      // console.log(targetList.innerText, form)
      curDraggedDiv.appendChild(form)
      await fetch(form.action, {
        method:'post',
        headers: {
          accept: 'application/json'
        },
        body: new FormData(form)
      })
    })
  })

console.log('astromancer is starting.')
