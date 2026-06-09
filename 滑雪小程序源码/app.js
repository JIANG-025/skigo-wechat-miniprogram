App({
  globalData: {
    appName: 'SkiGo',
    cloudEnvId: 'cloud1-d6geemhftac318bc0',
    userInfo: null
  },
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: this.globalData.cloudEnvId,
        traceUser: true
      })
    }
    console.log('SkiGo miniprogram launched')
  }
})
