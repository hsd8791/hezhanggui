import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/index.vue'
import Mine from '../components/mine.vue'
import applyList from '../components/mine_apply_list.vue'
import partner from '../components/mine_partner.vue'
import Radio from '../components/tmpts/radio.vue'
import Identity from '../components/info_identity.vue'
import Profile from '../components/info_profile.vue'
import JobInfo from '../components/info_job_info.vue'
import ContactWay from '../components/info_contact_way.vue'
import Upload from '../components/info_upload.vue'
import Zhima from '../components/info_zhima.vue'
import Debt from '../components/info_debt.vue'
import Login from '../components/login.vue'
import Login_code from '../components/login_code.vue'
import Signup from '../components/signup.vue'
import PaidServiceCreate from '../components/paid_service_create.vue'
import Pwd from '../components/pwd.vue'
import PaidServiceHistory from '../components/paid_service_history.vue'
import PaidServiceRslt from '../components/paid_service_rslt.vue'
import PaidService from '../components/paid_service.vue'
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
export default new Router({
	// mode: 'history',
	routes: [{
			path: rootPath + '/index',
			name: 'index',
			component: Index,
			beforeEnter: (to, from, next) => {
				bus.$emit('foot_index_change', 0)
				next()
			},
		}, {
			path: rootPath + '/login',
			name: 'login',
			component: Login,
		}, {
			path: rootPath + '/login_code',
			name: 'login&pwd&signup via code',
			component: Login_code,
		}, {
			path: rootPath + '/coming',
			name: 'coming',
			component: coming,
		}, {
			path: rootPath + '/apply_borrow',
			name: 'ApplyBorrow',
			component: ApplyBorrow,
			meta: {
				// keepAlive: true,
			},
		}, {
			path: rootPath + '/apply_lend',
			name: 'ApplyLend',
			component: ApplyLend,
		}, {
			path: rootPath + '/debt',
			name: 'Debt',
			component: Debt,
		}, {
			path: rootPath + '/paid_service',
			// name: 'PaidService',
			component: PaidService,
			beforeEnter: (to, from, next) => {
				console.log('emit foot index 1 from router')
				bus.$emit('foot_index_change', 1)
				next()
			},
			children: [{
				path: 'create',
				name: 'create',
				component: PaidServiceCreate,
				// beforeEnter: beforeEnterFoot,
				// beforeEnter: (to, from, next) => {
				// 	bus.$emit('foot_index_change', 1)
				// 	next()
				// },
			}, {
				path: '',
				name: 'PaidServiceCreate',
				component: PaidServiceCreate,
				meta: {
					keepAlive: true,
				}
			}, {
				path: 'history',
				name: 'PaidServiceHistory',
				component: PaidServiceHistory,
				meta: {
					keepAlive: true,
				}
			}, {
				path: 'rslt',
				name: 'PaidServiceRslt',
				component: PaidServiceRslt,
				meta: {
					// keepAlive: false,
				}
			}, ]
		},
		// {
		// 	path: rootPath + '/paid_service_create',
		// 	name: 'PaidServiceCreate',
		// 	component: PaidServiceCreate,
		// 	beforeEnter: (to, from, next) => {
		// 		bus.$emit('foot_index_change', 1)
		// 		next()
		// 	},
		// },
		// {
		// 	path: rootPath + '/paid_service_rslt',
		// 	name: 'PaidServiceRslt',
		// 	component: PaidServiceRslt,
		// },
		// {
		// 	path: rootPath + '/paid_service_history',
		// 	name: 'PaidServiceHistory',
		// 	component: PaidServiceHistory,
		// }, 
		{
			path: rootPath + '/pwd',
			name: 'pwd',
			component: Pwd,
		}, {
			path: rootPath + '/signup',
			name: 'signup',
			component: Signup,
		}, {
			path: rootPath + '/radio', //test
			name: 'radio',
			component: Radio,
		}, {
			path: rootPath + '/mine',
			name: 'mine',
			component: Mine,
			beforeEnter: (to, from, next) => {
				bus.$emit('foot_index_change', 3)
				next()
			},
		}, {
			path: rootPath + '/identity',
			name: 'identity',
			component: Identity,
		}, {
			path: rootPath + '/profile',
			name: 'profile',
			component: Profile,
		}, {
			path: rootPath + '/upload',
			name: 'upload attachment and position',
			component: Upload,
		}, {
			path: rootPath + '/zhima',
			name: 'zhima',
			component: Zhima,
		}, {
			path: rootPath + '/job_info',
			name: 'job infomation',
			component: JobInfo,
		}, {
			path: rootPath + '/contact_way',
			name: 'contact way',
			component: ContactWay,
		}, {
			path: rootPath + '/shujumohe',
			name: 'shujumohe',
			component: shujumohe
		}, {
			path: rootPath + '/apply_list',
			name: 'applyList',
			component: applyList
		}, {
			path: rootPath + '/partner',
			name: 'partner',
			component: partner
		}, {
			path: rootPath + '/',
			name: 'index',
			component: Index
		}, {
			path: rootPath + '/*',
			name: 'errorPage',
			component: errorPage
		},
		// {
		// 	path: rootPath + '/relatives',
		// 	name: 'relatives',
		// 	component: Relatives,
		// },
		//  {
		// 	path: rootPath + '/add_info',
		// 	name: 'additional infomation',
		// 	component: AddInfo,
		// },
		// {
		// 	path: rootPath + '/audit_borrow',
		// 	name: 'AuditBorrow',
		// 	component: AuditBorrow,
		// },
		// {
		// 	path: rootPath + '/test', //test
		// 	name: 'tst',
		// 	component: Test,
		// },
		// {
		// 	path: rootPath + '/descrip',
		// 	name: 'descrip',
		// 	component: Descrip,
		// },
	]
})

// var beforeEnterFoot = function(from, to, next) {
// 	console.log('enter paid_service')
// 	bus.$emit('foot_index_change', 1)
// 	next()
// }