<template>
  <!-- <transition name='back'> -->

	<div id="footNav" class='foot-nav'>
		<span class='nav-btn' :class='{active:activeI===0}' @click='goPage(0)'>
			<div class="nav-icon"><i class="icon-home"></i></div>
			<div class="nav-item">首页</div>
		</span>
		<span class='nav-btn' :class='{active:activeI===1}' @click='goPage(1)'>
			<div class="nav-icon"><i class="icon-cool"></i></div>
			<div class="nav-item">增值</div>
		</span>
		<span class='nav-btn' :class='{active:activeI===2}' @click='goPage(2)'>
			<div class="nav-icon"><i class="icon-hammer"></i></div>
			<div class="nav-item">后台</div>
		</span>
		<span class='nav-btn' :class='{active:activeI===3}' @click='goPage(3)'>
			<div class="nav-icon"><i class="icon-user"></i></div>
			<div class="nav-item">我的</div>
		</span>

	</div>
	<!-- </transition> -->
</template>

<script>
	import router from './router'
	import bus from './bus.js'
	export default {
		data:function() {
			return {
				activeI: 0,
				showFoot:true,
				// footActive:true,
				paths: [
				'/index',
				'/coming',//paid_service
				'/coming',
				'/mine',
				],
				cmpntNames:[
				'index',
				'coming',
				'coming',
				'mine',
				],
			}
		},
		methods:{
			goPage:function(index){
				setTimeout(()=> {//incase same foot component
					this.activeI=index
				}, 50);
				router.push(this.paths[index])
        // console.log('router',router)
        // console.log('this.activeI',this.activeI)
      }
    },
    // props:['activeI'],
    created:function(){
    	router.beforeEach((to, from, next) => {
    		console.log('to', to.path)
    		console.log('from', from.path)
    		var depthTo=to.path.split('/').length
    		var depthFrom=from.path.split('/').length
    		console.log('depth',depthFrom,depthTo)
    		var name= to.name
    		var activeFoot=this.cmpntNames.indexOf(name)
    		// console.log('activeFoot',activeFoot)
    		this.activeI=activeFoot
    		var action
    		if(depthTo>depthFrom){
    			action='forward'
    		}else if(depthTo<depthFrom){
    			action='back'
    		}else{
    			action='samelevel'
    		}
    		console.log('action',action)
    		if(activeFoot<0){
    			bus.$emit('foot_show_change',false,action)
    		}else{
    			bus.$emit('foot_show_change',true,action)
    		}
    		next()

    	})
    	// bus.$on('foot_index_change',(val)=>{
    		// console.log('get change footindex',val)
    		// this.activeI=val
    	// })
    	var self_=this
    	var url=location.href
    	var urlPath=location.pathnname
    	var urlHash=location.hash
    	urlHash=urlHash.replace('#','')
    	this.activeI=getIndex(this.paths,urlHash)
    	console.log('getIndex(this.paths,urlHash)',getIndex(this.paths,urlHash))
    	function getIndex(arr,val){
    		var l=arr.length,i
    		if(val=='/'){
    			return 0
    		}
    		for(i=0;i<l;i++){
    			if(arr[i]===val){
    				return i
    			}
    		}
    		return -1
    	}
    	// console.log('hash',urlHash)
    },
    components: {}
  }
</script>
<style lang='scss' scoped>
	.hide-foot{
		display: none;
	}
</style>

