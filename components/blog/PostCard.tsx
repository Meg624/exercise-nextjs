import Link from 'next/link'
import type { PostData } from 'types'
import { getReadingTime } from 'lib/posts'

interface PostCardProps {
  post: PostData
  isFeatured?: boolean
}

export function PostCard({ post, isFeatured = false }: PostCardProps) {
  // 画像URL（注目記事とブログ一覧で異なるデフォルト画像）
  const imageUrl = post.coverImage || (isFeatured 
    ? '/images/featured-image.jpg'     // 注目記事のデフォルト
    : '/images/default-image.jpg')     // ブログ一覧のデフォルト

  // ✅ 読了時間を計算
  const readingTime = getReadingTime(post.content)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`bg-[var(--color-card)] rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
        isFeatured ? '' : 'border border-[var(--color-muted)]'
      }`}
    >
      {/* カバー画像 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className={`w-full object-cover block rounded-2xl ${
            isFeatured ? 'h-64' : 'h-48'
          }`}
        />
      )}

      {/* コンテンツ */}
      <div className="p-6">
        {/* タグ */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="bg-[var(--color-tag)] text-[var(--color-tag-text)] text-xs font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* タイトル */}
        <h2 className="text-xl font-semibold mb-2 text-[var(--color-accent)] hover:text-[var(--color-muted)] transition-colors">
          {post.title}
        </h2>

        {/* 抜粋 */}
        {post.excerpt && (
          <p className="text-[var(--color-text)] mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* ✅ 著者・日付・読了時間 */}
        <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
          <span>{post.author || 'Tech Blog'}</span>
          <div className="flex items-center gap-3">
            <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
            <span className="flex items-center gap-1">
              ⏱️ {readingTime}分
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}