<template>
	<div class="back-box-vue">

	<div class="back back1">
			<span class='text' @click='back'>返回</span>
			<!-- <div class="test" :class='testClass'>  -->
			<!-- <slot name='11' class='test'></slot> -->
			<!-- </div> -->
		</div>
		<div class="back close">
			<span class='text' @click='close'>X</span>
			<!-- <div class="test" :class='testClass'>  -->
			<!-- <slot name='11' class='test'></slot> -->
			<!-- </div> -->
		</div>
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
			text:{
				default:'首页',
			},
			link:{
				default:'/index',
			},
			type:{
				default:'none'
			}
		},
		methods:{
			back(){
				// console.log('url',location.hash)
				var r=location.hash.replace("#",'')
				// console.log('route',r)
				var arr=r.split('/')
				arr.pop()
				var newR=arr.join('/')
				// console.log('newR',newR)
				publicFun.goPage(newR)
				// publicFun.goPage(-1)
			},
			close(){
				var r=location.hash.replace("#",'')
				// console.log('route',r)
				var arr=r.split('/')
				// console.log('newR',newR)
				publicFun.goPage('/'+arr[1])
			},
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
	.close{
		left: 0.5rem;
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
