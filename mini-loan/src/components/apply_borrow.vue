<template>
	<div id="applyBorrowVue" class='input' v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title"><app-back></app-back>申请借款<!-- 分享到微信 --></h1>
		<div class="checkFill"></div>
		<div class="container phone-lender">
			<div class="wraper"  v-if='!getById'>
				<label class="label" >放贷人手机：</label> 
				
				<el-input :disabled='false' type='tel' placeholder='放贷人注册手机号' v-model='phoneLender ' @blur.once='blured'  :class='{"valid-border":phoneLenderValid,"error-border":!phoneLenderValid}'></el-input>
				
				<i :class="{'el-icon-check':phoneLenderValid,'el-icon-close':!phoneLenderValid}"></i>
			</div>
			<div class="wraper">
				<label>借款金额：</label> 
				<el-input :disabled='!!applyRecord&&!longApplied' type='number' :placeholder='amountHolder' v-model='amount' @blur.once='blured'  :class='{"valid-border":amountValid,"error-border":!amountValid}'></el-input>
				<i :class="{'el-icon-check':amountValid,'el-icon-close':!amountValid}"></i>
			</div>
		</div>
		<el-button type='success' class="confirm" @click='deleteLender'  v-if='getById&&!getByMarket'>向其他人申请</el-button>
		<el-button type='success' class="confirm" @click='apllyBorrow' :disabled='!(allValid)' v-if='canApply&&!applyRecord'>点击申请</el-button>
		<div class="info-user" v-if='!getByMarket'>
			<h3 class="subtitle">放贷人信息</h3>
			<div class="info-lender">
				<p v-if='lenderInfo.phone'>放贷人姓名：{{lenderInfo.name}}</p>
				<p v-if='lenderInfo.phone'>放贷人手机号：{{lenderInfo.phone | phonePartshow}}</p>
				<p v-if='lenderInfo.phone'>请核实放贷人姓名后提交申请</p>
				<p v-if='lenderInfoAlert' style='color:red'>{{lenderInfoAlert}}</p>
			</div>
		</div>
