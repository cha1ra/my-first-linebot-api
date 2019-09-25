// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require('express')()
const line = require('@line/bot-sdk')
const conv = require('./modules/conversation')
const messages = require('./modules/messages')

// -----------------------------------------------------------------------------
// パラメータ設定
const LineConfig = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
}

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000)

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(LineConfig)

// QA判断用のフラグ
let isQA = false

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(LineConfig), (req, res, next) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  res.sendStatus(200)

  // すべてのイベント処理のプロミスを格納する配列。
  const eventsProcessed = [];

  // イベントオブジェクトを順次処理。
  (async () => {
    for (const event of req.body.events) {
      if (event.message.text === 'お問い合わせ') {
        eventsProcessed.push(bot.replyMessage(event.replyToken, messages.faq))
        isQA = true
      } else if (isQA) {
        isQA = false
      } else if (event.type === 'message' && event.message.type === 'text') {
        const resultText = await conv.exportReplyMessageObject(event.message.text)
        if (resultText !== '') {
          // replyMessage()で返信し、そのプロミスをevents_processedに追加。
          eventsProcessed.push(bot.replyMessage(event.replyToken, {
            type: 'text',
            text: resultText
          }))
        }
      }
    }
  })()

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(eventsProcessed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`)
    }
  )
})
