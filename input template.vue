<template>
	<div id="jobVue">
		<div class="container">
			<div class="wraper">
				<label>姓名：</label>
				<!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
				<el-input placeholder='请输入真实姓名' v-model='realName' @blur.once='blured'  :class='{"valid-border":realNameValid,"error-border":!realNameValid}'></el-input>
				<i :class="{'el-icon-check':realNameValid,'el-icon-close':!realNameValid}"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import '../css/input.css'
	export default {
		data() {
			return {
				realName:'',
				formData:{
					
				}
			}
		},
		methods: {
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
			realName:function(val){
				this.setFormData('realName')
			},
		},
		computed:{
			realNameValid:function(){
				var reg=/^[\u4e00-\u9fa5]+$/;
				return reg.test(this.realName)
			},
			allValid:function(){
				var t=this
				return t.idCardNumValid&&true//&&
			},
		},
		events: {},
		components: {}
	}
</script>

<style lang='scss' scoped>

</style>

