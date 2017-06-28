<template>
	<div id="addInfoVue" class="input"  v-loading='loading'  element-loading-text='请稍后'> 
		<div class="container">
			<h1 class="title">补充说明</h1>
			<div class="wraper">
				<!-- <label>其他信息：</label> -->
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input type='textarea' :rows='4' placeholder='例如：名下资产，等说明信息' v-model='addInfo' @blur.once='blured'  :class='{"valid-border":addInfoValid,"error-border":!addInfoValid}'></el-input>
				<!-- <i :class="{'el-icon-check':addInfoValid,'el-icon-close':!addInfoValid}"></i> -->
			</div>
		</div>
		<transition>
			
			<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
			<el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button>
		</transition>
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
				addInfo:'',
				loading:false,
				loadingText:'loading',
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
				}
			}
		},
		methods: {
			submit(){
				this.loading=true //this
				var url='userInfo/remarks' //url
				// query value
				this.$http.post(url,{remark:this.addInfo}).then(res=>{
					this.loading=false
					this.remind.remindMsg='提交成功'
					this.remind.isShow=true
					this.editing=false
					// console.log('res',res.body)
				},err=>{
					this.loading=false
					this.remind.remindMsg='连接失败'
					this.remind.isShow=true
				})
			},
			get(){ //paras:  this,url,
				console.log('geting')
				this.loading=true
				var url='userInfo/remarks'
				this.$http.get(url).then(res=>{
					this.loading=false
					console.log('res',res.body)
					this.addInfo=res.body.data.remark //callback 吧
					if(!this.addInfo){//body all key
						this.editing=true
					}
				},err=>{
					this.loading=false
					this.remind.remindMsg='连接失败'
					this.remind.isShow=true
				})
			}
			,
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
			addInfo:function(val){
				this.setFormData('addInfo')
			},
		},
		computed:{
			addInfoValid:function(){
				var reg=/.+/;
				return reg.test(this.realName)
			},
			allValid:function(){
				var t=this
				return t.addInfoValid&&true//&&
			},
		},
		events: {},
		created:function(){
			var self_=this
			console.log('created')
			this.get()
			Bus.$on('close remind',function(){ // for remind
				self_.remind.isShow=false
			})
		},
		components: {
			remind:remind
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		.wraper{
			.el-textarea{
				width: 100%;
				margin:0;
			}
		}
	}
</style>
<style lang='scss'>
	
	#addInfoVue{
		.el-textarea__inner{
			resize: none;
			font-size: 0.16rem;
		}
	}
</style>
