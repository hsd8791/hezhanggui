<template>
	<div id="loanBillVue">
		<div class="input" v-loading='loading' element-loading-text='请稍后'>
			<h1 class="title">我的借款</h1>
		</div>
		<div class="container auditing" v-if='auditing===4' audit-ctrl='refused'>
			<p>
				审核拒绝
			</p>
			<div class="auditing-remark">
				<!-- <p class="auditing-description">说明：请根据审·核意见更新或修改资料后重新提交</p> -->
				<p class="auditing-description">审核意见：{{auditingRemark}}</p>
			</div>
		</div> 
		<div class="container auditing" v-if='auditing===0||auditing===1' audit-ctrl='auditing' >
			<p class="auditing-txt">
			<span v-if="loanInfo">重借/续期</span><span v-if="!loanInfo">小禾微贷</span> 审核中
			</p>
		</div>
		<div class="container" v-if='!loanInfo&&(auditing===0||auditing===1)' audit-ctrl='guide'>
			<p class="remind">新用户审核时间：上午9：00-下午5：00。</p>
			<p class="remind">下午5：00以后申请的将在第二天开始审核。</p>
			<p class="remind">必须添加QQ公众号【4000577009】才能进行审核。</p>
			<p class="remind">识别以下二维码关注【小禾微贷公众号】，输入“审核”咨询结果。</p>
			<img src="./../assets/img/QRxh.jpg" alt="" class="qrcode">
		</div>
		<div class="container auditing audit-refused" v-if='auditing===2' audit-ctrl='re-fill'>
			<p>
				发回重审
			</p>
			<div class="auditing-remark">
				<p class="auditing-description">说明：请根据审核意见更新或修改资料后重新提交</p>
				<p class="auditing-description">审核意见：{{auditingRemark}}</p>
			</div>
		</div>
		<div class="container auditing" v-if='(!loanInfo)&&auditing==null' audit-ctrl='no-apply'>
			无申请记录
		</div>
		<div class="input" v-if='auditing===2' audit-ctrl='reapply'>
			<el-button type='success' @click='reapply' > 重新申请</el-button>
		</div>
		<!-- <div class="container" v-if='true'> -->
		<div class="container" v-if='auditing!==4&&loanInfo&&auditing!==2' audit-ctrl='bill-status' >
			<div class="inner-contaier loan-amount">
				<div class="detail-li">
					<span class="li-title">借款金额</span>
					<span class="li-content loan-amount">￥{{loanInfo.moneyFee | moneyParser}}</span>
				</div>
			</div>
			<div class="inner-contaier loan-date">
				<div class="detail-li">
					<span class="li-title">借款日期</span>
					<span class="li-content">{{loanInfo.borrowTime|timeParser}}</span>
				</div>
				<div class="detail-li">
					<span class="li-title">应还日期</span>
					<span class="li-content">{{loanInfo.repaymentTime | timeParser}}</span>
				</div>
				<div class="detail-li">
					<span class="li-title">当前状态</span>
					<span class="li-content" :class="{'enable':loanInfo.status===3,'danger':loanInfo.status!==0||loanInfo.status!==2}">
						{{loanInfo.status | statusParser}}
					</span>
				</div>
			</div>

			<div class="inner-contaier loan-action input">
				<el-button type='success' class="action-bttn" @click="goP(key,act)" v-for='(act,key ) in actions' :class="{'enable':act.enable}" :disabled='!act.enable' :key='key'>
					{{act.act}}
				</el-button>
			</div>
		</div>
		<div class="input bttn-refresh" v-if='auditing!==3&&auditing!==4' audit-ctrl='refresh'>
				<el-button type='success' @click='get' >刷新</el-button>
		</div>
				<!-- <el-button type='success' @click='test'>test</el-button> -->
