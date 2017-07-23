<template>
	<div id="mineChargeVue" >
		<!-- .input .container .unordered-list .el-icon-arrow-right -->
		<div class="input">
			
			<h1 class="title"><app-back></app-back>充值中心 </h1>
			<div class="charge-phone">充值账户：{{phone}}</div>
			<div class=" products-container">
				<div class="prdct-list"  v-for='prdct in products' @click='charge(prdct.id)'>
						<!-- {{prdct.title}} -->
					<!-- <i class="el-icon-arrow-right"></i> -->
					<div class="prdct-hb">{{prdct.hbFee | hbParser}}禾币</div>
					<div class="prdct-rmb">售价:{{prdct.moneyFee | moneyParser}}元</div>
				</div>
			</div>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
	data() {
			return {
				products:[],
				response: null,
				loading: true,
				editing: true,
				phone:'',
				backAfterPost: false, // watch out
				urlProduct: 'product/list',
				urlCreateOrder:'order/createRechargeOrder?productId=',
				remind: {
					isShow: false,
					remindMsg: 'remind',
					self_: this,
					remindOpts: [{
						msg: '确定',
					}, ],
				},
			}
		},
		created() {
			this.phone=bus.account
			this.getProduct()
		},
		filters:{
			moneyParser(v){
				return Number(v/100).toFixed(2)
			},
			hbParser(v){
				return Number(v/100).toFixed(0)
			}
		},
		methods: {
			getProduct() {
				publicFun.get(this.urlProduct, this, () => {
					// console.log('products', this.response)
					this.products=this.response.body.data
				})
			},
			charge(id){
				publicFun.get(this.urlCreateOrder+id,this,()=>{
					console.log('order',this.response.body)
					var payId=this.response.body.data.payId
					publicFun.goPage('/mine/charge/pay?payId='+payId)
				})
			}
		},
		events: {},
		components: {}
}
</script>

<style lang='scss' scoped> 
.products-container{
	display: flex;
	flex-wrap: wrap;
	margin:0.15rem;
	.prdct-list{
		width: 30%;
		height: 0.75rem;
		border:2px solid #cc2a1b;
		border-radius: 0.05rem;
		margin:0.055rem;
		letter-spacing: -0.5px;
		color:#cc2a1b;
		.prdct-hb{
			font-size: 0.16rem;
			margin:0.15rem 0 0;
		}
		.prdct-rmb{
			font-size: 0.13rem;
			margin: 0;
			margin-top: 0.05rem;
			transform: scale(1);
		}
		&:active{
			background: #cc2a1b;
			color: #fff;
		}
	}
}
.charge-phone{
	padding:0.1rem 0.2rem;
	text-align: left;
	font-size: 0.2rem;
	border: 0px solid #efeff4 ;
	border-bottom-width: 1px;
	color:#585858;

}

</style>
