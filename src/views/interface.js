
import { a, div, h1, text } from '../lib/vnodes/html'
import * as Chart from './chart'

const Text = (h, data) => h([text(data)])

const tabs = {
  stats: 'Stats',
  hashtags: 'Hashtags',
  combinations: 'Combinations'
  // suggested: 'Suggested Tags',
  // discover: 'Discover Tags'
}

const Tabs = data => {
  const children = []

  for (const key in tabs) {
    const tab = tabs[key]
    const classList = data.activeTab === key ? '-active' : ''

    const onclick = () => {
      data.changeTab(key)
    }

    children.push(
      div({ classList, onclick }, [
        text(tab)
      ])
    )
  }

  return div({ class: 'tabs' }, children)
}

const Stats = () => {
  return div([
    div({ class: 'list' }, [
      Text(div, 'reach, engagment, etc...'),
      Text(div, 'reach, engagment, etc...'),
      Text(div, 'reach, engagment, etc...'),
      Text(div, 'reach, engagment, etc...'),
      Text(div, 'reach, engagment, etc...'),
      Text(div, 'reach, engagment, etc...')
    ])
  ])
}

const Hashtags = () => {
  return div([
    Text(div, '#art, smart rank, '),
    Text(div, '#art, smart rank, '),
    Text(div, '#art, smart rank, '),
    Text(div, '#art, smart rank, '),
    Text(div, '#art, smart rank, '),
    Text(div, '#art, smart rank, ')
  ])
}

const Combinations = () => {
  return div([
    text('combinations')
  ])
}

const TabView = data => data.view()

const Interface = (actions, register) => {
  // <!-- register actions here -->

  const changeTab = register('interface.changeTab', (state, data) => {
    state.interface.activeTab = data
    return state.interface
  })

  return (state, dispatch) => {
    const routes = {
      'stats': () => Stats(),
      'hashtags': () => Hashtags(),
      'combinations': () => Combinations()
    }

    return div({ class: 'interface' }, [
      div({ class: 'titlebar' }, [
        Text(a, 'Onclick Insights')
      ]),
      div({ class: 'page' }, [
        div({ class: 'bar' }, [
          div({ class: 'avatar' }, [
            div(),
            div()
          ]),
          Text(h1, 'Hello, ' + 'whaley!'),
          a({ class: 'button' }, [text('Logout')])
        ]),
        div({ class: 'chart' }, [
          Chart.randomChart()
        ]),
        Tabs({
          activeTab: state.interface.activeTab,
          changeTab: name => {
            dispatch(changeTab, name)
          }
        }),
        TabView({
          view: routes[state.interface.activeTab]
        })
      ])
    ])
  }
}

export default {
  view: Interface,
  onroute: () => () => {
    console.log('TODO: Check if logged in')
  }
}
