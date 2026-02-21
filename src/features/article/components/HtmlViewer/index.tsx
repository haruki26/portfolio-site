import parse, {
  Element,
  type HTMLReactParserOptions,
  Text,
} from 'html-react-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedDarkAtom as highlightStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/libs/cn'

const isElement = (domNode: unknown): domNode is Element =>
  domNode instanceof Element

const isText = (domNode: unknown): domNode is Text => domNode instanceof Text

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (!isElement(domNode)) return

    switch (domNode.name) {
      case 'pre': {
        const firstChild = domNode.firstChild

        if (
          firstChild !== null &&
          isElement(firstChild) &&
          firstChild.name === 'code' &&
          isText(firstChild.firstChild)
        ) {
          const lang = firstChild.attribs.class
            ? firstChild.attribs.class.replace('language-', '')
            : undefined

          return (
            <SyntaxHighlighter language={lang} style={highlightStyle}>
              {firstChild.firstChild.data}
            </SyntaxHighlighter>
          )
        }
        break
      }
      case 'code': {
        if (isText(domNode.firstChild)) {
          return (
            <code
              className={cn(
                'rounded-md bg-slate-800 p-1 text-zinc-100 before:hidden after:hidden dark:bg-gray-600',
              )}
            >
              {domNode.firstChild.data}
            </code>
          )
        }
      }
    }
  },
}

interface Props {
  htmlString: string
  className?: string
}

const HtmlViewer: React.FC<Props> = ({ htmlString, className }) => {
  const parsedHtml = parse(htmlString, options)

  return (
    <div
      className={cn(
        'prose wrap-anywhere w-full break-keep px-3 text-base-content',
        'prose-pre:overflow-x-auto prose-code:font-jetbrains-mono prose-headings:text-base-content',
        'prose-a:text-secondary-100 prose-li:text-base-content prose-strong:text-primary-100',
        className,
      )}
    >
      {parsedHtml}
    </div>
  )
}

export default HtmlViewer
