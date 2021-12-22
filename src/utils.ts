export const genElement = <T = HTMLElement>(html: string): T => {
  const template = document.createElement('div')
  template.innerHTML = html
  if (!template.firstChild)
    throw new Error('Unable to create element from template')
  return template.firstChild as any as T
}

export const getRepoListForm = async (div: HTMLDivElement) => {
  const { href } = div.querySelector('div.d-inline-block.mb-1 > h3 > a') as HTMLAnchorElement
  return genElement<HTMLDivElement>(
    await fetch(`https://github.com${
      href.replace(`${location.protocol}//${location.host}`, '')
    }/lists`).then(r => r.text())).querySelector<HTMLFormElement>('form.js-user-list-menu-form')
}
