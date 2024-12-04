const functions = require("firebase-functions");
const sgMail = require('@sendgrid/mail');
const cors = require("cors")({ origin: true }); // CORS対応

// Firebaseの設定からAPIキーを取得
const sendGridApiKey = functions.config().sendgrid.api_key;
sgMail.setApiKey(sendGridApiKey);

// メール送信機能を定義
exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => { // CORS対応
    if (req.method !== 'POST') {
      return res.status(405).send('POSTメソッドのみ対応しています');
    }

    // リクエストボディからメールの宛先（to）を取得
    const { to } = req.body;

    if (!to) {
      return res.status(400).send('メールアドレスが指定されていません');
    }

    // ランダムな5桁の確認コードを生成
    const code = Math.floor(10000 + Math.random() * 90000); // 10000から99999のランダムな数

    // メールの設定
    const msg = {
      to: to, // リクエストから取得した送信先のメールアドレス
      from: 'takeruyamamoto45@gmail.com', // 送信元のメールアドレス
      subject: '確認コードの送信',
      text: `あなたの確認コードは ${code} です。`, // プレーンテキストメール本文
      html: `<strong>あなたの確認コードは ${code} です。</strong>`, // HTMLメール本文
    };

    // SendGridでメールを送信
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).send({ message: "確認コードがメールで送信されました", code });
      })
      .catch((error) => {
        console.error('メール送信エラー:', error);
        res.status(500).send({ message: 'メール送信エラー', error: error.message });
      });
  });
});
