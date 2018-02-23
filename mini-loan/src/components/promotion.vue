<template>
	<div id="promotionVue">
	<div class="input">
		<h1 class="title">
		<app-back></app-back>
			我要赚钱
		</h1>
		<el-button type='success' class="confirm" @click='changeUrlSign'>点击推广给朋友</el-button>
		<el-button type='success' class="confirm" @click='goP("/partner")'>我的伙伴</el-button>
		<el-button type='success' class="confirm" @click='goP("/commission")'>我的佣金</el-button>
	</div>
   <!-- <div class="weixin_layout" id='cover'></div> -->
   <share :show='shareCoverShow'></share>
   <remind :remind='remind'></remind>
	</div>

</template>

<script>
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	import share from '../components/tmpts/share_cover.vue'

export default {
  data() {
    return {
    	shareCoverShow:'none',
    	response:null,
    	loading:true,
    	editing:true,
      wechatAPI:'wechat/jsconfig',
    	backAfterPost:false, // watch out
    	url:'',
    	remind:{
    		isShow:false,
    		remindMsg:'remind',
    		self_:this,
    		remindOpts:[
    		{msg:'确定',},
    		],
    	},
    }
  },
  methods:{
  	goP(path) {
  		publicFun.goPage(this.$route.path + path)
  	},

  	 changeUrlSign(){
      this.shareCoverShow='block'
      if(publicFun.isWeiXin()){
        return
      }
      window.history.pushState("object or string", "Title",bus.relativeUrlTest+'/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId)
    },
    configMenueShare(){
      wx.onMenuShareAppMessage({
          title: '陈管家推广链接', // 分享标题
          desc: '来自'+publicFun.phonePartshow(bus.account)+'的邀请', // 分享描述
          link: 'http://hzg.he577.com'+bus.relativeUrlTest+'/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://hzg.he577.com/test/m/static/img/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: ()=> { 
            var remind=this.remind
            remind.remindMsg='分享成功'
            remind.remindOpts=[{msg:'确定'}]
            remind.isShow=true
            
              // 用户确认分享后执行的回调函数
          },
          cancel: ()=> { 
            var remind=this.remind
            remind.remindMsg='取消分享'
            remind.remindOpts=[{msg:'确定'}]
            remind.isShow=true
              // 用户取消分享后执行的回调函数
          }
      });
    },
  },
  events: {},
  created(){
    var wxInterval=setInterval(()=>{
      if(bus.wxConfiged){
        clearInterval(wxInterval)
        this.configMenueShare()
      }
    })
    // publicFun.wxApiConfig(this,this.configMenueShare)
  	publicFun.checkSession(this)
    bus.$on('close_share_cover', () => {
      this.shareCoverShow = 'none'
      window.history.pushState("object or string", "Title", '/test/m/#' + this.$route.path)
      if (!publicFun.isWeiXin()) {
        publicFun.goPage(-1)
      }
    })
  },
  destroyed(){
    
  },
  components: {
  	share:share,
  }
}
</script>

<style lang='scss' scoped>


</style>
