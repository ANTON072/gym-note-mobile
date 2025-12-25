# CLAUDE.md

## プロジェクト概要

Expo (React Native) を使用したジムノートアプリ

## 技術スタック

- **フレームワーク**: Expo + React Native
- **ルーティング**: expo-router
- **スタイリング**: @shopify/restyle
- **状態管理**: Zustand（シングルストアパターン）
- **認証**: Firebase Auth
- **フォント**: Roboto (@expo-google-fonts/roboto)
- **デザインシステム**: IBM Carbon Design System ベース

## デザインシステム

### Restyle

`@shopify/restyle` を使用してテーマベースのスタイリングを行う。

#### コンポーネント

- `Box` - View の代わりに使用（レイアウト用）
- `Text` - Text の代わりに使用（タイポグラフィ用）

```tsx
import { Box, Text } from '@/components/common'

<Box padding="m" backgroundColor="layer01" borderRadius="s">
  <Text variant="heading03">タイトル</Text>
</Box>
```

### テーマ構成

#### カラー（IBM Carbon Gray Scale）

- `background` - メイン背景（白）
- `layer01`, `layer02`, `layer03` - レイヤー背景
- `textPrimary`, `textSecondary`, `textHelper` - テキスト色
- `interactive`, `interactiveHover`, `interactiveActive` - インタラクティブ要素
- `supportError`, `supportSuccess`, `supportWarning` - セマンティックカラー

#### スペーシング

| キー | 値 |
|------|-----|
| `2xs` | 2px |
| `xs` | 4px |
| `s` | 8px |
| `m` | 16px |
| `l` | 24px |
| `xl` | 32px |
| `2xl` | 40px |
| `3xl` | 48px |
| `4xl` | 64px |

#### テキストバリアント

- `heading01` ~ `heading07` - 見出し（14px ~ 54px）
- `body01`, `body02` - 本文（14px, 16px）
- `bodyCompact01`, `bodyCompact02` - 詰まった本文
- `label01`, `label02` - ラベル
- `helperText01`, `helperText02` - 補助テキスト
- `legal01`, `legal02` - 法的文言

## ディレクトリ構成

```
app/           - expo-router ページ
components/
  common/      - RN基本パーツのRestyle拡張 (Box, Text)
  ui/          - 汎用UIコンポーネント (Button, Alert)
  icons/       - アイコンコンポーネント
  navigation/  - ヘッダー・ナビゲーション関連 (SettingsButton)
  auth/        - 認証関連コンポーネント
  features/    - 機能固有のコンポーネント
lib/
  firebase/    - Firebase 設定・初期化
store/         - Zustand ストア
hooks/         - カスタムフック
providers/     - プロバイダーコンポーネント
theme/         - Restyle テーマ定義
types/         - TypeScript 型定義
```

### components ディレクトリの方針

| ディレクトリ | 役割 | 例 |
|-------------|------|-----|
| `common/` | RN基本パーツのRestyle拡張 | Box, Text |
| `ui/` | 再利用可能なUIパーツ | Button, Alert, Input, Card |
| `icons/` | アイコン | SettingsIcon, ChevronIcon |
| `navigation/` | ヘッダー・ナビ要素 | SettingsButton, BackButton |
| `auth/` | 認証関連 | GoogleLoginButton |
| `features/` | 特定機能に紐づくもの | WorkoutCard, ExerciseList |

## 状態管理

Zustand のシングルストアパターンを採用。アプリ全体で1つのストアを使用する。

```tsx
import { useStore } from '@/store'

// 状態の取得
const user = useStore((state) => state.user)
const authState = useStore((state) => state.authState)

// アクションの実行
const setUser = useStore((state) => state.setUser)
```

参考: https://github.com/pmndrs/zustand/blob/main/docs/guides/flux-inspired-practice.md

## パスエイリアス

`@/*` → プロジェクトルート (`./`)

```tsx
import theme from '@/theme'
import { Box, Text } from '@/components/common'
```
