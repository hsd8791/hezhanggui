<template>
  <div id="app">

    <div class="router-view-container" :class="{'show-foot':footNavShow}">
     <!--  <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>

  </div>
    <!-- <foot-nav v-if='footNavShow' ></foot-nav> -->
  <remind :remind='remind'></remind >
  <!-- <button id="testBttn" @click='test'>test</button> -->
  </div>
</template>

<script>
// import router from './router'
// import footNav from './foot.vue'
import publicFun from './js/public.js'
// import bus from './bus.js'
// import remind from './components/tmpts/remind.vue'
// import './css/icons.css'
// import './css/input.css'
// import './libs/font-awesome.min.css'
export default {
  name: 'App_pay',
  // cmpt:/borrow/,
  data: function() {
    return {
      enter: '',
      loading: false,
      vueName: 'App',
      footNavShow: true,
      // account:'请登录',
      response: null,
      editing: true,
      backAfterPost: true,
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
    // test(){
    //   console.log('test',bus)
    //   bus.checkAllFilled(bus.cfgEssential)
    //   bus.checkAllFilled(bus.cfgOptional)
    //   bus.$emit('checked_fill_status', bus.fillStatusCfg)
    // },
    checkSession() {
      console.log('checkSession')
      this.loading = true

      this.$http.get('account/checkSession').then(res => {
        var data = res.body.data
        console.log('session data', data)
        if (data) {
          // bus.account=data.phone
          // bus.uniqueId=data.uniqueId
          // bus.$emit('account_change', localStorage.userID, localStorage.uniqueId)
          if (data.isSetPwd == 0) {
            // console.log('no set pwd')
            var r = this.remind
            r.remindOpts = [{
              msg: '确定',
              callback: () => {
                publicFun.goPage('/pwd')
              }
            }]
            r.remindMsg = '请设置密码'
            r.isShow = true
          }
          publicFun.wechatAuth(this)
        }
        this.loading = false
      }, err => {})
    },

  },
  created: function() {

    // this.checkFilled()
    // bus.$on('foot_show_change', (footShow) => {
    //   this.footNavShow = footShow
    // })
    // bus.$on('url_change', (action) => {
    //   this.enter = action
    // })
    this.checkSession()
    // this.footNavShow = true
  },
  watch: {
    // account:function(val){
    //   // console.log('account change',val)
    //   Bus.$emit('account change',val)
    // }
  },
  components: {
    // 'foot-nav': footNav,
    // remind: remind,
  }
}
</script>

<style lang="scss" scoped>
  body{
    /*position: relative;*/
    
  }
  .router-view-container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    overflow-x: hidden;
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
    z-index: 9999;
    /*margin-top: 0.6rem;*/
  }

</style>
<style type="text/css" lang='scss' >
  /*$navColor:#8f8e94;*/
  $navColor:#8f8e94;
  $navHeight:0.5rem;
  /*$activeColor:#cd331c;*/
  $activeColor:#cc2a1b;
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