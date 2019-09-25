// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')
const messages = require('./messages')

const replyMessage = async (msg) => {
  let reply = ''
  if (msg.includes('こんにちは')) {
    const types = ['ヤッホー！', 'ご丁寧にありがとうございます', '今日もいい天気ですね〜', '暇なんですか？']
    reply = types[generateRandomNum(types.length)]
  } else if (msg.includes('運勢') || msg.includes('占')) {
    const fortunes = ['大吉', '中吉', '吉', '凶']
    reply = `今日の運勢は...${fortunes[generateRandomNum(fortunes.length)]}です〜`
  } else if (msg.includes('食べたい') || msg.includes('腹')) {
    // ぐるナビURL設定
    const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=${encodeURI(msg.split('食')[0])}`
    console.log(url)
    try {
      const res = await fetch(url, { method: 'GET' })
      const json = await res.json()
      // const response = JSON.stringify(json)
      reply = `${json.rest[0].name}なんかはいかがですか？美味しいですよ♪\n${json.rest[0].url}`
    } catch (e) {
      console.error('Error:', e)
    }
  } else if (msg === '開店時間を知りたい') {
    reply = '本日は朝10:00から開店しています♪'
  } else if (msg === '商品に不具合があった') {
    reply = '大変申し訳ありません。手数をおかけいたしますが、不具合対象商品と不具合の内容を記載して送信いただけると幸いです。'
  } else if (msg === 'サービスの種類を知りたい') {
    reply = '準備中です〜〜'
  } else {
    reply = 'ごめん、わからない！！'
  }
  return reply
}

function generateRandomNum (num) {
  return Math.floor(Math.random() * num)
}

const replyQA = (message) => {

}

// Module Export
module.exports = { replyMessage, replyQA }
