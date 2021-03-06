
import { svg, h, div } from '../lib/vnodes/html'

export const svgPath = props => h('path')(props)
export const svgCircle = props => h('circle')(props)

export const randomPoints = () => {
  const target = []
  for (let i = 0; i < 24; i++) {
    const x = Math.round(480 / 24 * i) + 480 / 48
    const y = Math.floor(Math.random() * Math.floor(60)) + 90
    target.push([x, y])
  }
  return target
}

export const pathFromPoints = points => {
  let target = 'M '
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i]
    target += ` ${x} ${y} L`
  }
  return target.slice(0, -2)
}

export const pointsFromPoints = points => {
  const target = []
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i]
    target.push(svgCircle({ cx: x, cy: y, r: 2, fill: '#1877f2' }))
  }
  return target
}

export const gridLines = () => {
  const target = []
  for (let i = 1; i < 12; i++) {
    const x = 240 / 12 * i
    const path = svgPath({ stroke: '#24262a', d: `M 0 ${x} L 960 ${x}` })
    target.push(path)
  }
  return target
}

/**
 *
 *
 */

const points = randomPoints()

const randomChart = () => {
  return svg({ viewBox: '0 0 480 240' }, [
    ...gridLines(),
    ...pointsFromPoints(points),
    svgPath({
      'stroke': '#1877f2',
      'fill': 'none',
      'd': pathFromPoints(points)
    })
  ])
}

export default data => {
  if (data.insights.data === null) {
    return div({ class: 'chart -overlay' }, [
      randomChart()
    ])
  }

  const insights = data.insights.data
  const length = insights.length
  const max = Math.max(...insights.map(item => item.reach))
  const points = []

  for (let i = length; i--;) {
    const reach = insights[i].reach
    const offset = 480 / (length * 2)

    const x = Math.round(480 / length * i) + offset
    const y = reach * ((240 - 15) / max)

    points.push([x, 240 - y])
  }

  return div({ class: 'chart' }, [
    svg({ viewBox: '0 0 480 240' }, [
      ...gridLines(),
      ...pointsFromPoints(points),
      svgPath({
        'stroke': '#1877f2',
        'fill': 'none',
        'd': pathFromPoints(points)
      })
    ])
  ])
}