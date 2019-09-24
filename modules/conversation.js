// https://stackoverflow.com/questions/46715484/correct-async-function-export-in-node-js

const fetch = require('node-fetch')

const replyMessage = async (message) => {
  let reply
  if (message === 'こんにちは') {
    reply = 'ヤッホー！'
  } else if (message.includes('お腹空いた')) {
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
    reply = ''
  }
  return reply
}

// Module Export
module.exports.replyMessage = replyMessage
