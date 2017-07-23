<template>
	<div id="paidServiceHistoryVue">
	<div class="list-container" @scroll='scrolling'  >
		<div class="list-container-inner" v-loading='loading'  element-loading-text='请稍后'>

			<div class="record-container" v-for='(item, index) in history' @click='reviewDetail(item.id)'>
				<div class="avator">
					<i class="icon-cool icon-avator "></i>
				</div>
				<div class="record-brief">
					<div class="record-brief-up">
						<span class="record-name">{{item.name}}</span>
						<span class="record-time">{{item.createTime | timeParser}}</span>
					</div>
					<div class="record-brief-down">
						<span class="record-phone">手机:{{item.phone}}</span>
						<span class="record-phone">id:{{item.id}}</span>
						<span class="record-status">{{item.status | statusParser}}</span>
					</div>
				</div>
				<i class="icon-chevron-right el-icon-arrow-right"></i>
			</div>

		<div class="list-bottom" v-if='allGet' >没有更多啦...</div>
		</div>
		</div>
		<!-- <el-button type='success' @click='get'>加</el-button> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		// name:'paidServiceHistory',
		data() {
			return {
				history: [],
				response:null,
				getting:false,
				loading:true,
				editing:true,
				allGet:false,
				url:'paidService/records?limit=9&page=',
				currentPage:1,
				ttlPage:null,
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
		beforeEnter(){
			// console.log('enter paidService history')
		},
		created(){
			console.log('route meta',this.$route.meta)
			//destory this if new paid serv created
			// bus.$on('paid_service_created',()=>{
			// 	// console.log('paid_service_created')
			// 	// this.$destroy()
			// })
			this.get()
		},
		methods: {
			scrolling(){
				// console.log('scrolling')
				var el=document.querySelector('.list-container-inner')
				var btt=el.getBoundingClientRect().bottom
				// console.log('btt',btt)
				// return

				if(btt<(screen.height+50)&&this.currentPage<=this.ttlPage&&this.getting===false){
					this.getting=true
					this.get()
				}
				
			},
			reviewDetail(taskId){
				// bus.detailTaskId=taskId
				publicFun.goPage('/paid_service/history/rslt?taskId='+taskId)
			},
			submit(){
				var postBody = {}
				// e.g. postBody.nickQq = this.nickQQ 
				publicFun.post(this.url,postBody,this,()=>{
					//success 
					//this.response
				})
			},
			get(){
				console.log('get history')
				publicFun.get(this.url+this.currentPage,this,()=>{
					console.log('res outer',this.response.body.data.data)
					var data=this.response.body.data
					if(data){
						this.ttlPage=data.pages
						this.history=this.history.concat(data.data)
						if(this.currentPage===this.ttlPage){
							this.allGet=true
						}
						this.currentPage++
					}
					this.getting=false
					// console.log('history', this.history)
				})
			},
			edit(){
				this.editing=true
			},
		},
		filters:{
			timeParser(val){
				// var date=new Date(val)
				return publicFun.getTimeString(val)
			},
			statusParser(status){
				var l=status.length,i,flag=true
				for(i=0;i<l;i++){
					// console.log('status[]',i,status[i])
					flag=flag&&Boolean(status[i].status)
				}
				return flag?'查询完成':'查询中'
			}
		},
		activated(){
			// window.addEventListener('scroll',this.scrolling)
			// var outer=document.querySelector('.sub-router-view-container')
			// console.log('outer',outer)
			// outer.addEventListener('scroll',this.scrolling)
		},
		deactivated(){
			// console.log('history deactivated')
			// window.removeEventListener('scroll',this.scrolling)
			// var outer=document.querySelector('.sub-router-view-container')
			// outer.removeEventListener('scroll',this.scrolling)
		},
		events: {},
		components: {
			remind:remind
		}
	}
</script>

<style lang='scss' scoped>
	*{
		/*border:1px solid red;*/
	}
	
/*	.record-container{
		position: relative;
		border:1px solid #e5e5e5;
		border-width: 1px 0px;
		height: 0.7rem;
		width: 100%;
		background: #fff;
		margin:0.1rem 0;
		.avator{
			position: relative;
			width: 0.5rem;
			height: 0.5rem;
			border:1px solid #c9c9c9;
			position: absolute;
			left: 0.15rem;
			top: 0;bottom: 0;
			margin:auto 0;
			border-radius: 3px;
			.icon-cool{
				font-size: 0.4rem;
				color:#c9c9c9;
				line-height: 0.5rem;
			}
		}
		.record-brief{
			color:#aaaaaa;
			margin-left:0.75rem;
			.record-brief-up{
				height: 0.18rem;
				margin-top: 0.15rem;
				text-align: left;
				.record-name{
					font-size: 0.18rem;
					color:#000;
					line-height: 0.18rem;
					letter-spacing: 0.01rem;
				}
				.record-time{
					font-size: 0.12rem;
					line-height: 0.18rem;
					position: absolute;
					right: 0.3rem;
				}
			}
			.record-brief-down{
				margin-top:0.1rem;
				text-align:left;
				.record-phone{
					font-size: 0.14rem;
					line-height: 0.14rem;
				}
				.record-status{
					position: absolute;
					right: 0.3rem;
				}
			}
		}
		$arrowHeight:0.15rem;
		.icon-chevron-right{
			position: absolute;
			font-size:$arrowHeight;
			height: $arrowHeight;
			color: #aaaaaa;
			right: 0.1rem;
			margin:auto 0;
			top: 0;bottom: 0;
		}
	}*/
	.list-container{
		margin-top:0;
	}
	.active{
		/*background: #eaeaea;*/
	}
</style>
