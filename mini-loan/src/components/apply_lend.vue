<template>
	<div id="applyLendVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title"><app-back></app-back>开始放贷</h1>
    <el-button type='success' class="confirm" @click='share("borrower")'>点击分享给借款人</el-button>
		<!-- <el-button type='success' class="confirm" @click='share("partner")'>点击推广给朋友</el-button> -->
   <!-- <div class="weixin_layout" id='cover'></div> -->
   <share :show='shareCoverShow'></share>
   <remind :remind='remind'></remind>
 </div>

</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import remind from '../components/tmpts/remind.vue'
	import share from '../components/tmpts/share_cover.vue'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				shareCoverShow:'none',
        response:null,
        loading:false,
        editing:true,
        url:'',
        // backAfterPost:false,
        remind:{
          isShow:false,
          remindMsg:'请先登录',
          self_:this,
          remindOpts:[
          {msg:'确定',callback:()=>publicFun.goPage('/login')},
          ],
        },
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    share(to){
      if(bus.account==='请登录'){
        this.remind.isShow=true
        // publicFun.goPage('/login')
      }
      // if(to==='partner'){
        // this.changeUrlSign()
      // }
      // if(to==='borrower'){
      // }
      this.changeUrl()
      this.showCover()
    },
    showCover(){
      this.shareCoverShow='block'
    },
    changeUrl(){
      if(publicFun.isWeiXin()){
        return
      }
      window.history.pushState("object or string", "Title",'/test/m/#/index/apply_borrow?uniqueId='+bus.uniqueId)
    },
    configMenueShare(){
      wx.onMenuShareAppMessage({
          title: '禾掌柜', // 分享标题
          desc: '点击向'+bus.account+'借款', // 分享描述
          link: 'http://hzg.he577.com'+'/test/m/#/index/apply_borrow?uniqueId='+bus.uniqueId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    // changeUrlSign(){
      // window.history.pushState("object or string", "Title",'/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId)

    // },
  },
  events: {},
  created(){
    // this.path=this.$route.path
    var wxInterval=setInterval(()=>{
      if(bus.wxConfiged){
        clearInterval(wxInterval)
        this.configMenueShare()
      }
    })
    publicFun.checkSession(this)
  	bus.$on('close_share_cover',()=>{
  		this.shareCoverShow='none'
      // window.history.pushState("object or string", "Title",'/m/#'+this.$route.path)
      if(!publicFun.isWeiXin()){
        publicFun.goPage(-1)
      }

  	})
  },
  components: {
  	share:share,
    remind:remind,
  }
}
</script>

<style>

</style>
