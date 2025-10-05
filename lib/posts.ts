import type { PostData } from 'types'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 記事のディレクトリ
const postsDirectory = path.join(process.cwd(), 'src/content/blog')

/**
 * 読了時間を計算
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * 日付を日本語形式にフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * 関連記事を取得
 */
export function getRelatedPosts(
  currentPost: PostData,
  allPosts: PostData[],
  limit = 3
): PostData[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)

  const scored = otherPosts.map((post) => {
    let score = 0

    // 共通タグ: +2点
    const commonTags =
      post.tags?.filter((tag) => currentPost.tags?.includes(tag)).length || 0
    score += commonTags * 2

    // タイトルの共通単語: +1点
    const currentTitleWords = currentPost.title.toLowerCase().split(/\s+/)
    const postTitleWords = post.title.toLowerCase().split(/\s+/)
    const commonTitleWords = postTitleWords.filter((word) =>
      currentTitleWords.includes(word)
    ).length
    score += commonTitleWords

    return { post, score }
  })

  const sorted = scored.sort((a, b) => b.score - a.score)

  return sorted.slice(0, limit).map((item) => item.post)
}

/**
 * Markdownから見出しを抽出
 */
export function extractHeadings(content: string): {
  id: string
  text: string
  level: number
}[] {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /<(h[1-6])[^>]*>(.*?)<\/\1>/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    const level = parseInt(match[1].charAt(1), 10)
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    const id = text.toLowerCase().replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Markdown記事をすべて取得
 */
export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)

  const posts: PostData[] = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        author: data.author || 'Tech Blog',
        excerpt: data.excerpt || content.substring(0, 120) + '...',
        coverImage: data.coverImage || null,
        content,
        readingTime: getReadingTime(content),
      } as PostData
    })

  // 日付順ソート
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
