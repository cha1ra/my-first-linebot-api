// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')
const messages = require('./messages')

const exportReplyMessageObject = async (msg) => {
  let reply = ''
  if (msg.includes('こんにちは')) {
    const types = ['ヤッホー！', 'ご丁寧にありがとうございます', '今日もいい天気ですね〜', '暇なんですか？']
    reply = generateTextTemplate(types[generateRandomNum(types.length)])
  } else if (msg.includes('運勢') || msg.includes('占')) {
    const fortunes = ['大吉', '中吉', '吉', '凶']
    reply = generateTextTemplate(`今日の運勢は...${fortunes[generateRandomNum(fortunes.length)]}です〜`)
  } else if (msg.includes('食べたい') || msg.includes('腹')) {
    // ぐるナビURL設定
    const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=${encodeURI(msg.split('食')[0])}`
    console.log(url)
    try {
      const res = await fetch(url, { method: 'GET' })
      const json = await res.json()
      // const response = JSON.stringify(json)
      reply = generateTextTemplate(`${json.rest[0].name}なんかはいかがですか？美味しいですよ♪\n${json.rest[0].url}`)
    } catch (e) {
      console.error('Error:', e)
    }
  } else if (msg === '開店時間を知りたい') {
    reply = generateTextTemplate('本日は朝10:00から開店しています♪')
  } else if (msg === '商品に不具合があった') {
    reply = generateTextTemplate('大変申し訳ありません。手数をおかけいたしますが、不具合対象商品と不具合の内容を記載して送信いただけると幸いです。')
  } else if (msg === 'サービスの種類を知りたい') {
    // reply = messages.serviceTypes
    reply = messages.faq
    console.log('ミーせて')
    console.log(reply)
  } else if (msg === 'その他(メッセージ送信)') {
    reply = generateTextTemplate('こちらにメッセージを記入してください！')
  } else {
    reply = generateTextTemplate('ごめん、わからない！！')
  }
  return reply
}

function generateRandomNum (num) {
  return Math.floor(Math.random() * num)
}

function generateTextTemplate (text) {
  return {
    type: 'text',
    text: text
  }
}

const replyQA = (message) => {

}

// Module Export
module.exports = { exportReplyMessageObject, replyQA }
