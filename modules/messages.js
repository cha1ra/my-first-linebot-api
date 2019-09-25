module.exports = {
  faq: {
    type: 'template',
    altText: 'お問い合わせ内容を選択してください',
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
  },
  serviceTypes: {
    type: 'template',
    altText: 'this is a carousel template',
    template: {
      type: 'carousel',
      actions: [],
      columns: [
        {
          thumbnailImageUrl: 'http://aira0113.sakura.ne.jp/proglearn-docs/img/f-3.png',
          title: '            Webページ作成',
          text: 'HTML, CSS, JS によるHP作成',
          actions: [
            {
              type: 'uri',
              label: '詳細を確認する',
              uri: 'https://corp.proglearn.com/'
            },
            {
              type: 'message',
              label: '申し込む',
              text: 'https://corp.proglearn.com/'
            }
          ]
        },
        {
          thumbnailImageUrl: 'http://aira0113.sakura.ne.jp/proglearn-docs/img/f-4.png',
          title: '             行動計画表作成',
          text: '予算・KPIのシミュレーション',
          actions: [
            {
              type: 'uri',
              label: '詳細を確認する',
              uri: 'https://corp.proglearn.com/'
            },
            {
              type: 'uri',
              label: '申し込む',
              uri: 'https://corp.proglearn.com/'
            }
          ]
        },
        {
          thumbnailImageUrl: 'http://aira0113.sakura.ne.jp/proglearn-docs/img/f-1.png',
          title: '            コンサルティング',
          text: '     コンサルティングを実施',
          actions: [
            {
              type: 'uri',
              label: '詳細を確認する',
              uri: 'https://corp.proglearn.com/'
            },
            {
              type: 'message',
              label: '申し込む',
              text: 'https://corp.proglearn.com/'
            }
          ]
        }
      ]
    }
  }
}
