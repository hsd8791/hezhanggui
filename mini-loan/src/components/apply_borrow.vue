<template>
	<div id="applyBorrowVue" class='input' v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title"><app-back></app-back>申请借款<!-- 分享到微信 --></h1>
		<div class="checkFill"></div>
		<div class="container phone-lender" v-if='!getById'>
			<div class="wraper">
				<label class="label" >放贷人手机：</label> 
				
				<el-input :disabled='false' type='tel' placeholder='放贷人注册手机号' v-model='phoneLender' @blur.once='blured'  :class='{"valid-border":phoneLenderValid,"error-border":!phoneLenderValid}'></el-input>
				
				<i :class="{'el-icon-check':phoneLenderValid,'el-icon-close':!phoneLenderValid}"></i>
			</div>
			<!-- <div class="wraper">
				<label>借款金额：</label> 
				<el-input :disabled='false' type='number' placeholder='申请借款金额' v-model='amount' @blur.once='blured'  :class='{"valid-border":amountValid,"error-border":!amountValid}'></el-input>
				<i :class="{'el-icon-check':amountValid,'el-icon-close':!amountValid}"></i>
			</div> -->
		</div>
		<!-- !(phoneLenderValid&&allFilled&&phoneExist||getById) -->
		<!-- <el-button type='success' class="confirm" @click='apllyBorrow' :disabled='!(canApply&&allFilled&&amountValid)'>点击申请</el-button> -->
		<el-button type='success' class="confirm" @click='apllyBorrow' :disabled='!(canApply&&fillStatusCfg.allFilled)'>点击申请</el-button>
		<div class="info-user" v-if='!getByMarket'>
			<h3 class="subtitle">放贷人<!-- 经纪人 -->信息</h3>
			<div class="info-lender">
				<!-- <p style="color:purple">提交前检查信息是否按要求填写的功能，实现中</p> -->
				<!-- <br> -->
				<p v-if='lenderInfo.phone'>放贷人姓名：{{lenderInfo.name}}</p>
				<p v-if='lenderInfo.phone'>放贷人手机号：{{lenderInfo.phone | phonePartshow}}</p>
				<p v-if='lenderInfo.phone'>请核实放贷人姓名后提交申请</p>
				<p v-if='lenderInfoAlert' style='color:red'>{{lenderInfoAlert}}</p>
			</div>
		</div>
	  <div v-if='getByMarket'  >
	    <!-- <div @click='goP("/market_mine")' v-if='false'  > -->

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
	    <!-- <span slot='rt'>{{}}</span> -->
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
		</div>
		<!-- <div class="fill-status " v-if='allFilled'> -->
		<div class="fill-status " v-if='!fillStatusCfg.allFilled'>
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
					getById: false, //判定是否由uniqueId 传入获取lenderPhone
					getByMarket: false, //判定是否由贷款超市进入 
					canApply: false,
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
					confirmOpts: [{
						msg: '确定',
						callback: () => {}
					}, {
						msg: '取消'
					}],
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

					if (!this.fillStatusCfg.allFilled) {
						return
					}
					this.remind.remindMsg = '请确认是否提交'
					this.remind.remindOpts = [{
						msg: '确定',
						callback: () => {
							var urlApply = publicFun.urlConcat(this.urlApply, {
								phone: this.phoneLender,
								amount: this.amount,
								share:bus.share,
							})
							publicFun.post(urlApply, {}, this, () => {
								var r=this.remind
								r.remindOpts=[{msg:'确定',callback:()=>{
									publicFun.goPage(-1)
								}}]
								// console.log('res apply_borrow', this.response)
							}, () => {})
						}
					}, {
						msg: '取消',
					}, ]
					this.remind.isShow = true

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
				    this.phoneLender=this.marketInfo.phone
				  })
				},
				getLenderInfo(url) {
					// console.log('getLenderInfo url',url)
					publicFun.get(url, this, () => {
						var res = this.response.body
							// console.log('getlenderInfo', res)
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
							localStorage.phoneLender=info.phone
							this.lenderInfoAlert = ''
								// this.phoneExist = true
							this.canApply = true
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
						this.applyRecord=this.response.body.data[0]
						if(this.applyRecord){
							
						}
						console.log('apply record',this.response.body)

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
			},
			events: {},
			created: function() {
				// console.log('apply_borrow root',this.$root)
				// console.log('apply_borrow parent',this.$parent)
				publicFun.checkSession(this)
				//每次进入单独判断数据魔盒是否板定成功
				// publicFun.checkSingleFilled	('credit/shujumoheSimQueryStatus','cfgEssential')
				// console.log('bus',bus)
				bus.$on('checked_fill_status',val=>{
					console.log('checked_fill_status on',val)
					this.fillStatusCfg=val
				})
				this.fillStatusCfg=bus.fillStatusCfg
				// bus.$emit('checked_fill_status', bus.cfgEssential)
				bus.checkFilled(bus.cfgEssential)
				//?? 获取fillStatus 状态
				
				if(/market_/.test(this.$route.path)){
					this.getMarketInfo()
					this.getByMarket = true
					this.getById = true
					console.log('have market')
					// this.phoneLender = query.phone
				}else{

				var query = this.$route.query
					// console.log('phone', query.phone)
					// if (query.phone) {
					// console.log('query',query)
				if (query.uniqueId) {
					//set phoneLender
					//触发phoneValid watch
					// bus.phoneLender = query.phone
					bus.uniqueIdLender = query.uniqueId
					bus.share=1
					localStorage.share=1
					this.uniqueIdLender = query.uniqueId
						// console.log('this.urlUniqueId',this.urlUniqueId)
					this.getLenderInfo(this.urlUniqueId + query.uniqueId)
					this.getById = true
					this.phoneLender = bus.phoneLender
						// console.log('fist res',this.response)
						// var data = this.response
						// }
						// this.checkFilled()
				}else if(localStorage.phoneLender){
					this.phoneLender=localStorage.phoneLender
					bus.share=localStorage.share
					bus.phoneLender=this.phoneLender
				}else if (bus.phoneLender) {
					this.phoneLender = bus.phoneLender
				}
				}

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
						this.canApply = false
						bus.share=0
						localStorage.share=0
					}
				},
				// undoneRequest: function(val) {
				// 	// console.log('undoneRequest', val)
				// 	if (val === 0) {
				// 		this.allFilled = this.checkAllFilled()
				// 	}
				// }
			},
			computed: {
				phoneLenderValid: function() {
					var reg = publicFun.reg.cellphone
					return reg.test(this.phoneLender)
				},
				amountValid: function() {
					var reg = /^[1-9][0-9]*$/
					return reg.test(this.amount)
				},
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
			margin-left: 0.15rem;

			padding-left: 0.1rem;

		}
		.container{
			background: #fff;

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