<!-- 		<div class="dscrp-container">
			<div class="dscrp-part">
				<p class="dscrp-line">还款：</p>
				<p class="dscrp-line">若有逾期则按照每日3%的逾期费用，本金封顶的方式进行支付结算</p>
			</div>
			<div class="dscrp-part">
				<p class="dscrp-line">续期：</p>
				<p class="dscrp-line">收取逾期（若有）+续期手续费</p>
			</div>
			<div class="dscrp-part">
				<p class="dscrp-line">重借：</p>
				<p class="dscrp-line">最后一笔借款完成之后可以重借</p>
			</div>
		</div> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	import publicFun from '../js/public.js'
	export default {
		data() {
				return {
					response: null,
					auditingRemark:null,
					auditing: null,
					loanInfo: null,
					loading: true,
					editing: true,
					backAfterPost: false,
					url: 'accounting/myLendInfo?lendingUid=1',
					urlApply: 'lendApply/lendApply',
					phoneLender: null,
					amount: 2000,
					urlApplyRecord: 'lendApply/borrowLoanRecords?limit=1&lendingUid=1',
					remind: {
						isShow: false,
						remindMsg: 'remind',
						self_: this,
						remindOpts: [{
							msg: '确定',
						}, ],
					},

				}
			},
			created() {
				publicFun.checkSession(this)
				this.get()
			},
			filters: {
				moneyParser(v) {
					return Number(v / 100).toFixed(2)
				},
				timeParser(v) {
					return publicFun.getTimeString(v, 0, 10)
				},
				statusParser(v) {
					var s
					switch (v) {
						case 0:
							s = '逾期未还本金'
							break;
						case 1:
							s = '待还款'
							break;
						case 2:
							s = '逾期已还本金'
							break;
						case 3:
							s = '已还款'
							break;
						default:
							s = '未知'
					}
					return s
				},
			},
			methods: {
				test() {
					this.auditing = 1
				},
				reapply() {
							var remind=this.remind
					var apply = () => {
							var remind=this.remind
							remind.isShow=false
							remind.remindMsgDscrp=null
							var urlApply = publicFun.urlConcat(this.urlApply, {
								phone: '13777722216',
								amount: this.amount * 100,
							})
							publicFun.post(urlApply, {}, this, () => {
								// console.log('res apply_borrow', this.response)
								// this.remind.remindMsg='提示:添加联系方式'
								if(this.response.body.error){
									return
								}
								remind.remindMsg = '提交完成'
									// remind.remindMsgDscrp='请添加微信或手机联系人以便客服联系'
								remind.remindMsgDscrp = null
								remind.remindOpts = [{
									msg: '确定',
									callback: () => {
										// publicFun.goPage('/loan_bill')
										this.get()
									}
								}]
							}, () => {})
						}
						// if (!this.allFilled) {
						// 	// return
						// }
					remind.remindMsg = '请确定是否提交'
					remind.remindMsgDscrp = '提示：与客服沟通后完善相应信息后提交'
					remind.remindOpts = [{
						msg: '确定',
						callback: apply,
					}, {
						msg: '取消',
					}, ]
					remind.isShow = true
				},
				goP(key, act) {
					if (!act.enable) {
						return
					}
					// var url = publicFun.urlConcat('/loan_deal', {
					var url = publicFun.urlConcat('/debt', {
						action: key,
						billId:this.loanInfo.id,
						v:Math.random().toFixed(5),
						// title:act.act,
						// amount:this.loanInfo.moneyFee,
					})
					// console.log('gopage', url)
					var r=this.remind
					r.remindMsg='请更新负债调查'
					r.remindOpts=[

					{msg:'确认',callback:()=>{
						publicFun.goPage(this.$route.path+url)
					}},
					{msg:'取消',},
					]
					r.isShow=true
				},
				get() {
					var checkAuditing = () => {
						// var r=this.remind
						console.log('res apply record', this.response.body.data.data)
						var data = this.response.body.data.data[0]
						if (data) {
							// console.log('have records means auditing')
							this.auditing = data.status
							this.auditingRemark = data.remark
							this.phoneLender = data.phone
								// if(data[0].status==2){
								// 	auditStatus
								// }
								// r.remindMsg='审核中'
								// r.remindOpts=[{
								// 	msg:'确定',
								// 	callback:()=>{
								// 		publicFun.goPage('/loan_bill')
								// 	}
								// }]
								// r.isShow=true
						} else {
							// this.norecord=true
						}
					}
					publicFun.get(this.url, this, () => {
						console.log('res loan info', this.response)
						this.loanInfo = this.response.body.data
							publicFun.get(this.urlApplyRecord, this, checkAuditing)
						if (!this.loanInfo) {
						}
					})
				},
			},
			computed: {
				actions() {
					var l = this.loanInfo
						//0:逾期未还（本金和逾期费用都未还），1:等待还款（未逾期）, 2:逾期本金已还（需要处理逾期） 3：已还款（正常。可以重借）

					var temp = {
							special: {
								act: '特殊',
								enable: null,
								index: 1
							},
							renewal: {
								act: '续期',
								enable: null,
								index: 1
							},
							reborrow: {
								act: '重借',
								enable: null,
								index: 1
							},
						}
						// temp.special.enable=(l.status===0||l.status==2)
					temp.special.enable = true
						// temp.renewal.enable=l.status===1||l.status===0
					temp.renewal.enable = true
						// temp.reborrow.enable=l.status===3
					temp.reborrow.enable = true

					return temp
				},
			},
			events: {},
			components: {}
	}
