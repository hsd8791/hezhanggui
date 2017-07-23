import Vue from 'vue'
// require publicFunc from './js/public.js'
var publicFun = require('./js/public.js')
	// var publicFun = publicFunc.default
var bus = new Vue({
	data: {
		detailTaskId: null,
		phoneLender: '',
		uniqueIdLender: '',
		account: '请登录',
		uniqueId: '',
		allFilled: false,
		ttlRequest: 3, // qty of requset
		ttlRequestOpt:null,
		undoneRequest: null, //记录未完成的请求判断，全部完成后判断是否可以提交
		undoneRequestOpt: null, //记录未完成的请求判断，全部完成后判断是否可以提交
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

		fillStatusOpt: [{ //upload
			status: 0,
			url: '/upload',
			label: '身份证上传',
			getUrl: 'userInfo/addAccessory',
			icon: 'icon-upload',
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
		}, { //debt
			status: 0,
			url: '/debt',
			label: '负债调查',
			getUrl: 'userInfo/liabilities',
			icon: 'icon-puzzle',
			checkMethod: function(data) {
				console.warn('debt data', data)
			}
		}, ],
		fillStatusOpt2: [{ //profile
				status: 0,
				status2: 0,
				url: '/profile',
				label: '个人概况',
				icon: 'icon-documents',
				getUrl: 'userInfo/personal',
				getUrl2: 'userInfo/address'
			}, { //contact_way
				status: 0,
				status2: 0,
				url: '/contact_way',
				label: '联系方式',
				icon: 'icon-phone',
				getUrl: 'userInfo/contact',
				getUrl2: 'userInfo/relatives',
				checkMethod: function(data) {
					// this.status=0
				}
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
		fillStatus: [{ //identity
			status: 0,
			url: '/identity',
			label: '个人信息',
			getUrl: 'userInfo/identity',
			icon: 'icon-address-book',
		}, { //shujumohe
			status: 0,
			url: '/shujumohe',
			label: '手机认证',
			getUrl: 'credit/shujumoheSimQueryStatus',
			icon: 'icon-mobile',
			checkMethod: function(data) {
				this.status = 0

				console.log('data', data.status)
				if (data.status === 'success') {
					this.status = 1
				} else {
					// console.log('/failure/.test(data.status)',/failure/.test('failure:超时！'))
					// if(/failure/.test('failure:超时！')){
					if (/failure/.test(data.status)) {
						var passed = new Date().getTime() - data.time
						if (passed < 24 * 3600 * 1000) {
							this.status = 1
						}
					}
					// console.log('data.status', data.status)
					// console.log('data', data.time)
					console.log('passed', passed)
						// console.log('one day',24*3600*1000)
				}
			}
		}, { //zhima
			status: 0,
			url: '/zhima',
			label: '芝麻认证',
			getUrl: 'credit/zhimaAuthStatus',
			icon: 'icon-eye-plus',
			checkMethod: function(data) {
				if (data.status) {
					this.status = 0
					if (data.status == 'success') {
						this.status = 1
					}
				}
			}
		}, ],
		fillStatus2:[],

	},
	created: function() {
		setTimeout(() => {

			// console.log('publicFun', publicFun.default)
			this.checkFilled()
		}, 2000);
		this.$on('account_change', (ac, id) => {
				// console.log('bus get account change', ac, id)
				this.uniqueId = id
				this.account = ac
			})
			// this.$on('paid_service_paid', () => {
			// 	publicFun.goPage(-1, () => {
			// 		publicFun.goPage('/paid_service/history')
			// 	})
			// })
	},
	methods: {
		getByUrls(urls, index) {

			// console.log('check',urls[index].getUrl)
			publicFun.default.get(urls[index].getUrl, this, () => {
				// console.log('this',this)
				// console.log('this.response.data', this.response.body.data, publicFun.default.checkNullObj(this.response.body.data))
				if (publicFun.default.checkNullObj(this.response.body.data)) {
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
				publicFun.default.get(urls[index].getUrl2, this, () => {
					if (publicFun.default.checkNullObj(this.response.data)) {
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
				console.log('status', i, u[i].url, '-->', u[i].status)
			}
			for (i = 0; i < l2; i++) {
				flag = flag && u2[i].status && u2[i].status2
				console.log('status 1 2', i, u2[i].url, '-->', u2[i].status, u2[i].status2)
			}
			return flag
		},
	},
	computed: {
		fillStatusCfg() {
			return {
				fillStatus: this.fillStatus,
				fillStatus2: this.fillStatus2,
				allFilled: this.allFilled,
			}
		}
	},
	watch: {
		undoneRequest: function(val) {
			// console.log('undoneRequest', val)
			if (val === 0) {
				this.allFilled = this.checkAllFilled()
				// console.log('emit checked_fill_status',this.fillStatusCfg,this.allFilled)
				this.$emit('checked_fill_status', this.fillStatusCfg)
			}
		}
	},
})

export default bus