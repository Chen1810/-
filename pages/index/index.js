//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    windowWidth:'',
    userInfo: {},
    song_list:[],
    movieList:[],
    videoList:[]
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //获取调试系统信息 匹配宽高
    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          windowWidth:res.windowWidth,
          scrollHeight: res.windowHeight - 44
        })
      }
    })

    //请求歌曲
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v2/restserver/ting?method=baidu.ting.billboard.billList',
      data: {
        type: 1,
        size: 6,
        offset: 0
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log('请求歌曲列表', that.data.song_list)
        that.setData({
          song_list: res.data.song_list
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

    //请求电影列表；
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      data: {
        start: 0,
        count: 6
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "content-type": "json"
      },
      success: function(res){
        // success
        console.log('请求电影列表', res.data.subjects)
        var movies = res.data.subjects;
        that.setData({
          movieList:movies
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

    //请求视频列表;
    wx.request({
      url:'https://newapi.meipai.com/output/channels_topics_timeline.json?id=1&limit=6',
      success:function(res){
        console.log('请求视频列表',res.data)
        var video=[];
        for(var i=0;i<6;i++){
          video[i]=res.data[i]
        }
        that.setData({
          videoList:video
        })
      }
    })
  },
  onPlay: function () {
    
  }
})
