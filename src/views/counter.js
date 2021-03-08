
import { a, div, text } from '../lib/vnodes/html'
import main from './_main'

const HistoryList = history => {
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

  return div({ class: 'history-list' }, target)
}

const ConsoleWidget = () => {
  const target = []

  target.push(
    div([text('---')])
  )

  for (let i = window._logs.length; i--;) {
    // const item = window._logs[i]
    // let line = ''
    //
    // for (let i = 0; i < item.length; i++) {
    //   const chunk = item[i]
    //
    //   if (chunk && typeof chunk === 'object' && Array.isArray(chunk) === false) {
    //     line += ' ' + JSON.stringify(chunk, null, 2)
    //   } else {
    //     line += ' ' + chunk
    //   }
    // }

    target.push(
      div([
        text(window._logs[i].join(' '))
        // text(line)
      ])
    )
  }

  return div({ class: 'console-widget' }, target)
}

const Counter = (actions, register) => {
  // <- register actions here ->

  const update = register('counter.update', ({ counter }, data) => {
    counter.data = data
    return { counter }
  })

  return (state, dispatch) => {
    const count = state.counter.data

    return div({ class: 'counter' }, [
      div({ class: 'counter-dash' }, [

        div({ class: 'history-panel' }, [
          div({ class: 'history-buttons' }, [
            a({
              class: state.saga.toggle ? '-active' : '',
              onclick: () => dispatch(actions.saga.toggle, !state.saga.toggle)
            }, [
              text('Enable')
            ]),
            a({ onclick: () => dispatch(actions.saga.reset) }, [text('Reset')]),
            a([text('Prev')]),
            a([text('Next')])
          ]),
          HistoryList(state.saga.history)
        ]),

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
  view: (actions, register) => main(Counter(actions, register)),
  onroute: () => () => {}
}
