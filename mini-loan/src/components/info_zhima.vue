<template>
	<div id="zhimaVue" v-loading='loading' element-loading-text='请稍后' class="input">
		<h1 class="title"><app-back></app-back>芝麻认证</h1>



		<!-- <el-button type='success' @click='getScore'>芝麻分：{{score.score||'未查询'}}</el-button> -->
		<!-- <el-button type='success' @click='applyWatchList'>行业关注名单：{{watchStatus?'已申请':'未申请'}}</el-button> -->

		<div class="binding" :class='authBinded?"binded":"unbinded"' >
			<i v-if='authBinded' class="icon-checkmark icon-binding"></i>
			<i v-if='!(authBinded)' class="icon-cross icon-binding"></i>
		</div>
		<!-- authBinded&&faceBinded -->
		<!-- authBinded&&faceBinded -->
		<!-- authBinded&&faceBinded -->
		<div class="binding-text">
			<div  class="binding-detail" >
				芝麻信用<span v-if='authBinded'>已</span><span v-if='!authBinded'>未</span>绑定
			</div>
			<!-- <div class="binding-detail binding-time" v-if='authBinded'>绑定时间：{{authorized.time | timeParse}}</div> -->

			<el-button type='success' @click='authorize' ><span v-if='authBinded'>重新</span>绑定芝麻信用</el-button>
			<!-- <el-button type='success' @click='authorize' v-if='!authBinded'>绑定芝麻信用</el-button> -->
		</div>


		<!-- <div class="" v-if='authBinded'> -->
		<div class="" v-if='false'>
			<!-- <div v-if='faceCetified.status' class="face-status">人脸识别绑定{{faceCetified.status | mixRsltParse}}</div> -->
			<!-- <div v-if='!faceCetified.status' class="face-status">人脸识别未绑定</div> -->
			<!-- <el-button type='success' @click='faceCetify' v-if='!faceBinded'>人脸识别绑定</el-button > -->
		
		</div>
		
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
				faceCetified:{
					status:null,
				},
				score:{},
				watchStatus:{},
				loading:false,
				editing:true,
				backAfterPost:false,
				urls:{
					auth:'credit/applyZhimaAuth',
					checkAuth:'credit/zhimaAuthStatus?f=1',
					faceCetify:'credit/applyCustomerCertification?f=1',
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
			goP(p){
				publicFun.goPage(p)
			},
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
					console.log('faceCetify get res',this.response.body)
					location.href=this.response.body.data.url
				})
			},
			faceCetifyStatus(){
				publicFun.get(this.urls.faceCetifyStatus,this,()=>{
					console.log('faceCetifyStatus',this.response)

					var data=this.response.body.data
					if(data){
						this.faceCetified=data
					}
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
		computed:{
			authBinded(){
				return this.authorized.status=="success"
			},
			faceBinded(){
				return this.faceCetified.status==='success'
			}
		},
		created(){
			this.checkAuth()
			// this.faceCetifyStatus()
			// this.checkScoreStatus()
			// this.checkWatchListStatus()
		},
		filters:{
			timeParse(v){
				return publicFun.getTimeString(v)
			},
			mixRsltParse(v){
				console.log('v',v)
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
	#zhimaVue{

		.binding{
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
			/*margin: 0 auto;*/
			margin: 0.8rem auto 0.3rem ;
		}
		.binded{
			background: #09bb07;
		}
		.unbinded{
			background: #e94f4f;
		}
		.icon-binding{
			line-height: 1rem;
			font-size: 0.55rem;
			/*font-weight: 100;*/
			color: #fff;
		}

		.binding-text{
			margin:0.1rem 0;
			font-size: 0.2rem;
		}
		.binding-time{
			font-size: 0.14rem;
		}
		.binding-detail{
			margin:0.1rem 0;
		}
		.face-status{
			font-size: 0.18rem;
			margin:0.1rem 0;
		}
	}
</style>
<style lang='scss'>
	#zhimaVue{
		.el-button{
			margin-top: 0.05rem;
		}
	}
</style>
