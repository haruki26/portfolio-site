import { render, screen } from '@testing-library/react'
import HtmlViewer from '.'

vi.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: React.ReactNode }) => (
    <pre data-testid="syntax-highlighter">{children}</pre>
  ),
}))

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  solarizedDarkAtom: {},
}))

describe('HtmlViewer', () => {
  it('HTML文字列を表示し、inline codeにスタイルを適用する', () => {
    const { container } = render(
      <HtmlViewer
        htmlString="<p>本文</p><code>inline()</code>"
        className="custom-class"
      />,
    )

    expect(screen.getByText('本文')).toBeInTheDocument()
    expect(screen.getByText('inline()')).toHaveClass('bg-slate-800')
    expect(container.firstChild).toHaveClass('prose', 'custom-class')
  })

  it('pre > code をシンタックスハイライトとして表示する', () => {
    render(
      <HtmlViewer htmlString="<pre><code class='language-ts'>const x = 1</code></pre>" />,
    )

    expect(screen.getByTestId('syntax-highlighter')).toHaveTextContent(
      'const x = 1',
    )
  })
})
