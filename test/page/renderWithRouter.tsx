import { render } from '@testing-library/react'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from '@/router'

const renderWithRouter = (path: string) => {
  window.history.pushState({}, '', path)
  const router = getRouter()
  const rendered = render(<RouterProvider router={router} />)

  return {
    ...rendered,
    router,
  }
}

export { renderWithRouter }
