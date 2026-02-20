import { render, screen } from '@testing-library/react'
import ArticleOverview from '.'

describe('ArticleOverview', () => {
  it('サムネイルありの場合は画像と記事情報を表示する', () => {
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

    const image = screen.getByRole('img', { name: '記事タイトルサムネイル' })

    expect(image).toHaveAttribute('src', '/thumb.png')
    expect(screen.getByText('記事タイトル')).toBeInTheDocument()
    expect(screen.getByText('記事説明')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('サムネイルなしの場合は No Image を表示する', () => {
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

    expect(screen.getByText('No Image')).toBeInTheDocument()
  })
})
