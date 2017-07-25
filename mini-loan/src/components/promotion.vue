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
