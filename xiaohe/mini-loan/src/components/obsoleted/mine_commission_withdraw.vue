<template>
	<div id="mineCommissionWidthdraw" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">
			<app-back></app-back>提现
		</h1>
		<div class="container">
			<div class="wraper">
				<label :disabled='!editing'>金额(元)：</label> 
				<el-input :disabled='!editing' id='amountInput' type='number' placeholder='至少10元  例:15.55' v-model='amount' @blur.once='blured'  :class='{"valid-border":amountValid,"error-border":!amountValid}'></el-input>
				<i :class="{'el-icon-check':amountValid,'el-icon-close':!amountValid}"></i>
			</div>
			<div class="wraper">
				<label>支付宝：</label> 
				<el-input :disabled='!editing'  placeholder='支付宝账号' v-model='zhifubao' @blur.once='blured'  :class='{"valid-border":zhifubaoValid,"error-border":!zhifubaoValid}'></el-input>
				<i :class="{'el-icon-check':zhifubaoValid,'el-icon-close':!zhifubaoValid}"></i>
			</div>
			<div class="wraper">
				<label>真实姓名：</label> 
				<el-input :disabled='!editing'  placeholder='与支付宝关联真实姓名' v-model='name' @blur.once='blured'  :class='{"valid-border":nameValid,"error-border":!nameValid}'></el-input>
				<i :class="{'el-icon-check':nameValid,'el-icon-close':!nameValid}"></i>
			</div>
			<div class="wraper">
				<label>手机：</label> 
				<el-input :disabled='!editing' type='number' placeholder='联系手机' v-model='phone' @blur.once='blured'  :class='{"valid-border":phoneValid,"error-border":!phoneValid}'></el-input>
				<i :class="{'el-icon-check':phoneValid,'el-icon-close':!phoneValid}"></i>
			</div>

		</div>
		<div class="amount-emphasis" >￥{{amount | amountParser}}</div>
		<el-checkbox v-model='clause'>点击提交代表同意提现条款balabala...</el-checkbox>
		<transition>
			<el-button type='success' :disabled='!(allValid&&clause)' class='submit' v-if='editing' @click='confirm'>提交</el-button>
			<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		</transition>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	// import remind from '../components/tmpts/remind.vue'
	export default {
		data() {
			return {
				response:null,
				// loading:true,
				loading:false,
				editing:true,
				clause:true,
				amount:'10.11',
				zhifubao:'1111111',
				name:'huang',
				phone:'12345678901',
				url:'brokerage/applyExtra',
				formData:{
				},
				backAfterPost:false,
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
		filters:{
			amountParser(val){
				if(!val){
					return (0).toFixed(2)
				}
				// console.log('val',val)
				return Number(val).toFixed(2)
			}
		},
		methods: {
			submit(){
				var url
				url=publicFun.urlConcat(this.url,{
					name:this.name,
					phone:this.phone,
					zhifubao:this.zhifubao,
					amount:(this.amount*100).toFixed(0)
				})
				console.log('url',url)
				publicFun.get(url,this,()=>{
					var data=this.response.body
					,remind=this.remind
					if(data.data==0){
						remind.remindMsg='可用余额不足'
						remind.remindOpts=[{msg:'确定'}]
						remind.remindMsgDscrp=null
						remind.isShow=true
						var el=document.querySelector('#amountInput')
						var input=el.getElementsByTagName('input')[0]
						input.focus()
						// console.log('el',input)
					}else if(data.data==1){
						remind.remindMsg='提交成功'
						remind.remindOpts=[{msg:'确定'}]
						remind.remindMsgDscrp=null
						remind.isShow=true
					}
					console.log('data withdraw',data)
				})
			},
			confirm(){
				var remind=this.remind
				remind.remindOpts=[
				{msg:'确定',callback:()=>{
					this.submit()
				}},
				{msg:'取消',}
				],
				remind.remindMsg='请确认'
				remind.remindMsgDscrp='本次提现：'+Number(this.amount).toFixed(2)+'元'
				remind.isShow=true
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
			amount:function(){
				this.setFormData('amount')
			},
			zhifubao:function(){
				this.setFormData('zhifubao')
			},
			name:function(){
				this.setFormData('name')
			},
			phone:function(){
				this.setFormData('phone')
			},
		},
		computed:{
			amountValid:function(){
				var reg=/^((1[0-9])|([2-9]\d)|([1-9]\d{2,}))(\.\d{1,2})?$/;
				return reg.test(this.amount)
			},
			zhifubaoValid:function(){
				var reg=/.+/;
				return reg.test(this.zhifubao)
			},
			nameValid:function(){
				var reg=/.+/;
				return reg.test(this.name)
			},
			phoneValid:function(){
				var reg=publicFun.reg.cellphone;
				// console.log('reg',reg)
				return reg.test(this.phone)
			},

			allValid:function(){
				var t=this
				return t.amountValid&&t.zhifubaoValid&&t.nameValid&&t.phoneValid&&true//&&
				
			},
		},
		created(){
		}
		,
		events: {},
		components: {
			// remind:remind,
		}
	}
</script>

<style type="text/css" lang='scss' scoped>
	.amount-emphasis{
		font-size: 0.4rem;
	}
	
</style>