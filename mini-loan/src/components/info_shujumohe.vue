<template>
	<div id="shujumoheVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">
			<app-back></app-back>手机认证
			<!-- <span class="edit-input" v-if='!editing' @click='edit'>编辑</span> -->
		</h1>
		<!-- <div class="container">
			<div class="wraper">
				<label :disabled='!editing'>手机号:</label> 
				<el-input :disabled='!editing' type='number' placeholder='填写手机号' v-model='phone' @blur.once='blured'  :class='{"valid-border":phoneValid,"error-border":!phoneValid}'></el-input>
				<i :class="{'el-icon-check':phoneValid,'el-icon-close':!phoneValid}"></i>
			</div>


		</div> -->
		<h2 class="sub-title">绑定状态</h2>
		<div class="container status">
			<div class="wraper">
				<div class="icon icon-mobile" >
					<!-- <i class="icon-mobile"></i> -->
				</div>
				<div class="info phone">{{queryRslt.phone}}</div>
				<!-- <div class="info">黄树栋</div> -->
				<div class="info info-time">{{queryRslt.time | timeParse}}</div>
				<!-- <div class="status">等待用户处理或服务器完成查询</div> -->
				<div class="info" v-if='queryRslt.status'>{{queryRslt.status | statusParse}}</div>
				

			</div>
		</div>
		<!-- <a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23&real_name=黄树栋&identity_code=321282199902022222&user_mobile=13816938525&cb=http%3A%2F%2Flocalhost%3A8080%2Fm%2F%23%2Fshujumoh">1111</a>
		<a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23&real_name=lalala&identity_code=321282199902022222&user_mobile=13816938525&cb=http%3A%2F%2Flocalhost%3A8080%2Fm%2F%23%2Fshujumoh">full</a>
		<a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23&real_name=lalala">real_name</a>
		<a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23&real_name=lalala&identity_code=321282199902022222">identity_code</a>
		<a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23&real_name=lalala&identity_code=321282199902022222&user_mobile=13816938525">user_mobile</a>
		<a href="https://open.shujumohe.com/box/yys?box_token=BB2D93B9B972461A989EB491C1C3EE23">callback</a> -->
		<!-- <el-checkbox v-model="useAccount">使用账号手机号</el-checkbox> -->
		<transition>
			<!-- <el-button type='success' :disabled='false' class='submit' v-if='true' @click='get'>重新查询</el-button> -->
			<el-button type='success' :disabled='false' class='submit' v-if='!isFirst' @click='get(1)'>重新查询</el-button>
			<el-button type='success' :disabled='false' class='submit' v-if='isFirst' @click='get(0)'>开始认证</el-button>

			<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		</transition>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	import remind from '../components/tmpts/remind.vue'
	export default {
		data() {
			return {
				// useAccount:true,
				response:null,
				// loading:true,
				loading:false,
				isFirst:false,
				editing:false,
				phone:'',
				taskId:null,
				urlStatus:'credit/shujumoheSimQueryStatus',
				url:'credit/createShujumoheSimTask',
				exUrl:'https://open.shujumohe.com/box/yys',
				real_name:'',
				identity_code:'',
				formData:{
				},
				queryRslt:{},
				// backAfterPost:true,
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
			submit(){
				var postBody = {
					box_token:'BB2D93B9B972461A989EB491C1C3EE23',
					real_name:this.real_name,
					identity_code:this.identity_code,
					user_mobile:this.phone,
					// cb:encodeURI('http://localhost:8888/m/#/shujumohe'),
					// cb:location.href,
					cb:'http://hzg.he577.com/m/#/index/shujumohe',
					// cb:'http://hzg.he577.com/m/#'+this.$route.path,
					// v:Math.random().toFixed(5),//防止location.href 失效
					// cb:encodeURIComponent('http://hzg.he577.com/callback/shujumohe/createSimQuery?self_task_id='+this.taskId+'&phone='+this.phone),
				}


				// console.log('callback',postBody.cb)
				// console.log('this.taskId',this.taskId)
				var url=publicFun.urlConcat(this.exUrl,postBody)
				// var url=publicFun.urlConcat('----',postBody)
				console.log('URL shujumohe',url)
				// return
				// url=encodeURI(url)
				// url='https://www.baidu.com'
				location.href=url
				// this.remind.isShow=true
				// this.remind.remindMsg='传送门已开启，点击确定前往'
				// this.remind.remindOpts=[{
				// 	msg:"确定",
				// 	href:url,
				// }]
			},
			get(type) {
				if (type === 0) {
					this.createTask()
					return
				} else if (type === 1) {

					// this.remind.remindMsg='确定提交会清空现有记录'
					this.remind.remindMsg = '覆盖现有记录'
					this.remind.isShow = true
					this.remind.remindOpts = [{
						msg: '确定',
						callback: () => {
							this.createTask()
						}
					}, {
						msg: '取消',
					}, ]
				}
			},
			createTask(){
				publicFun.get(this.url,this,()=>{
					console.log('res shujumohe',this.response.data)
					var data=this.response.body.data
					console.log('data',data)
					if(data){
						this.taskId=data.taskId
						this.real_name=data.name
						this.phone=data.phone
						this.identity_code=data.idCardNum
						this.submit()
					}
				})
			},
			edit(){
				this.editing=true
			},
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			setFormData(dataKey){
				if(this[dataKey+'Valid']){
					this.formData[dataKey]=this[dataKey]
				}else{
					this.formData[dataKey]=null
				}
			},
			getStatus(){
				publicFun.get(this.urlStatus,this,()=>{
					console.log('shujumohe',this.response)
					var data=this.response.body.data
					if(data){
						this.queryRslt=data
							var now=new Date().getTime()
							var passed = now - data.time
							if(passed>=600*1000){
								this.queryRslt.status='failure:超时！'
							}
						// console.log('now',now-this.queryRslt.time)
						console.log('data',data)	
					}else{
						this.isFirst=true
					}
				})
			},
			
		},
		watch:{
			
		},
		computed:{
			phoneValid:function(){
				var reg=publicFun.reg.cellphone;
				return reg.test(this.phone)
			},
			allValid:function(){
				var t=this
				return t.phoneValid&&true//&&
				
			},
		},
		filters:{
			timeParse(val){
				return publicFun.getTimeString(val)
			},
			statusParse(val){
				var s,r
				// console.log('this',this)
				if(!val){
					return
				}
				switch (val) {
					case 'doing':
					
						s = '等待用户处理或服务器完成查询'
						break;
					case 'success':
						s = '查询绑定成功'
						break;
					default:
						r = val.slice(val.indexOf(':') + 1)
						s = '绑定失败,失败原因：' + r
				}
				return s
			}
		},
		created(){
			this.getStatus()
			publicFun.checkSession(this)
			this.useAccount=true
			// this.get()
		}
		,
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	a{
		font-size: 0.2rem;
		display:block;
		padding: 0.05rem;
	}
	#shujumoheVue{
		*{
			/*border:1px solid red;*/
		}
		.sub-title{
			padding:0.0rem 0.15rem;
		}
		.wraper{
			margin-left: 0.15rem;
			height: 0.95rem;
			.info{
				margin:0.15rem 0;
				margin-left: 0.6rem;
				text-align: left;

			}
			.phone{
				font-size: 0.2rem;
			}
			.info-time{
				position: absolute;
				right: 0.1rem;
				top: 0;
				font-size: 0.14rem;
				line-height: 0.2rem;
				color: #999;
			}
			.status{
				position: absolute;
				top: 0;
				right: 0;
				width: 1rem;
				text-align: right;
			}
		}
		.icon{
			width: 0.4rem;
			height: 0.4rem;
			/*border:1px solid #ccc;*/
			border-radius: 0.03rem;
			position: absolute;
			top: 0.16rem;
			line-height: 0.4rem;
			font-size: 0.36rem;
			color: #666;	
		/*	.icon-mobile{
				color: #ccc;
				position: absolute;
				top: 0;left: 0;
			}
			*/
		}
	}
</style>
