<template>
	<div id="mineChargeVue" >
		<!-- .input .container .unordered-list .el-icon-arrow-right -->
		<div class="input">
			
			<h1 class="title"><app-back></app-back>充值中心 </h1>
			<div class="container products-container" v-for='prdct in products'>
				<div class="unordered-list">
						{{prdct.title}}
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
export default {
	data() {
			return {
				products:[],
				response: null,
				loading: true,
				editing: true,
				backAfterPost: false, // watch out
				urlProduct: 'pay/products',
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
			this.getProduct()
		},
		methods: {
			getProduct() {
				publicFun.get(this.urlProduct, this, () => {
					console.log('products', this.response)
					this.products=this.response.body.data
				})
			}
		},
		events: {},
		components: {}
}
</script>

<style>

</style>
