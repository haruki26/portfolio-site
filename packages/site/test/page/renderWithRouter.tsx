import { act, render } from '@testing-library/react'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from '@/router'

const renderWithRouter = async (path: string) => {
  window.history.pushState({}, '', path)
  const router = getRouter()
  const rendered = render(<RouterProvider router={router} />)
  await act(async () => {
    await router.load()
  })

  return {
    ...rendered,
    router,
  }
}

export { renderWithRouter }
