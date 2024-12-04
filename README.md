# Heaven's Door - メール認証システム

このプロジェクトは、Firebase Functions と SendGrid を使ったメール認証システムです。ユーザーがアカウントを作成する際に、メールアドレスに認証コードを送信し、それを使ってユーザーがアカウントを確認することができます。

## 概要

- Firebase Functions を利用して、バックエンドでメール送信を処理します。
- SendGrid API を使って、ユーザーのメールアドレスに認証コードを送信します。
- ユーザーはメールアドレスに送信された認証コードを入力し、アカウントを認証します。

## 必要なもの

- **Firebaseアカウント**: Firebase Console からプロジェクトを作成する必要があります。
- **SendGrid APIキー**: SendGrid のサービスを使用するために、SendGrid のアカウントが必要です。
- **Node.js**: バックエンドで Firebase Functions を実行するために Node.js が必要です。

## セットアップ手順

1. **Firebase プロジェクトの作成**

   Firebase Console で新しいプロジェクトを作成します。Firebase Functions を有効にしてください。

2. **SendGrid アカウントを作成**

   [SendGrid](https://sendgrid.com/) にサインインし、APIキーを作成します。このキーは、`firebase functions:config:set sendgrid.api_key="YOUR_API_KEY"` のコマンドで Firebase に設定します。

3. **依存関係のインストール**

   プロジェクトのルートディレクトリに移動し、以下のコマンドを実行して必要な依存関係をインストールします。

   ```bash
   npm install
