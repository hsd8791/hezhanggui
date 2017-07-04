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
import ApplyBorrow from '../components/apply_borrow.vue'
import ApplyLend from '../components/apply_lend.vue'
import coming from '../components/coming.vue'
import shujumohe from '../components/info_shujumohe.vue'
import errorPage from '../components/tmpts/error.vue'
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
	indexRoutes = []

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
indexRoutes = indexRoutes.concat(
	newRoute('/apply_borrow', 'ApplyBorrow', ApplyBorrow),
	newRoute('/login_code', 'login&pwd&signup via code', login_code),
	newRoute('/mine/charge', 'charge', charge),
	newRoute('/mine/commission', 'commission', commission),
	newRoute('/mine/commission/withdraw', 'commissionWithdraw', commissionWithdraw),
	newRoute('/mine/commission/detail', 'commissionDetail', commissionDetail),
)

console.log('indexRoutes', indexRoutes)
	// indexRoutes = [{
	// 	path: rootPath + '/apply_borrow',
	// 	name: 'ApplyBorrow',
	// 	component: ApplyBorrow,
	// }, {
	// 	path: rootPath + '/login_code',
	// 	name: 'login&pwd&signup via code',
	// 	component: login_code,
	// }]
	// console.log('indexRoutes', indexRoutes)

basicRoutes = [{
		path: rootPath + '/index',
		name: 'index',
		component: index,
	}, {
		path: rootPath + '/mine/login',
		name: 'login',
		component: login,
	}, {
		path: rootPath + '/mine/login_code',
		name: 'login&pwd&signup via code',
		component: login_code,
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
		path: rootPath + '/paid_service',
		// name: 'paidService',
		component: paidService,
		// beforeEnter: (to, from, next) => {
		// 	console.log('emit foot index 1 from router')
		// 	bus.$emit('foot_index_change', 1)
		// 	next()
		// },
		children: [{
			path: 'create',
			name: 'paidServiceCreate',
			component: paidServiceCreate,
			// beforeEnter: beforeEnterFoot,
			// beforeEnter: (to, from, next) => {
			// 	bus.$emit('foot_index_change', 1)
			// 	next()
			// },
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
	},
	// {
	// 	path: rootPath + '/paid_service_create',
	// 	name: 'paidServiceCreate',
	// 	component: paidServiceCreate,
	// 	beforeEnter: (to, from, next) => {
	// 		bus.$emit('foot_index_change', 1)
	// 		next()
	// 	},
	// },
	// {
	// 	path: rootPath + '/paid_service_rslt',
	// 	name: 'paidServiceRslt',
	// 	component: paidServiceRslt,
	// },
	// {
	// 	path: rootPath + '/paid_service_history',
	// 	name: 'paidServi/indexceHistory',
	// 	component: paidServiceHistory,
	// }, 
	{
		path: rootPath + '/mine/pwd',
		name: 'pwd',
		component: Pwd,
	}, {
		path: rootPath + '/mine/signup',
		name: 'signup',
		component: Signup,
	}, {
		path: rootPath + '/radio', //test
		name: 'radio',
		component: Radio,
	}, {
		path: rootPath + '/mine',
		name: 'mine',
		component: mine,
		// beforeEnter: (to, from, next) => {
		// 	bus.$emit('foot_index_change', 3)
		// 	next()
		// },
	}, {
		path: rootPath + '/index/identity',
		name: 'identity',
		component: Identity,
	}, {
		path: rootPath + '/index/profile',
		name: 'profile',
		component: Profile,
	}, {
		path: rootPath + '/index/upload',
		name: 'upload attachment and position',
		component: Upload,
	}, {
		path: rootPath + '/index/zhima',
		name: 'zhima',
		component: Zhima,
	}, {
		path: rootPath + '/index/job_info',
		name: 'job infomation',
		component: JobInfo,
	}, {
		path: rootPath + '/index/contact_way',
		name: 'contact way',
		component: ContactWay,
	}, {
		path: rootPath + '/index/shujumohe',
		name: 'shujumohe',
		component: shujumohe
	}, {
		path: rootPath + '/mine/apply_list',
		name: 'applyList',
		component: applyList
	}, {
		path: rootPath + '/mine/partner',
		name: 'partner',
		component: partner
	}, {
		path: rootPath + '/',
		name: 'index',
		component: index,
	}, {
		path: rootPath + '/*',
		name: 'errorPage',
		component: errorPage
	},
]

routes = routes.concat(indexRoutes, basicRoutes)

// console.log('routes', routes)
export default new Router({
	// mode: 'history',
	routes: routes
})