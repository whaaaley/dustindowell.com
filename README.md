
# dustindowell.com

This project is hosted here https://dustindowell.com/

## Todo
- [ ] Store and retrieve resume.json to/from session storage

# Build and Develop

Notable make targets. See the Makefile for a full list.

```sh
$ make       # build for production
$ make start # start the development server
$ make clean # delete /node_modules, /public, /tmp, and package-lock.json
```

# Notes

## Why make?

Make was chosen as the "task runner" for this project. Make has been around for a long time. It's simple, fast, well-tested, well-documented, and supports multi-line commands. You can install it on Debian along with other tools like this.

```sh
$ sudo apt install build-essential
```

## State Management

The state manager in this project is an extremely simple take on flux architecture, similar to Redux, Vuex, Hyperapp, and others.

In this project you dispatch `actions` to update state.

```js
// declare an action
const increment = (state, dispatch) => data => {
  state.counter += data
  return state
}

// dispatch an action with some data
dispatch(increment, 12)
```

## View Layer Syntax

This project uses Superfine for the view layer. [Superfine](https://github.com/jorgebucaran/superfine) is a minimal view layer that uses a virtual dom to patch the real dom.

The view layer syntax in this project is a modified version of Superfine's. In this project children _must_ be contained inside an array. This was was traded for optional prop objects.

```js
// Valid syntax
div()
div([/* nodes */])
div({ /* props */ })
div({ /* props */ }, [/* nodes */])

// Deprecated syntax
div(/* node */)
div({ /* props */ }, /* node */)
```

## Best practice for using font-weight

Due to the limited amount of font weights in CSS, I follow this convention when adding fonts.

https://www.webtype.com/info/articles/fonts-weights/

```
100 - Extra Light or Ultra Light
200 - Light or Thin
300 - Book or Demi
400 - Normal or Regular
500 - Medium
600 - Semibold, Demibold
700 - Bold
800 - Black, Extra Bold or Heavy
900 - Extra Black, Fat, Poster or Ultra Black
```
