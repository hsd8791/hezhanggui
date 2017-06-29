<template>
	<div class="back">
		<span class='text' @click='back'>返回</span>
	</div>
</template>

<script>
	import publicFun from '../../js/public.js'
	export default {
		data() {
			return {

			}
		},
		methods:{
			back(){
				publicFun.goPage(-1)
			}
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
</style>
