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
import choose from './components/tmpts/choose_remind.vue'
import bindCard from './components/views/card_bind.vue'
import list from './components/tmpts/record_list.vue'
import bus from './bus.js'
Vue.use(VueResource)
Vue.component('remind', remind)
Vue.component('app-back', back)
Vue.component('app-record', record)
Vue.component('app-record-list', list)
Vue.component('app-choose', choose)
Vue.component('app-bind-card',bindCard)
Vue.config.productionTip = false
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
// Vue.http.options.root = 'http://hzg.he577.com';
Vue.http.options.root = 'http://hzg.he577.com/test';
// 
Vue.directive('scroll-load', {
	bind: function(el, binding, vnode) {
		console.log('vnode', vnode)
			// var el = document.querySelector('.list-container-inner')
		var cfg = binding.value,
			sel = cfg.listSelector
			// console.log('scoll load config', cfg)
		var listContainer,
			btt,
			H = screen.height + 50 //trigger height
			// console.log('binding cfg', cfg.listSelector)
			// console.log('el', listContainer)
		el.addEventListener('scroll', () => {
				listContainer = document.querySelector(sel)
					// console.log('scrolling')
					// console.log('cfg', cfg)
					// console.log('cfg.listSelector', cfg.listSelector)

				btt = listContainer.getBoundingClientRect().bottom
					// console.log('btt',btt)
				if (btt < H) {
					// cfg.getting = true
					// cfg.get(cfg.crrtPage)
					cfg.method()
						// console.log('load more')
						// console.dirxml(el)
				}
			}, false)
			// console.log('cfg', this)
	}
})
Vue.directive('pull-refresh', {
	bind: function(el, binding, vnode) {
		var cfg = binding.value,
			containerTop = 0
			// console.warn('config', cfg)
			// console.warn('config', binding)
		var touch = {
			start: null,
			end: null,
			last: null,
			crrt: null,
		}
		var scrollTop,outer
		el.addEventListener('touchstart', (e) => {
			// console.log('$e',e.touches[0].clientY)
			e.stopPropagation()
				// e.preventDefault()
			touch.start = e.touches[0].clientY
			touch.last = e.touches[0].clientY
				// console.log('touch', touch)
		}, false)
		el.addEventListener('touchmove', (e) => {
			// e.stopPropagation()
			e.preventDefault()
			touch.crrt = e.touches[0].clientY
				// console.log('touch', touch)
			outer= e.currentTarget.parentElement
			scrollTop =outer.scrollTop

				// console.log('scrollTop', scrollTop)
				// do sth to containerTop
			if (scrollTop > 0) {
				// console.log('touch', touch.crrt, touch.last)
				var step = touch.crrt - touch.last
				outer.scrollTop-=step
				touch.last = touch.crrt
				// console.log('step', step)
				return
			} else {
				// console.log('may drag down')
				// console.log('e.currentTarget.scrollTop',outer.scrollTop)
				// console.log('compare',t.last,t.crrt)
				if (touch.crrt <= touch.last) {
					if (containerTop === 0) {
						// console.log('touch', touch.crrt, touch.last)
						var step = touch.crrt - touch.last
						outer.scrollTop-=step
						touch.last = touch.crrt
						// console.log('step', step)

						return
					} else {
						// e.stopPropagation()
						// e.preventDefault()
						containerTop -= 0.025;
						el.style.paddingTop = containerTop + 'rem'

					}
				} else {
					// e.stopPropagation()
					// e.preventDefault()
					containerTop += 0.025
					el.style.paddingTop = containerTop + 'rem'

					// console.log('drag down')
				}
			}
			touch.last = touch.crrt
		}, false)
		el.addEventListener('touchend', (e) => {
			e.stopPropagation()
				// e.preventDefault()
			touch.end = e.changedTouches[0].clientY
				// console.log('touch', touch)	
				// console.log('cfg', cfg)
				// console.log('cfg', cfg.method)

			el.style.transition = '.5s cubic-bezier(0.23, 0.86, 0.39, 0.78)'
				// if(this.containerTop>0){
				// 	console.log('refresh')
				// 	this.getNew()
				// }
			if (containerTop > 0) { //可以设置其他值控制下拉的幅度

				if (cfg.method) {
					if (cfg.method instanceof Function) {
						cfg.method()
					} else {
						console.warn('method is not a function')
					}
				} else {
					console.warn('no method ')
				}
				console.log('refresh')
			}
			containerTop = 0
			el.style.paddingTop = containerTop + 'px'
			setTimeout(() => {
				el.style.transition = '0s'
			}, 300);
		}, false)
		console.log('binded pull-refresh')
	}
})
Vue.directive('record', {
	bind: function(el, binding, vnode) {
		// console.log('vnode - record',vnode)
		// console.log('binding name',binding.value)
		// console.log('binding name',binding.value.name)
		// console.log('vnode - record',vnode.context.records)
		bus.$on(binding.value, function(val) {
			vnode.context.records = val
				// console.log(binding.value,'getted',val)
		})
	}
})
Vue.directive('inner-scroll',{
	bind:function(el,binding,vnode){
		var cfg = binding.value,
			containerTop = 0
			// console.warn('config', cfg)
			// console.warn('config', binding)
		var touch = {
			start: null,
			end: null,
			last: null,
			crrt: null,
		}
		var scrollTop,outer
		console.log('bindded v-inner-scroll')
		
		el.addEventListener('touchstart', (e) => {
			e.stopPropagation()
			touch.start = e.touches[0].clientY
			touch.last = e.touches[0].clientY
		}, false)
		el.addEventListener('touchmove', (e) => {
			e.preventDefault()
			touch.crrt = e.touches[0].clientY
			outer= e.currentTarget.parentElement
			scrollTop =outer.scrollTop
			if (scrollTop > 0) {
				var step = touch.crrt - touch.last
				outer.scrollTop-=step
				touch.last = touch.crrt
				return
			} else {
				if (touch.crrt <= touch.last) {
					if (containerTop === 0) {
						var step = touch.crrt - touch.last
						outer.scrollTop-=step
						touch.last = touch.crrt
						return
					} else {
						containerTop -= 0.025;
						el.style.paddingTop = containerTop + 'rem'

					}
				} else {
					// e.stopPropagation()
					// e.preventDefault()
					// containerTop += 0.025
					// el.style.paddingTop = containerTop + 'rem'
				}
			}
			touch.last = touch.crrt
		}, false)
		el.addEventListener('touchend', (e) => {
			e.stopPropagation()
			touch.end = e.changedTouches[0].clientY
		}, false)
	}
})
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
	Radio,
	RadioGroup,
	RadioButton,
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
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
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