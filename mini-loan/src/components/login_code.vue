<template>
	<div id="loginVue" class="input" v-loading='loading'  element-loading-text='请稍后'>
	<h1 class="title"><app-back></app-back>{{action=='signup'?'注册':'找回密码'}}</h1>
	<div class="logo-container" >
	<!-- v-if='action=="login"' -->
	<!-- <h2 class="log-title">验证手机找回密码</h2> -->
	</div>
	
		<div class="container" v-if='!pwdLogin'>
			<div class="wraper">
				<label>手机号：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='请填写手机号' v-model='cellphone' @blur.once='blured'  :class='{"valid-border":cellphoneValid,"error-border":!cellphoneValid}'></el-input>
				<!-- <i :class="{'el-icon-check':cellphoneValid,'el-icon-close':!cellphoneValid}"></i> -->
			</div>
			<div class="wraper">
				<label>图片码：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='图片验证码' v-model='picCode' @blur.once='blured'  :class='{"valid-border":picCodeValid,"error-border":!picCodeValid}'></el-input>
				<img class='pic-code' :src="picCodeSrc" alt='填手机号获取' @click='getPicCode'>
				<!-- <i :class="{'el-icon-check':verifyCodeValid,'el-icon-close':!verifyCodeValid}"></i> -->
			</div>
			<div class="wraper">
				<label>验证码：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='手机验证码' v-model='verifyCode' @blur.once='blured'  :class='{"valid-border":verifyCodeValid,"error-border":!verifyCodeValid}'></el-input>
				<el-button class='getVerify' type="warning" @click='getCode' :disabled="banGetCode||!cellphoneValid||!picCodeValid">{{codeBtnMsg}}</el-button>
				<!-- <i :class="{'el-icon-check':verifyCodeValid,'el-icon-close':!verifyCodeValid}"></i> -->
			</div>
		</div>

		<el-button class='submit' type="success" :disabled='!((allValid&&verifyCodeValid&&!pwdLogin)||(allValid&&pwdValid&&pwdLogin))' @click='login'>{{action=='signup'?'注册':'确认'}}</el-button>
		<div class='ctrl-container' v-if='action=="signup"'>
			<span class="login-link" @click='goLogin'>
				已有账号？
				<span class='signup-btn' @click='signup'>登录</span>
			</span>
		</div>


		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import remind from './tmpts/remind.vue'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				pwdLogin:false,
				actions:['login','signup','findPwd'],
				action:'signup',
				referrerUniqueId:null,
				pwdLost:true,
				cellphone:'',
				verifyCode:'',
				picCode:'',
				picCodeSrc:'',
				banGetCode:false,
				loading:false,
				urlGetVerifyCode:'account/sendVerifyCode',
				urlGetPicCode:'account/captcha',
				urlPhoneUsed:'account/isPhoneRegister',
				// loadText:'',
				pwd:'',
				codeBtnMsg:"获取验证码",
				// banSubmit:!this.allValid,
				// verifyCodeValid:true,//!!!!
				formData:{
					
				},
				backAfterPost:false,
				response:null,
				remind:{
					isShow:false,
					remindMsg:'',
					self_:this,// !!!important 传入自定remind
					remindOpts:[
					{msg:'确定',callback:function(){
						// console.log('try align')
					}}
					]
				},
		
			}
		},
		methods: {
			signup(){
			
			},
			findPwd(){
				
			},
			goLogin(){
				publicFun.goPage('/mine/login')
			},
			pwdLog(b){
				this.pwdLogin=b
				// this.verifyCode=''
			},
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			getCode(){

				var url=this.urlGetVerifyCode+'?phone='+this.cellphone
				var url=publicFun.urlConcat(this.urlGetVerifyCode,{
					phone:this.cellphone,
					code:this.picCode,
				})
				publicFun.get(url,this,()=>{
					console.log('get code response',this.response)

					this.banGetCode=true
					var expire=60,self_=this
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
				},()=>{},()=>{
					if(this.response.body.error==20018){
						this.picCode=''
						this.getPicCode()
					}
				})
			},
			getPicCode(){
				if(!this.cellphoneValid){
					return
				}
				// var url=this.urlGetPicCode+'?phone='+this.cellphone
				var url=publicFun.urlConcat(this.urlGetPicCode,{
					phone:this.cellphone,
					v:Math.random().toFixed(5)
				})
				this.picCodeSrc=this.$http.options.root+'/'+url	
				
			},
			setFormData(dataKey){
				if(this[dataKey+'Valid']){
					this.formData[dataKey]=this[dataKey]
				}else{
					this.formData[dataKey]=null
				}
			},
			login(){
				this.loading=true
				var queryBody = {	phone:this.cellphone},subDomain
				// if(!this.pwdLogin){
					queryBody.code=this.verifyCode
					// queryBody.platform='xh'
					subDomain='/loginByCode'
				if(this.action==='signup'&&this.referrerUniqueId){
					queryBody.uniqueId=this.referrerUniqueId
				}
				var salesWay=sessionStorage.getItem('salesWay')
				if(salesWay){
					queryBody.qudao=salesWay
				}
				var url = publicFun.urlConcat('account'+subDomain,queryBody)
				console.log('login code URL',url)
				publicFun.get(url,this,()=>{
					var data=this.response.body.data
					console.log('data log',data)
					localStorage.userID=data.phone
					localStorage.pwd=this.pwd
					localStorage.uniqueId=data.uniqueId
					localStorage.qualified=data.mayiQualify
					// console.log('login success',res)
					bus.$emit('account_change', data.phone,data.uniqueId,data.mayiQualify)
					if(data.isSetPwd==='0'||(this.pwdLost===true&&this.pwdLogin===false)){
							// console.log('pwd not set')
							
							publicFun.goPage(this.$route.path+'/pwd')
						}else{
							// this.remind.remindOpts=[{msg:'确定',callback:()=>{
							// 	// console.log('back',1)
							// 	// publicFun.goPage(-1)
							// 	publicFun.goTopLv()
							// }}]
							// this.remind.remindMsg='登录成功'
							// this.remind.isShow=true
							let r=bus.remindSimple
							r.isShow=true
							r.remindMsg='登录成功'
							r.cbReset(this)
							r.cbLeave=()=>{
								publicFun.goTopLv()
							}
							publicFun.wechatAuth(this)
						}
				})
		
			},
		},
		created:function(){
			// setTimeout(function() {
				// publicFun.goTopLv()
			// }, 3000);
			// bus.$on('close_remind',()=>{})
			// console.log('route',this.$route)
			if(localStorage.userID){
				this.cellphone=localStorage.userID
			}
			if(this.$route.query.findPwd){
				this.action='findPwd'
			}
			if(this.$route.query.signup){

				this.action='signup'
			}
			if(this.$route.query.uniqueId){
				this.referrerUniqueId=this.$route.query.uniqueId
			}
		},
		watch:{
			cellphoneValid(v){
				if(v){
					if(this.action==='signup'){
						publicFun.get(this.urlPhoneUsed+'?phone='+this.cellphone,this,()=>{
							console.log('res phone used',this.response.body)
							if(this.response.body.data.status){
								let r=this.remind
								r.remindOpts=[{
									msg:'是，此号码登录',callback:()=>{
										localStorage.userID=this.cellphone
										publicFun.resetLocalUserInfo()
										publicFun.goPage('/mine/login')
									}
								},{
									msg:'不，换个号码',callback:()=>{
										this.cellphone=''
									}
								}]
								r.remindMsg='此账号已注册，是否使用此账号登录'
								r.isShow=true
							return
							}
						})
					}
					this.getPicCode()

				}
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
			picCodeValid:function(){
				var reg=/^.{4}$/;
				return reg.test(this.picCode)
			},
			pwdValid:function(){
				var reg=/^.{6,}$/;
				return reg.test(this.pwd)
			},
			allValid:function(){
				var t=this
				return (t.verifyCodeValid||t.pwdValid||t.picCodeValid)&&t.cellphoneValid&&true//&&
			},
		},
		events: {},
		components: {
			remind:remind
		}
	}
