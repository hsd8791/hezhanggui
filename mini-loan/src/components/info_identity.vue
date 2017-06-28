<template>
	<div id='identityVue' class="input"  v-loading='loading'  element-loading-text='请稍后'>
		<h1 class='title'>
			身份验证
			<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
		</h1>
		<div class="container">
			<div class="wraper">
				<label>姓名：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input :disabled='!editing' placeholder='请输入真实姓名' v-model='name' @blur.once='blured'  :class='{"valid-border":nameValid,"error-border":!nameValid}'></el-input>
				<i :class="{'el-icon-check':nameValid,'el-icon-close':!nameValid}"></i>
			</div>

			<div class="wraper">
				<label>身份证号：</label>
				<el-input :disabled='!editing' placeholder='身份证' v-model='idCardNum' @blur.once='blured'  :class='{"valid-border":idCardNumValid,"error-border":!idCardNumValid}' ></el-input>
				<i :class="{'el-icon-check':idCardNumValid,'el-icon-close':!idCardNumValid}"></i>
			</div>
			<div class="wraper">
				<label>身份证地址：</label>
				<el-input :disabled='!editing' placeholder='身份证地址 选填' v-model='idcardAdr'@blur.once='blured'  :class='{"valid-border":idcardAdrValid,"error-border":!idcardAdrValid}'></el-input>
				<i :class="{'el-icon-check':idcardAdrValid,'el-icon-close':!idcardAdrValid}"></i>
			</div>

			<div class="wraper">
				<label>银行卡号：</label>
				<el-input :disabled='!editing' placeholder='银行卡/信用卡' v-model='bankCard'@blur.once='blured'  :class='{"valid-border":bankCardValid,"error-border":!bankCardValid}'></el-input>
				<i :class="{'el-icon-check':bankCardValid,'el-icon-close':!bankCardValid}"></i>
			</div>
			<div class="wraper">
				<label>邮箱：</label>
				<el-input :disabled='!editing' placeholder='邮箱' v-model='email'@blur.once='blured'  :class='{"valid-border":emailValid,"error-border":!emailValid}' type='email'></el-input>
				<i :class="{'el-icon-check':emailValid,'el-icon-close':!emailValid}"></i>
			</div>
			<div class="wraper">
				<label>备用手机：</label>
				<el-input :disabled='!editing' placeholder='备用手机号 选填' v-model='cellphone' @blur.once='blured'  :class='{"valid-border":cellphoneValid,"error-border":!cellphoneValid}' type='tel'></el-input>
				<i :class="{'el-icon-check':cellphoneValid,'el-icon-close':!cellphoneValid}"></i>
			</div>
		</div>
		<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
		<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import Bus from '../bus.js'
	export default {
		data() {
			return {
				editing:false, //edit or review
				loading:false,
				response:null,
				url:'userInfo/identity',
				name:'',
				idCardNum:'',
				idcardAdr:'',
				cellphone:'',
				bankCard:'',
				email:'',
				formData:{
					
				},
				backAfterPost:true,
				remind:{
					isShow:false,
					remindMsg:'remind',
					self_:this,
					remindOpts:[
					{msg:'确定',},
					],
				},
				// isIDCard1:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
				// isIDCard2:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
			}
		},
		methods: {
			submit(){
				var postBody = {}
				postBody.idcardNum=this.idCardNum
				postBody.bankCard=this.bankCard
				postBody.phone=this.cellphone
				postBody.name=this.name
				postBody.idcardAdr=this.idcardAdr
				postBody.email=this.email
				publicFun.post(this.url,postBody,this,()=>{
					console.log('post res',this.response)
				})
			},
			get(){
				publicFun.get(this.url,this,()=>{
					console.log('res outer',this.response)
					var data=this.response.body.data
					if(data){
						
						this.idCardNum=data.idcardNum
						this.bankCard=data.bankCard
						this.cellphone=data.phone
						this.name=data.name
						this.idcardAdr=data.idcardAdr
						this.email=data.email
					}

				})
			},
			edit(){
				this.editing=true
			},
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			setFormData(dataKey){
				if(this[dataKey+'Valid']){
					this.formData[dataKey]=this[dataKey]
				}else{
					this.formData[dataKey]=null
				}
			},
		},
		watch:{
			name:function(){
				this.setFormData('name')					
			},
			idCardNum:function(){
				this.setFormData('idCardNum')					
			},
			idcardAdr:function(){
				this.setFormData('idcardAdr')					
			},
			cellphone:function(){
				this.setFormData('cellphone')					
			},
			bankCard:function(){
				this.setFormData('bankCard')					
			},
			email:function(){
				this.setFormData('email')					
			},
		},
		computed:{
			idCardNumValid:function(){
				var reg=publicFun.reg.idCardNum
				return reg.test(this.idCardNum)
			},
			nameValid:function(){
				var reg=/^[\u4e00-\u9fa5]+$/;
				return reg.test(this.name)
			},
			idcardAdrValid:function(){
				var reg=/.{0,}/;
				return reg.test(this.idcardAdr)
			},
			cellphoneValid:function(){
				var reg=publicFun.reg.cellphone,flag=(this.cellphone=='')
				return reg.test(this.cellphone) || flag
			},
			bankCardValid:function(){
				var reg=/^\d{12,19}$/;
				return reg.test(this.bankCard)
			},
			emailValid:function(){
				var reg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
				return reg.test(this.email)
			},
			allValid:function(){
				var t=this
				return t.idcardAdrValid&&t.idCardNumValid&&t.nameValid
			},
		},
		created:function(){
			this.get()
		},
		events: {},
		components: {
			remind:remind
		}
	}
</script>


<style lang='scss' scoped>
/*	$iconSize:0.2rem;
	$validColor:#52f352;
	$errColor:#f53333;

	*{
	
	}*/
</style>