</script>

<style lang='scss' scoped>
	*{
		/*border:1px solid red;*/
	}
		.loan-amount{
			color:#000;
			font-size: 0.2rem;
			line-height: 0.15rem;
		}
		.auditing{
			font-size: 0.28rem;
			line-height: 1.4;
			.auditing-remark{
				border: 0px solid #efeff4 ;
				padding:0.15rem 0.05rem;
				border-top-width: 1px;
			}
			.auditing-description{
				line-height: 1.6;
				font-size: 0.16rem;
				text-align: left;
				margin:0.05rem 0.15rem;
			}
			.auditing-txt{
				border: 0px solid #efeff4 ;
				border-bottom-width: 1px;
				/*margin-bottom: 0.1rem;*/
				padding:0.1rem;
				/*margin-bottom: 0.1rem;*/

			}

		}
		.bttn-refresh{
			padding:0.15rem 0;
		}
		.container{
			background: #fff;
			margin-top:0.2rem;
			border:1px solid transparent;
			.qrcode{
				width: 60%;
				margin:0 auto;
			}
			.remind{
				font-size: 0.16rem;
				text-align: left;
				padding:0.05rem 0.25rem;
			}
			.inner-contaier{
				margin-left: 0.2rem;
				padding: 0.12rem 0;
				padding-right: 0.2rem;
				border: 0px solid #bbb ;
				border-top-width: 1px;
				line-height: 1;
				.detail-li{
					color: #8e8e8e;
					display: flex;
					font-size: 0.15rem;
					margin:0.12rem 0;
					.li-title,.li-content{
						width: 50%;
					}
					.li-title{
						text-align: left;
					}
					.li-content{
						/*padding:0 0.15rem;*/
						text-align: right;
					}
				}
				&:first-child{
					border-top-width: 0px;
				}
			}
			.loan-action{
				display: flex;
				font-size: 0.16rem;
				/*padding:0.1rem 0;*/
				color:#8e8e8e;
				.action-bttn{
					width: 33%;
					margin:0.1rem 0.1rem;
					padding:0.1rem 0;
					opacity: 0.5;
				}
			}
		}
/*		.dscrp-container{
			border:1px solid transparent;
			padding-left:0.2rem;
			background: #fff;
			margin: 0;
			font-size: 0.15rem;
			text-align: left;
			color: #8e8e8e;
			letter-spacing: 0.01rem;
			line-height: 1.4;
			.dscrp-part{
				margin:0.2rem 0;
				.dscrp-line{

				}
			}
		}*/
	#loanBillVue{
		.container{
			.enable{
				/*color:#09bb07;*/
				opacity: 1;
			}
			.danger{
				color: #e94f4f;
			}
		}
	}
</style>
