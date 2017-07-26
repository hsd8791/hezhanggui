import Vue from 'vue'
import App from '../App_pay'
import router from './router.js'
import VueResource from 'vue-resource'

import remind from '../components/tmpts/remind.vue'
Vue.component('remind', remind)
// import back from './components/tmpts/route_back.vue'
// Vue.component('app-back', back)
// import record from './components/tmpts/record.vue'
// Vue.component('app-record', record)
// import list from './components/tmpts/record_list.vue'
// Vue.component('app-record-list', list)
// import bus from './bus.js'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
// Vue.http.options.root = 'http://192.168.1.58:8080';
// Vue.http.options.root = 'http://hzg.he577.com';
Vue.http.options.root = 'http://hzg.he577.com/test';
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
