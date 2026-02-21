import { render, screen } from '@testing-library/react'
import ArticleOverview from '.'

describe('ArticleOverview', () => {
  it('サムネイルありの場合は画像と概要を表示する', () => {
    render(
      <ArticleOverview
        article={{
          title: '記事タイトル',
          description: '記事説明',
          thumbnail: {
            src: '/thumb.png',
            width: 120,
            height: 80,
          },
          publishedAt: new Date(2024, 0, 5),
          tags: [],
        }}
      />,
    )

    const image = screen.getByRole('img', { name: '記事タイトル-サムネイル' })

    expect(image).toHaveAttribute('src', '/thumb.png')
    expect(screen.getByText('記事タイトル')).toBeInTheDocument()
    expect(screen.getByText('記事説明')).toBeInTheDocument()
  })

  it('サムネイルなしの場合は画像を表示しない', () => {
    render(
      <ArticleOverview
        article={{
          title: '記事タイトル',
          description: '記事説明',
          publishedAt: new Date(2024, 0, 5),
          tags: [],
        }}
      />,
    )

    expect(screen.queryByRole('img')).toBeNull()
  })
})
