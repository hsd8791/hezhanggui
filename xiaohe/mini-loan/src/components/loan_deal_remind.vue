<template>
	<div id="loanBillRemindVue">
	<div class="input">
		<h1 class="title">
			<app-back></app-back>
			支付完成
		</h1>
	</div>
		<div class="container">
			
			<div class="paid-remind">
				您好：您已完成支付
			</div>
			<p class="action" v-if="platform=='借贷宝'">请在<span class="emphasis" >借贷宝</span>发布借款给借贷宝好友陈芝昆：<span class="emphasis">18968991186</span></p>
			<p class="action" v-if="platform=='今借到'">请在<span class="emphasis" >今借到</span>发布借款给微信好友小禾微贷：<span class="emphasis">nongfu0577</span></p>
			
			<p class="description" v-if="action=='reborrow'&&platform=='今借到'">借条发布格式【求借款】：{{loanAmount}}元0利率0服务费6天。</p>
			<p class="description" v-if="action=='reborrow'&&platform=='借贷宝'">借条发布格式：{{loanAmount}}元0利率5天。</p>
			<p class="description" v-if="action=='renewal'&&platform=='今借到'">借条发布格式【求借款】：{{loanAmount}}元0利率0服务费7天。</p>
			<p class="description" v-if="action=='renewal'&&platform=='借贷宝'">借条发布格式：{{loanAmount}}元0利率6天。</p>
			<!-- <p class="description"> -->
			<!-- 以完成<span v-if="action=='reborrow'">重借</span><span v-if="action=='renewal'">续期</span> -->
			<!-- </p> -->
			<p class="description">
				<span v-if="platform=='今借到'">长按以下二维码进入今借到【发布借款】</span><span v-if="platform=='借贷宝'">长按以下二维码进入借贷宝【发布借款】</span>
			</p>
		</div>

		<img src="./../assets/img/QR_jinjiedao.png" alt="" class="QRcode"  v-if="platform=='今借到'">
		<img src="./../assets/img/jdbMe.jpeg" alt="" class="QRcode" v-if="platform=='借贷宝'">
		<!-- <div class="input"> -->
			<!-- <el-button type='success' @click='back'></el-button> -->
		<!-- </div> -->

	</div>
</template>

<script>
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				platform:'',
				action:'',
				loanAmount:'',

			}
		},
		created(){

			var query=this.$route.query
			console.log('query',query)
			this.action=query.action
			this.loanAmount=Number(query.amount/100).toFixed(0)
			this.platform=query.platform
		},
		methods:{
			back(){
				publicFun.goPage('/index')
			},
		},
		events: {},
		components: {}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding:0.5rem 0.15rem 0.15rem;
		text-align: left;
	}

	.action{
		font-size: 0.18rem;
		margin:0.1rem 0;
		line-height: 1.6;
		.emphasis{
			color: red;
		}
	}
	.description{
		font-size: 0.18rem;
		margin:0.1rem 0;
		line-height: 1.6;
	}
	.paid-remind{
		font-size: 0.2rem;
	}
	.QRcode{
		width: 80%;
	}

</style>
