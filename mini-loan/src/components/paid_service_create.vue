<template>
	<div id='paidServiceCreateVue' class="input" v-loading='loading' element-loading-text='请稍后'>
		<!-- <h1 class='title'>增值服务</h1> -->
		<div class="container">
			<div class="wraper">
				<label>姓名：</label>
				<el-input placeholder='真实姓名 必填' v-model='name' @blur.once='blured'  :class='{"valid-border":nameValid,"error-border":!nameValid}'></el-input>
				<i :class="{'el-icon-check':nameValid,'el-icon-close':!nameValid}"></i>
			</div>
			<div class="wraper">
				<label>身份证号：</label>
				<el-input placeholder='身份证 必填' v-model='idCard' @blur.once='blured'  :class='{"valid-border":idCardValid,"error-border":!idCardValid}' ></el-input>
				<i :class="{'el-icon-check':idCardValid,'el-icon-close':!idCardValid}"></i>
			</div>
			<div class="wraper">
				<label>手机：</label>
				<el-input placeholder='手机号 必填' v-model='mobile' @blur.once='blured'  :class='{"valid-border":mobileValid,"error-border":!mobileValid}' type='tel'></el-input>
				<i :class="{'el-icon-check':mobileValid,'el-icon-close':!mobileValid}"></i>
			</div>
			<div class="wraper">
				<label>住址：</label>
				<el-input placeholder='住址 选填' v-model='address'@blur.once=''  :class='{"valid-border":addressValid,"error-border":!addressValid}'></el-input>
				<i :class="{'el-icon-check':addressValid,'el-icon-close':!addressValid}"></i>
			</div>
			<div class="wraper">
				<label>银行卡号：</label>
				<el-input placeholder='银行卡/信用卡 选填' v-model='bankCard'@blur.once=''  :class='{"valid-border":bankCardValid,"error-border":!bankCardValid}'></el-input>
				<i :class="{'el-icon-check':bankCardValid,'el-icon-close':!bankCardValid}"></i>
			</div>
			<div class="wraper">
				<label>邮箱：</label>
				<el-input placeholder='邮箱 选填' v-model='email'@blur.once=''  :class='{"valid-border":emailValid,"error-border":!emailValid}' type='email'></el-input>
				<i :class="{'el-icon-check':emailValid,'el-icon-close':!emailValid}"></i>
			</div>

		</div>
		<div class="service-box">
			<el-checkbox v-model="IvsDetail">反欺诈信息查询</el-checkbox>
			<el-checkbox v-model="JiedaibaoQuery">借贷宝逾期</el-checkbox>
			<el-checkbox v-model="TongdunPreloanQuery">同盾查询</el-checkbox>
			<el-checkbox v-model="selectServ.score" :disabled='true'>芝麻信用评分</el-checkbox>
		</div>
		<el-button type='success' :disabled='!allValid' class='submit' v-if='' @click='submit'>提交</el-button>
		<!-- <div class="history" @click='goPage("/paid_service_history")'>历史记录</div> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				// loading:true,
				name:'黄哈哈',
				idCard:'123456198811112222',
				address:'',
				mobile:'12345678901',
				bankCard:'',
				email:'test@163.com',
				JiedaibaoQuery:'',
				IvsDetail:'',
				TongdunPreloanQuery:'',
				
				selectServ:{
					identity:false,
					score:false,
					expire:false,
				},
				formData:{
					
				},
				response:null,
				loading:true,
				editing:true,
				url:'order/createPaidServiceOrder',
				confirmOpts:[
				{msg:'确定',callback:()=>{
					this.request()
						// this.self_.request()
						// console.log('this,self_',this,this.self_)
					}},
					{msg:'取消'}
					],
					remind:{
						isShow:false,
						remindMsg:'remind',
						self_:this,
						defaultOpts:[
						{msg:'确定',},
						],
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
				// console.log('submit')
				this.remind.remindOpts=this.confirmOpts
				this.remind.remindMsg='请确定是否提交'
				this.remind.isShow=true
			},
			request(){
				var postBody = {}
				// e.g. postBody.nickQq = this.nickQQ 
				var formData=this.formData
				formData.product=''
				if(this.JiedaibaoQuery){
					formData.product+='JiedaibaoQuery'+';'
				}
				if(this.IvsDetail){
					// formData.product+='IvsDetail'+';'
					formData.product+='AntifraudRiskList'+';'
					formData.product+='AntifraudVerify'+';'
					formData.product+='AntifraudScoreGet'+';'
				}			
				if(this.TongdunPreloanQuery){
					formData.product+='TongdunPreloanQuery'+';'
				}			
				// console.log('formData',formData)
				publicFun.post(this.url,formData,this,()=>{
					var payId=this.response.body.data.payId
					this.remind.remindOpts[0].callback=()=>{
						// bus.$emit('paid_service_created')
						setTimeout(function() {
							// publicFun.goPage('/paid_service/history')
							publicFun.goPage('/paid_service/create/pay?payId='+payId)
						}, 35);
					}
					//success 
					//this.response
				})
			},
			get(){
				publicFun.get(this.url,this,()=>{
					console.log('res outer',this.response)
					var data=this.response.body.data
				// e.g.	this.acWechat=data.acWechat
			})
			},
			edit(){
				this.editing=true
			},
			goPage(path){
				if(path!==undefined){
					publicFun.goPage(path)
				}
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
			idCard:function(){
				this.setFormData('idCard')					
			},
			address:function(){
				this.setFormData('address')					
			},
			mobile:function(){
				this.setFormData('mobile')					
			},
			bankCard:function(){
				this.setFormData('bankCard')					
			},
			email:function(){
				this.setFormData('email')					
			},
		},
		created(){
			publicFun.checkSession(this)
			this.loading=false
			this.setFormData('name')
			this.setFormData('idCard')
			this.setFormData('address')
			this.setFormData('mobile')
			this.setFormData('bankCard')
			this.setFormData('email')			
			// this.get
		},
		computed:{
			idCardValid:function(){
				var reg=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
				return reg.test(this.idCard)
			},
			nameValid:function(){
				var reg=/^[\u4e00-\u9fa5]+$/;
				return reg.test(this.name)
			},
			addressValid:function(){
				var reg=/.{0,}/;
				return reg.test(this.address)
			},
			mobileValid:function(){
				var reg=/^1[1234567890]\d{9}$/;
				return reg.test(this.mobile)
			},
			bankCardValid:function(){
				// var reg=/^\d{12,19}$/;
				var reg=/.{0,}/
				return reg.test(this.bankCard)
			},
			emailValid:function(){
				// var reg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
				var reg=/.{0,}/;
				return reg.test(this.email)
			},
			allValid:function(){
				var t=this
				return t.idCardValid&&t.mobileValid&&t.bankCardValid&&
				t.emailValid&&t.idCardValid&&t.nameValid&&(t.JiedaibaoQuery||t.IvsDetail||t.selectServ.expire||t.TongdunPreloanQuery)
			},
		},

		events: {},
		components: {
			remind:remind
		}
	}
</script>


<style lang='scss' scoped>

	.history{
		margin:0.1rem 0;
		color:#6a7fa5;
		font-size: 0.14rem;
		text-align: left;
		/*font-weight: bold;*/
		color:#666;
		.active{
		}
	}
/*	$iconSize:0.2rem;
	$validColor:#52f352;
	$errColor:#f53333;

	*{
	
	}*/
</style>
