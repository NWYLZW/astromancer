import './index.scss'

interface RepoCardComp {
  form?: HTMLFormElement
}

const genElement = <T = HTMLElement>(html: string): T => {
  const template = document.createElement('div')
  template.innerHTML = html
  if (!template.firstChild)
    throw new Error('Unable to create element from template')
  return template.firstChild as any as T
}

const getRepoListForm = async (div: HTMLDivElement) => {
  const { href } = div.querySelector('div.d-inline-block.mb-1 > h3 > a') as HTMLAnchorElement
  return genElement<HTMLDivElement>(
    await fetch(`https://github.com${
      href.replace(`${location.protocol}//${location.host}`, '')
    }/lists`).then(r => r.text())).querySelector<HTMLFormElement>('form.js-user-list-menu-form')
}

let curDraggedDiv = -1

const repoCardRefs = [] as RepoCardComp[]

document.querySelectorAll<HTMLDivElement>('div.col-12.d-block.width-full.py-4.border-bottom.color-border-muted')
  .forEach(async (div, index) => {
    const ref = {} as RepoCardComp
    div.setAttribute('draggable', 'true')
    div.addEventListener('dragstart', _ => curDraggedDiv = index)
    const form = await getRepoListForm(div)
    if (form) {
      ref.form = form
      div.appendChild(form)
    }
    repoCardRefs[index] = ref
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
      if (curDraggedDiv === -1)
        return

      const { form } = repoCardRefs[curDraggedDiv] || {}
      if (!form)
        return

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
