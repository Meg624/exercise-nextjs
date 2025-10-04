import { PostCard } from 'components/blog/PostCard'
import { getAllPosts } from 'lib/markdown'

// メタデータを設定
export const metadata = {
  title: 'Tech Blog - ブログ一覧', // 課題ヒントに沿って title を設定
  description: '最新の技術情報やWeb開発に関する記事をお届けします', // description も設定
}

export default async function BlogPage() {
  // すべての記事を取得
  const posts = await getAllPosts() // TODO: 実際に記事を取得

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>ブログ記事</h1>

        {/* 記事の有無をチェックして表示を切り替える */}
        {posts.length === 0 ? (
          <p className='text-center text-gray-600'>記事がまだありません</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* PostCardコンポーネントを使用して記事を表示 */}
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
