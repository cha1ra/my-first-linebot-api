// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')

const replyMessage = async (message) => {
  let reply = ''
  if (message === 'こんにちは') {
    reply = 'ヤッホー！'
  } else if (message.includes('運勢')) {
    const fortune = ['大吉', '中吉', '吉', '凶']
    reply = `今日の運勢は...${fortune[Math.floor(Math.random() * 4)]}です〜`
  } else if (message.includes('食べたい')) {
    // ぐるナビURL設定
    const url = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${process.env.GURUNAVI_ID}&name=cafe`
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

// Module Export
module.exports.replyMessage = replyMessage
