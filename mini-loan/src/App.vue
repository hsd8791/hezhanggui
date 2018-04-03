<template>
  <div id="app" v-loading='loading' element-loading-text='请稍后'>

    <div class="router-view-container" :class="{'show-foot':footNavShow}">
    <keep-alive>
      <!-- <transition :name='enter'> -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
      <!-- </transition> -->
    </keep-alive>
      <!-- <transition :name='enter'> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- </transition> -->

    </div>
  <!-- <transition :name='enter'> -->
    <foot-nav v-if='footNavShow' ></foot-nav>
  <!-- </transition> -->
  <remind :remind='remind'></remind >
  <contact></contact>
  <remind-simple></remind-simple>
  <button id="testBttn" @click='test' v-if='busDebug'>test</button>
  </div>
</template>

<script>
import router from './router'
import footNav from './foot.vue'
import contact from './contacts.vue'
import publicFun from './js/public.js'
import bus from './bus.js'
import './css/icons.css'
import './css/input.scss'
import remindSimple from './components/tmpts/simple_remind.vue'
// import './libs/font-awesome.min.css'
export default {
  name: 'App',
  // cmpt:/borrow/,
  data: function() {
    return {
      enter: '',
      busDebug:'',
      // wechatAPI:'wechat/jsconfig',
      loading: false,
      vueName: 'App',
      urlSales:'qudao/pv?qudao=',
      footNavShow: true,
      // account:'请登录',
      response: null,
      editing: true,
      backAfterPost: false,
      remind: {
        isShow: false,
        remindMsg: 'remind',
        self_: this,
        remindOpts: [{
          msg: '确定',
        }, ],
      },

    }
  },
  methods: {
    // getAuditingApply() {
    //   let params = bus.auditingApplyParams
    //   let timeNow = (new Date()).getTime()
    //   this.getAuditingApplyPage(params.crrtPage, timeNow, (end) => {
    //     if (!end) {
    //       this.getAuditingApply()
    //     }
    //   })
    // },
    // getAuditingApplyPage(page, now, cb) {
    //   let limit = 10,
    //     url = 'lendApply/borrowLoanRecords'
    //   let getUrl = url+'?limit=10&page='+page
    //   this.$http.get(getUrl).then(res => {
    //     console.warn('res auditingApply', res)
    //     let list = res.body.data.data,
    //       l = list.length,
    //       end = false
    //     if (l === 0) {
    //       end = true
    //     }
    //     bus.auditingApplyParams.crrtPage++
    //       for (let i = 0; i < l; i++) {
    //         console.log('now - list[i].create_time',now - list[i].creat_time)
    //         if (now - list[i].creat_time < 86400000) {
    //           console.log('i',i,list[i])
    //           bus.auditingApply[list[i].lendingUid]=list[i]
    //         } else {
    //           end = true
    //           break
    //         }
    //         // bus.auditingApply=res.body.data
    //       }
    //       console.log('end',end)
    //      cb(end)
    //   }, err => {})

    // },
    fromSales(w){
      sessionStorage.setItem('salesWay',w)
      publicFun.get(this.urlSales+w,this,()=>{
      })
    },
    test(){
      // bus.remindSimple.isShow=!bus.remindSimple.isShow
      console.log('bus',bus)
      publicFun.goUpLv()

      // publicFun.checkSession(this)
      // publicFun.checkSingleFilled ('credit/shujumoheSimQueryStatus','cfgEssential')
      // MtaH5.clickStat('1')
       // MtaH5.clickStat('1',{'002':'test qudao','001':'test id'})
      // MtaH5.clickStat('000',{'0001':'速度快'})
      // bus.checkAllFilled(bus.cfgEssential)
      // bus.checkAllFilled(bus.cfgOptional)
      // bus.$emit('checked_fill_status', bus.fillStatusCfg)
    },
    checkSession(cfg) {
      console.log('checkSession')
      if(!cfg){
        cfg={}
      }
      var r = this.remind
      this.loading = true
      this.$http.get('account/checkSession').then(res => {
        var data = res.body.data
        console.log('session data', data)
        if (data) {
          // bus.account=data.phone
          // bus.uniqueId=data.uniqueId
          bus.$emit('account_change', localStorage.userID, localStorage.uniqueId)
          // publicFun.wxApiConfig(this)
          if (data.isSetPwd == 0) {
            // console.log('no set pwd')
            r.remindOpts = [{
              msg: '确定',
              callback: () => {
                publicFun.goPage('/pwd')
              }
            }]
            r.remindMsg = '请设置密码'
            r.isShow = true
          }else{
            if(cfg.callback&& cfg.callback instanceof Function){
              callback()
            }
          }
          publicFun.wechatAuth(this)
        }else{
          if(cfg.forceLogin){
            r.remindMsg='请登录'
            r.remindOpts=[{
              msg:'确认',callback:()=>{publicFun.goPage(this.$route.path+'/login')}
            },{
              msg:'取消'
            },]
            r.isShow=true
          }
        }
        this.loading = false
      }, err => {})
    },
    // wxApiConfig(){
    //     var indexUrl=encodeURI(location.href)
    //     publicFun.get('wechat/jsconfig'+'?url='+indexUrl,this,()=>{
    //     // publicFun.get(this.wechatAPI,this,()=>{
    //     console.log('wechat API',this.response.body)
    //     var data=this.response.body.data
    //     wx.config({
    //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //       appId:data.appId, // 必填，公众号的唯一标识
    //       timestamp: data.timestamp, // 必填，生成签名的时间戳
    //       nonceStr: data.nonceStr, // 必填，生成签名的随机串
    //       signature:data.signature ,// 必填，签名，见附录1
    //       jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     })
    //     wx.ready(function(){
    //       console.warn('wx config success')

    //     });
    //     wx.error((res)=>{
    //       // alert(res)
    //       var remind=this.remind
    //       remind.remindMsg='分享操作无法完成'
    //       remind.remindMsgDscrp=res
    //       remind.remindOpts=[{msg:'确定'}]
    //       remind.isShow=true
    //     });
    //   })
      
    // },
  },
  created() {
    bus.auditingApplyParams = {
      crrtPage: 0,
      ttlPage: null,
    }
    bus.getCannotApplyMarket()
    // bus.auditingApply={},
    // let timeNow = (new Date()).getTime()
    // this.getAuditingApply()
    var way = this.$route.query.qudao
    console.log('way', this.$route)
    if (way) {
      this.fromSales(way)
      localStorage.qudao = way
    }
    // setTimeout(()=> {
    publicFun.wxApiConfig(this)
      // }, 5000);
    this.busDebug = bus.relativeUrlTest
    bus.$on('account_change', (ac) => {
      if (ac !== '请登录') {
        console.log('刷新页面 wxapi')
          // publicFun.wxApiConfig(this)
      }
    })
    bus.$on('foot_show_change', (footShow) => {
      this.footNavShow = footShow
    })
    bus.$on('url_change', (action) => {
      this.enter = action
    })
    this.checkSession()
    this.footNavShow = true
  },
  watch: {
    // account:function(val){
    //   // console.log('account change',val)
    //   Bus.$emit('account change',val)
    // }
  },
  components: {
    'foot-nav': footNav,
    contact:contact,
    'remind-simple':remindSimple,
  }
}
</script>

