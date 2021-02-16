
import { a, div, text } from '../lib/vnodes/html'
import main from './_main'

const HistoryPanel = history => {
  const target = []

  for (let i = history.length - 1; i >= 0; i--) {
    const [name, data] = history[i]
    const json = JSON.stringify(data, null, 2)

    target.push(div({ key: i, class: 'history-item' }, [
      div([
        text('name: ' + name + '\n')
      ]),
      div([
        text('data: ' + json)
      ])
    ]))
  }

  return div({ class: 'history-panel' }, target)
}

const ConsoleWidget = () => {
  const target = []

  for (let i = window._logs.length - 1; i >= 0; i--) {
    target.push(
      div([
        text(window._logs[i].join(' '))
      ])
    )
  }

  return div({ class: 'console-widget' }, target)
}

const Counter = register => {
  // <- register actions here ->

  const update = register('counter.update', ({ counter }, data) => {
    counter.data = data
    return { counter }
  })

  return (state, dispatch) => {
    const count = state.counter.data

    return div({ class: 'counter' }, [
      div({ class: 'counter-dash' }, [
        HistoryPanel(state.history),
        div({ class: 'counter-widget' }, [
          a({
            class: '-remove',
            onclick: () => dispatch(update, count - 1)
          }),
          div([
            text(count)
          ]),
          a({
            class: '-add',
            onclick: () => dispatch(update, count + 1)
          })
        ]),
        ConsoleWidget()
      ])

    ])
  }
}

export default {
  view: register => main(Counter(register)),
  init: () => {}
}
