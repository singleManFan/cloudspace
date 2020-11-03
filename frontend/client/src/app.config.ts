export default {
  pages: [
    'pages/index/index',
    'pages/jianji/jianji',
    'pages/xiaoce/xiaoce',
    'pages/liuyan/liuyan',
    'pages/gengxin/gengxin',
    'pages/webview/webview'
  ],
  tabBar: {
    custom: true,
    backgroundColor: '#fcee09',
    borderStyle: 'black',
    color: "#000",
    selectedColor: "#fcee09",
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/jianji/jianji',
        text: '简记',
      },
      {
        pagePath: 'pages/xiaoce/xiaoce',
        text: '小册',
      },
      {
        pagePath: 'pages/liuyan/liuyan',
        text: '留言',
      },
      {
        pagePath: 'pages/gengxin/gengxin',
        text: '更新',
      },
    ]
  },
  usingComponents: {},
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fcee09',
    navigationBarTitleText: 'cloudpress-个人写作',
    navigationBarTextStyle: 'black',
    backgroundColor: "#000",
  },
  cloud: true
}
