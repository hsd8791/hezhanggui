<template>
	<div id="mineApplyListVue" class='mine-vue router-view' >
<!-- 		<h1 class="title">申请记录</h1>
		<div class="sub-top-nav">
			<div class="record-type" v-for='item in status'>{{item.label}}</div>
		</div> -->
		<div class="sub-top-nav input" v-loading='loading' element-loading-text='请稍后'>
			<h1 class="title" ><app-back :text='"我的"' :link='"/mine"' :backStep='2'></app-back>申请记录 </h1>
			<div class="tabs-container">
				<div class="record-type tab" v-for='item in status' :class='{active:crrtStatus===item.status}' @click='switchType(item.status)'>{{item.label}}</div>

			</div>
		</div>
		<div class="list-container"  v-if='records' @scroll='scrolling($event)' >

			<div class="list-container-inner" @touchend='touchend($event)' @touchstart='touchstart($event)' @touchmove='touching($event)' :style='{paddingTop:containerTop+"rem"}'>
			<div class="list-top" v-if='refreshPulling'>
				<!-- <p class="list-top-text"> -->
				-释放刷新-
				<!-- </p> -->
			</div>
				<div class="record-container" v-for='item in records' v-if='item.name!=="小禾微贷"' @click='viewDetail(item)'>
				<!-- <div class="record-container" v-for='item in records' v-if='true' @click='viewDetail(item)'> -->
				<!-- <div class="record-container" v-for='item in records' v-if='crrtStatus===-1||item.status===crrtStatus'> -->
					<div class="avator">
						<i class="icon-database icon-avator"></i>
					</div>
					<!-- <div class="loan-record" >{{item.applyId}}</div> -->
					<div class="record-brief">
						<div class="record-brief-up">
							<span class="record-name">{{item.name}}</span>
							<span class="record-time">{{item.creat_time | timeParser}}</span>
						</div>
						<div class="record-brief-down">
							<span class="record-phone">手机:{{item.phone}}</span>
							<span class="record-phone" v-if='/\d/.test(item.amount)'>金额:{{item.amount | amountParser}}</span>
							<span class="record-status">{{item.status| statusParser}}</span>
						</div>
					</div>
					<i class="el-icon-arrow-right"></i>
				</div>
				<div class="list-bottom" v-if='allGet'>没有更多啦...</div>
			</div>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	import bus from '../bus.js'
	import publicFun from '../js/public.js'
	// import remind from '../components/tmpts/remind.vue'

	export default {
		data() {
			return {
				reloadTouch:{
					start:null,
					end:null,
					last:null,
					crrt:null,
				},
				lendingUid:null,
				containerTop:0,
				maxTop:2,
				ttlPage:0,
				getting:false,
				allGet:false,
				currentPage:1,
				response:null,
				loading:true,
				editing:true,
				backAfterPost:false,
				refreshPulling:false,
				crrtStatus:-1,
				status:[
				{label:'全部',status:-1},
				{label:'审核中',status:0},
				{label:'通过',status:1},
				{label:'拒绝',status:2},
				],
				records:[],
				url:'lendApply/borrowLoanRecords',
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
		methods: {
			getApplyStatus(item){
				if(item.phone.indexOf('****')>-1){
					if(publicFun.longApplied(item.creat_time)){
						return -999
					}else{
						return -99
					}
				}else{
					return item.status
				}

			},
			viewDetail(item){
				bus.applyRecordViewing=item
				let url=publicFun.urlConcat('/apply_detail',{
					apply_id:item.apply_id,
					lendingUid:item.lendingUid
				})
				publicFun.goPage(this.$route.path+url)
			},
			touchstart(e){
				// console.log('$e',e.touches[0].clientY)
				this.reloadTouch.start=e.touches[0].clientY
				this.reloadTouch.last=e.touches[0].clientY
			},
			touching(e){
				var t=this.reloadTouch
				t.crrt=e.touches[0].clientY
				var scrollTop=e.currentTarget.parentElement.scrollTop

				if(scrollTop>0){
					return
				}else{
					// console.log('may drag down')
					// console.log('e.currentTarget.scrollTop',e.currentTarget.parentElement.scrollTop)
					// console.log('compare',t.last,t.crrt)
					this.refreshPulling=true
					if(t.crrt<=t.last){
						if(this.containerTop===0){
							return
						}else{
							// e.stopPropagation()
							e.preventDefault()
							this.containerTop-=0.025;
						}
					}else{
						// e.stopPropagation()
						e.preventDefault()
						this.containerTop+=0.025
						// console.log('drag down')
					}
				}
				t.last=t.crrt
			},
			//下拉刷新的要素，
			// touchstart 获取位置,
			// touchmove 确定是否下啦，上拉,下拉|上拉时preventDefault
			// touchend 是否刷新
			// paras: start last crrt end
			// 检测元素， touch event on 最长的（inner list), scrollTop of parentElement
			touchend(e){
				// console.log('e',e)
				// console.log('e',e.currentTarget)
				var el=e.currentTarget,t=this.reloadTouch
				el.style.transition='.5s cubic-bezier(0.23, 0.86, 0.39, 0.78)'
				t.end=e.changedTouches[0].clientY
				if(this.containerTop>0){
					console.log('refresh')
					this.getNew()
				}
				this.containerTop=0
				setTimeout(()=> {
					el.style.transition='0s'
					this.refreshPulling=false
				}, 300);
			},
			switchType(status){
				this.crrtStatus=status
				this.getNew()
			},
			getNew(){
				this.records=[]
				this.currentPage=1
				this.ttlPage=null
				this.allGet=false
				this.get(this.crrtStatus)
			},
			get(status){
				var body={
					page:this.currentPage,
					limit:8,

				}
				if(this.lendingUid){
					body.lendingUid=this.lendingUid
				}
				if(status!==-1&&status!==undefined){
					body.status=status// -1:all 0:audit 1:ac 2: refuse
				}
				var url=publicFun.urlConcat(this.url,body)
				console.log('url',url)
				publicFun.get(url,this,()=>{
					console.log('response',this.response)
					var data=this.response.body.data
					console.log('res outer',data)
					if(data){
						this.ttlPage=data.pages
						this.records=this.records.concat(data.data)
						if(this.currentPage===this.ttlPage || data.data.length===0){
							this.allGet=true
						}
						this.currentPage++
						let listContainer=document.querySelector('.list-container-inner')
						this.$nextTick(()=>{
							if(listContainer.scrollHeight<700&&!this.allGet){
								this.get(this.crrtStatus)
							}
						})

					}
					this.getting=false
				// e.g.	this.acWechat=data.acWechat
			})
			},
			edit(){
				this.editing=true
			},
			scrolling(e){
				// console.log('scrolling')
				// this.loading=true
				// return
				// console.log('e',e.target.scrollTop)
				var el=document.querySelector('.list-container-inner')
				var btt=el.getBoundingClientRect().bottom
				// console.log('btt',btt)
				if(btt<(screen.height+50)&&this.currentPage<=this.ttlPage&&this.getting===false){
					this.getting=true
					this.get(this.crrtStatus)
				}
			},
		},
		created(){
			// if(this.$route.query.lendingUid){
			// 	this.lendingUid=this.$route.query.lendingUid
			// }
			// var url=publicFun.urlConcat(this.urlMarketInfo,{
			//   id:this.$route.params.id.split('_')[1]
			// })
			if(this.$route.params.uid){
				this.lendingUid=this.$route.params.uid.split('_')[1]
			}
			this.get(this.crrtStatus)
			
		},
		filters:{
			timeParser(val){
				// var date=new Date(val)
				return publicFun.getTimeString(val)
			},
			statusParser(status){
				
				return publicFun.auditStatusParse(status)
			},
			amountParser(v){
				// if()
				// return parseFloat(v)
				return (Number(v)/100).toFixed(2)
			},
		},
		events: {},
		components: {
			// remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	#mineApplyListVue{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		.icon-database{
			font-size: 0.2rem;
		}
		.list-container{
			margin-bottom:auto;
			/*overflow: visible;*/
			/*height: 3rem;*/
		}
		.list-container-inner{
			position: relative;
			/*padding-top:0.2rem;*/
			/*z-index: 99;*/
		}
		.list-top{
			position: absolute;
			top: 0.2rem;
			font-size: 0.14rem;
			width: 100%;
			overflow: visible;
			text-align: center;
		}
	/*	.list-top-text{
		}*/
	}
</style>
