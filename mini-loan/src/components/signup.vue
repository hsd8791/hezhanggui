<template>
	<div id="loginVue" class="input">
		<div class="container">
			<div class="wraper">
				<label>手机号：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='请填写手机号' v-model='cellphone' @blur.once='blured'  :class='{"valid-border":cellphoneValid,"error-border":!cellphoneValid}'></el-input>
				<i :class="{'el-icon-check':cellphoneValid,'el-icon-close':!cellphoneValid}"></i>
			</div>
			<div class="wraper">
				<label>验证码：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='请填写验证码' v-model='verifyCode' @blur.once='blured'  :class='{"valid-border":verifyCodeValid,"error-border":!verifyCodeValid}'></el-input>
				<el-button class='getVerify' type="warning" @click='getCode' :disabled="banGetCode">{{codeBtnMsg}}</el-button>
				<i :class="{'el-icon-check':verifyCodeValid,'el-icon-close':!verifyCodeValid}"></i>
			</div>
		</div>
		<el-button class='submit' type="success" :disabled='!allValid' >注册</el-button>
	</div>
</template>

<script>
	// import '../css/input.css'
	export default {
		data() {
			return {
				cellphone:'',
				verifyCode:'',
				banGetCode:false,
				codeBtnMsg:"获取验证码",
				// banSubmit:!this.allValid,
				// verifyCodeValid:true,//!!!!
				formData:{
					
				}
			}
		},
		methods: {
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			getCode(){
				this.banGetCode=true
				var expire=10,self_=this
				this.codeBtnMsg=expire+'s后获取'
				var T=setInterval(function(){
					expire--
					self_.codeBtnMsg=expire+'s后获取'
					if(!expire){
						clearInterval(T)
						self_.banGetCode=false
						self_.codeBtnMsg="获取验证码"
					}
				},1000)
			}
			,
			setFormData(dataKey){
				if(this[dataKey+'Valid']){
					this.formData[dataKey]=this[dataKey]
				}else{
					this.formData[dataKey]=null
				}
			},
		},
		watch:{
			cellphone:function(val){
				this.setFormData('cellphone')
			},
			verifyCode:function(val){
				this.setFormData('verifyCode')
			},
		},
		computed:{
			cellphoneValid:function(){
				var reg=/^1[1234567890]\d{9}$/;
				return reg.test(this.cellphone)
			},			
			verifyCodeValid:function(){
				var reg=/^\d{6}$/;
				return reg.test(this.verifyCode)
			},
			allValid:function(){
				var t=this
				return t.verifyCodeValid&&t.cellphoneValid&&true//&&
			},
		},
		events: {},
		components: {}
	}
</script>

<style lang='scss' scoped>
	.getVerify{
		position: absolute;
		margin:auto 0;
		top: 0;bottom: 0; right: 0.05rem;
		height: 0.36rem;
		width: 1.1rem;
	
		/*box-sizing: content-box;*/

	}
	.submit{
		width: 80%;
	}
</style>
<style type="text/css">

</style>

