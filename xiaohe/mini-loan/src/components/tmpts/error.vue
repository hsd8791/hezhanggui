<template>
	<div id="errorVue" class="input">
		一片带开发的荒地...
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../../js/public.js'
import remind from '../tmpts/remind.vue'
export default {
  data() {
    return {
    	response:null,
    	loading:true,
    	editing:true,
    	backAfterPost:true,
    	url:'url request',
    	remind:{
    		isShow:false,
    		remindMsg:'页面不存在',
        // remindMsgDscrp:'点击确定返回首页',
    		self_:this,
    		remindOpts:[
    		{msg:'确定',callback:()=>{
    			publicFun.goPage('/index')
    		}},
    		{msg:'取消',}
    		],
    	},
    }
  },
  methods:{},
  created(){
  	this.remind.isShow=true
  },
  events: {},
  components: {
  	remind:remind,
  }
}
</script>

<style>

</style>
