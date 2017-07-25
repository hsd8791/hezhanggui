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
      window.history.pushState("object or string", "Title",'/m/#/index/apply_borrow?uniqueId='+bus.uniqueId)
    },
    // changeUrlSign(){
      // window.history.pushState("object or string", "Title",'/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId)

    // },
  },
  events: {},
  created(){
    // this.path=this.$route.path
    publicFun.checkSession(this)
  	bus.$on('close_share_cover',()=>{
  		this.shareCoverShow='none'
      // window.history.pushState("object or string", "Title",'/m/#'+this.$route.path)
      publicFun.goPage(-1)

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
