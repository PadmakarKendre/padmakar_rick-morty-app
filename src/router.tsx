import {
  Outlet,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'
import { CharacterListPage } from './pages/CharacterListPage'

const rootRoute = new RootRoute({
  component: () => <Outlet />,
})
const characterListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterListPage,
})
const routeTree = rootRoute.addChildren([characterListRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
