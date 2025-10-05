import Link from 'next/link'

export const metadata = {
  title: 'About Tech Blog',
  description: 'Tech Blogについての紹介ページ',
}

export default function AboutPage() {
  // 実際に使用しているタグ（記事のタグと一致させる）
  const topics = [
    'Next.js',
    'React',
    'TypeScript',
    'Components',
    'Vercel',
    'Deployment',
    'Performance',
    'Web開発',
    'Markdown',
  ]

  return (
    <div
      className='container mx-auto px-4 py-12 max-w-4xl bg-white bg-cover bg-center rounded-lg shadow-md'
      style={{ backgroundImage: "url('/images/featured-Image.jpg')" }}
    >
      <h1 className='text-4xl font-bold mb-8 text-neutral-900'>About Tech Blog</h1>

      <section className='mb-12 bg-white bg-opacity-80 p-4 rounded'>
        <h2 className='text-2xl font-bold mb-4'>私たちについて</h2>
        <p>
          Tech Blogチームへようこそ！
          私たちは、Web開発や最新の技術情報をわかりやすく届けることを目指して活動しているチームです。<br /><br />
          フロントエンドからバックエンドまで、実務で使える知識やTipsを中心に、初心者の方でも理解しやすい記事をお届けしています。
          <br /><br />
          日々の開発経験や最新技術の学びを共有することで、読者の皆さんのスキルアップや学習のきっかけになれば嬉しいです。<br /><br />
          興味のある方は、ぜひブログを読みながら一緒に技術を楽しんでください！
        </p>
      </section>

      <section className='mb-12 bg-white bg-opacity-80 p-4 rounded'>
        <h2 className='text-2xl font-bold mb-4'>ミッション</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>最新技術の情報を分かりやすく届ける</li>
          <li>初心者からプロまで役立つ情報提供</li>
        </ul>
      </section>

      <section className='mb-12 bg-white bg-opacity-80 p-4 rounded'>
        <h2 className='text-2xl font-bold mb-4'>扱うトピック</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/blog/tag/${topic.toLowerCase()}`}
              className='bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 hover:shadow-md transition-all duration-200 text-center'
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      <section className='mb-12 bg-white bg-opacity-80 p-4 rounded'>
        <h2 className='text-2xl font-bold mb-4'>執筆者</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex items-center gap-4'>
            <img
              src='/images/author.png'
              alt='執筆者'
              className='w-16 h-16 rounded-full object-cover flex-shrink-0'
            />
            <div className='min-w-0'>
              <p className='font-bold md:whitespace-nowrap'>Megumi iz</p>
              <p className='md:whitespace-nowrap break-keep'>Webデザイン設計と、React / Next.js を中心にUI開発を担当</p>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-white bg-opacity-80 p-4 rounded'>
        <h2 className='text-2xl font-bold mb-4'>お問い合わせ</h2>
        <p>Email: contact@example.com</p>
      </section>
    </div>
  )
}