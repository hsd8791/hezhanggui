<template>
	<!-- <keep-alive> -->

	<div id="paidServiceRsltVue" v-loading='loading' element-loading-text='请稍后' class="">
		<div class="input">
			<h1 class="title">查询详情</h1>
		</div>
		<div class="rslt-identity"></div>
		<div class="result-container" v-if='basicInfo'>
			<h2 class="rslt-title">基本信息</h2>
			<p class="result rslt-basic">姓名：{{basicInfo.name}}</p>
			<p class="result rslt-basic">身份证：{{basicInfo.idcardNum}}</p>
			<p class="result rslt-basic">手机号：{{basicInfo.phone}}</p>
			<p class="result rslt-basic">地址：{{basicInfo.address| checkNull}}</p>
			<p class="result rslt-basic">邮箱：{{basicInfo.email| checkNull}}</p>
			<p class="result rslt-basic">银行卡：{{basicInfo.bankCard| checkNull}}</p>
			<p class="result rslt-basic">查询时间：{{basicInfo.createTime | toTime }}</p>
		</div>
		<div class="result-container" v-if='antifraudRslt'>
			<h2 class="rslt-title "  >反欺诈信息</h2>

			<p class="result rslt-ivs" v-if='antifraudRslt.score'>申请欺诈评分：任务{{antifraudRslt.score }}</p>
			<p class="result rslt-ivs" v-if='antifraudRslt.scoreError'>申请欺诈评分：任务{{antifraudRslt.scoreError }}</p>
			<p class="result rslt-ivs" v-for='item in antifraudRslt.verify_code'>欺诈信息验证：任务{{item | antifraudParse}}</p>
			<p class="result rslt-ivs" v-if='antifraudRslt.verifyError'>欺诈信息验证：任务{{antifraudRslt.verifyError}}</p>
			<p class="result rslt-ivs" v-for='item in antifraudRslt.risk_code'>欺诈关注清单：任务{{item | antifraudParse}}</p>
			<p class="result rslt-ivs" v-if='antifraudRslt.riskError'>欺诈关注清单：任务{{antifraudRslt.riskError}}</p>
			<!-- <p class="result rslt-ivs">信用评分：{{ivsRslt.ivs_score}}</p>
			<p class="result ivs-detail" v-for='item in ivsRslt.ivs_detail'>
				{{item.description}} 风险评估：{{item.evaluation }}
			</p> -->
		</div>
		<div class="result-container" v-if='expireInfo'>
			<h2 class="rslt-title " :class='{"rslt-querying":expireInfo.waiting}'>借贷宝逾期信息</h2>
			<div class="result rslt-expire" v-if='!expireInfo.waiting'>{{expireInfo.message}}</div>
		</div>
		<div class="result-container" v-if='score'>
			<h2 class="rslt-title">芝麻信用积分</h2>
			<div class="result rslt-score"></div>
		</div>
		<div class="result-container" v-if='tongdunRslt'>
			<h2 class="rslt-title" :class='{"rslt-querying":tongdunRslt.waiting}'>同盾</h2>
			<div class="result" v-if='!tongdunRslt.waiting'>
				<div class="part-container" v-if='!tongdunRslt.waiting' >
					<h3 class="part-title">总览</h3>
					<div class="group-container" v-if='tongdunRslt'>
						<div class="group-rslt">
							<p class="address-detect-rslt">风险指数：{{tongdunRslt.final_score}}</p>
							<p class="address-detect-rslt">建议：{{tongdunRslt.final_decision | decisionParse}}</p>
						</div>
					</div>
				</div>
				<div class="part-container"  v-if='!tongdunRslt.waiting'>
					<h3 class="part-title">归属地解析</h3>
					<div class="group-container" v-if='tongdunRslt'>
						<div class="group-rslt">
							<p class="address-detect-rslt">身份证所属地:{{tongdunRslt.address_detect.id_card_address}}</p>
							<p class="address-detect-rslt">手机所属地:{{tongdunRslt.address_detect.mobile_address}}</p>


						</div>
					</div>
				</div>
				<div class="part-container risk-part" v-if='!tongdunRslt.waiting'>
					<h3 class="part-title">贷款风险情况</h3>
					<div class="group-container" v-if='tongdunGroups.indexOf("个人基本信息核查")!==-1' >
						<h4 class="group-title">个人基本信息核查</h4>
						<div class="group-rslt">
							<el-collapse v-model="activeNames.profile" @change=''>
							<div class="detail-rslt" v-for='(item,index) in risks' v-if='item.group=="个人基本信息核查"'>
								<el-collapse-item :title="item.item_name" :name="index"> 
								<h5 class="deep-detail-title">
									<!-- 总个数：{{item.item_detail.platform_count}} -->
									&nbsp;
									<span class="risk-level">风险等级：{{item.risk_level | riskParse}}</span>
								</h5>
								<!-- <ul>
									<li class="deep-detail" v-for='platformItem in item.item_detail.platform_detail'>{{platformItem}}</li>
								</ul> -->
							</el-collapse-item>
						</div>
					</el-collapse>
				</div>
			</div>
			<div class="group-container" v-if='tongdunGroups.indexOf("风险信息扫描")!=-1'>
				<h4 class="group-title">风险信息扫描</h4>
				<div class="group-rslt">
					
					<el-collapse v-model="activeNames.riskInfo" @change=''>
					<div class="detail-rslt" v-for='(item,index) in risks' v-if='item.group=="风险信息扫描"'>
						<el-collapse-item :title="item.item_name" :name="index"> 
						<ul>
							<li class="deep-detail">
								逾期次数：{{item.item_detail.discredit_times}}
								<span class="risk-level">风险等级：{{item.risk_level | riskParse}}</span>
							</li>
						</ul>
						<ul>
							<li class="deep-detail" v-for='overdueItem in item.item_detail.overdue_details'>
								<ul>

									<li>逾期金额：{{overdueItem.overdue_amount_range}} </li>
									<li>逾期笔数：{{overdueItem.overdue_count}} </li>
									<li>逾期天数：{{overdueItem.overdue_day_range}} </li>
									<li>逾期入库时间：{{overdueItem.overdue_time}} </li>
								</ul>
							</li>
						</ul>
					</el-collapse-item>
				</div>
			</el-collapse>
		</div>

	</div>
	<div class="group-container" v-if='tongdunGroups.indexOf("多平台借贷申请检测")!==-1'>
		<h4 class="group-title">多平台借贷申请检测</h4>
		<div class="group-rslt">
			<el-collapse v-model="activeNames.mutiplatform" @change=''>

			<div class="detail-rslt" v-for='(item,index) in risks' v-if='item.group=="多平台借贷申请检测"'>
				<!-- <h5 class="detail-title">{{item.item_name}}</h5> -->
				<el-collapse-item :title="item.item_name+'——'+item.item_detail.platform_count+'个'" :name="index">
				<div class="deep-detail-title">
					总个数：{{item.item_detail.platform_count}}
					<span class="risk-level">风险等级：{{item.risk_level | riskParse}}</span>
				</div>
				<ul>
					<li class="deep-detail" v-for='platformItem in item.item_detail.platform_detail'>{{platformItem}}</li>
				</ul>
				<div class="deep-detail-title">各维度多头详情</div>
				<ul class="deep-detail" v-for='dimenItem in item.item_detail.platform_detail_dimension'>
					<li class="dimen-level-first">
						{{dimenItem.dimension}}
					</li>
					<ul>
						<li class='dimension-detail' v-for='detail in dimenItem.detail'>{{detail}}</li>
					</ul>

				</ul>
			</el-collapse-item>
		</div>

	</el-collapse>
