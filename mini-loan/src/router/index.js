import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../components/index.vue'
import Descrip from '../components/descrip.vue'
import Radio from '../components/tmpts/radio.vue'
import Test from '../components/test.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/index',
		name: 'index',
		component: Index
	}, {
		path: '/descrip',
		name: 'descrip',
		component: Descrip
	}, {
		path: '/radio',
		name: 'radio',
		component: Radio
	}, {
		path: '/test',
		name: 'tst',
		component: Test
	}, {
		path: '/*',
		name: 'Index',
		component: Index
	}]
})