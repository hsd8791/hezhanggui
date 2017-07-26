import Vue from 'vue'
import Router from 'vue-router'
import pay from '../components/order_pay.vue'

Vue.use(Router)



var rootPath=''
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
console.log('route',{
	// mode: 'history',
	routes: newRoute('*/pay', 'pay', pay),
})
export default new Router({
	// mode: 'history',
	routes: newRoute('*/pay', 'pay', pay),
})