<template>
	<div id="debtVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">
			<app-back></app-back>负债调查
			<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
		</h1>
		<div class="container">
			<div class="wraper">
				<label class="label" :disabled='!editing'>借贷宝负债：</label> 
				<el-input :disabled='!editing'  type='number' placeholder='借贷金额，无负债填0' v-model='jiedaibaoLiabilities' @blur.once='blured'  :class='{"valid-border":jiedaibaoLiabilitiesValid,"error-border":!jiedaibaoLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':jiedaibaoLiabilitiesValid,'el-icon-close':!jiedaibaoLiabilitiesValid}"></i>
			</div>
			<div class="wraper">
				<label class="label">今借到负债：</label> 
				<el-input :disabled='!editing' type='number' placeholder='借贷金额，无负债填0' v-model='jinjiedaoLiabilities' @blur.once='blured'  :class='{"valid-border":jinjiedaoLiabilitiesValid,"error-border":!jinjiedaoLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':jinjiedaoLiabilitiesValid,'el-icon-close':!jinjiedaoLiabilitiesValid}"></i>
			</div>
			<div class="wraper">
				<label class="label">其他网贷负债：</label> 
				<el-input :disabled='!editing' type='number' placeholder='借贷金额，无负债填0' v-model='otherLiabilities' @blur.once='blured'  :class='{"valid-border":otherLiabilitiesValid,"error-border":!otherLiabilitiesValid}'></el-input>
				<i :class="{'el-icon-check':otherLiabilitiesValid,'el-icon-close':!otherLiabilitiesValid}"></i>
			</div>
			<div class="wraper" >
				<label class="label">花呗额度：</label> 
				<el-input :disabled='!editing' type='number' placeholder='填写花呗额度' v-model='zmxyScore' @blur.once='blured'  :class='{"valid-border":zmxyScoreValid,"error-border":!zmxyScoreValid}'></el-input>
				<i :class="{'el-icon-check':zmxyScoreValid,'el-icon-close':!zmxyScoreValid}"></i>
			</div>
			<div class="wraper" >
				<label class="label">芝麻信用分：</label> 
				<el-input :disabled='!editing' type='number' placeholder='填写芝麻信用分' v-model='zmxyScore2' @blur.once='blured'  :class='{"valid-border":zmxyScore2Valid,"error-border":!zmxyScore2Valid}'></el-input>
				<i :class="{'el-icon-check':zmxyScore2Valid,'el-icon-close':!zmxyScore2Valid}"></i>
			</div>
		</div>
		<transition>
			<el-button type='success' :disabled='!(allValid&&creditValid)' class='submit' v-if='editing' @click='submit'>提交</el-button>
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
				refreshFill:false,
				response:null,
				// loading:true,
				loading:false,
				editing:false,
				jiedaibaoLiabilities:'',
				jinjiedaoLiabilities:'',
				otherLiabilities:'',
				zmxyScore:'',
				zmxyScore2:'',
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
				// if(this.refreshFill){
				// 	this.$http.post(url,{}).then(res=>{

				// 	},err=>{})
				// }
				var postBody = {}
				postBody.jiedaibaoLiabilities = this.jiedaibaoLiabilities 
				postBody.jinjiedaoLiabilities = this.jinjiedaoLiabilities 
				postBody.otherLiabilities = this.otherLiabilities 
				postBody.zmxyScore = this.zmxyScore 
				postBody.zmxyScore2 = this.zmxyScore2 
				console.log('postBody',postBody)
				publicFun.post(this.url,postBody,this,()=>{
					console.log('post res',this.response)
					if (!this.backAfterPost) {
						if (!this.response.body.data) {
							this.remind.remindMsg='更新成功'
							var url=publicFun.urlConcat('/loan_deal',this.$route.query)
							console.log('url',url)
							this.remind.remindOpts = [{
								msg: '前往付款',
								callback: () => {
									publicFun.goPage(this.$route.path+url)
								}
							}]
						}
					}
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
					this.zmxyScore2=data.zmxyScore2

				})
			},
			edit(){
				this.editing=true
			},
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			// setFormData(dataKey){
			// 	if(this[dataKey+'Valid']){
			// 		this.formData[dataKey]=this[dataKey]
			// 	}else{
			// 		this.formData[dataKey]=null
			// 	}
			// },
			
		},
		watch:{
		
		},
		computed:{
			creditValid:function(){
				// if(this.zmxyScore2<600){
				// 	return false
				// }
				if(this.zmxyScore<500){
					return false
				}
				return true
			},
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
			zmxyScore2Valid:function(){
				var reg=/\d/;
				return reg.test(this.zmxyScore2)
			},
			allValid:function(){
				var t=this
				return t.jiedaibaoLiabilitiesValid&&t.jinjiedaoLiabilitiesValid&&t.otherLiabilitiesValid&&t.zmxyScoreValid&&t.zmxyScore2Valid&&true//&&
				
			},
		},
		created(){
			var query=this.$route.query
			if(query.action){
				this.refreshFill=true
				this.backAfterPost=false
				this.editing=true
			}else{
			this.get()
			}
		}
		,
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>

</style>
<style lang='scss'>
	#debtVue{
		.container{
			.label{
				font-size: 0.14rem;
				width: 27%;
			}
		}
	}
</style>
