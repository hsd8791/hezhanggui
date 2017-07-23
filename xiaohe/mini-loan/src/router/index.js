import Vue from 'vue'
import Router from 'vue-router'

import index from '../components/index.vue'
// import mine from '../components/mine.vue'
// import applyList from '../components/mine_apply_list.vue'
// import partner from '../components/mine_partner.vue'
// import charge from '../components/mine_charge.vue'
// import commission from '../components/mine_commission.vue'
// import commissionWithdraw from '../components/mine_commission_withdraw.vue'
// import commissionDetail from '../components/mine_commission_detail.vue'
// import Radio from '../components/tmpts/radio.vue'
import Identity from '../components/info_identity.vue'
import Profile from '../components/info_profile.vue'
import JobInfo from '../components/info_job_info.vue'
import ContactWay from '../components/info_contact_way.vue'
import Upload from '../components/info_upload.vue'
import Zhima from '../components/info_zhima.vue'
import Debt from '../components/info_debt.vue'
import shujumohe from '../components/info_shujumohe.vue'
import login from '../components/login.vue'
import login_code from '../components/login_code.vue'
import Signup from '../components/signup.vue'
// import paidServiceCreate from '../components/paid_service_create.vue'
import Pwd from '../components/pwd.vue'
// import paidServiceHistory from '../components/paid_service_history.vue'
// import paidServiceRslt from '../components/paid_service_rslt.vue'
// import paidService from '../components/paid_service.vue'
import ApplyBorrow from '../components/apply_borrow.vue'
import ApplyLend from '../components/apply_lend.vue'
import coming from '../components/coming.vue'
import pay from '../components/order_pay.vue'
// import errorPage from '../components/tmpts/error.vue'

//小禾专用
import introduce from '../components/introduce.vue'
import pay_intrest from '../components/pay_intrest.vue'
import loan_bill from '../components/loan_bill.vue'
import loan_deal from '../components/loan_deal.vue'
import loan_deal_remind from '../components/loan_deal_remind.vue'
import index0 from '../components/index0.vue'

// import Test from '../components/test.vue'
// import Relatives from '../components/info_relatives.vue'
// import AddInfo from '../components/info_add_info.vue'
// import AuditBorrow from '../components/audit_borrow.vue'
// import Descrip from '../components/descrip.vue'

import bus from '../bus.js'
Vue.use(Router)
	// var rootPath = '/hezhanggui'
var rootPath = ''
var routes = [],
	basicRoutes = [],
	indexRoutes = [],
	mineRoutes = [],
	xiaoheRoutes = []

/**
 * 针对某一个组件创建路由数组（多个路由）
 * @param  {string || array} paths     路由字符串或者路由数组
 * @param  {string} name      路由名称
 * @param  {Vue component} component 指定的组件/模块
 * @param  {[配置]} options   路由的配置，e.g. meta:{ keepAlive:true}
 * @return {[type]}           [description]
 */
var newRoute = function(paths, name, component, options) {
	// console.log('typeof paths', typeof paths)
	if (typeof paths === 'string') {
		paths = [paths]
	}
	if (options === undefined) {
		options = {}
	}
	var l = paths.length,
		routes = [],
		newRoute, i
	for (i = 0; i < l; i++) {
		newRoute = new Object({
			path: rootPath + paths[i],
			name: name + '_' + i,
			component: component,
		})
		Object.assign(newRoute, options)
		routes.push(newRoute)
	}
	return routes
}
mineRoutes = mineRoutes.concat(
	newRoute(['/*/login_code', '/login_code', ], 'login&pwd&signup via code', login_code),
	newRoute(['/*/login', '/login', ], 'login via pwd', login),
	newRoute(['/signup', '/*/signup', ], 'signup', Signup),
	newRoute(['/pwd', '/*/pwd', ], 'pwd', Pwd),
	// newRoute(['/mine/apply_list', '/*/apply_list', ], 'apply_list', applyList),
	// newRoute(['/mine/partner', '/*/partner', ], 'partner', partner),
	// newRoute('/mine', 'mine', mine),
	// newRoute('/mine/charge', 'charge', charge),
	// newRoute('/mine/commission', 'commission', commission),
	// newRoute('/mine/commission/withdraw', 'commissionWithdraw', commissionWithdraw),
	// newRoute('/mine/commission/detail', 'commissionDetail', commissionDetail),
)


indexRoutes = indexRoutes.concat(
	// newRoute('/apply_borrow', 'ApplyBorrow', ApplyBorrow),
	newRoute(['/index/identity', '/index/*/identity'], 'Identity', Identity),
	newRoute(['/index/profile', '/index/*/profile'], 'Profile', Profile),
	newRoute(['/index/job_info', '/index/*/job_info'], 'JobInfo', JobInfo),
	newRoute(['/index/contact_way', '/index/*/contact_way'], 'ContactWay', ContactWay),
	newRoute(['/index/upload', '/index/*/upload'], 'Upload', Upload),
	newRoute(['/index/zhima', '/index/*/zhima'], 'Zhima', Zhima),
	newRoute(['/index/debt', '/index/*/debt'], 'Debt', Debt),
	newRoute(['/index/shujumohe', '/index/*/shujumohe'], 'shujumohe', shujumohe),
	newRoute('/*/pay', 'pay', pay),


)

xiaoheRoutes = xiaoheRoutes.concat(
		//小禾专用
		newRoute('/introduce', 'introduce', introduce),
		newRoute('/loan_bill', 'loan_bill', loan_bill),
		// newRoute('/pay_intrest', 'pay_intrest', pay_intrest),
		newRoute('/index0', 'index0', index0),
		newRoute('/loan_bill/loan_deal', 'loan_deal', loan_deal),
		newRoute('/loan_bill/loan_deal_remind', 'loan_deal_remind', loan_deal_remind),
	)
	// console.log('indexRoutes', indexRoutes)


basicRoutes = [{
	path: rootPath + '/index',
	name: 'index',
	component: index,
}, {
	path: rootPath + '/coming',
	name: 'coming',
	component: coming,
}, {
	path: rootPath + '/index/apply_borrow',
	name: 'ApplyBorrow',
	component: ApplyBorrow,
	meta: {
		// keepAlive: true,
	},
}, {
	path: rootPath + '/index/apply_lend',
	name: 'ApplyLend',
	component: ApplyLend,
}, {
	path: rootPath + '/index/debt',
	name: 'Debt',
	component: Debt,
}, {
	path: rootPath + '/',
	name: 'index0',
	component: index0,
}, {
	path: rootPath + '/*',
	name: 'index0_',
	component: index0
}, ]

routes = routes.concat(indexRoutes.concat(mineRoutes, xiaoheRoutes), basicRoutes)
console.log('routes', routes)
export default new Router({
	// mode: 'history',
	routes: routes
})