<template>
	<div id="footNav" v-if='activeI!==-1'  class='foot-nav' :class='{"hide-foot":activeI===-1}'>
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
				]
			}
		},
		methods:{
			goPage:function(index){
				this.activeI=index
				router.push(this.paths[index])
        // console.log('router',router)
        // console.log('this.activeI',this.activeI)
      }
    },
    created:function(){

    	bus.$on('foot_index_change',(val)=>{
    		console.log('get change footindex',val)
    		this.activeI=val
    	})
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