<style lang="scss" scoped>
  body{
    /*position: relative;*/
    
  }

  .show-foot{
    margin-bottom: 0.5rem;

  }
  #app {
    position: absolute;
    top: 0;bottom: 0;
    width: 100%;
    overflow: hidden;
    left: 0;right: 0;
    /*height: 100%;*/ 
    /*height: 100%;*/
    /*z-index: 2;*/
    /*padding-bottom: 0.5rem;*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 0.65rem;
    /*background: #fcf9fe;*/
    background: #f4f4f4;
    /*z-index: 999;*/
    /*margin-top: 0.6rem;*/
  }

</style>
<style type="text/css" lang='scss' >
  /*$navColor:#8f8e94;*/
  $navColor:#8f8e94;
  $navHeight:0.5rem;
  /*$activeColor:#cd331c;*/
  $activeColor:#0463db;
  /*$navBackground:#eee;*/
  $navBackground:#fcf9fe;
  /*$itemNameColor:#8f8e94;*/
  /*#323233;*/
  /*$itemIconColor:#8f8e94;*/
  #testBttn{
    z-index: 999;
    font-size: 0.2rem;
    width: 0.4rem;
    height: 0.3rem;
    position: absolute;
    left: 0;
    bottom: 1rem;
  }
  .foot-nav{
    /*border-top:0.5px solid $navColor ;*/
    width: 100%;
    background: $navBackground;
    position: absolute;
    height: $navHeight;
    bottom: 0;
    display: flex;
    border: 0px solid #efeff4;
    border-top-width: 1px;
    .nav-btn{
      -webkit-tap-highlight-color: transparent;
      width: 50%;
      height: 100%;
      text-decoration: none;
      display: inline-block;
      position: relative;
      font-size: 0.16rem;
      vertical-align: center;
      line-height: $navHeight;
      color: $navColor;
      /*position: relative;*/
      *{
        /*border:1px solid red;*/
      }
      .nav-icon{
        width: 30%;
        /*height: 50%;*/
        /*position: relative;*/
        /*top: 0;*/
        /*right: 0;left: 0;*/
        margin: 0.03rem auto 0;
        font-size: 0.2rem;
        line-height: 1.5;
      }
      .nav-item{
        /*width: 100%;*/
        /*margin: 0 auto;*/
        /*height: 50%;*/
        font-size: 0.12rem;
        line-height: 1.2;
      }
    }
    .active{
      /*background: #eee;*/
      color:$activeColor;
    }
  }
  
  /*.back-enter-active{
    transition: transform .5s
  }
  .back-enter,   {
    transform: translateX(100%)
  }
  .back-leave-to{
    transform: translateX(-100%);
  }*/
</style>