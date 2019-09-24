module.exports = {
  faq: {
    type: 'template',
    altText: 'this is a buttons template',
    template: {
      type: 'buttons',
      actions: [
        {
          type: 'message',
          label: '開店時間を知りたい',
          text: '開店時間を知りたい'
        },
        {
          type: 'message',
          label: '商品に不具合があった',
          text: '商品に不具合があった'
        },
        {
          type: 'message',
          label: 'サービスの種類を知りたい',
          text: 'サービスの種類を知りたい'
        },
        {
          type: 'message',
          label: 'その他(メッセージ送信)',
          text: 'その他(メッセージ送信)'
        }
      ],
      title: 'FAQ',
      text: '種類をご選択ください'
    }
  }
}
