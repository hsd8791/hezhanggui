<template>
	<div id="jobVue"  class="input">
			<h1 class="title">
				<app-back></app-back>工作信息
				<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
			</h1>
		<div class="container" v-loading='loading' element-loading-text='请稍后'>
			<div class="wraper">
				<label>单位名称：</label>
				<el-input :disabled='!editing' placeholder='请输入单位全称' v-model='employerName' @blur.once='blured'  :class='{"valid-border":employerNameValid,"error-border":!employerNameValid}'></el-input>
				<i :class="{'el-icon-check':employerNameValid,'el-icon-close':!employerNameValid}"></i>
			</div>
			<div class="wraper">
				<label>单位地址：</label>
				<el-input :disabled='!editing' placeholder='单位详细地址' v-model='employerAdd' @blur.once='blured'  :class='{"valid-border":employerAddValid,"error-border":!employerAddValid}'></el-input>
				<i :class="{'el-icon-check':employerAddValid,'el-icon-close':!employerAddValid}"></i>
			</div>
			<div class="wraper">
				<label>担任职务：</label>
				<el-input :disabled='!editing' placeholder='请填写岗位名称' v-model='jobTitle' @blur.once='blured'  :class='{"valid-border":jobTitleValid,"error-border":!jobTitleValid}'></el-input>
				<i :class="{'el-icon-check':jobTitleValid,'el-icon-close':!jobTitleValid}"></i>
			</div>
			<div class="wraper">
				<label>单位电话：</label>
				<el-input :disabled='!editing' placeholder='021-614*****' v-model='workPhone' @blur.once='blured'  :class='{"valid-border":workPhoneValid,"error-border":!workPhoneValid}'></el-input>
				<i :class="{'el-icon-check':workPhoneValid,'el-icon-close':!workPhoneValid}"></i>
			</div>
			<div class="wraper">
				<label>月收入：</label>
				<el-input :disabled='!editing' placeholder='例：6000-8000' v-model='salary' @blur.once='blured'  :class='{"valid-border":salaryValid,"error-border":!salaryValid}'></el-input>
				<i :class="{'el-icon-check':salaryValid,'el-icon-close':!salaryValid}"></i>
			</div>
		</div>
		<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
		<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import remind from '../components/tmpts/remind.vue'
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				employerName:'',
				employerAdd:'',
				jobTitle:'',
				workPhone:'',
				salary:'',
				formData:{
					employerName:null,
					employerAdd:null,
					jobTitle:null,
					workPhone:null,
					salary:null,
				},
				url:'userInfo/work',
				response:null,
				loading:true,
				editing:false,
				backAfterPost:true,
				remind:{
					isShow:false,
					remindMsg:'remind',
					self_:this,
					remindOpts:[
					{msg:'确定',},
					],
				}
			}
		},
		methods: {
			submit(){
				var postBody = {}
				// e.g. postBody.nickQq = this.nickQQ 
				postBody.companyName=this.employerName			
				postBody.workPhone=this.workPhone
				postBody.companyAdr=this.employerAdd
				postBody.job=this.jobTitle
				postBody.salary=this.salary				
				publicFun.post(this.url,postBody,this,()=>{
					//success 
					//this.response
				})
			},
			get(){
				publicFun.get(this.url,this,()=>{
					console.log('res outer',this.response)
					var data=this.response.body.data
					if(!data){
						return
					}
					this.employerName=data.companyName
					this.workPhone=data.workPhone
					this.employerAdd=data.companyAdr
					this.jobTitle=data.job
					this.salary=data.salary

				// e.g.	this.acWechat=data.acWechat
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
		created:function(){
			this.get()
		},
		watch:{
			employerName:function(val){
				this.setFormData('employerName')
			},
			employerAdd:function(val){
				this.setFormData('employerAdd')
			},
			jobTitle:function(val){
				this.setFormData('jobTitle')
			},
			workPhone:function(val){
				this.setFormData('workPhone')
			},
			salary:function(val){
				this.setFormData('salary')
			},

		},
		computed:{
			employerNameValid:function(){
				var reg=/.+/;
				return reg.test(this.employerName)
			},
			employerAddValid:function(){
				var reg=/.+/;
				return reg.test(this.employerAdd)
			},
			jobTitleValid:function(){
				var reg=/.+/;
				return reg.test(this.jobTitle)
			},
			workPhoneValid:function(){
				var reg=/.+/
				// var reg=/^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^0\d2-?\d{8}$)|(^0\d3-?\d{6,7}$)$/;
				return reg.test(this.workPhone)
			},
			salaryValid:function(){
				var reg=/(^\d+.\d+$)|(^\d+$)/;
				return reg.test(this.salary)
			},

			allValid:function(){
				var t=this
				return t.employerName&&t.employerAdd&&t.jobTitle&&t.workPhone&&t.salary
				&&true;
			},
		},
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>

</style>
