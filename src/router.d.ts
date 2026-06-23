import 'vue-router'

export type ContentWidth = 'content' | 'full'

export type RouteTab = {
  name: string
  route: string
}

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    contentWidth?: ContentWidth
    title?: string
    tabs?: RouteTab[]
  }
}
