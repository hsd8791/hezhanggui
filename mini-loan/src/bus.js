import Vue from 'vue'

// require publicFunc from './js/public.js'
var publicFun = require('./js/public.js')
	// var publicFun = publicFunc.default
var bus = new Vue({
	data: {
		response: null,
		detailTaskId: null,
		phoneLender: '',
		uniqueIdLender: '',
		share: 0,
		account: '请登录',
		uniqueId: '',
		wxConfiged: false,
		marketListScrollTop: 0,
		marketChosenInfo: null,
		auditingApply: null,
		auditingApplyParams: {
			crrtPage: 0,
			ttlPage: null,
		},
		loanAmount: null,
		remindSimple: {
			isShow: false,
			remindMsg: '',
			cbEnter: () => {
				console.log('enter callback run')
			},
			cbLeave: () => {
				console.log('leave callback run')
			},
			cbReset: (vm) => {
				let r = bus.remindSimple
				r.cbEnter = () => {
					r.isShow = false
					console.log('enter callback run')
				}
				r.cbLeave = () => {
					console.log('leave callback run')
					if (vm) {
						if (vm.backAfterPost) {
							publicFun.default.goPage(-1)
						}
					}
				}
			}

		},
		// allFilled: false,
		/**
		 * 概述
		 * checkFilled 触发 checkAllfilled,
		 * checkAllfilled emit 'checked_fill_status'+fillStatusCfg
		 *
		 * 1.
		 * web app 创建时 checkFilled
		 * borrow_apply route 进入created 时，bus的fillStatusCfg 赋值给该route的fillStausCfg
		 * 2.
		 * 每一个info组件post成功后，
		 * 找出对应的index of the item of fillStatus,
		 * undoneRequest+1 /+2 depends
		 * bus.getByUrl(url,index)
		 * emit 'checked_fill_status'
		 *
		 *2.degrade
		 * 每一个info组件post成功后，
		 *直接使用一次 bus.checkFilled()
		 *
		 * 
		 * @type {Array}
		 */

		cfgEssential: {
			allFilled: false,
			testing: false,
			ttlRequest: 6, // qty of requset
			undoneRequest: null, //记录未完成的请求判断，全部完成后判断是否可以提交
			fillStatus: [{ //identity
				status: -1,
				url: '/identity',
				label: '个人信息',
				getUrl: 'userInfo/identity',
				icon: 'icon-address-book',
			}, { //shujumohe
				status: -1,
				url: '/shujumohe',
				label: '手机认证',
				getUrl: 'credit/shujumoheSimQueryStatus',
				icon: 'icon-mobile',
				checkMethod: function(data) {

					this.status = -1

					// console.log('data', data.status)
					if (data.status === 'success') {
						this.status = 1
					} else {
						// console.log('/failure/.test(data.status)',/failure/.test('failure:超时！'))
						// if(/failure/.test('failure:超时！')){
						if (/failure/.test(data.status)) {
							var passed = new Date().getTime() - data.time
							if (passed < 24 * 3600 * 1000) {
								this.status = 1
							} else {
								this.status = 0
							}
						} else {
							this.status = 0
						}
						// console.log('data.status', data.status)
						// console.log('data', data.time)
						// console.log('passed', passed)
						// console.log('one day',24*3600*1000)
					}
				}
			}, { //zhima
				status: -1,
				url: '/zhima',
				label: '芝麻认证',
				getUrl: 'credit/zhimaAuthStatus',
				icon: 'icon-lock',
				checkMethod: function(data) {
					console.warn('data zhima', data, publicFun.default.zhimaAcChangeTime)

					if (data.status) {
						this.status = 0
						if (data.time < publicFun.default.zhimaAcChangeTime) {
							return
						}
						if (data.status == 'success') {
							this.status = 1
						}
					}
				}
			}, { //debt
				status: -1,
				url: '/debt',
				label: '负债调查',
				getUrl: 'userInfo/liabilities',
				icon: 'icon-banknote',
				// checkMethod: function(data) {
				// console.warn('debt data', data)
				// }
			}, ],
			fillStatus2: [{ //contact_way
				status: -1,
				status2: -1,
				url: '/contact_way',
				label: '联系方式',
				icon: 'icon-phone',
				getUrl: 'userInfo/contact',
				getUrl2: 'userInfo/relatives',
				checkMethod: function(data) {
					console.log('data contact_way', data)
					if (data.hasOwnProperty('acQq')) {
						this.status = 0
						if (data.acQq && data.acWechat) {
							this.status = 1
						}
					}
				}
			}, ],
		},
		cfgOptional: {
			ttlRequest: 4,
			testing: false,
			allFilled: false,
			undoneRequest: null, //记录未完成的请求判断，全部完成后判断是否可以提交
			fillStatus: [{ //upload
				status: -1,
				url: '/upload',
				label: '身份证上传',
				getUrl: 'userInfo/addAccessory',
				icon: 'icon-upload',
				checkMethod: function(data) {
					// console.log('data', data)
					// console.log('test upload')
					this.status = 0
					if (!data) {
						// this.status = 0
						return
					}
					if (data.idcardUrl && data.idcardUrl2 && data.idcardUrl3) {
						this.status = 1
					}
				}
			}, { //job_info
				status: -1,
				url: '/job_info',
				label: '工作信息',
				getUrl: 'userInfo/work',
				icon: 'icon-profile',
			}, ],
			fillStatus2: [{ //profile
					status: -1,
					status2: -1,
					url: '/profile',
					label: '个人概况',
					icon: 'icon-documents',
					getUrl: 'userInfo/personal',
					getUrl2: 'userInfo/address'
				},

				// {
				// 	status: 0,
				// 	status2: 1,
				// 	url: '/zhima',
				// 	label: '芝麻认证',
				// 	getUrl: 'credit/zhimaAuthStatus',
				// 	getUrl2: 'credit/zhimaCustomerCertificationStatus',
				// 	checkMethod: function(data) {
				// 		if(data.status){
				// 			this.status=0
				// 			if(data.status=='success'){
				// 				this.status=1
				// 			}
				// 		}
				// 		if(data.data){

				// 			this.status2=0
				// 			if(data.data.status=='success'){
				// 				this.status2=1
				// 			}
				// 		}
				// 		console.log('----')
				// 		console.log('data',data)
				// 	}
				// },
			],
		},

	},
	created: function() {

		// setTimeout(() => {
		// console.log('publicFun', publicFun.default)
		// this.checkFilled(this.cfgEssential)
		// }, 2000);
		this.$on('account_change', (ac, id) => {
			// console.log('bus get account change', ac, id)
			this.uniqueId = id
			this.account = ac
			this.checkFilled(this.cfgEssential)
			this.checkFilled(this.cfgOptional)

		})
		// this.auditingApplyParams = {
		// 		crrtPage: 0,
		// 		ttlPage: null,
		// 	}
		// 	let timeNow = (new Date()).getTime()
		// 	this.getAuditingApply()
		// publicFun.default.getAuditingApply()

	},
	methods: {
		// getAuditingApply() {
		// 	let params = this.auditingApplyParams
		// 	let timeNow = (new Date()).getTime()
		// 	this.getAuditingApplyPage(params.crrtPage, timeNow, (end) => {
		// 		if (!end) {
		// 			this.getAuditingApply()
		// 		}
		// 	})
		// },
		// getAuditingApplyPage(page, now, cb) {
		// 	let limit = 10,
		// 		url = 'lendApply/borrowLoanRecords'
		// 	let getUrl = url+'?limit=10&page='+page
		// 	this.$http.get(getUrl).then(res => {
		// 		console.warn('res auditingApply', res)
		// 		return
		// 		let list = res.body.data.data,
		// 			l = list.length,
		// 			end = false
		// 		if (l === 0) {
		// 			end = true
		// 		}
		// 		this.auditingApplyParams.crrtPage++
		// 			for (let i = 0; i < l; i++) {
		// 				if (now - list.time < 86400000) {
		// 					this.auditingApply.push(list[i])
		// 				} else {
		// 					end = true
		// 					break
		// 				}
		// 				// bus.auditingApply=res.body.data
		// 			}

		// 		cb(end)
		// 	}, err => {})

		// },

		getByUrls(urls, index, cfg) {
			// console.warn('cfg',cfg)
			// console.warn('check', urls[index].getUrl)
			// console.log('publicFun.default',publicFun.default.get)
			publicFun.default.get(urls[index].getUrl, this, () => {
				// console.log('this', this.response.body.data)
				// console.log('this.response.data', this.response.body.data, publicFun.default.notAllNull(this.response.body.data))
				if (publicFun.default.notAllNull(this.response.body.data)) {
					urls[index].status = 1
					if (urls[index].checkMethod !== undefined) {
						urls[index].checkMethod(this.response.body.data)
					} else {
						urls[index].status = 1
					}
				} else {
					urls[index].status = 0
				}
				cfg.undoneRequest--
			})
			if (urls[index].getUrl2) {
				publicFun.default.get(urls[index].getUrl2, this, () => {
					if (publicFun.default.notAllNull(this.response.data)) {
						urls[index].status2 = 1
						if (urls[index].checkMethod !== undefined) {
							urls[index].checkMethod(this.response.data)
						} else {
							urls[index].status2 = 1
						}
					} else {
						urls[index].status2 = 0
					}
					cfg.undoneRequest--
				})
			}
		},
		checkFilled(cfg) {
			// console.log('checking filled')
			if (cfg.testing === true) {
				return
			}
			cfg.testing = true
			cfg.undoneRequest = cfg.ttlRequest
			var u = cfg.fillStatus,
				l = u.length,
				i
			var u2 = cfg.fillStatus2,
				l2 = u2.length,
				i2
				// console.log('u', u, l)
			for (i = 0; i < l; i++) {
				this.getByUrls(u, i, cfg)
			}
			for (i2 = 0; i2 < l2; i2++) {
				this.getByUrls(u2, i2, cfg)
			}
		},
		checkAllFilled(cfg) {
			// console.log('cfg',cfg)
			var u = cfg.fillStatus,
				u2 = cfg.fillStatus2,
				l = u.length,
				l2 = u2.length,
				i
			var flag = true
			for (i = 0; i < l; i++) {
				flag = flag && u[i].status === 1
					// console.log('flag ',i,flag)
					// console.log('status', i, u[i].url, '-->', u[i].status)
			}
			for (i = 0; i < l2; i++) {
				flag = flag && u2[i].status === 1 && u2[i].status2 === 1
					// console.log('status 1 2', i, u2[i].url, '-->', u2[i].status, u2[i].status2)
			}
			// console.log('flag',flag)
			cfg.allFilled = flag
			cfg.test = 'test'
				// return flag
		},
	},
	computed: {
		relativeUrlTest() {
			if (/test/.test(this.$http.options.root)) {
				return '/test'
			} else {
				return ''
			}
		},
		fillStatusCfg() {
			return {
				fillStatus: this.cfgEssential.fillStatus,
				fillStatus2: this.cfgEssential.fillStatus2,
				allFilled: this.cfgEssential.allFilled,
			}
		},
		fillStatusCfgOpt() {
			return {
				fillStatus: this.cfgOptional.fillStatus,
				fillStatus2: this.cfgOptional.fillStatus2,
				allFilled: this.cfgOptional.allFilled,
			}
		}
	},
	watch: {
		'cfgEssential.undoneRequest': function(val) {
			// console.log('undoneRequest', val)
			this.$emit('checked_fill_status', this.cfgEssential)
			if (val === 0) {
				this.cfgEssential.testing = false
					// this.cfgEssential.allFilled = 
				this.checkAllFilled(this.cfgEssential)
				this.$emit('checked_fill_status', this.cfgEssential)
					// console.log('emit checked_fill_status', this.fillStatusCfg, this.allFilled)
			}
		},
		'cfgOptional.undoneRequest': function(val) {
			this.cfgOptional.testing = false
			this.$emit('checked_fill_status_optional', this.fillStatusCfgOpt)
			if (val === 0) {
				this.checkAllFilled(this.cfgOptional)
				this.$emit('checked_fill_status_optional', this.fillStatusCfgOpt)
			}
		},
	},
})

export default bus