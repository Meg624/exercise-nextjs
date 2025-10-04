---
title: "はじめてのブログ記事"
date: "2023-10-02"
tags: ["Next.js", "React", "Markdown"]
excerpt: "このブログ記事では、Next.js と Markdown を使った記事管理の仕組みを紹介します。"
# coverImage: "/images/featured-Image.jpg"
---

# はじめてのブログ記事

このブログは **Next.js + Markdown** をベースに構築しています。  
記事は Markdown ファイルとして保存され、静的生成（SSG）によって自動的にページ化されます。  

## なぜ Markdown を使うのか？

- シンプルで書きやすい  
- バージョン管理がしやすい  
- 開発者にとって馴染みがある  

## コードサンプル

```tsx
export default function HelloWorld() {
  return <h1>Hello, World!</h1>
  }