</div>
</div>
<div class="group-container" v-if='tongdunGroups.indexOf("客户行为检测")!==-1'>
	<h4 class="group-title">客户行为检测</h4>
	<div class="group-rslt">

		<el-collapse v-model="activeNames.action" @change=''>
		<div class="detail-rslt" v-for='(item,index) in risks' v-if='item.group=="客户行为检测"'>
			<el-collapse-item :title="item.item_name" :name="index"> 
			<h5 class="deep-detail-title">
				<span v-if='item.item_detail'>
					各维度多头详情
				</span>&nbsp;
				<span class="risk-level">风险等级：{{item.risk_level | riskParse}}</span>
			</h5>  <!-- 多头 -->
			<div v-if='item.item_detail'>
				<ul class="deep-detail"  v-for='frequency in item.item_detail.frequency_detail_list' > <!-- .frequency_detail_list -->
					<li class="dimen-level-first">
						{{frequency.detail}}  <!-- detail -->
					</li>
					<ul>
						<li class='dimension-detail' v-for='data in frequency.data'>{{data}}</li>
					</ul>
				</ul>
			</div>
		</el-collapse-item>
	</div>
</el-collapse>
</div>
</div>
</div>

</div>
</div>
<remind :remind='remind'></remind>
</div>
<!-- </keep-alive> -->
</template>

