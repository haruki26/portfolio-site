import { render } from '@testing-library/react'
import CosmoBackground from '.'

describe('CosmoBackground', () => {
  it('背景コンテナと星を描画する', () => {
    const { container } = render(<CosmoBackground />)

    expect(container.firstChild).toHaveClass(
      '-z-50',
      'pointer-events-none',
      'fixed',
      'overflow-hidden',
    )
    expect(
      container.querySelectorAll(
        'span.twinkle.absolute.bg-radial.from-zinc-50.shadow',
      ),
    ).toHaveLength(100)
  })
})
