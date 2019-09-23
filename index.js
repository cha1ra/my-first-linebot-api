// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk");
const fetch = require("node-fetch")

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
  channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);


// -----------------------------------------------------------------------------
// ルーター設定
server.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  res.sendStatus(200);

  // すべてのイベント処理のプロミスを格納する配列。
  let events_processed = [];

  // イベントオブジェクトを順次処理。
  req.body.events.forEach( async (event) => {
    // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
    if (event.type == "message" && event.message.type == "text"){
      let resultText = ''

      if (event.message.text == 'こんにちは'){
        resultText = 'こんにちは'
      }else if (event.message.text.includes('お腹空いた')){
        // ぐるナビURL設定
        const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=cafe`
        console.log(url)
        const res = await fetch(url)
        resultText = res
      }else{
        resultText = ''
      }

      if (resultText !== '') {
        // replyMessage()で返信し、そのプロミスをevents_processedに追加。
        events_processed.push(bot.replyMessage(event.replyToken, {
          type: "text",
          text: resultText
        }));
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
  });

  // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
  Promise.all(events_processed).then(
      (response) => {
        console.log(`${response.length} event(s) processed.`);
      }
  );
});
