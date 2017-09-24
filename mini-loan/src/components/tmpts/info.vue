<template>
	<div class="info-vue">
		<div class="info-title">{{title}}</div>
		<div class="info-detail">
			<slot></slot>
		</div>
	</div>
</template>

<script>
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
  	title:{
  		default:'标题',
  	},

  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.info-vue{
	margin:0.1rem 0;
}
  .info-title{
    color:blue;
    text-align: left;
    font-size: 0.2rem;
    line-height: 1;
    margin:0.05rem 0;
  }
  .info-detail{
  	text-align: left;
  	margin:0.05rem 0;
  	font-size: 0.18rem;
  }
</style>
