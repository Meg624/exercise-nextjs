import Link from "next/link";

export function Header() {
  return (
    <header className="relative w-full h-32 md:h-40 lg:h-48 bg-[url('/images/header-footer.jpg')] bg-cover bg-center border-b border-[#e0dcd3]">
      {/* オーバーレイ（背景を少し暗くして文字を見やすく） */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative container mx-auto flex items-center justify-between py-4 px-6">
        {/* ロゴ部分 */}
        <Link href="/" className="text-3xl font-bold text-white drop-shadow">
          Tech Blog
        </Link>

        {/* ナビゲーション */}
        <nav className="flex gap-6 text-sm font-medium text-white">
          <Link
            href="/"
            className="hover:underline hover:text-gray-200 transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/blog"
            className="hover:underline hover:text-gray-200 transition-colors"
          >
            BLOG
          </Link>
          <Link
            href="/about"
            className="hover:underline hover:text-gray-200 transition-colors"
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}
