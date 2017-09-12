<template>
	<!---->
	<div class="cover"   v-if='remind.isShow'  >
		<div class="remind" :class="{'remind-higher':remind.remindMsgDscrp}">
			<div class="remind-msg">{{remind.remindMsg}}</div>
			<div class="remind-msg-description" v-if='remind.remindMsgDscrp'>{{remind.remindMsgDscrp}}</div>
			<div class="ctrl-box">
				<div class="ctrl-btn"  v-for='item in remind.remindOpts'  @click.once='close(item.callback,remind.self_)'>{{item.msg}}
					<a  class="href" v-show='item.href' :href="item.href"  @click.once='close(item.callback,remind.self_)'>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bus from '../../bus.js'
	import publicFun from '../../js/public.js'
	export default {
		data() {
			return {
			}

		},
		props:{
			remind:{
				default:{
					
				}
			},

		},
		methods: {
			close(callback, vm) {
				// this.isShow=false
				// Bus.$emit('close_remind')
				vm.remind.isShow = false

				if (callback !== undefined && callback instanceof Function) {
					callback()
				}
				if(vm.response){
					if(vm.backAfterPost&&vm.response.body.error===0){
						publicFun.goPage(-1)
					}
				}
				// console.log('vm',vm)
			}
		},
		created(){
				// console.log('remind created',this)
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
		z-index: 99999;
		.remind{
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
			.remind-msg{
				width: 100%;
				/*height: 0.64rem;*/
				line-height: 1.4;
				font-size: 0.18rem;	
				margin-top:0.2rem;
				padding:0 0.05rem;
				color:#010101;
				/*font-weight: bold;*/
				
			}
			.remind-msg-description{
				width: 100%;
				margin-top:0.08rem;
				/*height: 0.64rem;*/
				line-height: 1.4;
				font-size: 0.14rem;	
				color:#010101;
				padding:0 0.05rem;
			}

			.ctrl-box{
				display: flex;
				position: relative;
				bottom: 0;
				margin-top:0.15rem;
				width: 100%;
				.ctrl-btn{
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
				.ctrl-btn:last-child{
					border-right-width: 0px;
				}
			}
		}
		.remind-higher{
				/*height: 1.25rem;*/
			}
	}
			
</style>
