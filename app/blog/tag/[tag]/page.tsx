import { getAllPosts } from 'lib/posts'
import { PostCard } from 'components/blog/PostCard'
import type { PostData } from 'types'

interface TagPageProps {
  params: {
    tag: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  // URLエンコードをデコードして日本語タグに戻す
  const decodedTag = decodeURIComponent(params.tag)

  const allPosts = await getAllPosts()
  const postsByTag = allPosts.filter((post) =>
    post.tags?.some(
      (tag) => tag.toLowerCase() === decodedTag.toLowerCase()
    )
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">タグ: {decodedTag}</h1>

      {postsByTag.length === 0 ? (
        <p>まだ「{decodedTag}」タグの記事はありません。</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {postsByTag.map((post: PostData) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
