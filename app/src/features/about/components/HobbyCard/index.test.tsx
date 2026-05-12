import { render, screen } from '@testing-library/react'
import HobbyCard from '.'

describe('HobbyCard', () => {
  it('趣味情報と画像を表示する', () => {
    render(
      <HobbyCard
        hobby={{
          name: 'Photography',
          description: '風景写真を撮るのが好きです。',
          images: [
            {
              src: '/photo-1.png',
              alt: '海辺の写真',
              width: 100,
              height: 120,
            },
            {
              src: '/photo-2.png',
              width: 200,
              height: 220,
            },
          ],
        }}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Photography' }),
    ).toBeInTheDocument()
    expect(screen.getByText('風景写真を撮るのが好きです。')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '海辺の写真' })).toHaveAttribute(
      'src',
      '/photo-1.png',
    )
    expect(
      screen.getByRole('img', { name: 'Photography画像1' }),
    ).toBeInTheDocument()
  })
})
