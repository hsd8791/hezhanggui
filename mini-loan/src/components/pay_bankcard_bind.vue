<template>
	<div id="bankcardBindVue">
		<div class="input" v-loading='loading' element-loading-text='请稍后'>
			<h1 class="title">
				<app-back></app-back>
				绑定银行卡
			</h1>
			<div class="container">
				
			<div class="wraper">
				<label class="label" :disabled='!editing'>银行卡：</label> 
				<el-input :disabled='false'  type='number' placeholder='填写银行卡号码' v-model='bankcard' @blur.once='blured'  :class='{"valid-border":bankcardValid,"error-border":!bankcardValid}'></el-input>
				<!-- <i :class="{'el-icon-check':bankcardValid,'el-icon-close':!bankcardValid}"></i> -->
			</div>
			</div>
			<el-button type='success' :disabled='!bankcardValid' class='submit'  @click='submit'>提交</el-button>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
export default {
  data() {
    return {
    	bankcard:'',
   		response:null,
   		loading:false,
   		editing:true,
   		backAfterPost:false,// watch out
   		url:'unspay/bind?bankCardNo=',
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
  	submit(){
  		publicFun.get(this.url+this.bankcard,this,()=>{
  			let r=this.remind
  			r.remindMsg='绑定成功'
  			r.remindOpts={msg:'确定'}
  			r.isShow=true
  		})
  	},

  	blured($event){
  		var el=$event.target.parentElement.parentElement
  		el.className+=' validate'
  	},
  },
  events: {},
  created(){
  	publicFun.checkSession(this)
  },
  computed:{
  	bankcardValid:function(){
  		var reg=/\d/;
  		return reg.test(this.bankcard)
  	},
  },
  components: {}
}
</script>

<style>

</style>
