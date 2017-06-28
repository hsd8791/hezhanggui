import router from '../router'
import ivsMap from './ivs_map.js'
import bus from '../bus.js'
import parseAntifraud from './anti_fraud_map.js'
// var router = require('../router')
var publicFun = {}
	// publicFun.remindOpts.postDone = [{
	// 	msg: '确定',
	// 	callback: () => {
	// 		router.gopage(-1)
	// 	}
	// }]
publicFun.reg = {}
publicFun.reg.cellphone = /^1[1234567890]\d{9}$/
publicFun.reg.idCardNum = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
	// publicFun.remindOpts={}
	// publicFun.remindOpts.confirm=[{msg:'确定'}]

publicFun.parseMixRslt = function(s) {
	// console.log('s', s)
	// var obj = JSON.parse(s)
	if (typeof(s) !== 'string') {
		console.error('s', s, 'is not a string')
		return
	}
	if (s === 'success') {
		return '成功'
	}
	if (s.match(':')) {

		var indexColon = s.match(':').index
			// console.log('indexColon', indexColon)
		status = s.slice(0, indexColon)
		var execRslt = /\(/.exec(s)
		var description
		if (execRslt) {
			description = s.slice(indexColon + 1, execRslt.index)
		} else {
			description = s.slice(indexColon + 1)
		}
	}

	var mixRslt = {}
	mixRslt.status = status
	mixRslt.description = description

	function parseStatus(s) {
		var rslt
		switch (s) {
			case 'failure':
				rslt = '失败'
				break
			default:
				break
		}
		return rslt
			// mixRslt.obj = obj
	}
	return parseStatus(mixRslt.status) + '，原因：' + mixRslt.description
}

var setNullFunc = function(fun) {
	// var nullFun = 
	if (fun !== undefined && fun instanceof Function) {
		return fun
	}
	return function() {}
}

/*
	1->非 null //至少有一个不是空值
 */
var checkNullObj = function(obj) {
	var flag = 0
	for (var k in obj) {
		if (obj[k]) {
			return 1
		}
	}
	return flag
}


/*
	0->all null
 */
publicFun.checkNullObj = checkNullObj

/**
 * 链接URL
 * @param  {string} url URL不包含query value
 * @param  {object} obj key为query，value为query value，如 {name:'username'}
 * @return {string}     e.g.  urlConcat('a.com/b',{name:'username'}) return 'a.com/b?name=username&'
 */
publicFun.urlConcat = function(url, obj) {
	var str = ''
	for (var key in obj) {
		str = str + key + '=' + obj[key] + '&'
	}
	str = url + '?' + str
	return str
}

/**
 * 前进到某个页面（router中的页面）
 * @param  {string}   path     [路径]
 * @param  {Function} callback [还需要执行的函数]
 * @return {[无]}            [description]
 */
publicFun.goPage = function(path, callback) {
	// console.log('gopage', path)
	if (typeof path === 'number') {
		router.go(path)
	} else {
		router.push(path)
	}
	if (callback !== undefined && callback instanceof Function) {
		callback()
	}
}


publicFun.checkSession = function(vm) {
	var loginOpts = [{
		msg: '确定',
		callback: () => {
			this.goPage('/login') // 与vm 中不同
		}
	}];
	// if (bus.account === '请登录') {
	// 	vm.remind.remindMsg = '请先登录'
	// 	vm.remind.isShow = true
	// 	vm.remind.remindOpts = loginOpts
	// 	return false
	// }
	this.get('account/checkSession', vm, () => {
		console.log('still checking sesion', bus.account)
		var res = vm.response.body
		if (res.data) {
			// bus.account = res.data.phone
			// bus.uniqueId = res.data.uniqueId
			// already checkSession in App.vue
			if (res.data.isSetPwd == 0) {
				publicFun.goPage('/pwd')
			}
			return false
		} else {
			vm.remind.remindOpts = loginOpts
			vm.remind.remindMsg = '请先登录'
			vm.remind.isShow = true
			return false
		}

	})
	return true
}

/**
 * get
 * @param  {string}   url       [description]
 * @param  {Vue object}   vm        usually this
 * @param  {function}   sccssCall callback in success
 * @param  {function}   errCall   callback in error
 * @param  {Function} callback  callback in both
 * @return {null}             [description]
 */
publicFun.get = function(url, vm, sccssCall, errCall, callback) { //paras:  this,url,
	// console.log('geting', url)
	// console.log('vm', vm)
	// if (bus.account === '请登录') {
	// 	vm.loading = false
	// 	if (!vm.remind) {
	// 		return
	// 	}
	// 	vm.remind.remindMsg = '请先登录'
	// 	vm.remind.isShow = true
	// 	vm.remind.remindOpts = [{
	// 		msg: '确定',
	// 		callback: () => {
	// 			this.goPage('/login')
	// 		}
	// 	}]
	// 	return
	// }
	vm.loading = true
	var vmRemind = vm.remind
	sccssCall = setNullFunc(sccssCall)
	errCall = setNullFunc(errCall)
	callback = setNullFunc(callback)
		// var url = 'userInfo/remarks'
	vm.$http.get(url).then(res => {
		vm.loading = false
		vm.response = res
		var resBody = res.body
			// console.log('get res', res)
			// console.log('res', res.body)
		if (resBody.error) {
			// console.log('error', resBody)
			console.log('vmRemind', vmRemind)
			if (vmRemind) {
				vmRemind.remindMsg = resBody.msg
				vmRemind.isShow = true
					// console.log('url error', url, resBody.error)
			}
			// console.log('url2', url)
			// console.log('err res', resBody)
			if (resBody.error === 20002 && vmRemind) {
				vmRemind.remindOpts = [{
					msg: '确定'
				}]
				vmRemind.remindMsg = '请登录'
				vmRemind.remindOpts[0].callback = function() {
					router.push('/login')
					vmRemind.isShow = true
				}
			}
			if (resBody.error === 20000 && vmRemind) {
				vmRemind.remindMsg = '系统异常'
				vmRemind.remindOpts = [{
					msg: '确定'
				}]
				vmRemind.remindOpts[0].callback = function() {
					// publicFun.goPage(-1)
				}
			}
			if (resBody.error === 20030 && vmRemind) {
				vmRemind.remindMsg = '请先完成芝麻认证'
				vmRemind.remindOpts = [{
					msg: '确定'
				}]
				vmRemind.remindOpts[0].callback = function() {
					// router.push('/login')
				}
			}
		} else {
			// sccssCall()
			// callback()
			if (!checkNullObj(res.body.data)) {
				vm.editing = true
			} else {
				vm.editing = false
			}
		}
		sccssCall()
		callback()
	}, err => {
		vm.loading = false
		if (vmRemind) {
			vmRemind.remindMsg = '连接失败'
			vmRemind.remindOpts = [{
				msg: '确定',
			}, ]
			vmRemind.isShow = true
		}
		// router.go(-1)
		// console.log('try go back')
		// router.push('/index')
		vm.response = err
		callback()
		errCall()
	})
}

/**
 * post中一定会有remind 故不判断remind提示是否存在
 * 除body为 post body外，其余与get方法一样
 * @param  {[type]}   url       [同get function]
 * @param  {[type]}   body      [description]
 * @param  {[type]}   vm        [同get function]
 * @param  {[type]}   sccssCall [同get function]
 * @param  {[type]}   errCall   [同get function]
 * @param  {Function} callback  [同get function]
 * @return {[type]}             [同get function]
 */
publicFun.post = function(url, body, vm, sccssCall, errCall, callback) { //paras:  this,url,
	// console.log('posting')
	vm.loading = true
	sccssCall = setNullFunc(sccssCall)
	errCall = setNullFunc(errCall)
	callback = setNullFunc(callback)
		// var url = 'userInfo/remarks'
	vm.$http.post(url, body).then(res => {
		vm.loading = false
		vm.response = res
		var resBody = res.body
		console.log('post res', res.body)
		if (resBody.error) {
			vm.remind.remindMsg = resBody.msg
			vm.remind.isShow = true
			if (resBody.error === 20002) {
				console.log('未登录')
				vm.remind.remindOpts[0].callback = function() {
					router.push('/login')
				}
			}
		} else {
			vm.remind.remindMsg = '提交成功'
			vm.remind.remindOpts = [{
				msg: '确定',
			}, ]
			vm.remind.isShow = true
			vm.editing = false
		}
		sccssCall()
		callback()
	}, err => {
		vm.loading = false
		vm.remind.remindOpts = [{
			msg: '确定',
		}, ]
		vm.remind.remindMsg = '连接失败'
		vm.remind.isShow = true
		vm.response = err
		callback()
		errCall()
			// router.go(-1)
			// router.push('/index')
	})
}
publicFun.getTimeString = function(AsSetValue, AiStart, AiEnd) {
	if (AiStart === undefined) {
		AiStart = 0
	}
	if (AiEnd === undefined) {
		AiEnd = 19
	}
	if (AsSetValue === undefined) {
		var dNow = new Date();
	} else {
		var dNow = new Date(AsSetValue);
	}
	// console.log('date', dNow)
	var iH = fToTwo(dNow.getHours());
	var iM = fToTwo(dNow.getMinutes());
	var iS = fToTwo(dNow.getSeconds());
	var iD = fToTwo(dNow.getDate())
	var iMonth = fToTwo(dNow.getMonth() + 1)
	var iY = dNow.getFullYear()
	var sNow = iY + "-" + iMonth + "-" + iD + " " + iH + ":" + iM + ":" + iS;
	return sNow.slice(AiStart, AiEnd);
};

publicFun.pasreExpireInfo = function(rslt) {
	var obj = JSON.parse(rslt)
		// console.log('rslt expire', obj)
	return obj
}

publicFun.IvsParse = function(rslt) {

	var obj = JSON.parse(rslt)
		// console.log('rslt Ivs', obj)
	var detail = obj.ivs_detail,
		l = detail.length,
		i, r, rateKey, rateMap = ivsMap.rate
		// console.log('map 0', ivsMap.rate['0'])
	for (i = 0; i < l; i++) {
		// console.log('code', detail[i].code)
		r = ivsMap[detail[i].code]
		if (r !== undefined) {
			// console.log('rates', r['rate'].toString())
			rateKey = r['rate'].toString()
			detail[i].evaluation = rateMap[rateKey]
		}
	}
	return obj

}
publicFun.antifraudParse = function(code) {
	return parseAntifraud.parse(code)
}

publicFun.isWeiXin = function() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

function fToTwo(aNum) {
	return aNum >= 10 ? aNum : "0" + aNum;
};
//yyyy-mm-dd hh:mm:ss ----(0,19)
//yy-mm-dd hh:mm:ss ----(2,19)
//mm-dd hh:mm:ss ----(5,19)
//hh:mm:ss ----(11,19)
//hh:mm ----(11,16)

export default publicFun