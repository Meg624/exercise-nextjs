'use client'

import { useEffect } from 'react'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  useEffect(() => {
    // Highlight.jsを動的に読み込んで適用
    const applyHighlight = async () => {
      const hljs = (await import('highlight.js')).default
      document.querySelectorAll('pre code.hljs').forEach((block) => {
        const element = block as HTMLElement
if (!element.dataset.highlighted) {
          hljs.highlightElement(element)
          element.dataset.highlighted = 'yes'
        }
      })
    }
    applyHighlight()
  }, [content])

  return (
    <article className="prose prose-lg max-w-none
      prose-pre:my-8
      prose-p:mb-">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>  
  )
}
