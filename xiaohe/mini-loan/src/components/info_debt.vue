<template>
	<div id="infoDebtVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">
			<app-back></app-back>负债调查
			<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
		</h1>
		<div class="container">
			<div class="wraper">
				<label :disabled='!editing'>借贷宝负债：</label> 
				<el-input :disabled='!editing'  type='number' placeholder='借贷金额，无负债填0' v-model='jiedaibaoLiabilities' @blur.once='blured'  :class='{"valid-border":jiedaibaoLiabilitiesValid,"error-border":!jiedaibaoLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':jiedaibaoLiabilitiesValid,'el-icon-close':!jiedaibaoLiabilitiesValid}"></i>
			</div>
			<div class="wraper">
				<label>今借到负债：</label> 
				<el-input :disabled='!editing' type='number' placeholder='借贷金额，无负债填0' v-model='jinjiedaoLiabilities' @blur.once='blured'  :class='{"valid-border":jinjiedaoLiabilitiesValid,"error-border":!jinjiedaoLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':jinjiedaoLiabilitiesValid,'el-icon-close':!jinjiedaoLiabilitiesValid}"></i>
			</div>
			<div class="wraper">
				<label>其他负债：</label> 
				<el-input :disabled='!editing' type='number' placeholder='借贷金额，无负债填0' v-model='otherLiabilities' @blur.once='blured'  :class='{"valid-border":otherLiabilitiesValid,"error-border":!otherLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':otherLiabilitiesValid,'el-icon-close':!otherLiabilitiesValid}"></i>
			</div>
			<div class="wraper">
				<!-- 还是用的芝麻信用的字段 -->
				<label>花呗额度：</label> 
				<el-input :disabled='!editing' type='number' placeholder='填写花呗额度' v-model='zmxyScore' @blur.once='blured'  :class='{"valid-border":zmxyScoreValid,"error-border":!zmxyScoreValid}'></el-input>
				<i :class="{'el-icon-check':zmxyScoreValid,'el-icon-close':!zmxyScoreValid}"></i>
			</div>

		</div>
		<transition>
			<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
			<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		</transition>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import remind from '../components/tmpts/remind.vue'
	export default {
		data() {
			return {
				response:null,
				// loading:true,
				loading:false,
				editing:false,
				jiedaibaoLiabilities:'',
				jinjiedaoLiabilities:'',
				otherLiabilities:'',
				zmxyScore:'',
				url:'userInfo/liabilities',
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
			}
		},
		methods: {
			submit(){
				var postBody = {}
				postBody.jiedaibaoLiabilities = this.jiedaibaoLiabilities 
				postBody.jinjiedaoLiabilities = this.jinjiedaoLiabilities 
				postBody.otherLiabilities = this.otherLiabilities 
				postBody.zmxyScore = this.zmxyScore 
				publicFun.post(this.url,postBody,this,()=>{
					console.log('post res',this.response)
				})
			},
			get(){
				publicFun.get(this.url,this,()=>{
					console.log('res outer',this.response)
					var data=this.response.body.data
					if(!data){
						return
					}
					this.jiedaibaoLiabilities=data.jiedaibaoLiabilities
					this.jinjiedaoLiabilities=	data.jinjiedaoLiabilities			
					this.otherLiabilities=data.otherLiabilities
					this.zmxyScore=data.zmxyScore

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
			jiedaibaoLiabilities:function(){
				this.setFormData('jiedaibaoLiabilities')
			},
			jinjiedaoLiabilities:function(){
				this.setFormData('jinjiedaoLiabilities')
			},
			otherLiabilities:function(){
				this.setFormData('otherLiabilities')
			},
			zmxyScore:function(){
				this.setFormData('zmxyScore')
			},
		},
		computed:{
			jiedaibaoLiabilitiesValid:function(){
				var reg=/\d/;
				return reg.test(this.jiedaibaoLiabilities)
			},
			jinjiedaoLiabilitiesValid:function(){
				var reg=/\d/;
				return reg.test(this.jinjiedaoLiabilities)
			},
			otherLiabilitiesValid:function(){
				var reg=/\d/;
				return reg.test(this.otherLiabilities)
			},
			zmxyScoreValid:function(){
				var reg=/\d/;
				return reg.test(this.zmxyScore)
			},

			allValid:function(){
				var t=this
				return t.jiedaibaoLiabilitiesValid&&t.jinjiedaoLiabilitiesValid&&t.otherLiabilitiesValid&&t.zmxyScoreValid&&true//&&
				
			},
		},
		created(){
			this.get()
		}
		,
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	#infoDebtVue{
		.wraper {
			label{
				font-size: 0.15rem;
			}
		}
	}
</style>