<script>
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		// name:'paidServiceRslt',
		data() {
			return {
				activeNames:{
					mutiplatform:[],
					action:[],
					profile:[],
					riskInfo:[],
				},
				unShow:false,
				response:null,
				loading:false,
				editing:true,
				url2:'paidService/detail',
				url:'paidService/status',
				taskId:'',
				remind:{
					isShow:false,
					remindMsg:'remind',
					self_:this,
					remindOpts:[
					{msg:'确定',},
					],
				},

				basicInfo:null,
				// ivsRslt:{},
				antifraudRslt:{
					risk_code:null,
					verify_code:null,
					score:null,
					riskError:null,
					verifyError:null,
					scoreError:null,
				},
				expireInfo:{},
				tongdunRslt:null,
				risks:null,
				score:null,
				tongdunGroups:[],
			}
		},
		activated:function(){
			console.log('active')
			var eOuter=	document.querySelector('.sub-router-view-container')
			if(eOuter){
				eOuter.style.marginTop='0'
			}
			// 	if(this.$route.query){
			// 	this.taskId=this.$route.query.taskId
			// 	this.get()
			// 	// console.log('rslt res',this.response)
			// }else{
			// 	// publicFun.goPage(-1)
			// }
		},
		created:function(){

			// console.log('bus',bus,bus.detailTaskId)
			// console.log('router',this.$route.query)
			console.log('created')
			if(this.$route.query){
				console.log('getting')
				this.taskId=this.$route.query.taskId
				this.get()
				// console.log('rslt res',this.response)
			}else{
				// publicFun.goPage(-1)
			}
		
		},
		
		filters:{
			decisionParse(val){
				var s
				switch(val){
					case 'Reject': 
					s='建议拒绝';break;
					case 'Review': 
					s='建议审核';break;
					case 'Accept': 
					s='建议通过';break;
					default: s='未知'
				}
				return s
			},
			toTime(val){
				// var date=new Date(val)
				return publicFun.getTimeString(val)
			},
			checkNull(val){
				if(!val){
					return '未填写'
				}else{
					return val
				}
			},
			antifraudParse(val){
				// console.log('val antifraudParse',val)
				return publicFun.antifraudParse(val)
				// return test.parse(val)
			},
			riskParse(val) {
				var s
				// console.log('val',val)
				switch (val) {
					case 'high':
					s = '高';
					break;
					case 'medium':
					s = '中等';
					break;
					case 'low':
					s = '低';
					break;
					default:
					'';
				}
				return s
			},
		},
		methods:{
			submit(){
				var postBody = {}
				// e.g. postBody.nickQq = this.nickQQ 
				publicFun.post(this.url,postBody,this,()=>{
					//success 
					//this.response
				})
			},
			get(){
				this.url+='?taskId='+this.taskId
				this.url2+='?taskId='+this.taskId
				// console.log('url',this.url)
				publicFun.get(this.url,this,()=>{
					if(this.response.body.error===20002) {
						this.remind.remindOpts = [{
							msg: '确定'
						}]
						this.remind.isShow=true
						this.remind.remindOpts[0].callback = function() {
							publicFun.goPage('/login')
						}
						return
					}
					// console.log('basic',this.response)
					var data=this.response.body.data
					this.basicInfo=data
					publicFun.get(this.url2,this,()=>{
						var data=this.response.body.data.detail
						,l=data.length,i
						// console.log('rslt',this.response)
						// console.log('data',data)
						for(i=0;i<l;i++){
							var p=data[i]
							console.log('data',i,data[i])
							if(p.product==="IvsDetail"){
								// console.log('ivs required')
								if(data[i].status==='waiting'){
									this.ivsRslt={}
									this.ivsRslt.waiting=true
									continue
								}
								this.ivsRslt=publicFun.IvsParse(data[i].result)
								continue
							}
							if(p.product==="JiedaibaoQuery"){
								console.log('data[i]',data[i],'JiedaibaoQuery')
								// console.log( '借贷宝 required')
								if(data[i].status==='waiting'){
									this.expireInfo={}
									this.expireInfo.waiting=true
									continue
								}
								this.expireInfo=publicFun.pasreExpireInfo(data[i].result)
								continue
							}
							if(p.product==="TongdunPreloanQuery"){
								// console.log('data[i].result',data[i].result)
								if(data[i].status==='waiting'){
									this.tongdunRslt={}
									this.tongdunRslt.waiting=true
									continue
								}
								var obj=JSON.parse(data[i].result)
								this.risks=obj.risk_items
								console.log('rsiks',obj.risk_items)
								this.tongdunRslt=obj
								var l=obj.risk_items.length,i
								this.tongdunGroups=[]
								for(i=0;i<l;i++){
									this.tongdunGroups.push(obj.risk_items[i].group)
								}
								continue
								// console.log( '同盾 required')
								// this.expireInfo=publicFun.pasreExpireInfo(data[i].result)
							}

							// if(p.product==='AntifraudRiskList'||p.product==='AntifraudVerify'||p.product==='AntifraudScoreGet'){
							// 	console.log('result',p)
							// 	if(p.status!=='success'){
							// 		console.log('p',p)
							// 		if(p.status==='waiting'){
							// 			console.log('正在查询')
							// 			continue
							// 		}
							// 		console.log('error',publicFun.parseMixRslt(p.result))
							// 	}
							// }
							// console.log('result',p)
							// 以下三段IF 可以合并，参见上面注释掉的代码
							if (p.product === 'AntifraudRiskList') {
								if(p.status!=='success'){
									if(p.status==='waiting'){
										console.log('正在查询')
										this.antifraudRslt.riskError='正在查询'
										// this.antifraudRslt={}
										// this.antifraudRslt.waiting=true
										continue
									}else if(p.status==='failure'){
										this.antifraudRslt.riskError=publicFun.parseMixRslt(p.result)

									}

								}else{
									var rslt=JSON.parse(p.result)
									this.antifraudRslt.risk_code=rslt.risk_code
									continue
								}
							}
							if (p.product === 'AntifraudVerify') {
								if(p.status!=='success'){
									if(p.status==='waiting'){
										console.log('正在查询')
										this.antifraudRslt.verifyError='正在查询'
										// this.antifraudRslt={}
										// this.antifraudRslt.waiting=true
										continue
									}else if(p.status==='failure'){
										this.antifraudRslt.verifyError=publicFun.parseMixRslt(p.result)

									}

								}else{
									var rslt=JSON.parse(p.result)
									this.antifraudRslt.verify_code=rslt.verify_code
									continue
								}
							}
							if (p.product === 'AntifraudScoreGet') {
								if(p.status!=='success'){
									if(p.status==='waiting'){
										console.log('正在查询')
										this.antifraudRslt.scoreError='正在查询'
										// this.antifraudRslt={}
										// this.antifraudRslt.waiting=true
										continue
									}else if(p.status==='failure'){
										this.antifraudRslt.scoreError=publicFun.parseMixRslt(p.result)

									}

								}else{
									var rslt=JSON.parse(p.result)
									this.antifraudRslt.score=rslt.score
									continue
								}
							}
						}

					})
				})
			},
			edit(){
				this.editing=true
			},
		},
		deactivated(){
		
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

	#paidServiceRsltVue{
		ul{
			list-style-position: inside;
		}
		.result-container{
			.rslt-title{
				background: #ccc;
				text-align: left;
				padding-left: 0.1rem;
				font-size: 0.2rem;
				line-height: 1.6;
			}
			.rslt-querying{
				&:after{
					content:'查询中...';
					position: absolute;
					right: 0.15rem;
					font-size: 0.14rem;
					line-height: 0.32rem;
					font-weight: normal;
				}
			}
			.result{
				text-align: left;
				padding: 0 0.1rem ;
				margin: 0.1rem 0;
				font-size: 0.14rem;

			}
			/*height: 1rem;*/
		}
		.part-container{
			margin:0.1rem 0;
			background: #fff;
			padding-bottom: 0.1rem;
			.part-title{
				padding:0 0.1rem ;
				font-size: 0.20rem;
				line-height: 1.6;
				border: 0px solid #ccc ;
				border-bottom-width: 1px;

			}
			.address-detect-rslt{
				margin-top: 0.1rem;
				font-size: 0.18rem;
			}
			.group-title{
				border: 0px solid #ccc ;
				border-bottom-width: 1px;
				margin:0.1rem;
				font-size: 0.16rem;
				line-height: 1.4;
			}
			.group-rslt{
				padding: 0 0.1rem;
			}
			.detail-rslt{
				border: 1px solid #dfe6ec;
				border-top-width: 0px;
				&:first-child{
					border-top-width: 1px;
				}
				overflow: hidden;
				.detail-title{
					margin:0.1rem 0;
					font-size: 0.14rem;
					line-height: 1.2;
					font-weight: normal;
				}
				.deep-detail{
					margin:0.05rem 0.2rem;
					list-style-type: decimal;
					position: relative;
				}
				.deep-detail-title{
					color:#555500;
					font-size: 0.14rem;
					margin:0.05rem 0.1rem;
					position: relative;
				}
				.risk-level{
					position: absolute;
					/*margin-left: 1.2rem;*/
					right: 0;
					color:red;
				}
				.dimension-detail{
					margin-left: 0.2rem;
					color:#888;
					font-size: 0.14rem;
					list-style-type: lower-roman;
					
				}
				.dimen-level-first{
					list-style-type: upper-roman;
				}
			}
		}

	}
</style>
<style lang='scss' >

	#paidServiceRsltVue{
		.el-collapse-item__content,.el-collapse-item__header{
			font-size: 0.14rem;
			padding: 0 0.15rem;
		}
		.el-collapse-item__header{
			padding: 0.05rem 0.10rem;
			height:0.3rem;
			line-height:0.2rem;
			overflow: hidden;
			/*width: 2.5rem;*/
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.el-collapse-item__header__arrow{
			margin-right: 0.04rem;
		}
		.el-collapse{
			border-width: 0px;
		}
		.is-active{
			.el-collapse-item__header{
				white-space: normal;
				height: auto;
			}
		}

	}
</style>
