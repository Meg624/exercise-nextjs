---

title: "Building React Components"
date: "2025-09-01"
tags: ["React", "Components"]
author: "Tech Blog"
published: true
# coverImage: "/images/featured-Image.jpg"
excerpt: "再利用可能で保守性の高いReactコンポーネントの作り方を学びます。"
---

## はじめに
Reactではコンポーネントを小さく分けて再利用することが重要です。ここでは簡単なコンポーネント例を示します。

## コンポーネント設計
UIは単一責任の原則に従い、1つのコンポーネントは1つの役割に集中させます。

## propsとstateの管理
コンポーネントの状態はstate、外部から渡す値はpropsで管理します。
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => (
  <button onClick={onClick}>{label}</button>
);
