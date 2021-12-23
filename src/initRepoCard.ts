import { getRepoListForm } from './utils'

export interface RepoCardComp {
  card: HTMLDivElement
  form?: HTMLFormElement
}

export let curDraggedIndex = -1
export const repoCardRefs = <RepoCardComp[]>[]

const formObserver = new MutationObserver(async () => {
  const { form } = repoCardRefs[curDraggedIndex]
  if (form)
    await fetch(form.action, {
      method:'post',
      headers: { accept: 'application/json' },
      body: new FormData(form)
    })
})

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
        form.querySelectorAll<HTMLInputElement>('input[type=checkbox].js-user-list-menu-item')
          .forEach(input => {
            input.addEventListener('change', _ => {
              curDraggedIndex = index
              input.toggleAttribute('checked', input.checked)
            })
            formObserver.observe(input, {
              attributes: true,
              attributeFilter: ['checked']
            })
          })
        div.appendChild(form)
      }
      repoCardRefs[index] = ref
    })

  document.querySelectorAll<HTMLAnchorElement>('div.Box > a.d-block.Box-row.Box-row--hover-gray.mt-0.color-fg-default.no-underline')
    .forEach(a => {
      a.addEventListener('dragover', event => event.preventDefault())
      a.addEventListener('dragenter', event => event.preventDefault())
      a.addEventListener('drop', async () => {
        if (curDraggedIndex === -1)
          return

        const { form } = repoCardRefs[curDraggedIndex] || {}
        if (!form)
          return

        const targetList = a.querySelector<HTMLHeadingElement>('h3.f4.text-bold')
        form.querySelectorAll('div.form-checkbox').forEach(div => {
          const input = div.querySelector<HTMLInputElement>('input.js-user-list-menu-item')
          const label = div.querySelector<HTMLSpanElement>('span.Truncate-text')
          if (label && input && (label.innerText === targetList?.innerText ?? '')) {
            input.toggleAttribute('checked', true)
          }
        })
      })
    })
}
