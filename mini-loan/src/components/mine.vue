<template>
	<div id="mineVue" class='mine-vue' v-loading='loading' element-loading-text='请稍后'>
		<div class="banner">
			<div class="avator" @click='login'>
				<img :src="avatorSrc" v-if='avatorSrc' class="avator-img">
				<i class="avator-icon icon-user" v-else></i>
			</div>
			<div class="account">{{accountName}}</div>
		</div>
		<div class="menu-row">
			<div class="menu-row-item profile">
				<p>
					我的资料
				</p>
			</div>
			<div class="menu-row-item loanRecup">
				<p>
					<!-- 我的借款单 -->我的账户
				</p>
			</div>
		</div>
		<div class="menu-column">
			<div class="menu-column-item" v-for='item in columnList' @click='handle(item)'>
				<p>
					{{item.title}}
				</p>
				<i class="icon-chevron-right el-icon-arrow-right"></i>
			</div>
			<div class="menu-column-item"  @click='handle(item)'  v-if='accountName!=="请登录"' v-for='item in columnListLoged'>
				<p>
					{{item.title}}
				</p>
				<i class="icon-chevron-right el-icon-arrow-right"></i>
			</div>

			
		</div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				loading:false,
				editing:false,
				avatorSrc:null,
				accountName:'',
				response:null,
				columnList:[
				// {title:'使用帮助',},
				// {title:'敬请期待',},
				],
				//登录后显示
				columnListLoged:[
				{title:'申请记录',link:'/apply_list'},//
				{title:'我的伙伴',link:'/partner'},
				{title:'密码修改',link:'/pwd'},
				{title:'佣金',link:'/commission'},
				{title:'充值',link:'/charge'},
				{title:'我的禾币',link:'/myhb'},
				{title:'登出',methodName:'logout'},
				],

			}
		},
		methods:{
			handle(item){
				if(item.link){
					this.goPage(item.link)
				}
				console.log('item',item)
				if(item.methodName){
					// console.log('methodName',item.methodName)
					// console.log('methodName',this[item.methodName])
					this[item.methodName]()
  			// item.method()
  		}
  	},
  	logout(){
  		// console.log('outing')
  		publicFun.get('account/logout',this,()=>{
  			// console.log('res outer',this.response)
  			// console.log('app',bus)
  			bus.$emit('account_change','请登录','')//para1 for account, para2 for uniqueId
  		})
  	},
  	login(){
  		if(this.accountName==='请登录'){
  			publicFun.goPage('/mine/login')
  		}
  	},
  	goPage(path){
  		if(path!==undefined){
  			publicFun.goPage('/mine'+path)
  		}
  	}
  },
  created:function () {
  	// console.log('bus',bus)
  	// console.log('this',bus)
  	// var self_=this
  	this.accountName=bus.account //get accountname if login already
  	bus.$on('account_change',(ac,id)=>{ //detect account_change like logout or login 
  		this.accountName=ac;
  		this.uniqueI=id;
  	})
  	// var self_=this
  	// bus.$on('account_change',function(ac,id){
  	// 	self_.accountName=ac
  	// 	self_.uniqueId=id
  	// })
  	// this.accountName=this.parent.
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	/**{border:1px solid red;}*/
	$bgColor:#f6f6f6;
	$borderColor:#cacaca;
	$frontColor:#8f8e94;
	$fontColor:#585858;
	.mine-vue{
		position: relative;
		color:$fontColor;
		font-size: 0.14rem;
		.banner{
			width: 100%;
			height: 1.52rem;
			background: #cc2a1b;
			padding-top:0.2rem;
			color:#fff;
			.avator{
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				background: rgba(255,255,255,0.9);
				position: relative;
				margin: 0 auto;
				/*left: 0;right: 0;*/
				/*top: 0.15rem;*/
				/*margin-top: 0.15rem;*/
				.avator-icon{
					font-size: 0.5rem;
					line-height: 0.7rem;

				}
				.avator-img{
					width: 100%;
				}
			}
			.account{
				margin-top: 0.1rem;
			}
		}
		
		.menu-row{
			display: flex;
			height:0.6rem;
			border:0px solid $borderColor;
			border-bottom-width: 0.04rem;
			.menu-row-item{
				height: 100%;
				width: 100%;
				border:0px solid $borderColor;
				p{
					/*margin-top: 0.4rem;*/
					line-height: 0.6rem;
				}
			}
			.menu-row-item:first-child{
				border-right-width:0.02rem;
			}
		}
		.menu-column{
			width: 85%;
			margin: 0.1rem auto;
			position: relative;
			.menu-column-item{
				position: relative;
				height: 0.5rem;
				border:0px solid $borderColor;
				border-bottom-width: 0.02rem;
				text-align: left;
				line-height: 1;
				padding: 0 0 0 0.15rem;
				vertical-align: baseline;
				p{
					/*margin-top:0.15rem;*/
					padding-top: 0.2rem;
				}
				.icon-chevron-right{
					/*content:"\f078";*/
					font-size: 0.16rem;
					position: absolute;
					right: 0.05rem;
					bottom: 0.14rem;
					color: #969696;
				}
			}
		}
	}

</style>
