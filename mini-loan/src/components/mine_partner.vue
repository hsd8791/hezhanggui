<template>
	<div id="partnerVue" v-loading='loading' element-loading-text='请稍后'>
		<div class="input">
			<h1 class="title">我的下线</h1>
		</div>
		<remind :remind='remind'></remind >
	</div>
</template>

<script>
import bus from '../bus.js'
import publicFun from '../js/public.js'
import remind from '../components/tmpts/remind.vue'
export default {
  data() {
    return {
    	partners:null,
    	currentPage:1,
    	ttlPage:null,
    	response:null,
    	loading:false,
    	editing:true,
    	backAfterPost:false,
    	url:'agent/findAgent',
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
  created(){
  	this.get()
  },
  methods:{
  	get(){
  		var url = publicFun.urlConcat(this.url,{
  			limit:2,
  			page:this.currentPage
  		})
  		publicFun.get(url,this,()=>{
  			console.log('partner res',this.response)
  			var data=this.response.body.data
  			this.partners=data.data
  		})
  	},
  },
  events: {},
  components: {
  		remind:remind,
  	},
}
</script>

<style>

</style>