</script>

<style lang='scss' scoped>
#loginVue{
	.container{
		/*margin-top: 2rem;*/
		/*margin-left:0.5rem;*/
		margin:auto auto;
		width: 80%;
	}
	.logo-container{
		width: 100%;
		height: 2.45rem;
		background: url(../assets/img/logo.png) center center no-repeat;
		background-size: 80%;
		.logo{
			width: 100%;
		}
	}
	.pic-code{
		position: absolute;
		right: 0;top: 0;bottom: 0;
		margin:auto 0.05rem;
		height: 0.36rem;
		width: 0.98rem;
		font-size: 0.13rem;
		line-height: 0.36rem;
		color:#bfcbd9;

	}
	.getVerify{
		position: absolute;
		margin:auto 0;
		top: 0;bottom: 0; right: 0.05rem;
		height: 0.36rem;
		width: 1rem;
		padding:0.1rem;
		color:#222;
		background-color: #dfe0dd;
		border-color:#dfe0dd;
		/*box-sizing: content-box;*/

	}
	button[class~='el-button--warning'].is-disabled{
		opacity: 0.3;
	}
	.change{

		/*margin-bottom: 0.3rem;*/

		color:#6a7fa5;
		color:#666;
		font-size: 0.18rem;
		display: flex;
		width: 80%;
		height: 0.45rem;
		position: relative;
		margin:0.1rem auto;

		/*font-weight: bold;*/
		.logOpts{
			display: block;
			width: 50%;
			padding:0.1rem 0.2rem;
			border: 0px solid #e5e5e5 ;
			border-bottom-width: 0.01rem;
		}
		.find-pwd{
			width: 100%;
		}
		.active{
			border-bottom-color: #d6322c;
			border-bottom-width: 0.04rem;
		}
	}
	.submit{
		/*transition: 0.2s;*/
		width: 80%;
		background-color:#d6322c;
		background: linear-gradient(90deg,#d6322c 0%,#d6322c 30%,#eda29a);
		border-width: 0;
		border-radius: 0.1rem;
    /*border-color: #ff6231;*/
	}
	button[class~='el-button--success'].is-disabled{
		opacity: 0.4;
	}
	.ctrl-container{
		margin: 0.2rem 0.4rem;
		font-size: 0.14rem;
		text-align: right;
		.login-link{
			color:#242527;
		}
		.signup-btn{
			color:#6a7fa5;
		}
	}
	.signup-container{
		margin-top:0.5rem;
	}
}
</style>
<style type="text/css">

</style>

