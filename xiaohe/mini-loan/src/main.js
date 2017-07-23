// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import VueResource from 'vue-resource'
import publicFun from './js/public.js'
import remind from './components/tmpts/remind.vue'
import back from './components/tmpts/route_back.vue'
import record from './components/tmpts/record.vue'

Vue.use(VueResource)
Vue.component('remind', remind)
Vue.component('app-back', back)
Vue.component('app-record', record)
Vue.directive('scroll-load', {
	bind: function(el, binding, vnode) {
		el.addEventListener('scroll', () => {
				// console.log('scrolling')
				// console.log('binding value', binding.value)
				var value = binding.value
					// binding.value.crrtPage++
				var el = document.querySelector('.list-container-inner')
				var btt = el.getBoundingClientRect().bottom
					// console.log('btt',btt)
				if (btt < (screen.height + 50)) {
					// value.getting = true
					// value.get(value.crrtPage)
					value.method()
						// console.log('load more')
						// console.dirxml(el)
				}
			}, false)
			// console.log('value', this)
	}
})
Vue.config.productionTip = false
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
// Vue.http.options.root = 'http://192.168.1.58:8080';
Vue.http.options.root = 'http://hzg.he577.com';
import {
	Button,
	Select,
	Input,
	Loading,
	Collapse,
	Upload,
	Checkbox,
	CollapseItem,
	Option,
} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Loading.directive)
Vue.use(Collapse)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CollapseItem)
Vue.use(Option)
Vue.prototype.$loading = Loading.service

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: `<app></app>`,
	components: {
		app: App
	},
	methods: {

	},
	render: h => h(App),
})

// function test() {
// 	console.log('test global function')
// }