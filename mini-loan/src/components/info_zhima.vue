<template>
	<div id="zhimaVue" v-loading='loading' element-loading-text='请稍后' class="input">
		<el-button type='success' @click='authorize' v-if='authorized.status!=="success"'>authrize</el-button>
		<div v-if='authorized.status=="success"'>芝麻信用已绑定</div>
		<div v-if='authorized.status=="success"'>绑定时间：{{authorized.time | timeParse}}</div>
		<el-button type='success' @click='faceCetify'>看你有没有脸</el-button >
		<div v-if='faceCetified'>绑定你的脸{{faceCetified.status | mixRsltParse}}</div>
		<!-- <el-button type='success' @click='getScore'>芝麻分：{{score.score||'未查询'}}</el-button> -->
		<!-- <el-button type='success' @click='applyWatchList'>行业关注名单：{{watchStatus?'已申请':'未申请'}}</el-button> -->

		<div class="container">
			<div class="unordered-list">
				绑定你的脸{{faceCetified.status | mixRsltParse}}
				<i class="el-icon-arrow-right"></i>
			</div>
			<!-- <div class="unordered-list"  @click='getScore'>
				芝麻分：{{score.score||'未查询'}}
				<i class="el-icon-arrow-right"></i>
			</div>
			<div class="unordered-list">
				行业关注名单：{{watchStatus?'已申请':'未申请'}}
				<i class="el-icon-arrow-right"></i>
			</div> -->
		</div>
		<router-view></router-view>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				response:null,
				authorized:{},
				faceCetified:{},
				score:{},
				watchStatus:{},
				loading:false,
				editing:true,
				backAfterPost:false,
				urls:{
					auth:'credit/applyZhimaAuth',
					checkAuth:'credit/zhimaAuthStatus',
					faceCetify:'credit/applyCustomerCertification',
					faceCetifyStatus:'credit/zhimaCustomerCertificationStatus',
					score:'credit/queryZhimaScore',
					scoreStauts:'credit/zhimaScoreStatus',
					watchList:'credit/queryCreditWatchListii',
					watchListStatus:'credit/zhimaWatchlistStatus'
				},
				remind:{
					isShow:false,
					remindMsg:'remind',
					self_:this,
					remindOpts:[
					{msg:'确定',},
					],
				},
			}
		},
		methods:{
			authorize(){
				publicFun.get(this.urls.auth,this,()=>{
					console.log('res',this.response.body.data.url)
					window.location.href=this.response.body.data.url
				})
			},
			checkAuth(){
				publicFun.get(this.urls.checkAuth,this,()=>{
					console.log('res check authorize',this.response.body)
					var data=this.response.body.data
					if(data){
						this.authorized=data
					}

					// window.location.href=this.response.body.data.url
				})
			},
			faceCetify(){
				if(publicFun.isWeiXin()){
					this.remind.remindMsg='请点击右上角使用默认浏览器打开';
					this.remind.remindOpts=[{msg:'确定',callback:()=>{}}]
					this.remind.isShow=true
					return
				}
				publicFun.get(this.urls.faceCetify,this,()=>{
					console.log('faceCetify get res',this.response.body.data.url)
					location.href=this.response.body.data.url
				})
			},
			faceCetifyStatus(){
				publicFun.get(this.urls.faceCetifyStatus,this,()=>{
					console.log('faceCetifyStatus',this.response)
					this.faceCetified=this.response.body.data
				})
			},
			// getScore(){
			// 	publicFun.get(this.urls.score,this,()=>{
			// 		console.log('score res',this.response)
			// 		var res = this.response.body
			// 		// this.score=res.data
			// 		console.log('score 成功')
			// 	})
			// },
			// checkScoreStatus(){
			// 	publicFun.get(this.urls.scoreStauts,this,()=>{
			// 		console.log('scoreStauts res',this.response)
			// 		var data = this.response.body.data
			// 		if(data){
			// 			this.score=data
			// 		}
			// 	})
			// },
			// applyWatchList(){
			// 	publicFun.get(this.urls.watchList,this,()=>{
			// 		console.log('watchList res',this.response)
			// 		var res = this.response.body
			// 		// this.watchStatus=res.data
			// 		console.log('watchList 成功')
			// 	})
			// },
			// checkWatchListStatus() {
			// 	publicFun.get(this.urls.watchList, this, () => {
			// 		console.log('watchList res', this.response)
			// 		var data = this.response.body.data
			// 		if (data) {
			// 			this.watchStatus = data
			// 		}
			// 	})
			// },
		},
		created(){
			this.checkAuth()
			this.faceCetifyStatus()
			// this.checkScoreStatus()
			// this.checkWatchListStatus()
		},
		filters:{
			timeParse(v){
				return publicFun.getTimeString(v)
			},
			mixRsltParse(v){
				// console.log('v',v)
				// console.log(typeof(v))
				return publicFun.parseMixRslt(v)
			}
		},
		events: {},
		components: {
			remind:remind
		}
	}
</script>

<style lang='scss' scoped>

</style>
