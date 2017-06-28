<template>
	<div id="applyBorrowVue" class='input' >
		<h1 class="title">审核借款人信息</h1>
		<div class="checkFill"></div>

		<div class="info-user">
			<h3 class="subtitle">借款人基本信息</h3>
			<p>姓名：*树栋</p>
			<p>手机号：138****5255</p>
			<p>身份证号：******************16</p>
		</div>
		<el-button type='success' class="confirm">点击开始审核此借款人信息</el-button>
	</div>
</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import remind from '../components/tmpts/remind.vue'
	export default {
		data() {
			return {
				phoneLender:null,
			}
		},
		methods:{
			changeUrl(){
				window.history.pushState("object or string", "Title",'/2017/index.html')
			},
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
		},
		events: {},
		computed:{
			phoneLenderValid:function(){
				var reg=publicFun.reg.cellphone
				return reg.test(this.phoneLender)
			},
		},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
.info-user{
	height: 1rem;
	border:1px solid #cccccc;
	.subtitle{
		line-height: 1.4;
		background: #aaa;
		text-align: left;
		padding-left: 0.15rem;
	}
	p{
		text-align: left;
		padding-left: 0.15rem;
		font-size: 0.14rem;
		margin:0.05rem 0;
	}
}

</style>
