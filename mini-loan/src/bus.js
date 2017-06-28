import Vue from 'vue'
var bus = new Vue({
	data: {
		detailTaskId: null,
		phoneLender: '',
		uniqueIdLender: '',
		account: '请登录',
		uniqueId: '',
		test: 'tstMSG',
	},
	created: function() {
		this.$on('account_change', (ac, id) => {
			// console.log('bus get account change', ac, id)
			this.uniqueId = id
			this.account = ac
		})
	},
	watch: {

	},
})

export default bus