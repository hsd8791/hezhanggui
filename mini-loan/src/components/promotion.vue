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
      window.history.pushState("object or string", "Title",'/test/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId)
      this.shareCoverShow='block'
    },
  },
  events: {},
  created(){
    var indexUrl=encodeURI(location.href)
    publicFun.get(this.wechatAPI+'?url='+indexUrl,this,()=>{
    // publicFun.get(this.wechatAPI,this,()=>{
      console.log('wechat API',this.response.body)
      var data=this.response.body.data
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature:data.signature ,// 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function(){
        console.warn('wx config success')

      });
      wx.error((res)=>{
        // alert(res)
        var remind=this.remind
        remind.remindMsg='分享操作无法完成'
        remind.remindMsgDscrp=res
        remind.remindOpts=[{msg:'确定'}]
        remind.isShow=true
      });
    })
    wx.onMenuShareAppMessage({
        title: '禾掌柜推广链接', // 分享标题
        desc: '禾掌柜推广描述', // 分享描述
        link: 'http://hzg.he577.com'+'/test/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
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
  	publicFun.checkSession(this)
  	bus.$on('close_share_cover',()=>{
  		this.shareCoverShow='none'
	    // publicFun.goPage(-1)
	    window.history.pushState("object or string", "Title",'/test/m/#'+this.$route.path)
  	  })
  },
  components: {
  	share:share,
  }
}
</script>

<style lang='scss' scoped>


</style>
