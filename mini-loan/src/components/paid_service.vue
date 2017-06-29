<template>
	<div id="paidServiceVue" class="router-view">
		<div class="sub-top-nav input" v-show='activeTab!==2'>
			<h1 class="title">增值服务</h1>
			<div class="tabs-container" v-show='activeTab!==2'>
				<div class="tab" :class='{active:activeTab===0}' @click='goPage(0)'>新建查询</div>
				<div class="tab" :class='{active:activeTab===1}' @click="goPage(1)">历史记录</div>
			</div>
		</div>

<!-- 		<div class="sub-router-view-container" >
			<keep-alive include='PaidServiceHistory'>
			
			<router-view></router-view>
		</keep-alive>

	</div> -->
	<div class="sub-router-view-container" :style='{marginTop:subRouterMarginTop}' >
	<keep-alive>
		<router-view v-if="$route.meta.keepAlive"></router-view>
	</keep-alive>
	
	<router-view v-if="!$route.meta.keepAlive"></router-view>
</div>

</div>
</template>

<script>
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
// import '../css/input.css'

export default {
	data() {
		return {
			activeTab: 0,
			keepAliveCmpt:'history',
			paths: [
			'/paid_service/create',
			'/paid_service/history',
			'/paid_service/history/rslt',
			]
		}
	},
	methods: {
		scrolling(){console.log('scrollinginging')},
		goPage(i) {
			publicFun.goPage(this.paths[i])
			this.activeTab = i
		},
		indexChange() {
				// console.log('hashchanged')
				// console.log('paid_service route',this.$route.path)
				var index = this.paths.indexOf(this.$route.path)
				index < 0 ? index = 0 : index;
				this.activeTab = index
			},
			
		},
		created() {
			// setTimeout(function() {
				// bus.$emit('foot_index_change', 1)
			// }, 100);
			//check inner tag
			// console.log('paid_service route',this.$route.path)

			this.indexChange()
				// var index=this.paths.indexOf(this.$route.path)
				// // console.log('paid_service index',index)
				// index<0?index=0:index;
				// this.activeTab=index
				window.addEventListener('hashchange', this.indexChange, false)
			},
			destroyed() {
				// console.log('destroyed')
				// this.indexChange=null
				window.removeEventListener('hashchange', this.indexChange)
			},
			computed:{
				subRouterMarginTop(){
					// console.log('')
					var i=0.9
					if(this.activeTab===2){
						i=0
					}
					return i+'rem'
				}
			},
			events: {},
			components: {}
		}
	</script>

	<style lang='scss' scoped>
/*		.router-view{
			position: absolute;
			top: 0;left: 0;
			right: 0;bottom: 0;
			width: 100%;
			.sub-top-nav{
				position: absolute;
				width: 100%;
				left: 0;right: 0;
				top: 0;
				z-index: 99;
			}
			.sub-router-view-container{
				overflow: scroll;
				position: absolute;
				left: 0;right: 0;
				top: 0;bottom: 0;
				width: 100%;
				margin-top: 0.9rem;
			}
		}*/
		

	</style>
	