<!-- 	  <div v-if='getByMarket'>
	    <app-record class='market-container'>
	    <div class="avator-pic" :style="{backgroundImage: 'url('+marketInfo.logo+')'}" slot='avator'></div>
	    <span slot='lt' style="letter-spacing: -0.01rem;">
	      {{marketInfo.name}}&nbsp;&nbsp;
	      <i class="icon-cool market-star"></i>
	      <i class="icon-cool market-star"></i>
	      <i class="icon-cool market-star"></i>
	      <i class="icon-cool market-star"></i>
	      <i class="icon-cool market-star"></i>
	    </span>
	    <span slot='rd'>
	      <span class="required-info-box">
	        <span class='required-text'>身份验证</span>
	      </span>
	      <span class="required-info-box">
	        <span class='required-text'>手机认证</span>
	      </span>
	      <span class="required-info-box">
	        <span class='required-text'>芝麻认证</span>
	      </span>        
	      <span class="required-info-box">
	        <span class='required-text'>身份证</span>
	      </span>
	    </span>
	    <span slot='ld'>{{marketInfo.intro}}</span>
	 	 </app-record>
		</div> -->
		<div class="info-container comment" v-if='applyRecord'>
			<hr>
			<br>
			  <div class="info-title">申请结果</div>
			  <div class="info-detail">
			    {{longApplied?-999:applyRecord.status | statusParser}}
			  </div>
			  <div class="info-title" v-if='applyRecord.status!==0&&applyRecord.remark'>审核意见</div>
			  <div class="info-detail" v-if='applyRecord.status!==0'>
			    <p>
			    	{{applyRecord.remark}}
			    </p>
			  </div>
		</div>
		<el-button type='success' @click='apllyBorrow' v-if='(applyRecord&&applyRecord.status===2)||longApplied'>
		  重新申请
		</el-button>
		<!-- <div class="fill-status " v-if='allFilled'> -->
		<div class="fill-status " v-if='longApplied||!fillStatusCfg.allFilled&&canApply'>
			<h3 class="subtitle">请完成以下信息后提交</h3>
			<div class="container">
				
				<div class="unordered-list"  v-for='(item,index) in fillStatusCfg.fillStatus' @click='goPage(item.url)' v-if='!item.status'>
					{{item.label}}
					<i class="el-icon-arrow-right"></i>
				</div>
				<div class="unordered-list"  v-for='(item,index) in fillStatusCfg.fillStatus2' @click='goPage(item.url)' v-if='!(item.status&&item.status2)'>
					{{item.label}}
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	import publicFun from '../js/public.js'
	// import checkFill from '../js/checkFill.js'
	import bus from '../bus.js'
	import remind from '../components/tmpts/remind.vue'
	export default {
		data() {
				return {
					// fromIndex:null,
					amountHolder:'填写申请金额',
					getById: false, //判定是否由uniqueId 传入获取lenderPhone
					getByMarket: false, //判定是否由贷款超市进入 
					lenderValid: false,
					// canApply:false,
					// firstEnter: true,
					response: null,
					loading: false,
					editing: true,
					marketInfo:{},
					lenderInfo: {
						name: '',
						phone: '',
					},
					applyRecord:'',
					lenderInfoAlert: '',
					uniqueIdLender: null,
					urlPhone: 'lendApply/phoneInfo?phone=',
					urlUniqueId: 'userInfo/userInfo?uniqueId=',
      		urlMarket:'lendSupermaket/supermaketInfo',
					urlApply: 'lendApply/lendApply',
					urlApplyRecord:'lendApply/borrowLoanRecords',
					remind: {
						isShow: false,
						remindMsg: 'remind',
						self_: this,
						remindOpts: [{
							msg: '确定',
						}, ],
					},
					phoneLender: null,
					amount: null,
					fillStatusCfg:{
						fillStatus:{},
						fillStatus2:{},
					},
				}
			},
			methods: {
				goPage(p) {
					publicFun.goPage(this.$route.path+p)
				},
				apllyBorrow() {
					var r=this.remind
					if (!this.fillStatusCfg.allFilled&&!bus.relativeUrlTest) {
						r.remindMsg='必填认证信息不完整'
						r.remindMsgDscrp='请检查必填认证信息项是否已填写'
						r.remindOpts=[{
							msg:'确定',
							callback:()=>{
								publicFun.goPage('/index')
								r.remindMsgDscrp=null
							}
						}]
						r.isShow=true
						return
					}
					r.remindMsg = '请确认是否提交'
					r.remindOpts = [{
						msg: '确定',
						callback: () => {
							var postBody={
								// phone: this.phoneLender,
								share:bus.share,
							}
							if(this.marketInfo.phone){
								postBody.phone=this.marketInfo.phone
							}else{
								postBody.phone=this.phoneLender
							}
							if(this.amount){
								postBody.amount=this.amount*100
							}
							var urlApply = publicFun.urlConcat(this.urlApply, postBody)
							publicFun.post(urlApply, {}, this, () => {
								var r=this.remind
								r.remindOpts=[{msg:'确定',callback:()=>{
									// publicFun.goPage(-1)
									if(this.getByMarket){
										publicFun.goPage(this.$route.path+'/lend_market_applied_remind')
									}
								}}]
								this.getApplyRecord()
								// console.log('res apply_borrow', this.response)
							}, () => {})
						}
					}, {
						msg: '取消',
					}, ]
					r.isShow = true

				},
				getMarketInfo(){
					var array=this.$route.path.split('/')
					,id=array[array.length-2].split('_')[1]
					// console.log('array',array,id)
					// return
				  var url=publicFun.urlConcat(this.urlMarket,{
				    id:id
				  })
				  publicFun.get(url,this,()=>{
				    console.log('market detail',this.response.body)
				    this.marketInfo=this.response.body.data
				    // this.phoneLender=this.marketInfo.phone
				  })
				},
				getLenderInfo(url) {
					// console.log('getLenderInfo url',url)
					publicFun.get(url, this, () => {
						var res = this.response.body
							console.log('getlenderInfo', res)
						if (!res.error) {
							// console.log('set lenderInfo')
							var info = res.data
							this.lenderInfo = info
							// this.phoneLender = this.lenderInfo.phone
								// var p=this.lenderInfo.phone.toString()
								// console.log('string phoneLender',p)
							// this.lenderInfo.phone = this.lenderInfo.phone
								// this.phoneLender=this.lenderInfo.phone
							bus.phoneLender = info.phone
							this.phoneLender=info.phone
							localStorage.phoneLender=info.phone
							this.lenderInfoAlert = ''
								// this.phoneExist = true
							this.lenderValid = true
							this.getApplyRecord()
						} else {
							// if(res.error=20000){}
							this.lenderInfoAlert = res.msg
							this.lenderInfo = {}
								// this.phoneExist = false
						}
					})
				},
				getApplyRecord(){
					var urlRecord=publicFun.urlConcat(this.urlApplyRecord,{
						limit:1,
						lendingUid:this.lenderInfo.uid
					})
					// console.log('urlR',urlRecord)
					publicFun.get(urlRecord,this,()=>{
						this.applyRecord=this.response.body.data.data[0]
						if(this.applyRecord){
							this.amount=this.applyRecord.amount
						}else{
							this.amountHolder='申请未填写金额'
						}
					})
				},
				blured($event) {
					var el = $event.target.parentElement.parentElement
					el.className += ' validate'
				},
				//不确定未提交是否返回null,如返回对象并且每个key的value为null，需函数判断是否对象中是否无数据
				
				edit() {
					this.editing = true
				},
				deleteLender(){
					this.phoneLender=''
					this.lenderInfo= {
						name: '',
						phone: '',
					}
					this.applyRecord=''
					this.getById=false
					bus.share=0
					localStorage.removeItem('uniqueIdLender')
					localStorage.removeItem('phoneLender')
					localStorage.share=0
				},
				getFillStatusSet(){
						//每次进入单独判断数据魔盒是否板定成功
						// publicFun.checkSingleFilled	('credit/shujumoheSimQueryStatus','cfgEssential')
					bus.$on('checked_fill_status', val => {
						this.fillStatusCfg = val
					})
						//?? 获取fillStatus 状态
					this.fillStatusCfg = bus.fillStatusCfg
					bus.checkFilled(bus.cfgEssential)
				},
				initSet(){
						/**
						 * 存在无用的存储，或bus,或localStorage,或this
						 * 需改善，最好market申请与这里分离，不过有点困难
						 */
						var uniqueIdLender = localStorage.uniqueIdLender
						if (uniqueIdLender) {//分享型
							console.log('have uniqueIdLender')
							//set phoneLender
							//触发phoneValid watch
							bus.uniqueIdLender = uniqueIdLender
							this.getById = true
							bus.share = 1
							this.uniqueIdLender = uniqueIdLender
								// console.log('this.urlUniqueId',this.urlUniqueId)
							this.getLenderInfo(this.urlUniqueId + uniqueIdLender)
							// this.getById = true
							// this.phoneLender = bus.phoneLender
								// console.log('fist res',this.response)
								// var data = this.response
								// }
								// this.checkFilled()
						} else if (localStorage.phoneLender) {//自输入型
							this.phoneLender = localStorage.phoneLender
							// bus.share = localStorage.share
							bus.phoneLender = this.phoneLender
						} 
				},
			},
			events: {},
			created: function() {
				// console.log('apply_borrow root',this.$root)
				// console.log('apply_borrow parent',this.$parent)
				var query = this.$route.query
				if (query.uniqueId) {
					localStorage.share = 1
					localStorage.uniqueIdLender = query.uniqueId
				}
				publicFun.checkSession(this)


				this.getFillStatusSet()
				this.initSet()


				// var routePath=this.$route.path

			},
			filters: {
				nameParse(val) {
					if (!val) {
						return '未知'
					}
					var s = val.split('')
					s[0] = '*'
					s = s.join('')
					return s
				},
				phonePartshow(val) {
					return publicFun.phonePartshow(val)
				},
				statusParser:function(v){
				  return publicFun.auditStatusParse(v)
				},
				// phoneLenderHide:{
				// 	read:function(v){
				// 		return v.slice(0,4)+'****'+v.slice(7,13)
				// 	},
				// 	write:function(v,oldV){
				// 		return v.slice(0,4)+'****'+v.slice(7,13)
				// 	}
				// },
				phoneLenderHide(v){
					return v.slice(0,4)+'****'+v.slice(7,13)
				}
			},
			watch: {
				phoneLenderValid: function() {
					if (this.phoneLenderValid) {
						bus.phoneLender = this.phoneLender
						this.getLenderInfo(this.urlPhone + this.phoneLender)
							// setTimeout(()=> {
							// this.allFilled = this.checkAllFilled()
							// }, 1000);
							// console.log('this.checkAllFilled',this.checkAllFilled())
					} else {
						this.lenderValid = false
					
					}
				},

			},
			computed: {
				phoneLenderValid: function() {
					var reg = publicFun.reg.cellphone
					return reg.test(this.phoneLender)
				},
				amountValid: function() {
					var reg = /^[1-9][0-9]*$/
					return reg.test(this.amount)||this.amount==''
				},
				canApply:function(){
					var t=this
					return !t.applyRecord||t.applyRecord.status===1||t.applyRecord.status===3
				},
				allValid:function(){
					let t=this
					return t.lenderValid&&t.amountValid&&t.fillStatusCfg.allFilled
				},
				longApplied() {
					let a=this.applyRecord
					if(a){
					  return a.status===0&&publicFun.longApplied(a.creat_time)
					  // return (now.getTime()-this.applyRecord.creat_time)>86400000
					}else{
					  return false
					}
				}
			},
			components: {
				remind: remind,
			}
	}
