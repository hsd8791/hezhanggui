<template>
	<div class="add-btn" >

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
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
/*		#add-btn{
		font-size: 0.14rem;
		padding: 0.05rem 0;
		background: #73e673;
		background: #fff;
		height: 0.8rem;
		position: relative;*/
		.add-btn{
			/*transform: scale(1.1);*/
			transform-origin: 0 0;
			width: 0.6rem;
			height: 0.6rem;
			border:1px solid #cccccc;
			position: relative;
			/*position: absolute;*/
			/*margin:auto 0;*/
			/*top: 0;bottom: 0;*/
			/*margin-left: 0.15rem;*/
			&:after,&:before{
				content:' ';
				background:#cccccc;		
				width: 0.3rem;
				height: 0.04rem;
				position: absolute;
				top: 0;right: 0;bottom: 0;left: 0;
				margin:auto;
				border-radius: 1px;
				/*vertical-align: center;*/
			}
			&:before{
				width: 0.04rem;
				height: 0.3rem;
			}
		}

		/*}*/

	</style>
