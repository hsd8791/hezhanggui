<template>
	<div class="back">
		<span class='text' @click='back'>返回</span>
		<!-- <div class="test" :class='testClass'>  -->
			<!-- <slot name='11' class='test'></slot> -->
		<!-- </div> -->
	</div>
</template>

<script>
	import publicFun from '../../js/public.js'
	export default {
		data() {
			return {

			}
		},
		props:{
			type:{
				default:'none'
			}
		},
		methods:{
			back(){
				publicFun.goPage(-1)
			}
		},
		computed:{
			// testClass(){
			// 	var s
			// 	switch(this.type){
			// 		// case 'none':s='default' break;
			// 		case 'success':
			// 		s = 'success'
			// 		break;
			// 		case 'failure':
			// 		s = 'failure'
			// 		break;
			// 		default:
			// 		s = 'default'
			// 	}
			// 	return s
			// },
		},
		events: {},
		components: {}
	}
</script>

<style lang='scss' scoped>
	.back{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		height: 100%;
		width: 0.5rem;
		.text{
			height: 0.16rem;
			text-decoration: underline;
			font-weight: normal;
			line-height: 1;
			font-size: 0.16rem;
			color:#fff;
			position: absolute;
			display: block;
			margin:auto ;
			top: 0;right: 0;left: 0;bottom: 0;
		}
	}
	.test{
		color:red;
	}
/*	.success{
		background: green;
	}
	.failure{
		background: red;
	}
	.default{
		background: yellow;
	}*/
</style>