</script>

<style lang='scss' scoped>
	.info-user{
		margin:0.25rem;
		height: 1rem;
		border:1px solid #cccccc;
		p{
			margin:0.05rem;
		}
		.subtitle{
			line-height: 1.4;
			background: #aaa;
			text-align: left;
			padding-left: 0.15rem;
		}
	}
	.fill-status{
		.subtitle{
			/*height: 0.25rem;*/
			/*background: #ccc;*/
			font-size: 0.18rem;
			line-height: 1.4;
			text-align: left;
			margin: 0.1rem 0;
			margin-left: 0.15rem;
			padding-left: 0.1rem;

		}
		.container{
			background: #fff;
		}
	}
	.info-title{
	  color:blue;
	  text-align: left;
	  font-size: 0.2rem;
	}
	.info-container{
	  margin:0.15rem;
	  @at-root .info-detail{
	    text-align: left;
	    margin:0.15rem 0;
	    font-size: 0.18rem;
	    .platform{
	      &:after{
	        content:' /';
	      }
	      &:last-child{
	        &:after{
	          content:'';
	        }
	      }
	    }
	  }
	}
</style>
<style lang='scss' >
	#applyBorrowVue{
		.container{
			.label{
				font-size: 0.14rem;
				width: 27%;
			}
		}
	}
</style>
