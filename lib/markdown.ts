import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import type { PostData } from 'types'
import hljs from 'highlight.js'

// ブログ記事ディレクトリ
const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// ==============================
// すべての記事のスラッグを取得
// ==============================
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)

  // .mdファイルの名前（拡張子なし）を返す
  return fileNames
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

// ==============================
// スラッグから記事データを取得
// ==============================
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Post not found: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // frontmatter を解析
    const { data, content } = matter(fileContents)

    // Markdown を HTML に変換（Highlight.js対応）
    const processedContent = await remark()
      .use(html, { sanitize: false }) // Highlight.jsのHTMLを許可
      .process(content)
    
    let contentHtml = processedContent.toString()

    // コードブロックにHighlight.jsを適用
    contentHtml = contentHtml.replace(
      /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
      (match, lang, code) => {
        try {
          const decodedCode = code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
          
          if (lang && hljs.getLanguage(lang)) {
            const highlighted = hljs.highlight(decodedCode, { language: lang }).value
            return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
          }
          return match
        } catch (err) {
          console.error('Highlight error:', err)
          return match
        }
      }
    )

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date ?? new Date().toISOString(),
      content: contentHtml,
      tags: data.tags || [],
      author: data.author || 'Tech Blog',
      published: data.published !== undefined ? Boolean(data.published) : true,
      coverImage: data.coverImage || '',
      excerpt: data.excerpt || '',
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// ==============================
// すべての記事を取得
// ==============================
export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))

  return posts
    .filter((p): p is PostData => p !== null && (p.published === undefined || p.published === true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// ==============================
// 特定のタグを持つ記事を取得
// ==============================
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => (post.tags ?? []).includes(tag))
}

// ==============================
// すべてのタグを取得
// ==============================
export function getAllTags(): string[] {
  if (!fs.existsSync(postsDirectory)) return []

  const allTags = fs.readdirSync(postsDirectory)
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, file), 'utf8'))
      return data.tags || []
    })
    .flat()

  return Array.from(new Set(allTags)).sort()
}