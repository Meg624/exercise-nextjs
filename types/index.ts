// TODO: ブログ記事のデータ型を定義してください
export type PostData = {
  slug: string
  title: string
  date: string
  author?: string
  coverImage?: string
  excerpt?: string
  content: string
  tags?: string[]
  published?: boolean
  readingTime?: number
}

// TODO: 記事のメタデータ型を定義してください（contentを除く）
export type PostMeta = {
  slug: string
  title: string
  date: string
  tags?: string[]
  readingTime?: number
}

// ページのメタデータ型（実装済み）
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  featuredImage?: string
}
