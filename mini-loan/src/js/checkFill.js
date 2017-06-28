import bus from '../bus.js'
import publicFun from './public.js'
var checkFill = {}
	// var url

checkFill.checkAllFilled = function(vm) {
	// console.log('userID', userID)
	// console.log('this', this)
	var t = this
	var urlStore = {
			urls: [{
				url: 'userInfo/identity',
				frontUrl: '/identity',
				status: 0,
			}, {
				url: 'userInfo/personal',
				frontUrl: '/profile',
				status: 0,
			}, ]
		}
		/*
		传入 urlStore.urls 验证是否全部发送完成
		 */
	urlStore.checkAllStatus = function(urls) {
			var l = urls.length,
				flag,
				i
			for (i = 0; i < l; i++) {
				if (urls.status) {

				}
			}

		}
		// publicFun.get(urlStore.urls[0].url, vm, () => {
		// 		console.log('check', urlStore.urls[0].url, 'done')
		// 		console.log('check', vm.response)
		// 	}, () => {

	// 	})
	bus.$http.get(urlStore.urls[0].url).then(res => {
		console.log('res check', res.body)
		var res = res.body
		if (!res.err) {

		}
	}, err => {
		console.log('err check', err)

	})

}


function checkIdentity(data) {
	var flag = true
	return true
}

export default checkFill