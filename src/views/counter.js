
import { a, div, h1, text } from '../lib/vnodes/html'
import main from './_main'

const h = (tag, data) => tag([text(data)])

const HistoryList = history => {
  const target = []

  for (let i = history.length - 1; i >= 0; i--) {
    const [name, data] = history[i]
    const json = JSON.stringify(data, null, 2)

    const item = div({ key: i, class: 'item' }, [
      h(div, 'name: ' + name + '\n'),
      h(div, 'data: ' + json)
    ])

    target.push(item)
  }

  return div({ class: 'list' }, target)
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

const HistoryButtons = data => {
  return div({ class: 'buttons' }, [
    // a({
    //   class: data.enable ? '-active' : '',
    //   onclick: data.onToggle
    // }, [
    //   text('Enable')
    // ]),
    // a({ onclick: data.onPrevious }, [text('Prev')]),
    // a({ onclick: data.onNext }, [text('Next')])
    a({ onclick: data.onReplay }, [text('Replay')]),
    a({ onclick: data.onReset }, [text('Reset')])
  ])
}

const Counter = data => {
  return div({ class: 'counter-widget' }, [
    h(h1, data.title),
    a({ class: '-remove', onclick: data.onMinus }),
    h(div, data.count),
    a({ class: '-add', onclick: data.onPlus })
  ])
}

const Workbench = (actions, register) => {
  // <- register actions here ->

  const update = register('counter.update', ({ counter }, data) => {
    counter.data = data
    return { counter }
  })

  return (state, dispatch) => {
    const count = state.counter.data

    return div({ class: 'workbench' }, [
      div({ class: 'area' }, [
        div({ class: 'side' }, [
          div({ class: 'history-widget' }, [
            HistoryButtons({
              enable: state.saga.toggle,
              onReplay: () => dispatch(actions.saga.replay),
              onReset: () => dispatch(actions.saga.reset)
              // onToggle: () => dispatch(actions.saga.toggle),
              // onPrevious: () => dispatch(actions.saga.previous),
              // onNext: () => dispatch(actions.saga.next)
            }),
            HistoryList(state.saga.history)
          ])
        ]),
        div({ class: 'top' }, [
          Counter({
            title: 'Generic Counter',
            count: count,
            onPlus: () => dispatch(update, count + 1),
            onMinus: () => dispatch(update, count - 1)
          }),
          Counter({
            title: 'Async Counter',
            count: count,
            onPlus: () => dispatch(update, count + 1),
            onMinus: () => dispatch(update, count - 1)
          })
        ]),
        div({ class: 'bottom' }, [
          ConsoleWidget()
        ])
      ])
    ])
  }
}

export default {
  view: (actions, register) => main(Workbench(actions, register)),
  onroute: () => () => {}
}
