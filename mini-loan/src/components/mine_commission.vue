<template>
	<div id="mineCommissionVue" class="input">
		<h1 class="title">
			<app-back></app-back>
			我的佣金
		</h1>
		<div class="ctrl-container">
			<span class="ctrl-bttn bttn-detail" @click='goPage("/detail")'>查看详情</span>
			<span class="ctrl-bttn bttn-withdraw" @click='goPage("/withdraw")'>提现</span>
		</div>
		<div class="container">
			<div class="unordered-list">
				总佣金：
				<span class='cmmssn-rslt'>
					{{commission.totalBrokerage | moneyParser}}元
				</span>
			</div>
			<div class="unordered-list">
				可支配佣金：
				<span class='cmmssn-rslt'>
					{{commission.brokerage | moneyParser}}元
				</span>
			</div>
			<div class="unordered-list">
				已冻结佣金：
				<span class='cmmssn-rslt'>
					{{commission.freezeBrokerage | moneyParser}}元
				</span>
			</div>
			<div class="unordered-list" v-if='commission.isAgent'>
				是否代理
				<span class='cmmssn-rslt'>
				{{commission.isAgent | agentParser}}
				</span>
			</div>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
export default {
  data() {
    return {
    	commission:{},
      response:null,
      loading:true,
      editing:true,
      backAfterPost:false,// watch out
      url:'brokerage/info',
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
  filters:{
  	moneyParser(val){
  		return val/100
  	},
  	agentParser(val){
  		// console.log('val',val)
  		return val?'一级代理':''
  	}
  },
  created(){
  	this.get()
  },
  methods:{
  	get(){
  		publicFun.get(this.url,this,()=>{
  			var data=this.response.body
  			console.log('commission res',data)
  			this.commission=data.data

  		})
  	},
  	goPage(path){
  		publicFun.goPage('/mine/commission'+path)
  	}
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
					
	.cmmssn-rslt{
		position: absolute;
		right: 0.15rem;
	}
	.ctrl-container{
		width: 100%;
		padding:0 0.15rem;
		margin-top: 0.1rem;
		display: flex;
		text-decoration: underline;
		.ctrl-bttn{
			width: 50%;
			font-size: 0.16rem;
		}
		.bttn-detail{
			text-align: left;
		}
		.bttn-withdraw{
			text-align: right;
		}
	}
</style>
