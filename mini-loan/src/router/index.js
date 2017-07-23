import Vue from 'vue'
import Router from 'vue-router'

import index from '../components/index.vue'
import mine from '../components/mine.vue'
import applyList from '../components/mine_apply_list.vue'
import partner from '../components/mine_partner.vue'
import charge from '../components/mine_charge.vue'
import commission from '../components/mine_commission.vue'
import commissionWithdraw from '../components/mine_commission_withdraw.vue'
import commissionDetail from '../components/mine_commission_detail.vue'
import Radio from '../components/tmpts/radio.vue'
import Identity from '../components/info_identity.vue'
import Profile from '../components/info_profile.vue'
import JobInfo from '../components/info_job_info.vue'
import ContactWay from '../components/info_contact_way.vue'
import Upload from '../components/info_upload.vue'
import Zhima from '../components/info_zhima.vue'
import Debt from '../components/info_debt.vue'
import login from '../components/login.vue'
import login_code from '../components/login_code.vue'
import Signup from '../components/signup.vue'
import paidServiceCreate from '../components/paid_service_create.vue'
import Pwd from '../components/pwd.vue'
import paidServiceHistory from '../components/paid_service_history.vue'
import paidServiceRslt from '../components/paid_service_rslt.vue'
import paidService from '../components/paid_service.vue'
import apply_borrow from '../components/apply_borrow.vue'
import apply_lend from '../components/apply_lend.vue'
import coming from '../components/coming.vue'
import shujumohe from '../components/info_shujumohe.vue'
import pay from '../components/order_pay.vue'
import errorPage from '../components/tmpts/error.vue'
import test from '../components/test.vue'
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
	newRoute(['/mine/login_code', '/login_code', ], 'login&pwd&signup via code', login_code),
	newRoute(['/login', '/*/login', ], 'login via pwd', login),
	newRoute(['/signup', '/*/signup', ], 'signup', Signup),
	newRoute(['/mine/pwd', '/*/pwd', ], 'pwd', Pwd),
	newRoute(['/mine/apply_list', '/*/apply_list', ], 'apply_list', applyList),
	newRoute(['/mine/partner', '/*/partner', ], 'partner', partner),
	newRoute('/mine', 'mine', mine),
	newRoute('/mine/charge', 'charge', charge),
	newRoute('/mine/commission', 'commission', commission),
	newRoute('/mine/commission/withdraw', 'commissionWithdraw', commissionWithdraw),
	newRoute('/mine/commission/detail', 'commissionDetail', commissionDetail),
)


indexRoutes = indexRoutes.concat(
	// newRoute('/apply_borrow', 'apply_borrow', apply_borrow),
	newRoute(['/identity', '/*/identity'], 'Identity', Identity),
	newRoute(['/profile', '/*/profile'], 'Profile', Profile),
	newRoute(['/job_info', '/*/job_info'], 'JobInfo', JobInfo),
	newRoute(['/contact_way', '/*/contact_way'], 'ContactWay', ContactWay),
	newRoute(['/upload', '/*/upload'], 'Upload', Upload),
	newRoute(['/zhima', '/*/zhima'], 'Zhima', Zhima),
	newRoute(['/debt', '/*/debt'], 'Debt', Debt),
	newRoute(['/apply_lend', '/*/apply_lend'], 'apply_lend', apply_lend),
	newRoute(['/apply_borrow', '/*/apply_borrow'], 'apply_borrow', apply_borrow),
	newRoute(['/shujumohe', '/*/shujumohe'], 'shujumohe', shujumohe),
	newRoute('/*/pay', 'pay', pay),
	newRoute('/test', 'test', test),


)

console.log('indexRoutes', indexRoutes)


basicRoutes = [{
	path: rootPath + '/index',
	name: 'index',
	component: index,
}, {
	path: rootPath + '/coming',
	name: 'coming',
	component: coming,
}, {
	path: rootPath + '/paid_service',
	// name: 'paidService',
	component: paidService,
	children: [{
		path: 'create',
		name: 'paidServiceCreate',
		component: paidServiceCreate,

	}, {
		path: '',
		name: 'paidServiceCreate',
		component: paidServiceCreate,
		meta: {
			keepAlive: true,
		}
	}, {
		path: 'history',
		name: 'paidServiceHistory',
		component: paidServiceHistory,
		meta: {
			keepAlive: true,
		}
	}, {
		path: 'history/rslt',
		name: 'paidServiceRslt',
		component: paidServiceRslt,
		meta: {
			// keepAlive: false,
		}
	}, ]
}, {
	path: rootPath + '/',
	name: 'index',
	component: index,
}, {
	path: rootPath + '/*',
	name: 'errorPage',
	component: errorPage
}, ]

routes = routes.concat(indexRoutes.concat(mineRoutes), basicRoutes)

// console.log('routes', routes)
export default new Router({
	// mode: 'history',
	routes: routes
})