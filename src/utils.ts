export const genElement = <T = HTMLElement>(html: string): T => {
  const template = document.createElement('div')
  template.innerHTML = html
  if (!template.firstChild)
    throw new Error('Unable to create element from template')
  return template.firstChild as any as T
}
