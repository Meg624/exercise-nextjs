import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[url('/images/header-footer.jpg')] bg-cover bg-center border-t border-[#e0dcd3] mt-auto">
      {/* オーバーレイで文字を見やすく */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* 左側 */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-white drop-shadow">
              Tech Blog
            </Link>
            <p className="text-sm text-white/90 mt-1">
              最新の技術情報を提供するブログです。
            </p>
            <div className="flex gap-4 mt-2 justify-center md:justify-start text-sm">
              <Link href="/" className="hover:underline hover:text-gray-200 transition-colors">
                HOME
              </Link>
              <Link href="/blog" className="hover:underline hover:text-gray-200 transition-colors">
                BLOG
              </Link>
              <Link href="/about" className="hover:underline hover:text-gray-200 transition-colors">
                ABOUT
              </Link>
            </div>
          </div>

          {/* 右側 */}
          <div className="text-sm text-white/80 mt-4 md:mt-0 text-center md:text-right">
            &copy; {currentYear} Tech Blog. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
