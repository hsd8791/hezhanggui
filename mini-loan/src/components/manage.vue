<template>
	<div id="manageVue">

		<div class="input " >
			<h1 class="title">通讯录同步助手</h1>
			<!-- <div c1lass="container"> -->
			<a class="download-app" href="http://cdn.he577.com/hzg.0.0.1.apk" @click='testWechat'>
			<el-button type='success' id='androidAppDownload'>
				<i class="icon-android platfor-icon"></i>
				<div class="download-text">
					<p>下载安卓</p>
					<p>同步助手</p>
				</div>
			</el-button>
			</a>
			<a class="download-app" href="https://itunes.apple.com/cn/app/%E7%A6%BE%E6%8E%8C%E6%9F%9C%E5%90%8C%E6%AD%A5%E5%8A%A9%E6%89%8B/id1282215244?mt=8" @click='testWechat' >
				<el-button type='success' id='iosAppDownload'>
					<i class="icon-apple platfor-icon"></i>
					<div class="download-text">
						<p>下载苹果</p>
						<p>同步助手</p>
					</div>
				</el-button>
			</a>
				
			<app-info :title='"禾掌柜后台管理地址："' class='backend-container'>
				<a href="http://www.he577.com">http://www.he577.com</a>
			</app-info>

			<!-- </div>1 -->
		</div>
	<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
	export default {
		data() {
			return {
      response:null,
      // loading:false,
      editing:true,
      backAfterPost:false,// watch out
      // url:'',
      remind:{
      	isShow:false,
      	remindMsg:'remind',
      	self_:this,
      	remindOpts:[
      	{msg:'确定',},
      	],
      },
    }
  },
  methods:{
  	testWechat(){
  		if(publicFun.isWeiXin()){
  			let r=this.remind
  			r.remindMsg='无法在微信中下载'
  			r.remindMsgDscrp='请点击右上方用浏览器打开后下载'
  			r.remindOpts=[{msg:'确定'}]
  			r.isShow=true
  		}
  	},
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	#manageVue{
	}
	.container{
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
	#iosAppDownload{
		margin-bottom:0.3rem;
	}
	.backend-container{
		padding:0.2rem 0.4rem;
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