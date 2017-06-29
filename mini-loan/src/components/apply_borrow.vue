<template>
	<div id="applyBorrowVue" class='input' v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title"><app-back></app-back><!-- 申请借款 -->分享到微信</h1>
		<div class="checkFill"></div>
		<div class="container phone-lender" v-if='!getById'>
			<div class="wraper">
				<label ><!-- 放贷人 -->经纪人手机：</label> 
				<!-- 放贷人 -->
				<el-input :disabled='false' type='tel' placeholder='经纪人注册手机号' v-model='phoneLender' @blur.once='blured'  :class='{"valid-border":phoneLenderValid,"error-border":!phoneLenderValid}'></el-input>
				
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
		<el-button type='success' class="confirm" @click='apllyBorrow' :disabled='!(canApply&&allFilled)'>点击申请</el-button>
		<div class="info-user">
			<h3 class="subtitle"><!-- 放贷人 -->经纪人信息</h3>
			<div class="info-lender">
				<!-- <p style="color:purple">提交前检查信息是否按要求填写的功能，实现中</p> -->
				<!-- <br> -->
				<p v-if='lenderInfo.phone'><!-- 放贷人 -->经纪人姓名：{{lenderInfo.name | nameParse}}</p>
				<p v-if='lenderInfo.phone'><!-- 放贷人 -->经纪人手机号：{{lenderInfo.phone | phonePartshow}}</p>
				<p v-if='lenderInfo.phone'>请核实<!-- 放贷人 -->经纪人姓名后提交申请</p>
				<p v-if='lenderInfoAlert' style='color:red'>{{lenderInfoAlert}}</p>
			</div>
		</div>
		<!-- <div class="fill-status " v-if='allFilled'> -->
		<div class="fill-status " v-if='!allFilled'>
			<h3 class="subtitle">请完成以下信息后提交</h3>
			<div class="container">
				
				<div class="unordered-list"  v-for='(item,index) in fillStatus' @click='goPage(item.url)' v-if='!item.status'>
					{{item.label}}
					<i class="el-icon-arrow-right"></i>
				</div>
				<div class="unordered-list"  v-for='(item,index) in fillStatus2' @click='goPage(item.url)' v-if='!(item.status&&item.status2)'>
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
					ttlRequest: 6, // qty of requset
					undoneRequest: null, //记录未完成的请求判断，全部完成后判断是否可以提交
					getById: false, //判定是否由uniqueId 传入获取lenderPhone
					canApply: false,
					// firstEnter: true,
					response: null,
					loading: false,
					editing: true,
					lenderInfo: {
						name: '',
						phone: '',
					},
					lenderInfoAlert: '',
					uniqueIdLender: null,
					urlPhone: 'lendApply/phoneInfo?phone=',
					urlUniqueId: 'userInfo/userInfo?uniqueId=',
					urlApply: 'lendApply/lendApply',
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
					allFilled: true,

					//fillStatus 填写项的后台请求path，router path, 名称,填写状态，特殊验证方法

					fillStatus: [{
						status: 0,
						url: '/index/identity',
						label: '个人信息',
						getUrl: 'userInfo/identity',
					}, {
						status: 0,
						url: '/index/shujumohe',
						label: '手机认证',
						getUrl: 'credit/shujumoheSimQueryStatus',
						checkMethod: function(data) {
							this.status = 0
							
							console.log('data', data.status)
							if (data.status === 'success') {
								this.status = 1
							}else{
								console.log('data', data.time)
								var passed=new Date().getTime()-data.time
								console.log('passed',passed)
								console.log('one day',24*3600*1000)
							}
						}
					}, {
						status: 0,
						url: '/index/upload',
						label: '身份证上传',
						getUrl: 'userInfo/addAccessory',
						checkMethod: function(data) {
							// console.log('data', data)
							// console.log('test filling')
							if (!data) {
								this.status = 0
								return
							}
							if (data.idcardUrl && data.idcardUrl2) {
								this.status = 1
							}
						}
					}, {
						status: 0,
						url: '/index/debt',
						label: '负债调查',
						getUrl: 'userInfo/liabilities',

					}, ],
					fillStatus2: [
						// {
						// 	status: 0,
						// 	status2: 0,
						// 	url: '/index/profile',
						// 	label: '个人概况',
						// 	getUrl: 'userInfo/personal',
						// 	getUrl2: 'userInfo/address'
						// },
						{
							status: 0,
							status2: 0,
							url: '/index/contact_way',
							label: '联系方式',
							getUrl: 'userInfo/contact',
							getUrl2: 'userInfo/relatives',
							checkMethod: function(data) {
								// this.status=0
							}
						},
					],
				}
			},
			methods: {
				goPage(p) {
					publicFun.goPage(p)
				},
				apllyBorrow() {

					if (!this.allFilled) {
						return
					}
					this.remind.remindMsg = '请确认是否提交'
					this.remind.remindOpts = [{
						msg: '确定',
						callback: () => {
							var urlApply = publicFun.urlConcat(this.urlApply, {
								phone: this.phoneLender,
								amount: this.amount,
							})
							publicFun.post(urlApply, {}, this, () => {
								// console.log('res apply_borrow', this.response)
							}, () => {})
						}
					}, {
						msg: '取消',
					}, ]
					this.remind.isShow = true

				},
				blured($event) {
					var el = $event.target.parentElement.parentElement
					el.className += ' validate'
				},
				//不确定未提交是否返回null,如返回对象并且每个key的value为null，需函数判断是否对象中是否无数据
				getByUrls(urls, index) {
					// console.log('check',urls[index].getUrl)
					publicFun.get(urls[index].getUrl, this, () => {
						// console.log('this',this)
						console.log('this.response.data', this.response.body.data, publicFun.checkNullObj(this.response.body.data))
						if (publicFun.checkNullObj(this.response.body.data)) {
							urls[index].status = 1
							if (urls[index].checkMethod !== undefined) {
								urls[index].checkMethod(this.response.body.data)
							} else {
								urls[index].status = 1
							}
						} else {
							urls[index].status = 0
						}
						this.undoneRequest--
					})
					if (urls[index].getUrl2) {
						publicFun.get(urls[index].getUrl2, this, () => {
							if (publicFun.checkNullObj(this.response.data)) {
								urls[index].status2 = 1
								if (urls[index].checkMethod !== undefined) {
									urls[index].checkMethod(this.response.data)
								} else {
									urls[index].status2 = 1
								}
							}
							this.undoneRequest--
						})
					}
				},
				checkFilled() {
					// console.log('checking filled')
					this.undoneRequest = this.ttlRequest
					var u = this.fillStatus,
						l = u.length,
						i
					var u2 = this.fillStatus2,
						l2 = u2.length,
						i2
					for (i = 0; i < l; i++) {
						this.getByUrls(u, i)
					}
					for (i2 = 0; i2 < l2; i2++) {
						this.getByUrls(u2, i2)
					}
				},
				checkAllFilled() {
					var u = this.fillStatus,
						u2 = this.fillStatus2,
						l = u.length,
						l2 = u2.length,
						i
					var flag = true
					for (i = 0; i < l; i++) {
						flag = flag && u[i].status
						console.log('status', i, '-->', u[i].status)
					}
					for (i = 0; i < l2; i++) {
						flag = flag && u2[i].status && u2[i].status2
						console.log('status 1 2', i, '-->', u2[i].status, u2[i].status2)

					}
					return flag
				},
				getLenderInfo(url) {
					// console.log('getLenderInfo url',url)
					publicFun.get(url, this, () => {
						var res = this.response.body
							// console.log('getlenderInfo', res)
						if (!res.error) {
							// console.log('set lenderInfo')
							this.lenderInfo.name = res.data.name
							this.phoneLender = res.data.phone
								// var p=res.data.phone.toString()
								// console.log('string phoneLender',p)
							this.lenderInfo.phone = res.data.phone
								// this.phoneLender=res.data.phone
							bus.phoneLender = this.lenderInfo.phone
							this.lenderInfoAlert = ''
								// this.phoneExist = true
							this.canApply = true
						} else {
							// if(res.error=20000){}
							this.lenderInfoAlert = res.msg
							this.lenderInfo = {}
								// this.phoneExist = false
						}
					})
				},
				edit() {
					this.editing = true
				},
			},
			events: {},
			created: function() {
				this.checkFilled()
				if (bus.phoneLender) {
					this.phoneLender = bus.phoneLender
				}
				var query = this.$route.query
					// console.log('phone', query.phone)
					// if (query.phone) {
					// console.log('query',query)
				if (query.uniqueId) {
					//set phoneLender
					//触发phoneValid watch
					// bus.phoneLender = query.phone
					bus.uniqueIdLender = query.uniqueId
					this.uniqueIdLender = query.uniqueId
						// console.log('this.urlUniqueId',this.urlUniqueId)
					this.getLenderInfo(this.urlUniqueId + query.uniqueId)
					this.getById = true
					this.phoneLender = bus.phoneLender
						// console.log('fist res',this.response)
						// var data = this.response
						// }
						// this.checkFilled()
				}
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
					var s = val.split('')
					s[3] = '*'
					s[4] = '*'
					s[5] = '*'
					s[6] = '*'
					s = s.join('')
						// console.log('strings',s.splice(0,3),s.splice(7,4))
					return s
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
					}
				},
				undoneRequest: function(val) {
					// console.log('undoneRequest', val)
					if (val === 0) {
						this.allFilled = this.checkAllFilled()
					}
				}
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
