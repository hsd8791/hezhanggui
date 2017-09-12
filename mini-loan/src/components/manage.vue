<template>
	<div id="manageVue">

		<div class="input " >
			<h1 class="title">通讯录同步助手</h1>
			<a class="download-app" href="http://cdn.he577.com/hzg.0.0.1.apk" @click='testWechat'>
			<el-button type='success' id='androidAppDownload'>
				<i class="icon-android platfor-icon"></i>
				<div class="download-text">
					<p>下载安卓</p>
					<p>同步助手</p>
				</div>
			</el-button>
			</a>
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