// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')

const replyMessage = async (message) => {
  let reply = ''
  if (message === 'こんにちは') {
    reply = 'ヤッホー！'
  } else if (message.includes('お腹空いた')) {
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
