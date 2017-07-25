<template>
	<div class="cover" :style="{display:show}" @click='close()'>
		
	</div>
</template>

<script>
import bus from '../../bus.js'
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  props:{
  	show:{
  		default:'block'
  	}
  },
  methods:{
  	close(){
      // console.log('e',e)
      // e.target.style.display='none'
  		console.log('closing')
  		bus.$emit('close_share_cover')
  	}
  },
  events: {},
  components: {}
}
</script>

<style scoped>
	.cover {
		display: none;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		/*left: 0;
		right: 0;
		bottom: 0;*/
		background: url(../../assets/img/share.png) no-repeat 2.05rem 0.15rem rgba(0, 0, 0, 0.8);
		background-size: 1.5rem auto;
		z-index: 99;
	}
</style>
