import { getRepoListForm } from './utils'

export interface RepoCardComp {
  card: HTMLDivElement
  form?: HTMLFormElement
}

export let curDraggedIndex = -1
export const repoCardRefs = <RepoCardComp[]>[]

export function initRepoCards() {
  document.querySelectorAll<HTMLDivElement>('div.col-12.d-block.width-full.py-4.border-bottom.color-border-muted')
    .forEach(async (div, index) => {
      const ref = {
        card: div
      } as RepoCardComp
      div.setAttribute('draggable', 'true')
      div.addEventListener('dragstart', _ => curDraggedIndex = index)
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
        if (curDraggedIndex === -1)
          return

        const { form } = repoCardRefs[curDraggedIndex] || {}
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
        await fetch(form.action, {
          method:'post',
          headers: {
            accept: 'application/json'
          },
          body: new FormData(form)
        })
      })
    })
}
