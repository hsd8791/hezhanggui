<template>
	<div id="manageVue">

		<div class="input ">
			<h1 class="title">通讯录同步助手</h1>
			<a class="download-app" href="http://mobileappdownload.oss-cn-hangzhou.aliyuncs.com/hzg.0.0.1.apk">
			<el-button type='success' id='androidAppDownload'>
				<i class="icon-android platfor-icon"></i>
				<div class="download-text">
					<p>下载安卓</p>
					<p>同步助手</p>
				</div>
			</el-button>
			</a>
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
	.platfor-icon{
		position: absolute;
		left: 5%;top: 0;
		font-size: 0.5rem;
		line-height: 0.8rem;
	}
	.download-text{
		margin-left: 30%;
		width: 60%;
	}
	.download-app{
		white-space: wrap;
	}
	#androidAppDownload{
		margin-top: 0.8rem;
	}
</style>

<style lang='scss'>
	#manageVue{
		.el-button{
			position: relative;
			font-size: 0.24rem;
			line-height: 1.4;
			height: 0.8rem;
			width:50%;
			padding: 0;
		}

	}

</style>