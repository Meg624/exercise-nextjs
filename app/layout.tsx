import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'


// メタデータを設定
export const metadata: Metadata = {
  title: {
    default: 'Tech Blog - 最新の技術情報をお届け',
    template: '%s | Tech Blog',
  },
  description: 'Web開発や最新技術情報を発信するブログです',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="min-h-screen bg-neutral-50 text-neutral-800 font-sans flex flex-col antialiased">
        {/* ヘッダー */}
        <Header />

        {/* メインコンテンツ */}
        <main className="flex-1 container mx-auto px-6 py-8">
          {children}
        </main>

        {/* フッター */}
        <Footer />
      </body>
    </html>
  )
}
