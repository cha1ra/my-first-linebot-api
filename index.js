// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require('express')()
const line = require('@line/bot-sdk')
const conv = require('./modules/conversation')

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
      console.log(event.type)
      if (event.type === 'message' && event.message.type === 'text') {
        const resultText = await conv.replyMessage(event.message.text)
        console.log('ここまできてる？')
        console.log(resultText)
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

  // req.body.events.forEach((event) => {
  //   // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
  //   console.log(event.type)
  //   if (event.type === 'message' && event.message.type === 'text') {
  //     const resultText = conv.replyMessage(event.message.text)
  //     console.log('ここまできてる？')
  //     console.log(resultText)
  //     if (resultText !== '') {
  //       // replyMessage()で返信し、そのプロミスをevents_processedに追加。
  //       eventsProcessed.push(bot.replyMessage(event.replyToken, {
  //         type: 'text',
  //         text: resultText
  //       }))
  //     }
  //   }
  // })

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(eventsProcessed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`)
    }
  )
})
