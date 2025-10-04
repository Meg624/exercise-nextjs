import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostContent from 'components/blog/PostContent'
import { PostCard } from 'components/blog/PostCard'
import { getAllPostSlugs, getPostBySlug, getAllPosts } from 'lib/markdown'
import { formatDate, getRelatedPosts } from 'lib/posts'

interface PageProps {
  params: {
    slug: string
  }
}

// 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug: string) => ({ slug: String(slug) }))
}

// メタデータの生成
export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: '記事が見つかりません' }

  return {
    title: post.title,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.published) notFound()

  // すべての記事を取得して関連記事を抽出
  const allPosts = await getAllPosts()
  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* カバー画像 */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-12"
        />
      )}

      <header className="mb-12">
        {/* ブログ一覧へ戻るリンク */}
        <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; ブログ一覧に戻る
        </Link>

        {/* タイトル */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* 著者と日付 */}
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>{post.author || 'Tech Blog'}</span>
          <span>{formatDate(post.date)}</span>
        </div>

        {/* タグ */}
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase()}`}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* 記事本文 */}
      <div className="mb-12">
        <PostContent content={post.content} />
      </div>

      {/* 関連記事セクション */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-6">関連記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}