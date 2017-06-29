<template>
	<div id="mineApplyListVue" class='mine-vue router-view' >
<!-- 		<h1 class="title">申请记录</h1>
		<div class="sub-top-nav">
			<div class="record-type" v-for='item in status'>{{item.label}}</div>
		</div> -->
		<div class="sub-top-nav input" v-loading='loading' element-loading-text='请稍后'>
			<h1 class="title" ><app-back></app-back>申请记录 </h1>
			<div class="tabs-container">
				<div class="record-type tab" v-for='item in status' :class='{active:crrtStatus===item.status}' @click='switchType(item.status)'>{{item.label}}</div>

			</div>
		</div>
		<div class="list-container"  v-if='records' @scroll='scrolling($event)' @touchend='touchend($event)'@touchstart='touchstart($event)' @touchmove='touching($event)' :style='{marginTop:containerTop+"rem"}'>

			<div class="list-container-inner">
				<div class="record-container" v-for='item in records'>
					<div class="avator">
						<i class="icon-database icon-avator"></i>
					</div>
					<!-- <div class="loan-record" >{{item.applyId}}</div> -->
					<div class="record-brief">
						<div class="record-brief-up">

							<span class="record-name">{{item.name}}</span>
							<span class="record-time">{{item.createTime | timeParser}}</span>
						</div>
						<div class="record-brief-down">
							<span class="record-phone">手机:{{item.phone}}</span>
							<span class="record-phone">金额:{{item.amount||'comming'}}</span>
							<span class="record-status">{{item.status | statusParser}}</span>
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
	import remind from '../components/tmpts/remind.vue'

	export default {
		data() {
			return {
				reloadTouch:{
					start:null,
					end:null,
					last:null,
					crrt:null,
				},
				containerTop:0.9,
				ttlPage:0,
				getting:false,
				allGet:false,
				currentPage:1,
				response:null,
				loading:true,
				editing:true,
				backAfterPost:false,
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
			touchstart(e){
				// console.log('$e',e.touches[0].clientY)
				this.reloadTouch.start=e.touches[0].clientY
				this.reloadTouch.last=e.touches[0].clientY
			},
			touching(e){
				// console.log('touching')
				// console.log('$e',e)
				var t=this.reloadTouch
				t.crrt=e.touches[0].clientY
				if(e.currentTarget.scrollTop>0||t.crrt<t.last){
					t.last=this.reloadTouch.crrt
					return
				}
				console.log('current',e.currentTarget.scrollTop)

				t.last=this.reloadTouch.crrt
				this.containerTop+=0.025
				e.preventDefault()
			},
			touchend(e){
				console.log('e',e)
				// console.log('e',e.currentTarget)
				var el=e.currentTarget
				el.style.transition='0.3s'
				this.containerTop=0.9
				this.reloadTouch.end=e.changedTouches[0].clientY


				this.currentPage=1
				this.ttlPage=null
				this.get(this.crrtStatus)
				setTimeout(()=> {
					el.style.transition='0s'
				}, 300);
			},
			switchType(status){
				this.crrtStatus=status
				this.records=[]
				this.currentPage=1
				this.ttlPage=null
				this.get(this.crrtStatus)
			},
			get(status){
				var body={
					page:this.currentPage,
					limit:7,
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
						if(this.currentPage===this.ttlPage){
							this.allGet=true
						}
						this.currentPage++
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
			this.get(this.crrtStatus)
			
		},
		filters:{
			timeParser(val){
				// var date=new Date(val)
				return publicFun.getTimeString(val)
			},
			statusParser(status){
				var s
				switch(status){
					case 0:s='待审核'; break;
					case 1:s='通过'; break;
					case 2:s='拒绝'; break;
					case 3:s='通过'; break;
				}
				return s
			},
		},
		events: {},
		components: {
			remind:remind,
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
			font-size: 0.3rem;
		}
		.list-container{
			margin-bottom:auto;
			/*height: 3rem;*/
		}
		.list-container-inner{
			/*z-index: 99;*/
		}
	}
</style>
