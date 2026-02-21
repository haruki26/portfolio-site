import { render, screen } from '@testing-library/react'
import Pagination from '.'

const LinkComponent: React.FC<{ navTo: number; children: React.ReactNode }> = ({
  navTo,
  children,
}) => (
  <a data-nav-to={navTo} href={`#${navTo}`}>
    {children}
  </a>
)

describe('Pagination', () => {
  it('先頭ページでは prev を無効化し、next をリンク表示する', () => {
    const { container } = render(
      <Pagination
        pageLimit={10}
        totalCount={30}
        currentPage={1}
        LinkComponent={LinkComponent}
      />,
    )

    expect(screen.getByText('prev')).toBeInTheDocument()
    expect(container.querySelector('a[data-nav-to="0"]')).toBeNull()
    expect(container.querySelector('a[data-nav-to="2"]')).toBeInTheDocument()
    expect(container.querySelector('a[data-nav-to="1"]')).toBeNull()
  })

  it('末尾ページでは next を無効化する', () => {
    const { container } = render(
      <Pagination
        pageLimit={10}
        totalCount={30}
        currentPage={3}
        LinkComponent={LinkComponent}
      />,
    )

    expect(screen.getByText('next')).toBeInTheDocument()
    expect(container.querySelector('a[data-nav-to="4"]')).toBeNull()
    expect(container.querySelector('a[data-nav-to="2"]')).toBeInTheDocument()
  })

  it('ページ数が 0 のときは何も表示しない', () => {
    const { container } = render(
      <Pagination
        pageLimit={10}
        totalCount={0}
        currentPage={1}
        LinkComponent={LinkComponent}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
