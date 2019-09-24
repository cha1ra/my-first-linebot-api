// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require('express')()
const line = require('@line/bot-sdk')
const fetch = require('node-fetch')
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
  const eventsProcessed = []

  // イベントオブジェクトを順次処理。

  req.body.events.forEach((event) => {
    // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
    console.log(event.type)
    if (event.type === 'message' && event.message.type === 'text') {
      let resultText = ''

      if (event.message.text === 'こんにちは') {
        resultText = conv
      } else if (event.message.text.includes('お腹空いた')) {
        // ぐるナビURL設定
        const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=cafe`
        console.log(url)
        fetch(url, { method: 'GET' })
          .then(res => res.json())
          .then(response => {
            console.log('Success:', JSON.stringify(response))
          })
          .catch(error => console.error('Error:', error))
      } else {
        resultText = ''
      }

      if (resultText !== '') {
        // replyMessage()で返信し、そのプロミスをevents_processedに追加。
        eventsProcessed.push(bot.replyMessage(event.replyToken, {
          type: 'text',
          text: resultText
        }))
      }

      // // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
      // if (event.message.text == "こんにちは"){
      //   // replyMessage()で返信し、そのプロミスをevents_processedに追加。
      //   events_processed.push(bot.replyMessage(event.replyToken, {
      //     type: "text",
      //     text: "ご丁寧にありがとうございます"
      //   }));
      // }
    }
  })

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(eventsProcessed).then(
    (response) => {
      console.log(`${response.length} event(s) processed.`)
    }
  )
})
