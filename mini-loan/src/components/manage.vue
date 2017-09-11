<template>
	<div id="manageVue">

		<div class="input ">
			<h1 class="title">通讯录同步助手</h1>
			<el-button type='success' id='androidAppDownload'>
				<i class="icon-android"></i>
				<span><a class="download-app" href="http://mobileappdownload.oss-cn-hangzhou.aliyuncs.com/hzg.0.0.1.apk">点击下载安卓同步助手</a></span>
			</el-button>
		</div>
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
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	#manageVue{
	}
	.download-app{
		text-decoration: none;
		color: #fff;
	}
	#androidAppDownload{
		margin-top: 0.8rem;
	}
</style>

<style lang='scss'>
	#manageVue{
		.el-button{
			font-size: 0.2rem;
			height: 0.5rem;
			width:70%;
		}

	}

</style>