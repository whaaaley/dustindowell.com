
import { link } from '@onclick/pocket'

import { html, text } from '@onclick/superstatic'
const { a } = html

export default (props, content) => {
  const classList = location.pathname === props.to
    ? props.class + ' -active'
    : props.class

  const onclick = event => {
    event.preventDefault()

    link({
      to: props.to,
      query: props.query
    })
  }

  return a({ class: classList, href: props.to, onclick }, [
    text(content)
  ])
}
