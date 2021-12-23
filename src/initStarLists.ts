import { provide } from './initRepoCard'

export interface StarListComp {
  self: HTMLDivElement
  title: string
  count: number
}

export const starListRefs = <StarListComp[]>[]

document.querySelectorAll<HTMLDivElement>('div.d-flex.flex-row.flex-items-baseline.flex-justify-between').forEach(div => {
  const countEle = div.querySelector<HTMLDivElement>('div.color-fg-muted.text-small.no-wrap')
  let count = +((countEle?.innerText ?? '0 repositories').trim().match(/^(\d+) repositories$/)?.[1] ?? '0')
  const ref = {
    self: div,
    title: div.querySelector<HTMLDivElement>('.f4.text-bold.no-wrap.mr-3')?.innerHTML ?? '',
    get count() {
      return count
    },
    set count(v) {
      if (countEle)
        countEle.innerHTML = `${v} repositories`
      count = v
    }
  } as StarListComp
  starListRefs.push(ref)
})

provide.register('star-list:change', (title, action) => {
  starListRefs.filter(({ title: t }) => t === title).forEach(ref => {
    if (action === 'push')
      ref.count++
    else if (action === 'remove')
      ref.count--
  })
})
