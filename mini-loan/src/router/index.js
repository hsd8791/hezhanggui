import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '../components/index.vue'
import Descrip from '../components/descrip.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'Index',
		component: Index
	}, {
		path: '/index',
		name: 'index',
		component: Index
	}, {
		path: '/descrip',
		name: 'descrip',
		component: Descrip
	}]
})