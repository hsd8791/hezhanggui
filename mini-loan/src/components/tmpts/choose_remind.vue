<template>
	<!---->
	<div class="cover"   v-show='choose.isShow'  >
		<div class="choose" :class="{'choose-higher':choose.chooseMsgDscrp}">
			<div class="choose-msg">
				<app-back :color='"#000"' :remind="'<'" :method='choose.back' v-if='choose.back'></app-back>
				{{choose.title}}
			</div>
			<div class="choose-box">
				<div class="choose-btn"  v-for='item in choose.chooseOpts'  @click='close(item.callback,choose.self_)'>{{item.type}}
					<a  class="href" v-show='item.href' :href="item.href"  @click='close(item.callback,choose.self_)'>
					</a>
				</div>
			</div>
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
			choose:{
				default:{}
			},

		},
		methods: {
			method(){},
			close(callback, vm) {
				vm.choose.isShow = false

				if (callback !== undefined && callback instanceof Function) {
					callback()
				}
				if(vm.response){
					if(vm.backAfterPost&&vm.response.body.error===0){
						publicFun.goPage(-1)
					}
				}
			}
		},
		created(){
		},
		events: {},
		components: {}
	}
</script>

<style lang='scss' scoped>

	.cover{
		position: fixed;
		background: rgba(0,0,0,0.6);
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 999;
		.choose{
			/*height: 1.05rem;*/
			width: 2.7rem;
			background: #f8f8f8;
			position: relative;
			margin:auto;
			top:50%;
			transform: translateY(-50%);
			border:1px solid transparent;
			/*left: 0;right: 0;*/
			/*top: 0;bottom: 0;*/
			border-radius: 0.15rem;
			.choose-msg{
				position: relative;
				width: 100%;
				/*height: 0.64rem;*/
				line-height: 1.4;
				font-size: 0.18rem;	
				margin-top:0.1rem;
				padding:0 0.05rem;
				color:#010101;
				/*font-weight: bold;*/
				
			}
			.choose-msg-description{
				width: 100%;
				margin-top:0.08rem;
				/*height: 0.64rem;*/
				line-height: 1.4;
				font-size: 0.14rem;	
				color:#010101;
				padding:0 0.05rem;
			}

			.choose-box{
				position: relative;
				bottom: 0;
				margin-top:0.1rem;
				width: 100%;
				.choose-btn{
					text-decoration: none;
					width: 100%;
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: 0.16rem;
					border: 0px solid #d2d2d2 ;
					border-right-width: 1px;
					border-top-width: 1px;
					color:#0081ff;
					position: relative;
					.href{
						width: 100%;
						height: 100%;
						display: block;
						position: absolute;
						top: 0;
					}
				}
				.choose-btn:last-child{
					border-right-width: 0px;
				}
			}
		}
		.choose-higher{
				/*height: 1.25rem;*/
			}
	}
			
</style>
