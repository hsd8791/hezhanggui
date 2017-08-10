<template>
	<div id="introduceVue">

		<h3 class="title">
			小禾微贷丨关于小禾微贷
		</h3>
		<p class="total">小禾微贷是为社会群体提供的微借贷服务平台。平台目前覆盖全国，为用户提供借款服务。</p>
		<div class="sub-title">
			<img class="title-img" src="../assets/img/readem.png"/>
		</div>
		<p>无前期无押金，通过今借到、借贷宝、无忧借条等多个平台放款，首次500~1000额度；点击“借款”，填写借款申请，最快7分钟放款。</p>
		<div class="sub-title">
			<img class="title-img" src="../assets/img/conect.png"/>
		</div>
		<p>手机号：18968991186</p>
		<p>微信/支付宝/借贷宝/无忧借条：18968991186</p>
		<p>今借到：18958856806</p>
		<p>客服电话：400-0577-009</p>
		<p>小禾商务QQ公众号：4000577009</p>
		<p>点击进入QQ官方群：<span id="qq" @click='joinQQ'>加入QQ群</span></p>
		<button type="button" id="loginOut" class="" @click='logout' v-if='accountName!=="请登录"'>安全退出</button>
		<button type="button" id="loginOut" class="" @click='login' v-if='accountName=="请登录"'>登录</button>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		data() {
			return {
				accountName:'请登录',
				response:null,
				loading:true,
				editing:true,
				backAfterPost:false,// watch out
				// url:'url request',
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
			login(){
				publicFun.goPage('/introduce/login')
			},
			logout(){
  		// console.log('outing')
  		if(bus.account==='请登录'){
  			return
  		}
  		publicFun.get('account/logout',this,()=>{
  			// console.log('res outer',this.response)
  			// console.log('app',bus)
  			bus.$emit('account_change','请登录','','')//para1 for account, para2 for uniqueId
  		})
  	},
  	joinQQ(){
			window.location = "http://qm.qq.com/cgi-bin/qm/qr?k=FUte7gZXvGPuLJHt4DoPcoJzABIvE10W"
  	}
  },
  created(){
  	// publicFun.qualify(this)
  	this.accountName=bus.account
		console.log('bus',bus);
  	 bus.$on('account_change',(ac,id)=>{
  	 	console.log('account_change get')
  	 	this.accountName=ac
  	 })
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	#introduceVue{
		padding:0.5rem 0.05rem;
		.title{
			font-size: 13*0.01rem;
			color: #b9b8b8;
			text-align: center;
			margin-bottom: 10*0.01rem;
		}
		p{
			margin: 0*0.01rem 15*0.01rem;
			text-align: justify;
			line-height: 24*0.01rem;
			color: #727171;
			font-size: 14*0.01rem;
		}
		#qq{
			background: #24bdff url(../assets/img/add.png) no-repeat 5*0.01rem center;
			background-size: 15*0.01rem auto;
			font-size: 12*0.01rem;
			width: 100*0.01rem;
			color: white;
			padding: 5*0.01rem 10*0.01rem 5*0.01rem 25*0.01rem;
			border-radius: 5*0.01rem;
			margin-bottom: 10*0.01rem;
			text-shadow: none;
			cursor: pointer;
		}
		.sub-title{
			text-align: left;
			color: #dd524d;
			position: relative;
			padding-bottom: 5*0.01rem;
			margin: 20*0.01rem 15*0.01rem 10*0.01rem;
			font-size: 15*0.01rem;
			.title-img{
				height: 14*0.01rem;
			}
			&:after{
				position: absolute;
				content: ' ';
				left: 0;
				right: 88*0.01rem;
				bottom: 0;
				height: 1*0.01rem;
				background: #dd524d;
			}
		}
		#loginOut {
			width: 80%;
			display: block;
			margin: 36*0.01rem auto;
			padding: 12*0.01rem 0;
			text-align: center;
			color: white;
			font-weight: 700;
			border: none;
			background: #dd524d;
			border-radius: 10*0.01rem;
		}
	}
</style>
