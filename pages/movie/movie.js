// pages/movie/movie.js
Page({
  data:{
    scrollHeight:'',
    movieList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
        "content-type": "json"
      },
      success: function(res){
        // success
        console.log(res.data.subjects)
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

    //滚动区域高度自适应
    wx.getSystemInfo({
      success: function (res) {
        // success
        console.log(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight - 44
        })
      }
    })
    console.log(this.data.scrollHeight)

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})