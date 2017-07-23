import Vue from 'vue'
import publicFun from './js/public.js'
var bus = new Vue({
	data: {
		detailTaskId: null,
		phoneLender: '13777722216',
		uniqueIdLender: '2qamam',
		// urlLendInfo: 'accounting/myLendInfo',
		account: '请登录',
		uniqueId: '',
		test: 'tstMSG',
		response: null,
		loanInfo: null,
		qualified: 0,
	},
	created: function() {
		// this.getLenderInfo()
		this.$on('account_change', (ac, id, q) => {
			// console.log('bus get account change', ac, id)
			this.uniqueId = id
			this.account = ac
			this.qualified = q
		})
	},
	methods: {
		// getLenderInfo() {
		// publicFun.get(this.urlLendInfo, this, () => {
		// 	console.log('res loan info', this.response)
		// 	this.loanInfo = this.response.body.data
		// 	console.log('bus', this)
		// })
		// this.$http.get(this.urlLendInfo).then(res => {

		// }, err => {})
		// },
	},
	watch: {

	},
})

export default bus