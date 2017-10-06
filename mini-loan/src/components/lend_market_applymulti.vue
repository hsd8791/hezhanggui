<template>
	<div id="multipleApplyVue">
		<div class="input" v-loading='loadingApply' :element-loading-text='loadingMsg'>
			<h1 class="title">
				<app-back></app-back>
				已选贷款超市
			</h1>
			<div class="container">
				<div class="wraper">
					<label>借款金额：</label> 
					<el-input  type='number' :placeholder='amountHolder' v-model='amount' @blur.once='blured'  :class='{"valid-border":amountValid,"error-border":!amountValid}'></el-input>
					<i :class="{'el-icon-check':amountValid,'el-icon-close':!amountValid}"></i>
				</div>
			</div>
		</div>
		<div class="list-box">
			<div v-for='(info,key) in list'  class="market-container" :key='info.id'>
			  <div class="inner-container" :class="{'inner-container-small':false}">
			    
			    <div class="avator">
			      <div class="avator-pic" :style="{backgroundImage: 'url('+info.logo+')'}" ></div>
			    </div>
			    <div class="info-container">
			      <div class="info-applied">申请数：{{info.view_num}}</div>
			      <div class="info-fee">{{info.loan_amount_desc}}元</div>
			      <div class="info-expire">期限{{info.loan_time_desc}}天</div>
			    </div>

			  </div>
			  <div class="checkbox-container" @click.stop='outerLinkRemind(info.url)' v-show='false'>
			    <el-checkbox class='checkbox' v-model='marketChoosed' :label='key' @click.stop='' :disabled='info.url!==""'></el-checkbox>
			  </div>
			</div>
		</div>
		<remind :remind='remind'></remind>
		<div class="input">
			<el-button type='success' @click='apllyBorrow'>提交</el-button>
		</div>
	</div>
</template>

<script>
import bus from '../bus.js'
import publicFun from '../js/public.js'
export default {
	//
	//将选中的贷款超市信息存入bus,在本组件获取  （可以选删除）
	//获取审核拒绝的所有申请 排除
	//获取审核中的申请（24小时内）  排除
	//刷新当前页面需回到贷款超市页面
  data() {
    return {
      // loadingMsg:'请稍后',
    	list:{},
      // loadingApply:false,
      marketQty:null,
      unappliedQty:null,
    	amountHolder:'请填入借款金额·',
    	amount:null,
    	marketChoosed:[],
    	response:null,
    	loading:false,
    	editing:true,
    	backAfterPost:false,// watch out
			urlApply: 'lendApply/lendApply',
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
  	apllyBorrow() {
  		console.log('click',bus.cfgEssential.allFilled)
  		var r=this.remind
  		//&&!bus.relativeUrlTest
  		if (bus.cfgEssential.allFilled) {
  		// if (!bus.cfgEssential.allFilled) {
  			r.remindMsg='必填认证信息不完整'
  			r.remindMsgDscrp='请检查必填认证信息项是否已填写'
  			r.remindOpts=[{
  				msg:'确定',
  				callback:()=>{
  					publicFun.goPage('/index')
  					r.remindMsgDscrp=null
  				}
  			}]
  			r.isShow=true
  			return
  		}
  		this.multipleSubmit()
  		return
  		r.remindMsg = '请确认是否提交'
  		r.remindOpts = [{
  			msg: '确定',
  			callback: () => {
  				// publicFun.post(urlApply, {}, this, () => {
  				// 	// var r=this.remind
  				// 	// r.remindOpts=[{msg:'确定',callback:()=>{
  				// 	// 	// publicFun.goPage(-1)
  				// 	// 	if(this.getByMarket){
  				// 	// 		publicFun.goPage(this.$route.path+'/lend_market_applied_remind')
  				// 	// 	}
  				// 	// }}]
  				// 	// console.log('res apply_borrow', this.response)
  				// }, () => {})
  				this.multipleSubmit()
  				
  			}
  		}, {
  			msg: '取消',
  		}, ]
  		r.isShow = true

  	},
  	//此post 不需要重新check fill status
  	multipleSubmit(){
  		let list = this.list
      this.unappliedQty=this.marketQty
  		for(let key in list){ 
  			let postBody={
  				phone:list[key].phone
  			}
  			if(this.amount){
  				postBody.amount=this.amount*100
  			}
  			let urlApply = publicFun.urlConcat(this.urlApply, postBody)
  			console.log('postBody',key,urlApply)
  			publicFun.post(urlApply,{},this,()=>{
          this.unappliedQty--
          bus.cannotApplyMarket[key]=0
          delete bus.marketChosenInfo[key]
          bus.marketChosenQty--
          if(!this.unappliedQty){
            publicFun.goPage('/mine/apply_list')
          }
  			})
  		}
  	},
  	blured($event) {
  		var el = $event.target.parentElement.parentElement
  		el.className += ' validate'
  	},
  },
  computed:{
  	amountValid: function() {
  		var reg = /(^[1-9][0-9]*$)|(.*)/
  		let b=reg.test(this.amount)
  		if(b){
  			bus.loanAmount=this.amount
  		}
  		return b
  	},
    loadingMsg(){
      return `申请中（${this.marketQty-this.unappliedQty}/${this.marketQty},请勿离开`
    },
    loadingApply(){
      return !!this.unappliedQty
    }
  },
  created(){
  	if(bus.loanAmount){
  		this.amount=bus.loanAmount
  	}
  	if(bus.marketChosenInfo){
  		this.list=bus.marketChosenInfo
      this.marketQty=bus.marketChosenQty
      // this.unappliedQty=bus.marketChosenQty
  	}else{
  		publicFun.goPage('/market_list')
  	}
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.market-container{}
.inner-container{}
.avator-pic{}
.info-container{}
.info-applied{}
.info-fee{}
.info-expire{}
.avator{}
.list-box{
	display: flex;
	flex-wrap: wrap;
}
</style>
