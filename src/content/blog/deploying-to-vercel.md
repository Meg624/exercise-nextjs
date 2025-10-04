---
title: "Deploying to Vercel"
date: "2025-08-28"
tags: ["Vercel", "Deployment"]
author: "Tech Blog"
published: true
# coverImage: "/images/featured-Image.jpg"
excerpt: "Next.jsアプリケーションをVercelにデプロイする手順と注意点をまとめました。"
---

## はじめに
VercelはNext.jsの開発元が提供するクラウドプラットフォームで、簡単にデプロイできます。

## プロジェクトの準備
Next.jsプロジェクトをGitHubにプッシュしておきます。

## デプロイ手順
1. Vercelにログイン
2. "New Project" からGitHubリポジトリを選択
3. ビルド設定を確認してDeploy
4. デプロイ完了後、URLでサイトを確認

```tsx
name: Publish GitHub Pages

# git pushをトリガにワークフローが実行される
on:
  push:

# 書き込み権限の付与
permissions:
  contents: write

jobs:
  publish-gh-pages:
    runs-on:
      - ubuntu-latest

    steps:
      # GitHub Pagesに公開するファイルの作成
      # 実際はGitリポジトリをチェックアウトしてそこからビルドすることが多い
      - name: Create index.html
        run: |
          mkdir -p ./dist
          echo "hello, world!" > ./dist/index.html

      # GitHub Pagesに公開
      # デフォルトではgh-pageeブランチにpushする
      - name: Push gh-pages branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          # Deploy keysやPersonal access Tokensも使用可能
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          # keep_filesをtrueにすると、git pushの度に一旦全てのファイルが削除される挙動を抑制できる
          # keep_files: true
          user_name: github-actions
          user_email: github-actions@github.com
