
import main from './_main'

import { html, text } from '@onclick/superstatic'
const { a, div, h1, h2, p } = html

const h = (tag, data) => tag([text(data)])

const Post = props => {
  return a({ class: 'post', href: props.href, target: '_blank' }, [
    div({ class: 'thumb' }),
    div({ class: 'body' }, [
      Text(h1, props.title),
      Text(h2, props.date),
      Text(p, props.body)
    ])
  ])
}

const Text = (tag, data) => tag([text(data)])
const getDate = date => (new Date(date) + '').split('GMT')[0]

const Blog = (state, dispatch) => {
  return function () {
    div({ class: 'blog' }, [
      div({ class: 'head' }, [
        h(h1, 'Blog')
      ]),
      Post({
        title: 'You don\'t need a JWT library 2020',
        href: 'https://gist.github.com/whaaaley/2c1153e55a76c7c020cabf1f0cf6778f',
        date: getDate('2020-06-06T11:51:39Z'),
        body: 'It\'s 2020. You have an idea for new webapp. The scope is small, but requires auth. You look at services like Auth0 and libraries like node-jsonwebtoken. You\'ve probably read about the countless security bugs they\'ve had. It\'s 2020 they should have it figured out...'
      }),
      Post({
        title: 'Writing A Browser Reload Server 2019',
        href: 'https://gist.github.com/whaaaley/25bfc3051635a126001d099e210d541a',
        date: getDate('2019-03-28T03:31:02Z'),
        body: ''
      }),
      Post({
        title: 'You don\'t need CORS Middleware 2019',
        href: 'https://gist.github.com/whaaaley/11365daedc8ff7d05e1b4e6d47f76c20',
        date: getDate('2019-02-09T03:18:20Z'),
        body: 'A node example using Zeit\'s Micro.'
      }),
      Post({
        title: 'WebApp Rendering Strategies 2019',
        href: 'https://gist.github.com/whaaaley/c237248e8fb376b935bac54c488b0d3c',
        date: getDate('2019-01-22T17:41:04Z'),
        body: ''
      })
    ])
  }
}

export default {
  setup: main(Blog)
}
