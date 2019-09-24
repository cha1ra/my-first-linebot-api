// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')

const replyMessage = async (message) => {
  let reply = ''
  if (message.includes('こんにちは')) {
    const types = ['ヤッホー！', 'ご丁寧にありがとうございます', '今日もいい天気ですね〜', '暇なんですか？']
    reply = types[generateRandomNum(types.length)]
  } else if (message.includes('運勢')) {
    const fortunes = ['大吉', '中吉', '吉', '凶']
    reply = `今日の運勢は...${fortunes[generateRandomNum(fortunes.length)]}です〜`
  } else if (message.includes('食べたい')) {
    // ぐるナビURL設定
    const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=${encodeURI(message.split('食')[0])}`
    console.log(url)
    try {
      const res = await fetch(url, { method: 'GET' })
      const json = await res.json()
      // const response = JSON.stringify(json)
      reply = `${json.rest[0].name}なんかはいかがですか？美味しいですよ♪\n${json.rest[0].url}`
    } catch (e) {
      console.error('Error:', e)
    }
  } else {
    reply = ''
  }
  return reply
}

function generateRandomNum (num) {
  return Math.floor(Math.random() * num)
}

// Module Export
module.exports.replyMessage = replyMessage
