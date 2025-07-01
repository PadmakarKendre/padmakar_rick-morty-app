import {
  Outlet,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'
import { CharacterListPage } from './pages/CharacterListPage'
import { CharacterDetailPage } from './pages/CharacterDetailPage'

const rootRoute = new RootRoute({
  component: () => <Outlet />,
})
const characterListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterListPage,
})
const characterDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: CharacterDetailPage,
})
const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailRoute,
])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
