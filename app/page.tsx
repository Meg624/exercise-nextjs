import Link from 'next/link'
import { PostCard } from '../components/blog/PostCard'
import { getAllPosts } from '../lib/markdown'
import type { PostData } from '../types'

// メタデータ
export const metadata = {
  title: 'Tech Blog',
  description: '最新の技術情報をお届けするブログ',
}

export default async function HomePage() {
  // 記事をすべて取得
  const posts = await getAllPosts()

  // 日付順で降順ソート（新しい記事が先頭）
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 最新記事を注目記事に設定
  const featuredPost = sortedPosts[0] || null

  // 最新6件（coverImageは設定しない。PostCardコンポーネント側で判定）
  const latestPosts = sortedPosts.slice(0, 6)

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      {/* ヒーローセクション */}
      <section className="bg-neutral-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-neutral-900">
            Tech Blog
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            最新のWeb開発や技術情報をお届けします。
          </p>
          <Link
            href="/blog"
            className="inline-block bg-neutral-900 text-white font-medium py-3 px-6 rounded-md hover:bg-neutral-700 transition-colors"
          >
            記事を読む
          </Link>
        </div>
      </section>

      {/* 注目記事 */}
      {featuredPost && (
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900">
              注目記事
            </h2>

            <div className="max-w-4xl mx-auto mt-6 mb-6">
              {/* ✅ isFeatured=true で featured-image.jpg を使用 */}
              <PostCard post={featuredPost} isFeatured={true} />
            </div>
          </div>
        </section>
      )}

      {/* 最新記事 */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">最新記事</h2>
            <p className="text-neutral-600">最近公開された記事をチェックしましょう!</p>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {latestPosts.map((post: PostData) => (
                // ✅ isFeatured=false（デフォルト）で default-image.jpg を使用
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-600">記事がありません</p>
          )}

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block bg-neutral-900 text-white font-medium py-3 px-6 rounded-md hover:bg-neutral-700 transition-colors"
            >
              すべての記事を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 人気のトピック */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
            人気のトピック
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['Next.js', 'React', 'TypeScript', 'JavaScript', 'Web Performance'].map(
              (tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  className="bg-neutral-200 text-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-300 transition-colors"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  )
}